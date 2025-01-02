<template>
  <v-card class="post-card" elevation="2">
    <!-- Post Header -->
    <v-card-title>
      <strong>Author:</strong> {{ postData.author }}
    </v-card-title>

    <!-- Post Content -->
    <v-card-text>
      {{ postData.content }}
    </v-card-text>

    <!-- Post Footer -->
    <v-card-actions>
      <v-row class="post-footer" dense>
        <v-col cols="12" sm="4">
          <strong>Created At:</strong> {{ formatDate(postData.created_at) }}
        </v-col>
        <v-col cols="12" sm="4">
          <strong>Updated At:</strong> {{ formatDate(postData.updated_at) }}
        </v-col>
        <v-col cols="12" sm="4" v-if="postData.published_at">
          <strong>Published At:</strong> {{ formatDate(postData.published_at) }}
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "PostCard",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { post } = toRefs(props);

    const formatDate = (date) => {
      if (!date) return "";
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    };
    return {
      postData: post, // 이름을 다르게 설정
      formatDate,
    };
  },
});
</script>

<style scoped>
.post-card {
  margin-bottom: 1.5em;
}
.post-footer {
  font-size: 0.9em;
  color: #777;
}
</style>
