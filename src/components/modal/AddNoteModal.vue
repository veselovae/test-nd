<script setup lang="ts">
import UiTextField from "../ui/UiTextField.vue";
import UiTextareaField from "../ui/UiTextareaField.vue";
import UiButton from "../ui/UiButton.vue";

import { useNotes } from "@/stores/notes";
import { useShowModal } from "@/stores/showModal";
import { ref, watch } from "vue";
import { getCookie } from "@/functions/cookieFunctions";
import { useRouter } from "vue-router";

import {
  getRequest,
  processRequestResults,
  resetFieldsValue,
} from "@/functions/requests";
import { type IRequestResults } from "@/interfaces/requests";
import { type INewNote } from "@/interfaces/modalFields";

const router = useRouter();

const notesStore = useNotes();
const modalStore = useShowModal();

const newNote = ref<INewNote>({
  title: "",
  content: "",
});

const addingNoteResults = ref<null | IRequestResults>(null);

const addNewNote = async () => {
  const jsonResponse = await getRequest(
    "notes",
    "post",
    { Authorization: "Bearer " + getCookie("token") },
    newNote.value
  );

  const filter = {
    title: ["заголовок"],
    content: ["содержимое"],
  };

  addingNoteResults.value = processRequestResults(jsonResponse, filter);

  if (addingNoteResults.value?.fulfilledValue?.id) {
    notesStore.addNote(addingNoteResults.value?.fulfilledValue);
    resetFieldsValue(newNote);
    modalStore.toggleShowModal();
  }

  if (addingNoteResults.value?.totalError === "Требуется авторизация") {
    resetFieldsValue(newNote);
    modalStore.toggleShowModal();
    router.push("/");
  }
};

watch(
  () => newNote.value.title,
  (newVal, oldVal) => {
    if (oldVal === "" && newVal !== "") {
      delete addingNoteResults.value?.filteredErrors?.title;
    }
  }
);

watch(
  () => newNote.value.content,
  (newVal, oldVal) => {
    if (oldVal === "" && newVal !== "") {
      delete addingNoteResults.value?.filteredErrors?.content;
    }
  }
);

watch(
  () => modalStore.showModal,
  () => {
    if (!modalStore.showModal) {
      resetFieldsValue(newNote);
      delete addingNoteResults.value?.filteredErrors?.title;
      delete addingNoteResults.value?.filteredErrors?.content;
    }
  }
);
</script>

<template>
  <div class="add-note-modal">
    <h2>Добавление заметки</h2>

    <div class="inputs-box">
      <UiTextField
        placeholder="Текст заметки"
        v-model.trim="newNote.title"
        maxlength="64"
        :error="addingNoteResults?.filteredErrors?.title"
        :length="newNote.title.length"
        :charBox="64"
      >
        Название заметки
      </UiTextField>
      <UiTextareaField
        placeholder="Введите текст"
        v-model.trim="newNote.content"
        maxlength="255"
        :error="addingNoteResults?.filteredErrors?.content"
        :length="newNote.content.length"
        :charBox="255"
      >
        Текст заметки
      </UiTextareaField>
    </div>

    <div class="add-btn-wrapper">
      <UiButton class="add-note-btn" @click="addNewNote"> Добавить </UiButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.add-btn-wrapper {
  text-align: -webkit-right;

  .add-note-btn {
    margin-top: 40px;
  }
}
</style>
