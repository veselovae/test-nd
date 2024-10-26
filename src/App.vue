<script setup lang="ts">
import WelcomePage from "./components/pages/WelcomePage/WelcomePage.vue";
import NotesPage from "./components/pages/NotesPage/NotesPage.vue";
// import UiModal from "./components/ui/UiModal.vue";

// // import { useShowModal } from "@/stores/showModal";
// import { useSwitchModalComponent } from "./stores/switchModalComponent";

// // const isModal = useShowModal();
// const modalComponentStore = useSwitchModalComponent();
</script>

<template>
  <div class="app-wrapper">
    <!-- <UiModal>
      <component :is="modalComponentStore.modalComponent" />
    </UiModal> -->
    <!-- <WelcomePage /> -->
    <NotesPage />
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
