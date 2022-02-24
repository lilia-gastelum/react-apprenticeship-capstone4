import { rest } from "msw";
import { API_BASE_URL } from "../utils/constants";
const featuredBanners = require("../mocks/en-us/featured-banners.json");
const featuredProducts = require("../mocks/en-us/featured-products.json");
const productsCategories = require("../mocks/en-us/product-categories.json");
const product = require("../mocks/en-us/product.json");
const lampResult = require("../mocks/en-us/search-products.json");
const doorResult = require("../mocks/en-us/search-no-results.json");
const refApi = require("../mocks/refApi.json");

const handlers = [
  rest.get(`${API_BASE_URL}`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(refApi));
  }),

  rest.get(`${API_BASE_URL}/documents/search`, (req, res, ctx) => {
    const url = JSON.stringify(req.url);
    const page = req.url.searchParams.get("page");

    const result = url.includes("%22banner%22")
      ? featuredBanners
      : url.includes("%22category%22")
      ? productsCategories
      : url.includes("document.id")
      ? product
      : url.includes("lamp")
      ? lampResult
      : url.includes("door")
      ? doorResult
      : featuredProducts;

    if (page) {
      result.page = page;
    }

    return res(ctx.status(200), ctx.json(result));
  }),
];

export { handlers };
