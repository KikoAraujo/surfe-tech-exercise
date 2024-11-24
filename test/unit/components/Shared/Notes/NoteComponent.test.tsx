import { render, screen, fireEvent } from "@testing-library/react";
import NoteComponent from "../../../../../src/components/Shared/Notes/NoteComponent";
import { User } from "../../../../../src/types/Users";
import { Note } from "../../../../../src/types/Notes";
import "@testing-library/jest-dom";
import React from "react";

const mockHandleContentChange = jest.fn();

const mockUsers: User[] = [
  {
    birthdate: 1234567890,
    email: "johndoe@example.com",
    first_name: "John",
    gender: "male",
    last_name: "Doe",
    location: {
      city: "New York",
      postcode: 10001,
      state: "NY",
      street: "123 Main St",
    },
    phone_number: "+1234567890",
    title: "Mr.",
    username: "johndoe",
  },
  {
    birthdate: 9876543210,
    email: "janesmith@example.com",
    first_name: "Jane",
    gender: "female",
    last_name: "Smith",
    location: {
      city: "Los Angeles",
      postcode: 90001,
      state: "CA",
      street: "456 Oak St",
    },
    phone_number: "+0987654321",
    title: "Ms.",
    username: "janesmith",
  },
];

const mockNote: Note = {
  id: 1,
  title: "Sample Note Title",
  text: "This is a sample note text.",
  updated_at: "2024-11-24T12:00:00Z",
};

describe("NoteComponent", () => {
  it("renders the note component correctly", () => {
    render(
      <NoteComponent
        {...mockNote}
        handleContentChange={mockHandleContentChange}
        users={mockUsers}
      />
    );

    const titleElement = screen.getByDisplayValue(mockNote.title);
    expect(titleElement).toBeInTheDocument();

    const textAreaElement = screen.getByTestId("textarea_with_mentions");
    expect(textAreaElement).toHaveTextContent(mockNote.text);

    const lastUpdateText = screen.getByText(/Last update:/);
    expect(lastUpdateText).toHaveTextContent(
      `Last update: ${mockNote.updated_at}`
    );
  });

  it("allows editing the title", () => {
    render(
      <NoteComponent
        {...mockNote}
        handleContentChange={mockHandleContentChange}
        users={mockUsers}
      />
    );

    const titleInput = screen.getByDisplayValue(mockNote.title);

    fireEvent.change(titleInput, { target: { value: "Updated Title" } });

    expect(mockHandleContentChange).toHaveBeenCalledWith(
      mockNote.id,
      "title",
      "Updated Title"
    );
  });

  it("calls handleContentChange when title changes", () => {
    render(
      <NoteComponent
        {...mockNote}
        handleContentChange={mockHandleContentChange}
        users={mockUsers}
      />
    );

    const titleInput = screen.getByDisplayValue(mockNote.title);

    fireEvent.change(titleInput, { target: { value: "New Title" } });

    expect(mockHandleContentChange).toHaveBeenCalledWith(
      mockNote.id,
      "title",
      "New Title"
    );
  });

  it("renders the thumbtack icon", () => {
    render(
      <NoteComponent
        {...mockNote}
        handleContentChange={mockHandleContentChange}
        users={mockUsers}
      />
    );

    const thumbtackIcon = screen.getByTestId("thumbtack_icon");

    expect(thumbtackIcon).toBeInTheDocument();
  });

  it("renders the text area with mentions component", () => {
    render(
      <NoteComponent
        {...mockNote}
        handleContentChange={mockHandleContentChange}
        users={mockUsers}
      />
    );

    const textAreaElement = screen.getByTestId("textarea_with_mentions");
    expect(textAreaElement).toBeInTheDocument();
  });
});
