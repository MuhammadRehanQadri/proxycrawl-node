import express from "express";
const router = express.Router();
import {
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

router.route("/").get(getProducts);
router.route("/:id").patch(updateProduct).delete(deleteProduct);

export default router;
