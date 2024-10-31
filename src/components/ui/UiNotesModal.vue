<script setup lang="ts">
import CloseIcon from "../icons/CloseIcon.vue";
import UiButton from "./UiButton.vue";
import AddNoteModal from "@/components/modal/AddNoteModal.vue";

import { useShowModal } from "@/stores/showModal";

const modal = useShowModal();
</script>

<template>
  <div class="modal-wrapper" :class="{ inactive: !modal.showModal }">
    <div class="modal note-modal-wrapper">
      <UiButton class="close-btn" @click="modal.toggleShowModal">
        <CloseIcon />
      </UiButton>
      <AddNoteModal />
    </div>
  </div>
</template>
