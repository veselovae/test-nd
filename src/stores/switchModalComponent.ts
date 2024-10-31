import LoginModal from "@/components/modal/LoginModal.vue";
import type { Component } from "vue";

import { shallowRef } from "vue";
import { defineStore } from "pinia";

export const useSwitchModalComponent = defineStore(
  "switchModalComponent",
  () => {
    const modalComponent = shallowRef<Component>(LoginModal);

    const switchModalComponent = (component: Component) =>
      (modalComponent.value = component);

    return { modalComponent, switchModalComponent };
  }
);
