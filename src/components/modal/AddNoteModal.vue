<script setup lang="ts">
import UiTextField from "../ui/UiTextField.vue";
import UiTextareaField from "../ui/UiTextareaField.vue";
import UiButton from "../ui/UiButton.vue";

import { useNotes } from "@/stores/notes";
import { useShowModal } from "@/stores/showModal";
import { onBeforeUnmount, ref, watch } from "vue";

import { v4 as uuid } from "uuid";

const notesStore = useNotes();
const modalStore = useShowModal();

const newNote = ref({
  id: "",
  name: "",
  text: "",
});

const errorName = ref<boolean>(false);
const errorText = ref<boolean>(false);

const resetNewNote = (note) => {
  note.value.name = "";
  note.value.text = "";
  note.value.id = "";
};
const addNewNote = (note) => {
  if (!newNote.value.name) {
    errorName.value = true;
  }
  if (!newNote.value.text) {
    errorText.value = true;
  } else {
    newNote.value.id = uuid();
    notesStore.addNote({ ...note });
    resetNewNote(newNote);
    modalStore.toggleShowModal();
  }
};

watch(
  () => newNote.value.name,
  (newVal, oldVal) => {
    if (oldVal === "" && newVal !== "") {
      errorName.value = false;
    }
  }
);

watch(
  () => newNote.value.text,
  (newVal, oldVal) => {
    if (oldVal === "" && newVal !== "") {
      errorText.value = false;
    }
  }
);

watch(
  () => modalStore.showModal,
  () => {
    if (!modalStore.showModal) {
      errorName.value = false;
      errorText.value = false;
    }
  }
);

onBeforeUnmount(() => {
  errorName.value = false;
  errorText.value = false;
});
</script>

<template>
  <div class="add-note-modal">
    <h2>Добавление заметки</h2>

    <div class="inputs-box">
      <UiTextField
        placeholder="Текст заметки"
        v-model.trim="newNote.name"
        maxlength="100"
        :error="errorName"
        :length="newNote.name.length"
        :charBox="true"
      >
        Название заметки
        <template v-slot:errorText>Поле не может быть пустым</template>
      </UiTextField>
      <UiTextareaField
        placeholder="Введите текст"
        v-model.trim="newNote.text"
        maxlength="500"
        :error="errorText"
        :length="newNote.text.length"
        :charBox="true"
      >
        Текст заметки
      </UiTextareaField>
    </div>

    <div class="add-btn-wrapper">
      <UiButton class="add-note-btn" @click="addNewNote(newNote)">
        Добавить
      </UiButton>
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
