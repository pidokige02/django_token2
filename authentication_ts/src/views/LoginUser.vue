<template>
  <div>
    <form @submit.prevent="login">
      <label for="username"> UserName: </label>
      <input v-model="username" type="text" name="username" />
      <label for="password"> Password: </label>
      <input v-model="password" type="password" name="password" />
      <button type="submit" name="button">Login</button>
      <p>{{ error }}</p>
      <router-link to="/register">
        Don't have an account? Register.
      </router-link>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/UserAuthStore"; // Pinia 스토어 경로를 수정하세요

export default {
  setup() {
    const username = ref<string>("");
    const password = ref<string>("");
    const error = ref<string | null>(null);
    const router = useRouter();
    const authStore = useAuthStore(); // Pinia 스토어 가져오기

    const login = async (): Promise<void> => {
      try {
        // Pinia의 login 액션 호출
        await authStore.login({
          username: username.value,
          password: password.value,
        });
        router.push({ name: "dashboard" }); // 성공 시 대시보드로 이동
      } catch (err: any) {
        // 에러 처리
        error.value = err.response?.data?.error || "An error occurred.";
      }
    };

    return {
      username,
      password,
      error,
      login,
    };
  },
};
</script>
<style scoped></style>
