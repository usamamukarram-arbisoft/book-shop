import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import SignIn from "./SignIn";
import { store } from "../../Store/Store";
import React from "react";
import * as api from "../../Utility/Api";
import { configureStore } from "@reduxjs/toolkit";
import SignInReducer from "./SinginSlice";
import axios from "axios";
// import { loginRequest } from "../../Utility/Api";

jest.mock("../../Utility/Api");
jest.mock("axios");

const mockStore = configureStore({
  reducer: { auth: SignInReducer },
  preloadedState: {
    auth: {
      user: {
        email: "test@example.com",
        password: "testpassword",
        username: "testuser",
      },
      isLoggedIn: true,
    },
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe("SignIn Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input fields and login button", () => {
    renderWithProviders(<SignIn />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  test("calls signIn function on button click", async () => {
    const mockUser = { email: "test@example.com", password: "12345" };
    const dispatchSpy = jest.spyOn(store, "dispatch");
    (axios as jest.Mocked<typeof axios>).get.mockResolvedValueOnce({
      data: [mockUser],
    });
    jest.spyOn(api, "loginRequest").mockResolvedValueOnce(mockUser);
    renderWithProviders(<SignIn />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockUser.email },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: mockUser.password },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    if (mockUser.email && mockUser.password) {
      expect(api.loginRequest).toHaveBeenCalledWith(mockUser);
      await waitFor(() => {
        expect(dispatchSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            type: "SignIn/loginUser",
            payload: mockUser,
          })
        );
        expect(window.location.pathname).toBe("/books");
      });
    }
  });

  test("displays error message on login failure", async () => {
    (api.loginRequest as jest.Mock).mockRejectedValueOnce(
      "Invalid credentials"
    );
    renderWithProviders(<SignIn />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "wrongemail@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "1234567" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });

  test("redirects to /books if already logged in", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );
    expect(window.location.pathname).toBe("/books");
  });
});
