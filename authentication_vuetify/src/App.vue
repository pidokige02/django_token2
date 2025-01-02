<template>
  <v-app>
    <app-nav />
    <v-main>
      <v-container class="page">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from "vue";
import AppNav from "./components/AppNav";

export default defineComponent({
  name: "App",
  components: {
    AppNav,
  },
});
</script>

<style lang="scss">
//@import "./assets/styles/global.scss";

.page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 56px); /* 헤더 높이를 제외한 화면 높이 설정 */
}
</style>
