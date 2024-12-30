<template>
  <div class="home">
    <h1>Welcome to the App!</h1>
    <div v-if="!loggedIn">
      To use this app you'll need to
      <router-link to="/login">Login</router-link>
      or
      <router-link to="/register">Register</router-link>
    </div>
  </div>
</template>

<script>
import { useAuthComputed } from "../store/helpers.js"; // 경로를 실제 파일 위치에 맞게 수정하세요.

export default {
  setup() {
    const { loggedIn } = useAuthComputed();

    return {
      loggedIn,
    };
  },
};
</script>
