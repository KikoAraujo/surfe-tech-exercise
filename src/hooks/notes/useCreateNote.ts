import { useState, useCallback } from "react";
import postNote from "../../services/api/notes/postNote";

export const useCreateNote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNote = useCallback(
    async (newNoteBody: {
      title: string;
      text: string;
      updated_at: string;
    }) => {
      try {
        setLoading(true);
        setError(null);

        const formattedBody = JSON.stringify(newNoteBody);

        await postNote(formattedBody);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { createNote, loading, error };
};
