import NoteComponent from "../components/Layout/NoteComponent";
import Button from "../components/Buttons";
import { Icons } from "../components/Icons";
import { getNewDate } from "../utils/formatters";
import useGetNotes from "../hooks/useGetNotes";
import { useCreateNote } from "../hooks/useCreateNote";
import ErrorComponent from "../components/Layout/ErrorComponent";
import LoadingComponent from "../components/Layout/LoadingComponent";
import { useEffect, useState } from "react";
import { Note } from "../types/Notes";
import { useDebounce } from "../hooks/useDebounce";
import putNote from "../services/api/notes/putNote";
import useGetUsers from "../hooks/useGetUsers";

const HomePage = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const {
    data,
    refetch: refetchNotes,
    loading: notesLoading,
    error: notesError,
  } = useGetNotes();

  const {
    data: users,
    loading: usersLoading,
    error: usersError,
  } = useGetUsers();

  const {
    createNote,
    loading: postLoading,
    error: postNoteError,
  } = useCreateNote();

  useEffect(() => {
    setNotes(data);
  }, [data]);

  const handleClick = async () => {
    const updatedAt = getNewDate();
    const newNoteBody = {
      title: "New Note",
      text: "",
      updated_at: updatedAt,
    };
    await createNote(newNoteBody);
    await refetchNotes();
  };

  // Update note after stop typing for 1sec
  const [updateNote, setUpdateNote] = useState<{
    id: number;
    field: "title" | "text";
    value: string;
  } | null>(null);
  const debouncedNoteToUpdate = useDebounce(updateNote, 1000);

  useEffect(() => {
    if (debouncedNoteToUpdate) {
      const { id, field, value } = debouncedNoteToUpdate;

      const updateNote = async () => {
        try {
          const noteToUpdate = notes.find((note) => note.id === id);

          if (!noteToUpdate) return;

          noteToUpdate[field] = value;
          const updatedAt = getNewDate();
          const newNoteBody = {
            title: noteToUpdate.title,
            text: noteToUpdate.text,
            updated_at: updatedAt,
          };
          const formattedBody = JSON.stringify(newNoteBody);

          await putNote(id, formattedBody);
        } catch (error) {
          console.error("Error updating note", error);
        }
      };

      updateNote();
    }
  }, [debouncedNoteToUpdate, notes]);

  const handleContentChange = (
    id: number,
    field: "title" | "text",
    value: string
  ) => {
    setUpdateNote({ id, field, value });

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, [field]: value } : note
      )
    );
  };

  return (
    <div className={notes.length > 6 ? "h-full" : "h-screen"}>
      <div className="sticky top-10 ml-10">
        <div className="absolute">
          {/* Create Note Button */}
          <Button
            text="Add note"
            className="bg-surfe-dark-blue text-neutral-50"
            icon={{
              position: "left",
              iconElement: Icons.plus("h-4 w-4", "#fafafa"),
            }}
            disabled={postLoading}
            onClick={handleClick}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center h-full gap-10 py-10 px-20 lg:px-44">
        {notesError || usersError ? (
          <ErrorComponent />
        ) : notesLoading || usersLoading ? (
          <LoadingComponent />
        ) : (
          notes.map((note) => (
            <NoteComponent
              key={note.id}
              {...note}
              handleContentChange={handleContentChange}
              users={users}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
