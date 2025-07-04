import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import React from "react";

import { Messages } from "../../Utility/CommonMessages";
import NotFound from "./NotFound";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
describe("NotFound component", () => {
  test("renders not found message", () => {
    render(<NotFound />);

    expect(screen.getByText(Messages.notFound.title.value)).toBeInTheDocument();
    expect(
      screen.getByText(Messages.notFound.message.value)
    ).toBeInTheDocument();
  });

  test("navigates to books page on back button click", () => {
    render(<NotFound />);

    const backButton = screen.getByText(Messages.productDetails.back.value);
    backButton.click();

    expect(mockNavigate).toHaveBeenCalledWith("/books");
  });
});
