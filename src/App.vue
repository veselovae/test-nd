<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="app-wrapper">
    <RouterView />
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
