import { useState } from "react";
import { Icons } from "../Icons";

export interface NoteProps {
  id: number;
  title: string;
  text: string;
}

const Note = ({ id, title, text }: NoteProps) => {
  return (
    <div className="bg-white w-72 min-h-60 rounded-lg shadow-lg px-3.5 py-2 flex flex-col gap-2">
      <div>
        <div className="flex items-center justify-between">
          {/* Editable Title */}
          <input
            id={`title_${id}`}
            className="font-semibold text-2xl outline-none transition w-full bg-transparent"
            value={title}
            onChange={(e) => {}}
          />
          <div className="cursor-pointer">{Icons.thumbtack()}</div>
        </div>
        <p id={`updated_at_${id}`} className="text-[11px] font-medium">
          Last update: 18 Apr, 2021
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
