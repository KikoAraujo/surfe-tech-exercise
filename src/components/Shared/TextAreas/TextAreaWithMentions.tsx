import { useEffect, useRef, useState } from "react";
import { Note } from "../../../types/Notes";
import { User } from "../../../types/Users";
import { moveCaretToEnd } from "../../../utils/helpers";

interface TextAreaWithMentionsProps extends Note {
  handleContentChange: (
    id: number,
    field: "title" | "text",
    value: string
  ) => void;
  users: User[];
}

const TextAreaWithMentions = ({
  id,
  text,
  handleContentChange,
  users,
}: TextAreaWithMentionsProps) => {
  const inputRef = useRef<HTMLDivElement>(null);

  const [mentionList, setMentionList] = useState<User[]>([]);
  const [isMentioning, setIsMentioning] = useState<boolean>(false);
  const [mentionListPosition, setMentionListPosition] = useState<{
    top: number;
    left: number;
    direction: "up" | "down";
  } | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.innerHTML = text;
    }
  }, [inputRef]);

  const handleInputChange = () => {
    // Find all spans with mentions
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = inputRef.current?.innerHTML || "";
    const mentionSpans = tempDiv.querySelectorAll("span.text-surfe-pink");

    let spaceInsideSpan = false;
    let deletingMention = false;
    mentionSpans.forEach((span) => {
      if (span.innerHTML.endsWith("&nbsp;")) {
        // Remove the space from inside the span
        span.innerHTML = span.innerHTML.replace("&nbsp;", "");

        // Insert a space after the span
        span.outerHTML = span.outerHTML + "&nbsp;";

        spaceInsideSpan = true;
      } else if (
        users.filter(
          (user) => user.username === span.textContent?.replace("@", "")
        ).length === 0
      ) {
        // Remove mention
        span.outerHTML = span.textContent || "";

        deletingMention = true;
      }
    });

    if (inputRef.current && (spaceInsideSpan || deletingMention)) {
      inputRef.current.innerHTML = tempDiv.innerHTML;

      moveCaretToEnd(inputRef.current);
    }

    const value = tempDiv.innerHTML;

    // Check if @ was typed
    const lastAtIndex = value.lastIndexOf("@");
    if (lastAtIndex !== -1) {
      calculateMentionListPosition();
      const mentionQuery = value.slice(lastAtIndex + 1);
      const filteredUsers = users
        // check names that start with mentionQuery
        .filter((user) =>
          mentionQuery === ""
            ? true
            : user.username.toLowerCase().startsWith(mentionQuery.toLowerCase())
        )
        // check names that contain the mentionQuery
        .concat(
          users.filter(
            (user) =>
              mentionQuery !== "" &&
              !user.username
                .toLowerCase()
                .startsWith(mentionQuery.toLowerCase()) &&
              user.username.toLowerCase().includes(mentionQuery.toLowerCase())
          )
        )
        .slice(0, mentionQuery.length > 0 ? 5 : users.length);
      setMentionList(filteredUsers);
      setIsMentioning(true);
    } else {
      setIsMentioning(false);
      setMentionList([]);
      setMentionListPosition(null);
    }

    handleContentChange(id, "text", value);
  };

  const handleMentionSelect = (user: User) => {
    // Replace '@query' with selected username
    const value = inputRef.current?.innerHTML || "";
    const lastAtIndex = value.lastIndexOf("@");
    const newValue = `${value.slice(
      0,
      lastAtIndex
    )}<span class="text-surfe-pink">@${user.username}</span>&nbsp;`;

    if (inputRef.current) {
      inputRef.current.innerHTML = newValue;

      moveCaretToEnd(inputRef.current);
    }

    setIsMentioning(false);
    setMentionList([]);
    setMentionListPosition(null);

    handleContentChange(id, "text", newValue);
  };

  const calculateMentionListPosition = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0).cloneRange();
      const rect = range.getBoundingClientRect();

      // Get viewport height and parent container bounds
      const viewportHeight = window.innerHeight;
      const parentRect = inputRef.current?.getBoundingClientRect();

      if (parentRect) {
        // Calculate if there's enough space below or if it should go up
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;

        const direction = spaceBelow < 150 && spaceAbove > 150 ? "up" : "down"; // Adjust threshold as needed

        setMentionListPosition({
          top:
            direction === "down"
              ? rect.bottom - parentRect.top
              : rect.top - parentRect.top,
          left: rect.left - parentRect.left,
          direction,
        });
      }
    }
  };

  return (
    <div data-testid="textarea_with_mentions" className="h-full relative">
      <div
        ref={inputRef}
        className="text-sm font-medium outline-none w-full resize-none transition bg-transparent h-full overflow-y-auto flex-row-reverse"
        contentEditable
        onInput={handleInputChange}
        role="textarea"
        aria-multiline="true"
        inputMode="text"
      />
      {isMentioning && mentionList.length > 0 && (
        <div
          className="absolute bg-white border border-gray-300 rounded-md z-10"
          style={{
            top:
              mentionListPosition?.direction === "down"
                ? mentionListPosition.top
                : (mentionListPosition?.top as number) - 150,
            left: mentionListPosition?.left,
          }}
        >
          {mentionList.map((user) => (
            <div
              key={user.username}
              className="cursor-pointer hover:bg-gray-200 p-2"
              onClick={() => handleMentionSelect(user)}
            >
              {user.username}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextAreaWithMentions;
