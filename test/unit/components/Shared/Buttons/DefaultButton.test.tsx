import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import DefaultButton, {
  ButtonProps,
} from "../../../../../src/components/Shared/Buttons/DefaultButton";
import { Icons } from "../../../../../src/components/Icons";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  const mockOnClick = jest.fn();

  const defaultProps: ButtonProps = {
    text: "Click Me",
    className: "bg-surfe-dark-blue text-neutral-50",
    onClick: mockOnClick,
  };

  it("renders the button with text", () => {
    render(<DefaultButton {...defaultProps} />);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Click Me");
  });

  it("applies the provided className", () => {
    render(<DefaultButton {...defaultProps} />);
    const container = screen.getByText(/click me/i).closest("div");
    expect(container).toHaveClass(
      "bg-surfe-pink bg-surfe-dark-blue text-neutral-50"
    );
  });

  it("triggers the onClick handler when clicked", () => {
    render(<DefaultButton {...defaultProps} />);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("renders an icon on the left side", () => {
    const propsWithIcon: ButtonProps = {
      ...defaultProps,
      icon: {
        position: "left",
        iconElement: Icons.plus("h-4 w-4", "#fafafa"),
      },
    };
    render(<DefaultButton {...propsWithIcon} />);
    const iconElement = screen.getByTestId("plus_icon");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toBeVisible();
  });

  it("renders an icon on the right side", () => {
    const propsWithIcon: ButtonProps = {
      ...defaultProps,
      icon: {
        position: "right",
        iconElement: Icons.plus("h-4 w-4", "#fafafa"),
      },
    };
    render(<DefaultButton {...propsWithIcon} />);
    const iconElement = screen.getByTestId("plus_icon");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toBeVisible();
  });

  it("disables the button when the `disabled` prop is true", () => {
    const disabledProps: ButtonProps = {
      ...defaultProps,
      disabled: true,
    };
    render(<DefaultButton {...disabledProps} />);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeDisabled();
  });
});
