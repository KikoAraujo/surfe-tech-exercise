import { useCallback } from "react";
import putNote from "../../services/api/notes/putNote";
import { Note } from "../../types/Notes";
import { getNewDate } from "../../utils/formatters";

export const useUpdateNote = () => {
  const updateNote = useCallback(async (note: Note) => {
    try {
      const updatedAt = getNewDate();
      const newNoteBody = {
        title: note.title,
        text: note.text,
        updated_at: updatedAt,
      };
      const formattedBody = JSON.stringify(newNoteBody);

      await putNote(note.id, formattedBody);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  }, []);

  return { updateNote };
};
