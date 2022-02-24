import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CartContextProvider } from "../../utils/contexts/CartContext";
import App from "../../App";
describe("Shoppinig Cart Page", () => {
  test("The list of products is shown when there are items in the cart.", async () => {
    render(
      <CartContextProvider>
        <App />
      </CartContextProvider>
    );
    const input = screen.getByPlaceholderText(/Search/i);
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "lamp" } });
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
    const result = await waitFor(() => screen.getByText(/Results for "lamp"/i));
    const products = screen.getAllByText(/Add to cart/i);
    expect(result).toBeInTheDocument();
    expect(products.length).toBeGreaterThan(0);
  });

  test("Empty state is displayed when there are no results for the searchTerm.", async () => {
    render(
      <CartContextProvider>
        <App />
      </CartContextProvider>
    );
    const input = screen.getByPlaceholderText(/Search/i);
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "door" } });
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
    const result = await waitFor(() =>
      screen.getByText(/No results found for "door". Try something else./i)
    );
    expect(result).toBeInTheDocument();
  });
});
