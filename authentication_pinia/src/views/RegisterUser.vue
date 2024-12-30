<template>
  <div>
    <form @submit.prevent="register">
      <label for="name"> Name: </label>
      <input v-model="username" type="text" name="name" />
      <label for="email"> Email: </label>
      <input v-model="email" type="email" name="email" />
      <label for="password"> Password: </label>
      <input v-model="password" type="password" name="password" />
      <button type="submit" name="button">Register</button>
      <ul>
        <li v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </ul>
      <router-link to="/login"> Already have an account? Login. </router-link>
    </form>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/UserAuthStore"; // Pinia 스토어 경로를 수정하세요

export default {
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const errors = ref(null);
    const router = useRouter();
    const authStore = useAuthStore(); // Pinia 스토어 가져오기

    const register = async () => {
      try {
        // Pinia 스토어의 register 액션 호출
        await authStore.register({
          username: username.value,
          email: email.value,
          password: password.value,
        });
        router.push({ name: "Home" }); // 회원가입 성공 시 홈으로 이동
      } catch (err) {
        // 에러 처리
        errors.value = err.response?.data?.errors || [
          "An unexpected error occurred.",
        ];
      }
    };

    return {
      username,
      email,
      password,
      errors,
      register,
    };
  },
};
</script>

<style scoped></style>
