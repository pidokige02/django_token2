import { computed } from "vue";
import { useStore } from "vuex";

export function useAuthComputed() {
  const store = useStore();
  const loggedIn = computed(() => store.getters.loggedIn);

  return {
    loggedIn,
  };
}
