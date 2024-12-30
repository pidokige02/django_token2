<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link v-if="loggedIn" to="/dashboard">Dashboard</router-link>
    <router-link v-if="!loggedIn" to="/login" class="button">
      Login
    </router-link>
    <button v-else type="button" class="logoutButton" @click="logout">
      Logout
    </button>
  </div>
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

<style lang="scss" scoped>
#nav {
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 0.2em 1em;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
}

.nav-welcome {
  margin-left: auto;
  margin-right: 1rem;
  color: white;
}

a {
  font-weight: bold;
  color: #2c3e50;
  margin: auto 0.8em auto 0.4em;
  text-decoration: none;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
}

.router-link-exact-active {
  color: white;
  border-bottom: 2px solid #fff;
}

button,
.button {
  margin-left: auto;
  background: white;
  text-decoration: none;
  color: #2c3e50;

  &.router-link-active {
    color: #2c3e50;
  }
}

.logoutButton {
  cursor: pointer;
}

.nav-welcome + button {
  margin-left: 0;
}
</style>
