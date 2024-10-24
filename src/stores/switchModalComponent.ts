import LoginModal from "@/components/modal/LoginModal.vue";

import { ref } from "vue";
import { defineStore } from "pinia";

export const useSwitchModalComponent = defineStore(
  "switchModalComponent",
  () => {
    const modalComponent = ref(LoginModal);

    const switchModalComponent = (component) =>
      (modalComponent.value = component);

    return { modalComponent, switchModalComponent };
  }
);
