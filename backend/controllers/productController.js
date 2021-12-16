import asyncHandler from "express-async-handler";
import fs from "fs";
import cheerio from "cheerio";

import Product from "../models/productModel.js";
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

// @desc prase the product and save into db
const testProducts = asyncHandler(async (req, res) => {
  const $ = cheerio.load(fs.readFileSync("dump.html"));
  let row,i = 2;
  do {
    row = $(`span[cel_widget_id=MAIN-SEARCH_RESULTS-${i++}]`);
    if (row.length) {
      console.log("Entry ", i);
      const title = row
        .find("a.a-text-normal")
        .first()
        .text()
        .replace(/\s+/g, " ")
        .trim(); // title
      const image = row.find("img").attr("src"); // image
      const price = row.find("a span.a-offscreen").first().text(); // price
      const rating = row.find("span.a-icon-alt").text().split(" ")[0]; // reviews

      let product = Product.build({
        title,
        image,
        price,
        rating,
      });
      await product.save(); //TODO: batch add
    }
  } while (i < 30);

  const products = await Product.findAll();

  console.log("products", JSON.stringify(products));
  res.status(200).json(products);
});

export { getProducts, testProducts };
