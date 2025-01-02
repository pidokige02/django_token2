<template>
  <v-container class="login-container" justify="center" align="center">
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-title class="text-h5 text-center"> Login </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="username"
                label="Username"
                outlined
                dense
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                outlined
                dense
                required
              ></v-text-field>
              <v-btn type="submit" color="primary" block large> Login </v-btn>
              <v-alert v-if="error" type="error" dense class="mt-3">
                {{ error }}
              </v-alert>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <router-link to="/register">
              <v-btn text> Don't have an account? Register. </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/UserAuthStore"; // Pinia 스토어 경로를 수정하세요

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const error = ref(null);
    const router = useRouter();
    const authStore = useAuthStore(); // Pinia 스토어 가져오기

    const login = async () => {
      try {
        // Pinia의 login 액션 호출
        await authStore.login({
          username: username.value,
          password: password.value,
        });
        router.push({ name: "dashboard" }); // 성공 시 대시보드로 이동
      } catch (err) {
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

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
