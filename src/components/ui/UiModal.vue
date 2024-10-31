<script setup lang="ts">
import CloseIcon from "../icons/CloseIcon.vue";
import UiButton from "./UiButton.vue";

import { useShowModal } from "@/stores/showModal";

const emit = defineEmits(["checkModalComponent"]);

const modal = useShowModal();
</script>

<template>
  <div class="modal-wrapper" :class="{ inactive: !modal.showModal }">
    <div class="modal">
      <UiButton
        class="close-btn"
        @click="emit('checkModalComponent')"
        title="Закрыть"
      >
        <CloseIcon />
      </UiButton>
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
