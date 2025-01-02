<template>
  <v-container class="home text-center">
    <v-row>
      <v-col cols="12">
        <h1>Welcome to the App!</h1>
      </v-col>
    </v-row>
    <v-row v-if="!loggedIn" justify="center">
      <v-col cols="12" md="8">
        <p>
          To use this app you'll need to
          <v-btn :to="{ path: '/login' }" color="primary" text> Login </v-btn>
          or
          <v-btn :to="{ path: '/register' }" color="primary" text>
            Register
          </v-btn>
        </p>
      </v-col>
    </v-row>
  </v-container>
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

<style scoped>
.home {
  margin-top: 20px;
}
</style>
