import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CartContextProvider } from "../../utils/contexts/CartContext";
import ShoppingCart from "./ShoppingCart";
import App from "../../App";
import cash from "../../utils/pipes/cash";

const toNumber = (cash) => {
  return Number(cash.replace("$", "").replaceAll(",", ""));
};

describe("Shoppinig Cart Page", () => {
  test("An empty state is displayed when there are no items in the cart.", async () => {
    render(
      <CartContextProvider>
        <ShoppingCart />
      </CartContextProvider>
    );
    const noItems = await waitFor(() =>
      screen.getByText(/There is no items in your cart, go add some!/i)
    );
    expect(noItems).toBeInTheDocument();
  });

  test("The list of products is shown when there are items in the cart.", async () => {
    render(
      <CartContextProvider>
        <App />
      </CartContextProvider>
    );
    const buttons = await waitFor(() => screen.getAllByText(/Add to cart/i));
    expect(buttons.length).toBeGreaterThan(0);
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    fireEvent.click(buttons[2]);
    const cartButton = screen.getByAltText(/cart/i);
    expect(cartButton).toBeInTheDocument();
    fireEvent.click(cartButton);
    const rows = await waitFor(() => screen.getAllByRole(/row/i));
    expect(rows.length).toBe(6);
    const images = screen.getAllByTestId(/prod-img/i);
    const names = screen.getAllByTestId(/prod-name/i);
    const prices = screen.getAllByTestId(/prod-price/i);
    const inputs = screen.getAllByTestId(/prod-quantity/i);
    const totals = screen.getAllByTestId(/prod-subtotal/i);
    const remove = screen.getAllByRole(/button/i, { name: "Remove" });
    expect(images.length).toBe(3);
    expect(names.length).toBe(3);
    expect(prices.length).toBe(3);
    expect(inputs.length).toBe(3);
    expect(totals.length).toBe(3);
    expect(remove.length).toBe(3);

    //Validate that the cart total label displays the sum of the subtotals of all items in the cart.
    const expectedTotal =
      toNumber(totals[0].innerHTML) +
      toNumber(totals[1].innerHTML) +
      toNumber(totals[2].innerHTML);
    const total = screen.getByTestId(/cart-total/i);

    expect(total.innerHTML).toMatch(cash(expectedTotal));

    //Validate that you can update the quantity of items for a particular product in the cart.
    fireEvent.change(inputs[2], { target: { value: 5 }}, 3000);
    expect(inputs[2]).toHaveValue(5);
    //Validate that you don’t exceed the stock units available for the selected product.
    fireEvent.change(inputs[2], { target: { value: 9 }}, 3000);
    expect(inputs[2]).toHaveValue(5);

    // Validate that you can remove a product from the cart after clicking on “remove”.
    fireEvent.click(remove[0]);
    const remainingRows = await waitFor(() => screen.getAllByRole(/row/i));
    expect(remainingRows.length).toBe(5);
  });
});
