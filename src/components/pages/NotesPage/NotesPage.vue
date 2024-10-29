<script setup lang="ts">
import NotesHeader from "./NotesHeader.vue";
import UiButton from "@/components/ui/UiButton.vue";
import AddIcon from "@/components/icons/AddIcon.vue";
import UiNotesModal from "@/components/ui/UiNotesModal.vue";
import UiNote from "@/components/ui/UiNote.vue";

import { useShowModal } from "@/stores/showModal";
import { useNotes } from "@/stores/notes";
import { useUser } from "@/stores/user";

import { onMounted } from "vue";
import { getCookie } from "@/functions/cookieFunctions";
import { getRequest } from "@/functions/requests";

const modalStore = useShowModal();
const notesStore = useNotes();
const userStore = useUser();

// TODO: rewrite this checkAuth func with getRequest func
const checkAuth = async (): Promise<string> => {
  const response = await fetch("https://dist.nd.ru/api/auth", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
  });
  const responseJson = await response.json();
  return responseJson.email;
};

const deleteNote = async (id: number) => {
  const path = "notes/" + id;
  await getRequest(path, "delete", {
    Authorization: "Bearer " + getCookie("token"),
  });
  notesStore.deleteNote(id);
};

onMounted(async () => {
  const user = await checkAuth();
  userStore.changeUser(user);
  const responseJson = await getRequest("notes", "get", {
    Authorization: "Bearer " + getCookie("token"),
  });
  notesStore.setNotes(responseJson);
});
</script>

<template>
  <div class="notes-page-wrapper page-wrapper">
    <NotesHeader />

    <UiNotesModal class="create-note-modal" :isNoteModal="true" />

    <div class="notes-wrapper">
      <UiNote
        v-for="note of notesStore.notes"
        :key="note.id"
        @deleteNote="deleteNote(note.id)"
      >
        <template v-slot:name>{{ note.title }}</template>
        <template v-slot:text>{{ note.content }}</template>
      </UiNote>
    </div>
    <UiButton class="add-note-btn" @click="modalStore.toggleShowModal">
      <AddIcon />
    </UiButton>
  </div>
</template>

<style scoped lang="scss">
.add-note-btn {
  position: sticky;
  margin-left: auto;
  width: max-content;
  bottom: 40px;
  right: 40px;
  padding: 24px;
  box-shadow: var(--shadow);
}

.notes-wrapper {
  padding: 40px 160px;
  min-height: calc(100vh - 136px - 40px * 2);
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 40px;
}
</style>
