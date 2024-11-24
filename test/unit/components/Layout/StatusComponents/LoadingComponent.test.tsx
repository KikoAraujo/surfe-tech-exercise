import { render, screen } from "@testing-library/react";
import React from "react";
import LoadingComponent from "../../../../../src/components/Layout/StatusComponents/LoadingComponent";
import "@testing-library/jest-dom";

jest.mock("../../../../../src/components/Icons", () => {
  return {
    Icons: {
      ellipse: jest.fn(() => <svg data-testid="ellipse-icon" />),
    },
  };
});

describe("LoadingComponent", () => {
  it("renders the loading component", () => {
    render(<LoadingComponent />);
    const loadingElement = screen.getByTestId("loading_component");
    expect(loadingElement).toBeInTheDocument();
  });

  it("renders the spinner icon", () => {
    render(<LoadingComponent />);
    const iconElement = screen.getByTestId("ellipse-icon");
    expect(iconElement).toBeInTheDocument();
  });
});
