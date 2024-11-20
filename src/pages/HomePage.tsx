import { useState } from "react";
import Note, { NoteProps } from "../components/Layout/Note";

const HomePage = () => {
  const [notes, setNotes] = useState<NoteProps[]>([
    {
      id: 0,
      title: "New note",
      text: "New note text",
    },
    {
      id: 1,
      title: "New note 2",
      text: "New note text 2",
    },
  ]);

  return (
    <div className="flex items-center justify-center h-full gap-10">
      {notes.map((note) => (
        <Note key={note.id} {...note} />
      ))}
    </div>
  );
};

export default HomePage;
