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

      <span class="note-plug note-wrapper" style="background-color: white">
        sdfv
      </span>
      <span class="note-plug note-wrapper" style="background-color: white">
        sdfv
      </span>
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

  @media (max-width: 1566px) {
    gap: 20px;
    padding: 40px 80px;
  }

  .note-plug {
    max-width: 1053.34px;
  }
}

.notes-wrapper > * {
  flex: 1 1 50px;
}
</style>
