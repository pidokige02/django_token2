<template>
  <v-container class="post-details">
    <!-- Post List 버튼 -->
    <v-btn :to="{ path: '/dashboard' }" color="primary" outlined>
      Post List
    </v-btn>
    <!-- 게시물 제목 -->
    <v-card class="mt-4">
      <v-card-title class="text-h4">{{ post.title }}</v-card-title>
      <!-- 게시물 메타 정보 -->
      <v-card-subtitle>
        <div>Created: {{ formatDate(post.created_at) }}</div>
        <div>Updated: {{ formatDate(post.updated_at) }}</div>
        <div>Published: {{ formatDate(post.published_at) }}</div>
        <div>Author: {{ post.author }}</div>
      </v-card-subtitle>
      <!-- 게시물 내용 -->
      <v-card-text class="mt-3">
        <p>{{ post.content }}</p>
      </v-card-text>
      <!-- Update & Delete Buttons -->
      <v-card-actions class="justify-end">
        <v-btn :to="{ path: `/update/${post.id}` }" color="secondary" outlined>
          Update
        </v-btn>
        <v-btn color="error" outlined @click="deletePost"> Delete </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const post = ref({});
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
          router.push("/dashboard");
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

<style scoped>
.post-details {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
