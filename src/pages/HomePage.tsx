import NoteComponent from "../components/Layout/NoteComponent";
import Button from "../components/Buttons";
import { Icons } from "../components/Icons";
import { getNewDate } from "../utils/formatters";
import useGetNotes from "../hooks/useGetNotes";
import { useCreateNote } from "../hooks/useCreateNote";
import ErrorComponent from "../components/Layout/ErrorComponent";
import LoadingComponent from "../components/Layout/LoadingComponent";

const HomePage = () => {
  const {
    data: notes,
    refetch: refetchNotes,
    loading: getLoading,
    error: getNotesError,
  } = useGetNotes();

  const {
    createNote,
    loading: postLoading,
    error: postNoteError,
  } = useCreateNote();

  const handleClick = async () => {
    const updatedAt = getNewDate();
    const newNoteBody = { title: "New Note", text: "", updated_at: updatedAt };
    await createNote(newNoteBody);
    await refetchNotes();
  };

  return (
    <div className={notes.length > 6 ? "h-full" : "h-screen"}>
      <div className="sticky top-10 ml-10">
        <div className="absolute">
          {/* Create Note Button */}
          <Button
            text="Add note"
            className="bg-surfe-darkBlue text-neutral-50"
            icon={{
              position: "left",
              iconElement: Icons.plus("h-4 w-4", "#fafafa"),
            }}
            onClick={handleClick}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center h-full gap-10 py-10 px-20 lg:px-44">
        {getNotesError ? (
          <ErrorComponent />
        ) : getLoading ? (
          <LoadingComponent />
        ) : (
          notes.map((note) => <NoteComponent key={note.id} {...note} />)
        )}
      </div>
    </div>
  );
};

export default HomePage;
