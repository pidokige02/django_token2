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
import { useStore } from "vuex";
export default {
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const errors = ref(null);
    const router = useRouter();
    const store = useStore();
    const register = async () => {
      try {
        await store.dispatch("register", {
          username: username.value,
          email: email.value,
          password: password.value,
        });
        router.push({ name: "Home" });
      } catch (err) {
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
