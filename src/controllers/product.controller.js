const asyncHandler = require("../utils/asyncHandler");

const ProductService = require("../services/product.service");
const ProductConnector = require("../connector/product.connector");


const createProduct = asyncHandler(async (req, res) => {
    const product = await ProductService.createProduct(req.body);

    res.status(201).json({
        success: true,
        message: "Product created successfully.",
        data: ProductConnector.connectProduct(product),
    });
});

const getProducts = asyncHandler(async (req, res) => {
    const products = await ProductService.getProducts();

    res.status(200).json({
        success: true,
        data: ProductConnector.connectProducts(products),
    });
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await ProductService.getProductById(
        req.params.productId
    );

    res.status(200).json({
        success: true,
        data: ProductConnector.connectProduct(product),
    });
});

const getProductByKey = asyncHandler(async (req, res) => {
    const product = await ProductService.getProductByKey(
        req.params.productKey
    );

    res.status(200).json({
        success: true,
        data: ProductConnector.connectProduct(product),
    });
});

const renderProductPage = asyncHandler(async (req, res) => {
    const product = await ProductService.getProductByKey(
        req.params.productKey
    );

    res.render("product", {
        product: ProductConnector.connectProduct(product),
    });
});


const updateProduct = asyncHandler(async (req, res) => {
    const product = await ProductService.updateProduct(
        req.params.productId,
        req.body
    );

    res.status(200).json({
        success: true,
        message: "Product updated successfully.",
        data: ProductConnector.connectProduct(product),
    });
});

const deleteProduct = asyncHandler(async (req, res) => {
    await ProductService.deleteProduct(req.params.productId);

    res.status(200).json({
        success: true,
        message: "Product deleted successfully.",
    });
});



module.exports = {
    createProduct,
    getProducts,
    getProductById,
    getProductByKey,
    renderProductPage,
    updateProduct,
    deleteProduct,
};