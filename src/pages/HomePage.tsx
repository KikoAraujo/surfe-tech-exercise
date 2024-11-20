import { useEffect, useState } from "react";
import Note, { NoteProps } from "../components/Layout/Note";
import Button from "../components/Buttons";
import { Icons } from "../components/Icons";
import { getNewDate } from "../utils/formatters";
import postNote from "../services/api/notes/postNote";

const HomePage = () => {
  const [notes, setNotes] = useState<NoteProps[]>([]);

  useEffect(() => {
    const dummyNotes = [
      {
        id: 0,
        title: "New note",
        text: "New note text",
        updated_at: "18 Apr, 2021",
      },
      {
        id: 1,
        title: "New note 2",
        text: "New note text 2",
        updated_at: "18 Apr, 2021",
      },
    ];

    setNotes(dummyNotes);
  }, []);

  return (
    <>
      <div className="absolute top-10 left-10">
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
      <div className="flex items-center justify-center h-full gap-10">
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
