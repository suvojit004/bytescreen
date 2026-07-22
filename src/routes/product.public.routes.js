const express = require("express");

const router = express.Router();

const ProductController = require("../controllers/product.controller");

// JSON API
router.get(
    "/api/:productKey",
    ProductController.getProductByKey
);

// Website
router.get(
    "/:productKey",
    ProductController.renderProductPage
);

module.exports = router;