import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import React from "react";

import Dashboard from "./Dashboard";

describe("Dashboard Component", () => {
  test("renders correctly", () => {
    render(<Dashboard />);
    expect(screen.getByText("this is Dashboard")).toBeInTheDocument();
  });
});
