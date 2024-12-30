<template>
  <div>
    <h1>Dashboard</h1>
    <!-- Create Blog Post Button -->
    <router-link to="/create" class="create-post-button">
      Create Blog Post
    </router-link>
    <template v-if="!isLoading">
      <div v-for="post in posts" :key="post.id">
        <!-- Router link wrapping PostCard -->
        <router-link :to="`/post/${post.id}`" class="post-link">
          <PostCard :post="post" />
        </router-link>
      </div>
    </template>
    <p v-else>Loading posts</p>
    <!-- Pagination Controls -->
    <div class="pagination" v-if="!isLoading && totalPages > 1">
      <button
        class="pagination-button"
        :disabled="!previous"
        @click="fetchPosts(previous)"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        class="pagination-button"
        :disabled="!next"
        @click="fetchPosts(next)"
      >
        Next
      </button>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import PostCard from "../components/PostCard";
export default {
  name: "BlogDashboard", // 컴포넌트 이름을 다중 단어 형식으로 변경
  components: { PostCard },
  setup() {
    const isLoading = ref(true);
    const posts = ref([]);
    const next = ref(null);
    const previous = ref(null);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const fetchPosts = async (page = 1) => {
      const url = `//localhost:8000/blog/api?page=${page}`;
      isLoading.value = true;
      try {
        const { data } = await axios.get(url);
        posts.value = data.results || [];
        next.value = data.next || null; // 다음 페이지 번호
        previous.value = data.previous || null; // 이전 페이지 번호
        currentPage.value = data.current || 1; // 현재 페이지
        totalPages.value = data.total_pages || 1; // 전체 페이지 수
      } catch (error) {
        console.error("Error fetching posts:", error);
        posts.value = [];
        next.value = null;
        previous.value = null;
        currentPage.value = 1;
        totalPages.value = 1;
      } finally {
        isLoading.value = false;
      }
    };
    onMounted(() => {
      fetchPosts();
    });
    return {
      isLoading,
      posts,
      next,
      previous,
      currentPage,
      totalPages,
      fetchPosts,
    };
  },
};
</script>
<style>
/* Style for the Create Post Button */
.create-post-button {
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  text-align: center;
}
.create-post-button:hover {
  background-color: #0056b3;
}
/* Style for Post Link */
.post-link {
  text-decoration: none;
  color: inherit;
  display: block;
  margin-bottom: 15px;
}
/* Pagination Style */
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pagination-button {
  margin: 0 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.pagination-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
