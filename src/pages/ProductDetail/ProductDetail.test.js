import {
  fireEvent,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import routeData from "react-router";
import { CartContextProvider } from "../../utils/contexts/CartContext";
import ProductDetail from "./ProductDetail";
import Header from "../../components/Header";
import { TermContextProvider } from "../../utils/contexts/TermContext";

describe("Product Detail Page", () => {
  const mockLocation = {
    pathname: "/product/YZZ6OhIAACgAvlE1",
    hash: "",
    search: "",
    state: {
      productId: "YZZ6OhIAACgAvlE1",
    },
  };

  test("Product Detail is fetching and rendering data from the API", async () => {
    jest.spyOn(routeData, "useLocation").mockReturnValue(mockLocation);
    render(
      <MemoryRouter>
        <CartContextProvider>
          <ProductDetail location />
        </CartContextProvider>
      </MemoryRouter>
    );
    const images = await waitFor(() => screen.getAllByRole(/img/i));
    expect(images.length).toBeGreaterThan(0);
  });

  test("Product Detail contains name, price, SKU, category, tags and description.", async () => {
    jest.spyOn(routeData, "useLocation").mockReturnValue(mockLocation);
    render(
      <MemoryRouter>
        <CartContextProvider>
          <ProductDetail location />
        </CartContextProvider>
      </MemoryRouter>
    );
    const name = await waitFor(() => screen.getByTestId(/name/i));
    const price = await waitFor(() => screen.getByTestId(/price/i));
    const sku = await waitFor(() => screen.getByTestId(/sku/i));
    const category = await waitFor(() => screen.getByTestId(/category/i));
    const tags = await waitFor(() => screen.getByTestId(/tags/i));
    const description = await waitFor(() => screen.getByTestId(/description/i));
    expect(name).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(sku).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(tags).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test("Product Detail contains a quantity selector and an “Add to Cart” button", async () => {
    jest.spyOn(routeData, "useLocation").mockReturnValue(mockLocation);
    render(
      <MemoryRouter>
        <CartContextProvider>
          <ProductDetail location />
        </CartContextProvider>
      </MemoryRouter>
    );
    const input = await waitFor(() => screen.getByTestId(/quantity-input/i));
    const button = await waitFor(() =>
      screen.getByRole(/button/i, { name: "Add to cart" })
    );
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("Clicking on the “Add to Cart” button, quantity is added to the cart", async () => {
    jest.spyOn(routeData, "useLocation").mockReturnValue(mockLocation);
    render(
      <MemoryRouter>
        <CartContextProvider>
          <TermContextProvider>
            <Header />
            <ProductDetail location />
          </TermContextProvider>
        </CartContextProvider>
      </MemoryRouter>
    );
    const input = await waitFor(() => screen.getByTestId(/quantity-input/i));
    const button = await waitFor(() =>
      screen.getByRole(/button/i, { name: "Add to cart" })
    );
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 1 } });
    fireEvent.click(button);
    const badge = await waitFor(() => screen.getByTestId(/quantity-badge/i));
    expect(getByText(badge, "1")).toBeInTheDocument();
  });

  test("Add to Cart button is disabled when there's not stock units available", async () => {
    jest.spyOn(routeData, "useLocation").mockReturnValue(mockLocation);
    render(
      <MemoryRouter>
        <CartContextProvider>
          <ProductDetail location />
        </CartContextProvider>
      </MemoryRouter>
    );
    const input = await waitFor(() => screen.getByTestId(/quantity-input/i));
    const button = await waitFor(() =>
      screen.getByRole(/button/i, { name: "Add to cart" })
    );
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 10 } });
    expect(button).not.toBeInTheDocument();
  });
});
