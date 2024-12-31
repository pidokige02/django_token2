import { computed } from "vue";
import { useAuthStore } from "../store/UserAuthStore"; // Pinia 스토어 경로를 수정하세요

export function useAuthComputed() {
  const authStore = useAuthStore();
  const loggedIn = computed<boolean>(() => authStore.loggedIn);

  return {
    loggedIn,
  };
}
