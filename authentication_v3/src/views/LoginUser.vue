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

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const error = ref(null);
    const store = useStore();
    const router = useRouter();
    const login = async () => {
      try {
        await store.dispatch("login", {
          username: username.value,
          password: password.value,
        });
        router.push({ name: "dashboard" });
      } catch (err) {
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
