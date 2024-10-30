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
      <LogoIcon class="logo" />
    </div>

    <UiButton class="login-btn" @click="modal.toggleShowModal">
      <LoginIcon />
      Вход
    </UiButton>
  </header>
</template>

<style scoped lang="scss">
header {
  position: relative;
  z-index: 900;
  background-color: var(--dark);

  .login-btn {
    gap: 12px;
  }

  .logo {
    @media (orientation: portrait) and (max-width: 501px) {
      width: 154px;
    }
  }
}
</style>
