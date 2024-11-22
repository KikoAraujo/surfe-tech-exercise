import { useState, useEffect, useCallback } from "react";
import getNotes from "../services/api/notes/getNotes";
import { formatNotes } from "../utils/formatters";
import { sortData } from "../utils/helpers";
import { Note } from "../types/Notes";

const useGetNotes = () => {
  const [data, setData] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchNotes = useCallback(async () => {
    try {
      setError(undefined);

      const response = await getNotes();

      if (!response.ok) {
        throw new Error("Error fetching notes...");
      }

      const notesData = await response.json();
      const formattedNotes = formatNotes(notesData);
      const sortedNotesByDate = sortData(formattedNotes, "updated_at", true);
      const sortedNotesPinned = sortData(sortedNotesByDate, "pinned");

      setData(sortedNotesPinned);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { data, loading, error, refetch: fetchNotes };
};

export default useGetNotes;
