<script setup lang="ts">
import NotesHeader from "./NotesHeader.vue";
import UiButton from "@/components/ui/UiButton.vue";
import AddIcon from "@/components/icons/AddIcon.vue";
import UiNotesModal from "@/components/ui/UiNotesModal.vue";
import UiNote from "@/components/ui/UiNote.vue";

import { useShowModal } from "@/stores/showModal";
import { useNotes } from "@/stores/notes";
import { useUser } from "@/stores/user";

import { onBeforeMount, onMounted } from "vue";
import { getCookie } from "@/functions/cookieFunctions";
import { getRequest } from "@/functions/requests";

import { useRouter } from "vue-router";

const modalStore = useShowModal();
const notesStore = useNotes();
const userStore = useUser();

const router = useRouter();

const checkAuth = async () => {
  const responseJson = await getRequest("auth", "get", {
    Authorization: "Bearer " + getCookie("token"),
  });

  return responseJson.email;
};

const deleteNote = async (id: number) => {
  const path = "notes/" + id;
  await getRequest(path, "delete", {
    Authorization: "Bearer " + getCookie("token"),
  });
  notesStore.deleteNote(id);
};

onBeforeMount(() => {
  const isToken = getCookie("token");
  if (!isToken) {
    router.push("/");
  }
});

onMounted(async () => {
  modalStore.showModal = false;
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

    <UiNotesModal class="create-note-modal" />

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
    <UiButton
      class="add-note-btn"
      @click="modalStore.toggleShowModal"
      title="Добавить заметку"
    >
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto-fill;
  gap: 40px;
  align-items: start;

  @media (max-width: 1566px) {
    gap: 20px;
    padding: 40px 80px;
  }

  @media (max-width: 1367px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 962px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 800px) {
    padding: 30px;
  }

  @media (max-width: 557px) {
    padding: 20px;
  }
}
</style>
