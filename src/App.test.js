import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
    const button = screen.getByRole(/button/i, { name: "View all products" });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const text = await waitFor(
      () => screen.getByText(/This is the Product List Page/i),
      { timeout: 2000 }
    );
    expect(text).toBeInTheDocument();

    const logo = screen.getByText(/Wize Home/i);
    fireEvent.click(logo);
    const products = screen.getByText(/Our Products/i);
    expect(products).toBeInTheDocument();
  });
});
