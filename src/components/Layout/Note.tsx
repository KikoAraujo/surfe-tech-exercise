import { Icons } from "../Icons";

export interface NoteProps {
  id: number;
  title: string;
  text: string;
  updated_at: string;
}

const Note = ({ id, title, text, updated_at }: NoteProps) => {
  return (
    <div className="bg-white w-72 h-60 rounded-lg shadow-lg px-3.5 py-2 flex flex-col gap-2">
      <div>
        <div className="flex items-center justify-between">
          {/* Editable Title */}
          <input
            id={`title_${id}`}
            className="font-semibold text-2xl outline-none transition w-full bg-transparent"
            value={title}
            onChange={(e) => {}}
          />
          <div className="cursor-pointer h-5 w-5 flex items-center justify-center">
            {Icons.thumbtack(
              "h-4 w-4 transition-all duration-300 ease-in-out hover:h-5 hover:w-5",
              "#D2D2D2"
            )}
          </div>
        </div>
        <p id={`updated_at_${id}`} className="text-xxs font-medium">
          Last update: {updated_at}
        </p>
      </div>
      {/* Editable Content */}
      <textarea
        id={`content_${id}`}
        className="text-sm font-medium outline-none w-full resize-none transition bg-transparent"
        value={text}
        onChange={(e) => {}}
        rows={5}
      />
    </div>
  );
};

export default Note;
