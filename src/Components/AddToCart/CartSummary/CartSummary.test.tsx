import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../../Store/Store";
import CartSummary from "./CartSummary";

const subtotal = 99.99,
  shipping = 5.0,
  tax = 0.0,
  grandTotal = subtotal + shipping + tax;

describe("CartSummary", () => {
  test("renders product details", () => {
    render(
      <Provider store={store}>
        <CartSummary
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          grandTotal={grandTotal}
          goToCheckout={jest.fn()}
        />
      </Provider>
    );

    expect(
      screen.getByText(
        (_, element) => element?.textContent === `$${subtotal.toFixed(2)}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, element) => element?.textContent === `$${shipping.toFixed(2)}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, element) => element?.textContent === `$${tax.toFixed(2)}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, element) => element?.textContent === `$${grandTotal.toFixed(2)}`
      )
    ).toBeInTheDocument();
  });
});
