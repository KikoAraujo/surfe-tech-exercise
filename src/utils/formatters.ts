import { RawNote } from "../types/Notes";

export const getNewDate = () => {
  const newDate = new Date();
  const formattedDate = newDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formattedDate;
};

export const formatNotes = (notes: RawNote[]) => {
  return notes.map((noteData: RawNote) => {
    return { id: noteData.id, ...JSON.parse(noteData.body) };
  });
};
