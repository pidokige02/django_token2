<template>
  <v-app-bar app color="teal" dark>
    <v-btn to="/" text>Home</v-btn>
    <v-spacer></v-spacer>
    <v-btn v-if="loggedIn" to="/dashboard" text>Dashboard</v-btn>
    <v-btn v-if="!loggedIn" to="/login" text>Login</v-btn>
    <v-btn v-else text @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script>
import { useAuthComputed } from "../store/helpers.js"; // Composition 함수 경로
import { useAuthStore } from "../store/UserAuthStore"; // Pinia 스토어 경로를 수정하세요

export default {
  setup() {
    const { loggedIn } = useAuthComputed(); // 헬퍼 함수에서 loggedIn getter 가져오기
    const authStore = useAuthStore(); // Pinia 스토어 가져오기

    const logout = () => {
      authStore.logout(); // Pinia의 logout 액션 호출
    };

    return {
      loggedIn,
      logout,
    };
  },
};
</script>

<style scoped>
/* Vuetify에서 app-bar와 버튼을 사용하므로 추가적인 스타일링은 필요하지 않습니다. */
</style>
