<script setup lang="ts">
import NotesHeader from "./NotesHeader.vue";
import UiButton from "@/components/ui/UiButton.vue";
import AddIcon from "@/components/icons/AddIcon.vue";
import UiNotesModal from "@/components/ui/UiNotesModal.vue";
import UiNote from "@/components/ui/UiNote.vue";

import { useShowModal } from "@/stores/showModal";
import { useNotes } from "@/stores/notes";

const modalStore = useShowModal();
const notesStore = useNotes();
</script>

<template>
  <div class="notes-page-wrapper page-wrapper">
    <NotesHeader />

    <UiButton class="add-note-btn" @click="modalStore.toggleShowModal">
      <AddIcon />
    </UiButton>
    <UiNotesModal class="create-note-modal" :isNoteModal="true" />

    <div class="notes-wrapper">
      <UiNote
        v-for="note of notesStore.notes"
        :key="note.name"
        :class="note.name"
        @deleteNote="notesStore.deleteNote(note.id)"
      >
        <template v-slot:name>{{ note.name }}</template>
        <template v-slot:text>{{ note.text }}</template>
      </UiNote>
    </div>
  </div>
</template>

<style scoped lang="scss">
.add-note-btn {
  position: absolute;
  bottom: 40px;
  right: 40px;
  padding: 24px;
  box-shadow: var(--shadow);
}

.notes-wrapper {
  padding: 40px 160px;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 40px;
}
</style>
