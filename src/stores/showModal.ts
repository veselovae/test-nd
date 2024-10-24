import { ref } from "vue";
import { defineStore } from "pinia";

export const useShowModal = defineStore("showModal", () => {
  const showModal = ref(true);

  const toggleShowModal = () => (showModal.value = !showModal.value);

  return { showModal, toggleShowModal };
});
