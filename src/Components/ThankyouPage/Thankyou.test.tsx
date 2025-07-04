import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import { Messages } from "../../Utility/CommonMessages";
import Thankyou from "./Thankyou";
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
describe("ThankYouPage", () => {
  test("renders thank you message", () => {
    render(
      <MemoryRouter>
        <Thankyou />
      </MemoryRouter>
    );

    expect(screen.getByText(Messages.thankyou.title.value)).toBeInTheDocument();

    expect(
      screen.getByText((content) =>
        content.includes(Messages.thankyou.message.value.trim())
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(Messages.checkOutPage.continueShoppingBtn.value)
    ).toBeInTheDocument();
  });
  test("navigates to books page on continue shopping click", () => {
    render(
      <MemoryRouter>
        <Thankyou />
      </MemoryRouter>
    );

    const continueShoppingButton = screen.getByText(
      Messages.checkOutPage.continueShoppingBtn.value
    );
    continueShoppingButton.click();
    expect(mockNavigate).toHaveBeenCalledWith("/books");
  });
});
