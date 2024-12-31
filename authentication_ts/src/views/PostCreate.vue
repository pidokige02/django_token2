<template>
  <div class="post-create-container">
    <h1>Create a New Post</h1>
    <form @submit.prevent="createPost" novalidate>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          v-model="title"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea
          id="content"
          v-model="content"
          class="form-control"
          rows="5"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Create Post</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import axios, { AxiosError } from "axios";
import { useRouter } from "vue-router";

// 포스트 데이터를 위한 인터페이스 정의
interface PostData {
  title: string;
  content: string;
}

export default {
  setup() {
    // title과 content는 문자열 타입으로 정의
    const title = ref<string>("");
    const content = ref<string>("");

    // 라우터 사용
    const router = useRouter();

    // 포스트 생성 함수
    const createPost = async (): Promise<void> => {
      try {
        // 포스트 데이터 객체 생성
        const postData: PostData = {
          title: title.value,
          content: content.value,
        };

        // axios로 포스트 생성 요청
        const response = await axios.post(
          "//localhost:8000/blog/api/create/",
          postData
        );

        alert("Post created successfully!");

        // 포스트 생성 후 해당 포스트 페이지로 이동
        router.push(`/post/${response.data.id}`);
      } catch (error) {
        const err = error as AxiosError; // Type casting
        console.error("Error creating post:", err.response?.data);
        alert("Failed to create the post. Please try again.");
      }
    };

    // 반환된 값들
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
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn:hover {
  background-color: #0056b3;
}
</style>
