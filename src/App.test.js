import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";

import App from "./App";

describe("App component", () => {
  test("the title is rendered correctly in the header", async () => {
    render(<App />);
    const title = screen.getByText(/Wize Home/i);
    expect(title).toBeInTheDocument();
  });
});

describe("Tests navigation", () => {
  test("Redirects from home to product list and viceversa", async () => {
    render(<App />);
    const button = await waitFor(() => screen.getByRole(/button/i, { name: "View all products" }));
    expect(button).toBeInTheDocument();
    act(() => {
      fireEvent.click(button)
    });
    const text = await waitFor(
      () => screen.getByText(/Clear all filters/i),
      { timeout: 2000 }
    );
    expect(text).toBeInTheDocument();

    const logo = screen.getByText(/Wize Home/i);
    act(() => {
      fireEvent.click(logo)
    });
    const products = await waitFor(() => screen.getByText(/Our Products/i));
    expect(products).toBeInTheDocument();
  });
});
