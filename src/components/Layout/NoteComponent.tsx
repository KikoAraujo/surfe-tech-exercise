import { Note } from "../../types/Notes";
import { Icons } from "../Icons";
import { User } from "../../types/Users";
import TextAreaWithMentions from "../Shared/TextAreaWithMentions";

interface NoteComponentProps extends Note {
  handleContentChange: (
    id: number,
    field: "title" | "text",
    value: string
  ) => void;
  users: User[];
}

const NoteComponent = ({
  id,
  title,
  text,
  updated_at,
  handleContentChange,
  users,
}: NoteComponentProps) => {
  return (
    <div className="bg-white w-72 h-60 rounded-lg shadow-xl px-3.5 py-2 flex flex-col gap-2">
      <div>
        <div className="flex items-center justify-between">
          {/* Editable Title */}
          <input
            className="font-semibold text-2xl outline-none transition w-full bg-transparent"
            value={title}
            onChange={(e) => {
              handleContentChange(id, "title", e.target.value);
            }}
          />
          <div className="cursor-pointer h-5 w-5 flex items-center justify-center">
            {Icons.thumbtack(
              "h-4 w-4 transition-all duration-300 ease-in-out hover:h-5 hover:w-5",
              "#D2D2D2"
            )}
          </div>
        </div>
        <p className="text-xxs font-medium">Last update: {updated_at}</p>
      </div>
      {/* Editable Content */}
      <TextAreaWithMentions
        handleContentChange={handleContentChange}
        users={users}
        id={id}
        title={title}
        text={text}
        updated_at={updated_at}
      />
    </div>
  );
};

export default NoteComponent;
