<template>
  <v-container class="update-post" max-width="600px">
    <v-card>
      <v-card-title class="text-h5">Edit Post</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="updatePost" ref="form" lazy-validation>
          <v-text-field
            v-model="post.title"
            label="Title"
            required
            outlined
          ></v-text-field>
          <v-textarea
            v-model="post.content"
            label="Content"
            rows="5"
            outlined
            required
          ></v-textarea>
          <v-btn type="submit" color="primary" class="mt-4"> Save </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
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
    const form = ref(null);

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
      if (form.value.validate()) {
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
      }
    };

    onMounted(fetchPost);

    return {
      post,
      form,
      updatePost,
    };
  },
};
</script>

<style scoped>
.update-post {
  margin-top: 20px;
}
</style>
