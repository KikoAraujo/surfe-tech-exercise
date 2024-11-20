import { useEffect, useState } from "react";
import Note, { NoteProps } from "../components/Layout/Note";
import Button from "../components/Buttons";
import { Icons } from "../components/Icons";
import { getNewDate } from "../utils/formatters";
import postNote from "../services/api/notes/postNote";
import getNotes from "../services/api/notes/getNotes";

const HomePage = () => {
  const [notes, setNotes] = useState<NoteProps[]>([]);

  const getNotesData = async () => {
    try {
      const response = await getNotes();

      if (!response.ok) {
        throw new Error("Error fecthing notes...");
      }

      const notesData = await response.json();
      const formattedNotes = notesData.map(
        (noteData: { id: number; body: string }) => {
          return { id: noteData.id, ...JSON.parse(noteData.body) };
        }
      );

      setNotes(formattedNotes);
    } catch {
      console.log("Error fecthing notes...");
    }
  };

  useEffect(() => {
    getNotesData();
  }, []);

  return (
    <>
      <div className="sticky top-10 ml-10">
        <div className="absolute">
          <Button
            text="Add note"
            className="bg-surfe-darkBlue text-neutral-50"
            icon={{
              position: "left",
              iconElement: Icons.plus("h-4 w-4", "#fafafa"),
            }}
            onClick={() => {
              const updatedAt = getNewDate();
              const newNoteBody = {
                title: "New Note",
                text: "",
                updated_at: updatedAt,
              };
              const formattedBody = JSON.stringify(newNoteBody);

              postNote(formattedBody);
            }}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center h-full gap-10 py-10 px-20 lg:px-40">
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
