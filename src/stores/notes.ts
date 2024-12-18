import { ref } from "vue";
import { defineStore } from "pinia";

import { type INote } from "@/interfaces/requests";

export const useNotes = defineStore("notes", () => {
  const notes = ref<INote[]>([]);

  const addNote = (newNote: INote) => notes.value.push(newNote);
  const deleteNote = (id: number) => {
    notes.value.splice(
      notes.value.findIndex((note) => note.id === id),
      1
    );
  };

  const setNotes = (uploadedNotes: INote[]) => {
    notes.value = uploadedNotes;
  };

  return { notes, addNote, deleteNote, setNotes };
});
