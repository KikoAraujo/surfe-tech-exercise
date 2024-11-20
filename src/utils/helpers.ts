import { Note } from "../types/Notes";

export const sortNotes = (notes: Note[]) => {
  return notes.sort((note_a: Note, note_b: Note) => {
    const dateA = new Date(note_a.updated_at);
    const dateB = new Date(note_b.updated_at);

    return dateB.getTime() - dateA.getTime();
  });
};
