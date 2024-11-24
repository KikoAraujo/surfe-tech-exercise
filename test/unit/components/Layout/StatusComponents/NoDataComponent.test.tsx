import { render, screen } from "@testing-library/react";
import React from "react";
import NoDataComponent from "../../../../../src/components/Layout/StatusComponents/NoDataComponent";
import "@testing-library/jest-dom";

describe("NoDataComponent", () => {
  it("renders the title and subtitle correctly", () => {
    const title = "No Data Available";
    const subTitle = "Please try again later.";

    render(<NoDataComponent title={title} subTitle={subTitle} />);

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("text-surfe-dark-blue text-xl");

    const subTitleElement = screen.getByText(subTitle);
    expect(subTitleElement).toBeInTheDocument();
    expect(subTitleElement).toHaveClass("text-surfe-dark-blue");
  });

  it("renders the image with correct src and alt text", () => {
    render(
      <NoDataComponent title="No Data" subTitle="This is a placeholder" />
    );

    const image = screen.getByAltText(/surfe no data image/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://www.surfe.com/wp-content/uploads/2024/01/Surfer-Paddling-576x320.png"
    );
    expect(image).toHaveAttribute("height", "250");
    expect(image).toHaveAttribute("width", "350");
  });

  it("renders ReactElement as subtitle correctly", () => {
    const title = "No Data Available";
    const subTitle = (
      <a href="https://www.surfe.com">Click here for more info</a>
    );

    render(<NoDataComponent title={title} subTitle={subTitle} />);

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    const subTitleElement = screen.getByText("Click here for more info");
    expect(subTitleElement).toBeInTheDocument();
    expect(subTitleElement.tagName).toBe("A");
    expect(subTitleElement).toHaveAttribute("href", "https://www.surfe.com");
  });
});
