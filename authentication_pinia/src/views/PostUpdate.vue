<template>
  <div class="update-post">
    <h2>Edit Post</h2>
    <form @submit.prevent="updatePost">
      <div>
        <label for="title">Title:</label>
        <input id="title" v-model="post.title" type="text" required />
      </div>
      <div>
        <label for="content">Content:</label>
        <textarea id="content" v-model="post.content" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
export default {
  setup() {
    const post = ref({ title: "", content: "" });
    const router = useRouter();
    const route = useRoute();
    const fetchPost = async () => {
      const postId = route.params.id;
      try {
        const { data } = await axios.get(
          `http://localhost:8000/blog/api/${postId}/`
        );
        post.value = data;
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    const updatePost = async () => {
      try {
        await axios.put(
          `http://localhost:8000/blog/api/update/${post.value.id}/`,
          post.value
        );
        alert("Post updated successfully!");
        router.push(`/post/${post.value.id}`); // 상세 페이지로 리다이렉트
      } catch (error) {
        console.error("Error updating post:", error);
        alert("Failed to update post.");
      }
    };
    onMounted(fetchPost);
    return {
      post,
      updatePost,
    };
  },
};
</script>
