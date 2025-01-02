import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";

export const useAuthStore = defineStore("userauth", {
  state: () => ({
    user: null,
  }),
  actions: {
    setUserData(userData) {
      this.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Authorization", userData.auth_token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Token ${userData.auth_token}`;
    },
    clearUserData() {
      this.user = null;
      localStorage.removeItem("user");
      location.reload();
    },
    async register(credentials) {
      try {
        const { data } = await axios.post(
          "//localhost:8000/api/v1/users/",
          credentials
        );
        this.setUserData(data);
      } catch (error) {
        console.error("Registration failed:", error);
        throw error;
      }
    },
    async login(credentials) {
      try {
        const { data } = await axios.post(
          "//localhost:8000/api/v1/token/login/",
          credentials
        );
        this.setUserData(data);
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    logout() {
      this.clearUserData();
    },
  },
  getters: {
    loggedIn: (state) => !!state.user,
  },
});
