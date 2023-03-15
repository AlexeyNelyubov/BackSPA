import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const logIn = ref(false);
  const user = ref({});

  return { logIn, user };
});
