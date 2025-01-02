<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Dashboard</h1>
      </v-col>
    </v-row>
    <!-- Create Blog Post Button -->
    <v-row>
      <v-col cols="12">
        <v-btn :to="{ path: '/create' }" class="mb-4" color="primary" large>
          Create Blog Post
        </v-btn>
      </v-col>
    </v-row>
    <!-- Posts List -->
    <v-row>
      <template v-if="!isLoading">
        <v-col v-for="post in posts" :key="post.id" cols="12" md="6" lg="4">
          <router-link :to="`/post/${post.id}`" class="post-link">
            <PostCard :post="post" />
          </router-link>
        </v-col>
      </template>
      <v-col cols="12" v-else>
        <p>Loading posts...</p>
      </v-col>
    </v-row>
    <!-- Pagination Controls -->
    <v-row v-if="!isLoading && totalPages > 1" justify="center">
      <v-col cols="auto">
        <v-btn
          :disabled="!previous"
          @click="fetchPosts(previous)"
          color="primary"
          outlined
        >
          Previous
        </v-btn>
      </v-col>
      <v-col cols="auto" class="text-center">
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
      </v-col>
      <v-col cols="auto">
        <v-btn
          :disabled="!next"
          @click="fetchPosts(next)"
          color="primary"
          outlined
        >
          Next
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import PostCard from "../components/PostCard";

export default {
  name: "BlogDashboard",
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
        next.value = data.next || null;
        previous.value = data.previous || null;
        currentPage.value = data.current || 1;
        totalPages.value = data.total_pages || 1;
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

<style scoped>
.post-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
</style>
