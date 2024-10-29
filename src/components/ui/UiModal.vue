<script setup lang="ts">
import CloseIcon from "../icons/CloseIcon.vue";
import UiButton from "./UiButton.vue";

import { useShowModal } from "@/stores/showModal";

const props = defineProps<{ isNoteModal?: boolean }>();
const emit = defineEmits(["checkModalComponent"]);

const modal = useShowModal();
</script>

<template>
  <div class="modal-wrapper" :class="{ inactive: modal.showModal }">
    <div class="modal" :class="{ 'note-modal-wrapper': props.isNoteModal }">
      <UiButton class="close-btn" @click="emit('checkModalComponent')">
        <CloseIcon />
      </UiButton>
      <slot />
      <!-- <component :is="modalComponentStore.modalComponent" /> -->
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
