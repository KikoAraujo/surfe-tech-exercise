import { render, screen, fireEvent } from "@testing-library/react";
import TextAreaWithMentions from "../../../../../src/components/Shared/TextAreas/TextAreaWithMentions";
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
  text: "Hello @john",
  updated_at: "2024-11-24T12:00:00Z",
};

describe("TextAreaWithMentions", () => {
  it("renders the TextAreaWithMentions component correctly", () => {
    render(
      <TextAreaWithMentions
        {...mockNote}
        handleContentChange={mockHandleContentChange}
        users={mockUsers}
      />
    );

    const textArea = screen.getByTestId("textarea_with_mentions");
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveTextContent("Hello @john");
  });

  it("does not show mentions when there is no '@' character", () => {
    render(
      <TextAreaWithMentions
        {...mockNote}
        handleContentChange={mockHandleContentChange}
        users={mockUsers}
      />
    );

    const textArea = screen.getByTestId("textarea_with_mentions");
    fireEvent.input(textArea, { target: { innerHTML: "Hello world" } });

    const mentionList = screen.queryByText("johndoe");
    expect(mentionList).toBeNull();
  });

  it("does not show mention list if no matching users found", () => {
    render(
      <TextAreaWithMentions
        {...mockNote}
        handleContentChange={mockHandleContentChange}
        users={mockUsers}
      />
    );

    const textArea = screen.getByTestId("textarea_with_mentions");
    fireEvent.input(textArea, { target: { innerHTML: "Hello @xyz" } });

    const mentionList = screen.queryByText("xyz");
    expect(mentionList).toBeNull();
  });
});
