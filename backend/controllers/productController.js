import asyncHandler from "express-async-handler";
import fetchResource from "../utils/fetchResource.js";

// @desc    Sends usesr's query for crawling SERP using background jobs
// @route   Get /api/products/:query
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const { query } = req.params;

  if (!query) {
    res.status(400);
    throw new Error("Invalid params");
  }

  //all logic below this will be moved to worker queue
  console.log("***!!!hi!!!***", await fetchResource(query));

  res.status(200).send();
});

export { getProducts };
