import { useState, useEffect } from "react";
import getNotes from "../services/api/notes/getNotes";
import { formatNotes } from "../utils/formatters";
import { sortNotes } from "../utils/helpers";
import { Note } from "../types/Notes";

const useGetNotes = () => {
  const [data, setData] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      setError(undefined);

      const response = await getNotes();

      if (!response.ok) {
        throw new Error("Error fetching notes...");
      }

      const notesData = await response.json();
      const formattedNotes = formatNotes(notesData);
      const sortedNotes = sortNotes(formattedNotes);

      setData(sortedNotes);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return { data, isLoading, error };
};

export default useGetNotes;
