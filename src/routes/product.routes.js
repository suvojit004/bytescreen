const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const authorize = require("../middlewares/authorize.middleware");


const ProductController = require("../controllers/product.controller");

const {
    ProductValidation,
    UpdateProductValidation,
    ProductIdValidation,
} = require("../models/product/validations/product.validation");

// Admin API: every route needs a logged-in admin (drafts are visible here)
router.use(protect, authorize("super_admin", "admin"));

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
    validate(ProductIdValidation, "params"),
    ProductController.getProductById
);

// Update Product
router.put(
    "/:productId",
    validate(ProductIdValidation, "params"),
    validate(UpdateProductValidation),
    ProductController.updateProduct
);

// Delete Product
router.delete(
    "/:productId",
    validate(ProductIdValidation, "params"),
    ProductController.deleteProduct
);

module.exports = router;
