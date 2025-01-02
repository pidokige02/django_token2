<template>
  <v-container class="post-create-container" justify="center">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-h5"> Create a New Post </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createPost">
              <v-text-field
                v-model="title"
                label="Title"
                outlined
                dense
                required
              ></v-text-field>
              <v-textarea
                v-model="content"
                label="Content"
                outlined
                rows="5"
                dense
                required
              ></v-textarea>
              <v-btn type="submit" color="primary" block large>
                Create Post
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const title = ref("");
    const content = ref("");
    const router = useRouter();

    const createPost = async () => {
      try {
        const response = await axios.post("//localhost:8000/blog/api/create/", {
          title: title.value,
          content: content.value,
        });
        alert("Post created successfully!");
        router.push(`/post/${response.data.id}`);
      } catch (error) {
        console.error("Error creating post:", error.response?.data);
        alert("Failed to create the post. Please try again.");
      }
    };

    return {
      title,
      content,
      createPost,
    };
  },
};
</script>

<style scoped>
.post-create-container {
  margin-top: 20px;
}
</style>
