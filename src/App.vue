<script setup lang="ts">
// import WelcomePage from "./components/pages/WelcomePage/WelcomePage.vue";
// import NotesPage from "./components/pages/NotesPage/NotesPage.vue";

import { RouterView } from "vue-router";
</script>

<template>
  <div class="app-wrapper">
    <RouterView />
    <!-- <WelcomePage /> -->
    <!-- <NotesPage /> -->
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
