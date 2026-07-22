const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const authorize = require("../middlewares/authorize.middleware");


const ProductController = require("../controllers/product.controller");

const {
    ProductValidation,
    UpdateProductValidation,
} = require("../models/product/validations/product.validation");

// Create Product
router.post(
    "/",
  
    validate(ProductValidation),
    ProductController.createProduct
);

// Get All Products
router.get(
    "/",
  
    ProductController.getProducts
);

// Get Product By Id
router.get(
    "/:productId",
 
    ProductController.getProductById
);

// Update Product
router.put(
    "/:productId",
  
    validate(UpdateProductValidation),
    ProductController.updateProduct
);

// Delete Product
router.delete(
    "/:productId",
   
    ProductController.deleteProduct
);

module.exports = router;