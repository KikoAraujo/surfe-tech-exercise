import NoteComponent from "../components/Layout/NoteComponent";
import Button from "../components/Buttons";
import { Icons } from "../components/Icons";
import { getNewDate } from "../utils/formatters";
import postNote from "../services/api/notes/postNote";
import useGetNotes from "../hooks/useGetNotes";

const HomePage = () => {
  const { data: notes, isLoading, error } = useGetNotes();

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
        {error ? (
          <p>Ups! Something went wrong...</p>
        ) : isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin">
              {Icons.ellipse("h-14 w-14", "#073742")}
            </div>
          </div>
        ) : (
          notes.map((note) => <NoteComponent key={note.id} {...note} />)
        )}
      </div>
    </>
  );
};

export default HomePage;
