import { rest } from "msw";
import { API_BASE_URL } from "../utils/constants";
const featuredProducts = require("../mocks/en-us/featured-products.json");
const refApi = require("../mocks/refApi.json");

// ref example "YZaBvBIAACgAvnOP";

const handlers = [
  rest.get(`${API_BASE_URL}`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(refApi));
  }),

  rest.get(`${API_BASE_URL}/documents/search`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(featuredProducts));
  }),
];

export { handlers };
