import NoteComponent from "../components/Shared/Notes/NoteComponent";
import DefaultButton from "../components/Shared/Buttons/DefaultButton";
import { Icons } from "../components/Icons";
import { getNewDate } from "../utils/formatters";
import { useEffect, useState } from "react";
import { Note } from "../types/Notes";
import { useDebounce } from "../hooks/utils/useDebounce";
import putNote from "../services/api/notes/putNote";
import NoDataComponent from "../components/Layout/StatusComponents/NoDataComponent";
import useGetNotes from "../hooks/notes/useGetNotes";
import useGetUsers from "../hooks/users/useGetUsers";
import { useCreateNote } from "../hooks/notes/useCreateNote";
import ErrorComponent from "../components/Layout/StatusComponents/ErrorComponent";
import LoadingComponent from "../components/Layout/StatusComponents/LoadingComponent";
import { useUpdateNote } from "../hooks/notes/useUpdateNote";

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

  const { updateNote } = useUpdateNote();

  useEffect(() => {
    setNotes(data);
  }, [data]);

  const createNewNoteHandler = async () => {
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
  const [noteToUpdate, setNoteToUpdate] = useState<{
    id: number;
    field: "title" | "text";
    value: string;
  } | null>(null);
  const debouncedNoteToUpdate = useDebounce(noteToUpdate, 1000);

  useEffect(() => {
    if (debouncedNoteToUpdate) {
      const { id, field, value } = debouncedNoteToUpdate;

      const changedNote = notes.find((note) => note.id === id);
      if (!changedNote) return;

      changedNote[field] = value;

      updateNote(changedNote);
    }
  }, [debouncedNoteToUpdate, notes]);

  const handleContentChange = (
    id: number,
    field: "title" | "text",
    value: string
  ) => {
    setNoteToUpdate({ id, field, value });

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, [field]: value } : note
      )
    );
  };

  return (
    <div className={notes.length > 6 ? "h-full" : "h-screen"}>
      {notes.length === 0 ? null : (
        <div className="sticky top-10 ml-10">
          <div className="absolute">
            {/* Create Note Button */}
            <DefaultButton
              text="Add Note"
              className="bg-surfe-dark-blue text-neutral-50"
              icon={{
                position: "left",
                iconElement: Icons.plus("h-4 w-4", "#fafafa"),
              }}
              disabled={postLoading}
              onClick={createNewNoteHandler}
            />
          </div>
        </div>
      )}
      <div
        className={`flex flex-wrap items-center justify-center h-full gap-10 py-10 px-20 lg:px-44 ${
          notesLoading || usersLoading || notesError || usersError
            ? "h-screen"
            : "h-full"
        }`}
      >
        {notesError || usersError ? (
          <ErrorComponent />
        ) : notesLoading || usersLoading ? (
          <LoadingComponent />
        ) : notes.length === 0 ? (
          <NoDataComponent
            title="It looks like you don't have any notes yet..."
            subTitle={
              <>
                Click{" "}
                <span
                  data-testid="create_first_note_button"
                  className="text-surfe-pink font-bold cursor-pointer hover:underline"
                  onClick={createNewNoteHandler}
                >
                  here
                </span>{" "}
                to create your first note!!
              </>
            }
          />
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
