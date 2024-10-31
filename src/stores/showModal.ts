import { ref } from "vue";
import { defineStore } from "pinia";

export const useShowModal = defineStore("showModal", () => {
  const showModal = ref(false);

  const toggleShowModal = () => (showModal.value = !showModal.value);

  return { showModal, toggleShowModal };
});
