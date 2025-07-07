import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import RoutingComponent from "./RoutingComponent";

jest.mock("../Dashboard/Dashboard", () => () => <div>Dashboard Page</div>);
jest.mock("../NotFound/NotFound", () => () => <div>Not Found Page</div>);
jest.mock("../Products/Products", () => () => <div>Products Page</div>);
jest.mock("../SignIn/SignIn", () => () => <div>Sign In Page</div>);
jest.mock("../ThankyouPage/Thankyou", () => () => <div>Thank You Page</div>);
jest.mock("../BookDetail/Bookdetail", () => () => <div>Book Detail Page</div>);

const renderWithRoute = (route: string) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <RoutingComponent />
    </MemoryRouter>
  );
};
describe("Routing", () => {
  test("renders Dashboard on /", () => {
    renderWithRoute("/");
    expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
  });
  test("renders Products on /books", () => {
    renderWithRoute("/books");
    expect(screen.getByText("Products Page")).toBeInTheDocument();
  });
  test("renders Products on /booksDetail", () => {
    renderWithRoute("/books/123");
    expect(screen.getByText("Book Detail Page")).toBeInTheDocument();
  });
  test("renders not found on /booksDetail", () => {
    renderWithRoute("/notfound");
    expect(screen.getByText("Not Found Page")).toBeInTheDocument();
  });
  test("renders login Page on ", () => {
    renderWithRoute("/login");
    expect(screen.getByText("Sign In Page")).toBeInTheDocument();
  });
  test("renders thank you Page on ", () => {
    renderWithRoute("/thankyou");
    expect(screen.getByText("Thank You Page")).toBeInTheDocument();
  });
});
