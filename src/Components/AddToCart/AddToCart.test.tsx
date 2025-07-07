import "@testing-library/jest-dom";

import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { Messages } from "../../Utility/CommonMessages";
import AddToCart from "./AddToCart";
import { closeDrawer } from "./AddtoCartslice";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("AddToCart Component", () => {
  let store: ReturnType<typeof configureStore>;

  const initialState = {
    drawer: {
      openDrawer: true,
      items: [
        {
          id: 1,
          bookId: 1,
          title: "Test Product",
          price: 99.99,
          description: "A test product description.",
          author: "Test Author",
          category: "Test Category",
          image_url: "https://example.com/image.jpg",
          available_books: 10,
          price_usd: 99.99,
          pages: 300,
          publisher: "Test Publisher",
          publication_date: "2024-01-01",
          quantity: 1,
          totalPrice: 99.99,
        },
      ],
    },
    auth: {
      isLoggedIn: true,
    },
  };

  const renderComponent = (customState = initialState) => {
    store = configureStore({
      reducer: (state = {}) => state,
      preloadedState: customState,
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddToCart />
        </BrowserRouter>
      </Provider>
    );
  };

  test("renders with cart items", () => {
    renderComponent();

    expect(
      screen.getByText(Messages.checkOutPage.cartHeading.value)
    ).toBeInTheDocument();
    expect(
      screen.getByText(initialState.drawer.items[0].title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(Messages.checkOutPage.continueShoppingBtn.value)
    ).toBeInTheDocument();
  });

  it("renders empty cart when no items", () => {
    const emptyState = {
      ...initialState,
      drawer: {
        openDrawer: true,
        items: [],
      },
    };
    renderComponent(emptyState);

    expect(
      screen.getByText(Messages.emptyCart.emptyCartTitle.value)
    ).toBeInTheDocument();
  });

  test("navigates to login if not logged in and checkout is clicked", () => {
    const notLoggedInState = {
      ...initialState,
      auth: {
        isLoggedIn: false,
      },
    };
    renderComponent(notLoggedInState);

    const checkoutButton = screen.getByText(
      Messages.checkOutPage.checkOut.value
    );
    fireEvent.click(checkoutButton);

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("shows confirmation dialog on checkout when logged in", () => {
    renderComponent();

    const checkoutButton = screen.getByText(
      Messages.checkOutPage.checkOut.value
    );
    fireEvent.click(checkoutButton);

    expect(
      screen.getByText(Messages.confirmDialog.title.value)
    ).toBeInTheDocument();
    expect(
      screen.getByText(Messages.confirmDialog.message.value)
    ).toBeInTheDocument();
  });

  test("navigates to thankyou page after confirming", () => {
    renderComponent();

    const checkoutButton = screen.getByText(
      Messages.checkOutPage.checkOut.value
    );
    fireEvent.click(checkoutButton);

    const confirmButton = screen.getByText(Messages.confirmDialog.yes.value);
    fireEvent.click(confirmButton);

    expect(mockNavigate).toHaveBeenCalledWith("/thankyou");
  });

  test("closes drawer and navigates when clicking continue shopping", () => {
    renderComponent();

    const continueBtn = screen.getByText(
      Messages.checkOutPage.continueShoppingBtn.value
    );
    fireEvent.click(continueBtn);
    expect(mockDispatch).toHaveBeenCalledWith(closeDrawer());

    expect(mockNavigate).toHaveBeenCalledWith("/books");
  });
  test("closes dialog when cancel button is clicked", () => {
    renderComponent();

    const checkoutButton = screen.getByText(
      Messages.checkOutPage.checkOut.value
    );
    fireEvent.click(checkoutButton);

    const cancelButton = screen.getByText(Messages.confirmDialog.no.value);
    fireEvent.click(cancelButton);
  });

  test("closes drawer when  offcanvas state is false", () => {
    renderComponent();

    const closeButton = screen.getByRole("button", { name: /close/i });

    fireEvent.click(closeButton);

    expect(mockDispatch).toHaveBeenCalledWith(closeDrawer());
  });
});
