import { ref } from "vue";
import { defineStore } from "pinia";

interface INote {
  id: number;
  name: string;
  text: string;
}

export const useNotes = defineStore("notes", () => {
  const notes = ref<INote[] | []>([]);

  const addNote = (newNote: INote) => notes.value.push(newNote);
  const deleteNote = (id: number) => {
    notes.value.splice(
      notes.value.findIndex((note) => note.id === id),
      1
    );
  };

  return { notes, addNote, deleteNote };
});
