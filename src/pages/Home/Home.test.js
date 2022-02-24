import { render, screen, waitFor } from "@testing-library/react";
import { CartContextProvider } from "../../utils/contexts/CartContext";

import Home from "./Home";

describe("Home Page", () => {
  test("Featured Banners Slider is fetching and rendering data from the API", async () => {
    render(
      <CartContextProvider>
        <Home />
      </CartContextProvider>
    );
    const slides = await waitFor(() => screen.getAllByAltText(/slide-1/i));
    expect(slides.length).toBeGreaterThan(0);
  });

  test("Categories Grid is fetching and rendering data from the API", async () => {
    render(
      <CartContextProvider>
        <Home />
      </CartContextProvider>
    );
    const category = await waitFor(() => screen.getByText(/Kitchen/i));
    expect(category).toBeInTheDocument();
  });

  test("Featured Products Grid is fetching and rendering data from the API", async () => {
    render(
      <CartContextProvider>
        <Home />
      </CartContextProvider>
    );
    const gridItem = await waitFor(() => screen.getAllByAltText(/grid-item1/i));
    expect(gridItem.length).toBeGreaterThan(0);
  });
});
