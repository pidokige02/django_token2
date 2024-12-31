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

<script lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

interface Post {
  id?: number;
  title: string;
  content: string;
}

export default {
  setup() {
    const post = ref<Post>({ title: "", content: "" });
    const router = useRouter();
    const route = useRoute();

    const fetchPost = async (): Promise<void> => {
      const postId = route.params.id as string;
      try {
        const { data } = await axios.get<Post>(
          `http://localhost:8000/blog/api/${postId}/`
        );
        post.value = data;
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    const updatePost = async (): Promise<void> => {
      try {
        if (post.value.id) {
          await axios.put(
            `http://localhost:8000/blog/api/update/${post.value.id}/`,
            post.value
          );
          alert("Post updated successfully!");
          router.push(`/post/${post.value.id}`); // 상세 페이지로 리다이렉트
        }
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
