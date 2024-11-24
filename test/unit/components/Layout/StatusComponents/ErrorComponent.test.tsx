import { render, screen } from "@testing-library/react";
import React from "react";
import ErrorComponent from "../../../../../src/components/Layout/StatusComponents/ErrorComponent";
import DefaultButton from "../../../../../src/components/Shared/Buttons/DefaultButton";
import "@testing-library/jest-dom";

jest.mock("../../../../../src/components/Shared/Buttons/DefaultButton", () => {
  return jest.fn(({ text, className, onClick }) => (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  ));
});

describe("ErrorComponent", () => {
  it("renders the error message", () => {
    render(<ErrorComponent />);
    const errorMessage = screen.getByText(/ups! something went wrong.../i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders the Try Again button with correct text and styles", () => {
    render(<ErrorComponent />);
    const buttonElement = screen.getByRole("button", { name: /try again/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("bg-surfe-dark-blue text-neutral-50");
  });

  it("uses the DefaultButton component", () => {
    render(<ErrorComponent />);
    expect(DefaultButton).toHaveBeenCalledWith(
      {
        text: "Try Again",
        className: "bg-surfe-dark-blue text-neutral-50",
        onClick: expect.any(Function),
      },
      {}
    );
  });
});
