import { ref } from "vue";
import { defineStore } from "pinia";

export const useUser = defineStore("user", () => {
  const user = ref<string>("");

  const changeUser = (newUser: string) => (user.value = newUser);

  return { user, changeUser };
});
