import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import { Messages } from "../../../Utility/CommonMessages";
import EmptyCart from "./EmptyCart";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
describe("EmptyCart component", () => {
  test("renders empty cart message", () => {
    render(
      <MemoryRouter>
        <EmptyCart />
      </MemoryRouter>
    );

    expect(
      screen.getByText(Messages.emptyCart.emptyCartTitle.value)
    ).toBeInTheDocument();

    expect(
      screen.getByText((content) =>
        content.includes(Messages.emptyCart.emptyCartTexy.value.trim())
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(Messages.productDetails.back.value)
    ).toBeInTheDocument();
  });
  test("navigates to books page on back button click", () => {
    render(
      <MemoryRouter>
        <EmptyCart />
      </MemoryRouter>
    );

    const backButton = screen.getByText(Messages.productDetails.back.value);
    backButton.click();

    expect(mockNavigate).toHaveBeenCalledWith("/books");
  });
});
