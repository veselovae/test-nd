import LoginModal from "@/components/modal/LoginModal.vue";

import { shallowRef } from "vue";
import { defineStore } from "pinia";

export const useSwitchModalComponent = defineStore(
  "switchModalComponent",
  () => {
    const modalComponent = shallowRef(LoginModal);

    const switchModalComponent = (component) =>
      (modalComponent.value = component);

    return { modalComponent, switchModalComponent };
  }
);
