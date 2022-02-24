import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartContextProvider } from "../../utils/contexts/CartContext";

import ProductList from "./ProductList";

describe("Product List Page", () => {
  test("Product Category Sidebar is fetching and rendering data from the API", async () => {
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <CartContextProvider>
          <ProductList />
        </CartContextProvider>
      </MemoryRouter>
    );

    const category = await waitFor(() => screen.getByText(/Kitchen/i));
    expect(category).toBeInTheDocument();
  });

  test("Category links are filtering Products Grid correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <CartContextProvider>
          <ProductList />
        </CartContextProvider>
      </MemoryRouter>
    );

    const category = await waitFor(() => screen.getByText(/Kitchen/i));
    expect(category).toBeInTheDocument();
    fireEvent.click(category);
    const fetching = await waitFor(() => screen.getByText(/Loading.../i));
    expect(fetching).toBeInTheDocument();
    expect(category).toHaveClass("active");
  });

  test("Pagination Controls are generated correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <CartContextProvider>
          <ProductList />
        </CartContextProvider>
      </MemoryRouter>
    );

    const pages = await waitFor(() => screen.getAllByTestId(/page/i));
    expect(pages.length).toBe(8);
  });

  test("Prev button is disabled when the user is on the first page", async () => {
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <CartContextProvider>
          <ProductList />
        </CartContextProvider>
      </MemoryRouter>
    );

    const page1 = await waitFor(() => screen.getByTestId(/page1/i));
    expect(page1).toBeInTheDocument();
    expect(page1.classList.contains("active")).toBe(true);
    const prev = await waitFor(() => screen.getByTestId(/prev/i));
    expect(prev).toBeInTheDocument();
    expect(prev.classList.contains("disabled")).toBe(true);
  });

  test("Next button is working as expected", async () => {
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <CartContextProvider>
          <ProductList />
        </CartContextProvider>
      </MemoryRouter>
    );

    const page1 = await waitFor(() => screen.getByTestId(/page1/i));
    expect(page1).toBeInTheDocument();
    expect(page1.classList.contains("active")).toBe(true);
    const next = await waitFor(() => screen.getByTestId(/next/i));
    expect(next).toBeInTheDocument();
    fireEvent.click(next);
    const page2 = await waitFor(() => screen.getByTestId(/page2/i));
    expect(page2).toBeInTheDocument();
    expect(page1.classList.contains("active")).toBe(false);
    expect(page2.classList.contains("active")).toBe(true);
  });

  // eslint-disable-next-line max-len
  test("Next button is disabled when the user is on the last page AND Prev button is working as expected", async () => {
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <CartContextProvider>
          <ProductList />
        </CartContextProvider>
      </MemoryRouter>
    );

    const page1 = await waitFor(() => screen.getByTestId(/page1/i));
    expect(page1).toBeInTheDocument();
    expect(page1.classList.contains("active")).toBe(true);


    const page8 = await waitFor(() => screen.getByTestId(/page8/i));
    expect(page8).toBeInTheDocument();
    fireEvent.click(page8);
    expect(page1.classList.contains("active")).toBe(false);
    expect(page8.classList.contains("active")).toBe(true);

    const next = await waitFor(() => screen.getByTestId(/next/i));
    expect(next).toBeInTheDocument();
    expect(next.classList.contains("disabled")).toBe(true);

    const prev = await waitFor(() => screen.getByTestId(/prev/i));
    expect(prev).toBeInTheDocument();
    fireEvent.click(prev);

    const page7 = await waitFor(() => screen.getByTestId(/page7/i));
    expect(page7.classList.contains("active")).toBe(true);
  });
});
