import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route,Routes } from "react-router-dom";

import App from "./App";
jest.mock("./Components/Navbar/navbar", () => () => (
  <div data-testid="navbar">Navbar</div>
));
jest.mock("./Components/AddToCart/AddToCart", () => () => (
  <div data-testid="add-to-cart">AddToCart</div>
));
jest.mock("./Components/Routing/RoutingComponent", () => () => (
  <div data-testid="routing">RoutingComponent</div>
));

describe("App Component", () => {
  const renderWithRouter = (initialPath: string) => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test("render Navbar, RoutingComponent, and AddToCart on non-login", () => {
    renderWithRouter("/home");

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("routing")).toBeInTheDocument();
    expect(screen.getByTestId("add-to-cart")).toBeInTheDocument();
  });
  test("not render Navbar on login", () => {
    renderWithRouter("/login");

    expect(screen.queryByTestId("navbar")).not.toBeInTheDocument();
    expect(screen.getByTestId("routing")).toBeInTheDocument();
    expect(screen.getByTestId("add-to-cart")).toBeInTheDocument();
  });
});
