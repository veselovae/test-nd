<script setup lang="ts">
import UiButton from "../../ui/UiButton.vue";
import LoginIcon from "../../icons/LoginIcon.vue";
import LogoIcon from "../../icons/LogoIcon.vue";

import { useShowModal } from "@/stores/showModal";

const modal = useShowModal();
</script>

<template>
  <header>
    <div class="logo">
      <LogoIcon />
    </div>

    <UiButton class="login-btn" @click="modal.toggleShowModal">
      <LoginIcon />
      Вход
    </UiButton>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 160px;
  padding-right: 160px;
  height: 136px;
}

.login-btn {
  gap: 12px;
}
</style>
