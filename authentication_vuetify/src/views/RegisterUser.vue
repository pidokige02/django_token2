<template>
  <v-container class="register-container" max-width="600px">
    <v-card>
      <v-card-title class="text-h5">Register</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register" ref="form" lazy-validation>
          <v-text-field
            v-model="username"
            label="Name"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            outlined
            required
          ></v-text-field>
          <v-btn type="submit" color="primary" class="mt-4"> Register </v-btn>
        </v-form>
        <ul v-if="errors && errors.length" class="error-list">
          <li v-for="(error, index) in errors" :key="index" class="error-item">
            {{ error }}
          </li>
        </ul>
        <v-btn text color="secondary" class="mt-4" to="/login">
          Already have an account? Login.
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
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

<style scoped>
.error-list {
  margin-top: 16px;
  padding: 0;
  list-style-type: none;
  color: red;
}
.error-item {
  margin-bottom: 8px;
}
</style>
