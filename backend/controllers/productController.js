import asyncHandler from "express-async-handler";
import fs from "fs";
import cheerio from "cheerio";

import Product from "../models/productModel.js";
import fetchResource from "../utils/fetchResource.js";

// @desc    Sends usesr's query for crawling SERP using background jobs
// @route   Get /api/products/:query
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll();

  res.status(200).json(products);
});

const updateProduct = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "Invalid Arguments" });
  }

  const product = await Product.findByPk(req.params.id);

  if (product) {
    product.title = req.body.title || product.title;
    product.price = req.body.price || product.price;
    product.rating = req.body.rating || product.rating;
    product.image = req.body.image || product.image;
    const updatedProduct = await product.save();
    return res.json({
      _id: updatedProduct.id,
      title: updatedProduct.title,
      price: updatedProduct.price,
      rating: updatedProduct.rating,
      image: updatedProduct.image,
    });
  }
  
  res.status(500).json({
    message: "Something went very wrong",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "Invalid Arguments" });
  }

  const product = await Product.findByPk(req.params.id);

  if (product) {
    await product.destroy();
    return res.json({
      message: "Product deleted",
    });
  }

  res.status(500).json({
    message: "Something went wrong",
  });

});

export { getProducts, updateProduct, deleteProduct };
