<script setup lang="ts">
import WelcomePage from "./components/pages/WelcomePage/WelcomePage.vue";
import UiModal from "./components/ui/UiModal.vue";

import { useShowModal } from "@/stores/showModal";

const isModal = useShowModal();
</script>

<template>
  <div class="app-wrapper">
    <UiModal :class="{ inactive: isModal.showModal }" />
    <WelcomePage />
  </div>
</template>

<style scoped>
.app-wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: var(--dark);
  display: flex;
  justify-content: center;
}
</style>
