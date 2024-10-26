<script setup lang="ts">
import CloseIcon from "../icons/CloseIcon.vue";
import UiButton from "./UiButton.vue";

import { useShowModal } from "@/stores/showModal";

const props = defineProps<{ isNoteModal?: boolean }>();

const modal = useShowModal();
</script>

<template>
  <div class="modal-wrapper" :class="{ inactive: modal.showModal }">
    <div class="modal" :class="{ 'note-modal-wrapper': props.isNoteModal }">
      <UiButton class="close-btn" @click="modal.toggleShowModal">
        <CloseIcon />
      </UiButton>
      <slot />
      <!-- <component :is="modalComponentStore.modalComponent" /> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-wrapper {
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: var(--dark-opacity);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 34px 40px;
  animation: appearanceBackgroundModal 0.2s 1;

  @keyframes appearanceBackgroundModal {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .modal {
    position: relative;
    background-color: var(--dark-middle);
    border-radius: 40px;
    padding: 80px;
    max-width: calc(780px + 80px);
    width: 100%;
    animation: appearanceModal 0.4s 1;
    display: flex;
    flex-direction: column;
    font-size: var(--text-small-size);
    font-weight: var(--text-small-weight);
    color: var(--gray);

    @keyframes appearanceModal {
      from {
        transform: translateY(50px);
        opacity: 0;
        /*scale: 0;*/
      }
      to {
        transform: translateX(0);
        opacity: 1;
        /*scale: 1;*/
      }
    }

    .close-btn {
      position: absolute;
      padding: 24px 24px;
      top: 20px;
      right: 20px;
    }
  }
}

.inactive {
  display: none;
}
</style>
