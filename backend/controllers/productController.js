import asyncHandler from "express-async-handler";
import fs from "fs";
import cheerio from "cheerio";

import Product from "../models/productModel.js";
import fetchResource from "../utils/fetchResource.js";

// @desc    List getProducts
// @route   Get /api/products/
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll();
  res.status(200).json(products);
});

// @desc    Update product by id
// @route   Get /api/product/:id
// @access  Public
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

// @desc    Delete a product
// @route   Get /api/product/:id
// @access  Public
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
