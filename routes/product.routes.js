const express = require("express");
const router = express.Router();
const {
   getProducts,
   getProduct,
   createProduct,
   updateProduct,
   deleteProduct,
} = require("../controllers/product.controller");

router.route("/products").get(getProducts).post(createProduct)
router.route("/products/:id").get(getProduct).put(updateProduct).delete(deleteProduct)

module.exports = router
