<template>
  <v-app>
    <v-container>
      <div id="nav">
        <!-- Home 링크 -->
        <v-btn to="/" text>Home</v-btn>

        <!-- Dashboard 링크 (로그인 상태일 때) -->
        <v-btn v-if="loggedIn" to="/dashboard" text>Dashboard</v-btn>

        <!-- 로그인 버튼 (로그인 안 된 상태일 때) -->
        <v-btn v-if="!loggedIn" to="/login" class="button" color="primary">
          Login
        </v-btn>

        <!-- 로그아웃 버튼 (로그인 상태일 때) -->
        <v-btn
          v-else
          type="button"
          class="logoutButton"
          @click="logout"
          color="red"
        >
          Logout
        </v-btn>
      </div>
    </v-container>
  </v-app>
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
