<template>
  <div class="post-details">
    <!-- Post List 버튼 -->
    <router-link to="/dashboard" class="btn btn-primary">Post List</router-link>
    <!-- 게시물 제목 -->
    <h2>{{ post.title }}</h2>
    <!-- 게시물 메타 정보 -->
    <p>created: {{ formatDate(post.created_at) }}</p>
    <p>updated: {{ formatDate(post.updated_at) }}</p>
    <p>published: {{ formatDate(post.published_at) }}</p>
    <p>author: {{ post.author }}</p>
    <!-- 게시물 내용 -->
    <p>{{ post.content }}</p>
    <!-- Update & Delete Buttons -->
    <div class="post-actions">
      <router-link :to="`/update/${post.id}`" class="btn btn-secondary">
        update
      </router-link>
      <button @click="deletePost" class="btn btn-danger">Delete</button>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
export default {
  setup() {
    const post = ref({}); // 게시물 데이터를 저장
    const router = useRouter();
    const route = useRoute();
    const fetchPostDetails = async () => {
      const postId = route.params.id;
      try {
        const { data } = await axios.get(
          `http://localhost:8000/blog/api/${postId}/`
        );
        post.value = data;
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };
    const formatDate = (date) => {
      if (!date) return "N/A";
      return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    };
    const deletePost = async () => {
      if (confirm("Are you sure you want to delete this post?")) {
        try {
          await axios.delete(
            `http://localhost:8000/blog/api/delete/${post.value.id}/`
          );
          alert("Post deleted successfully!");
          router.push("/dashboard"); // 게시물 목록 페이지로 리다이렉트
        } catch (error) {
          console.error("Error deleting post:", error);
          alert("Failed to delete post.");
        }
      }
    };
    onMounted(fetchPostDetails);
    return {
      post,
      formatDate,
      deletePost,
    };
  },
};
</script>
<style>
.post-details {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.btn {
  display: inline-block;
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
  transition: background-color 0.3s ease;
}
.btn:hover {
  background-color: #0056b3;
}
h2 {
  font-size: 24px;
  margin-bottom: 10px;
}
p {
  font-size: 16px;
  margin: 5px 0;
}
.post-actions {
  display: flex;
  gap: 10px; /* flex의 간격 관리 */
  margin-top: 20px;
  justify-content: flex-end;
}
.btn-secondary {
  background-color: #6c757d;
}
.btn-secondary:hover {
  background-color: #5a6268;
}
.btn-danger {
  background-color: #dc3545;
}
.btn-danger:hover {
  background-color: #c82333;
}
</style>
