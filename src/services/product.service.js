const Product = require("../models/product/product.model");
const AppError = require("../utils/AppError");

const createProduct = async (productData) => {
    const existingProduct = await Product.findOne({
        "basicInfo.productKey": productData.basicInfo.productKey,
    });

    if (existingProduct) {
        throw new AppError("Product key already exists.", 409);
    }

    const product = await Product.create(productData);

    return product;
};

const getProducts = async (filter = {}, options = {}) => {
    return await Product.find(filter, null, options)
        .sort({ createdAt: -1 })
        .lean();
};

const getProductById = async (productId) => {
    const product = await Product.findById(productId).lean();

    if (!product) {
        throw new AppError("Product not found.", 404);
    }

    return product;
};

const getProductByKey = async (productKey) => {
    const product = await Product.findOne({
        "basicInfo.productKey": productKey.toLowerCase(),
    }).lean();

    if (!product) {
        throw new AppError("Product not found.", 404);
    }

    return product;
};

const updateProduct = async (productId, updateData) => {
    const product = await Product.findByIdAndUpdate(
        productId,
        { $set: updateData },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!product) {
        throw new AppError("Product not found.", 404);
    }

    return product;
};

const deleteProduct = async (productId) => {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
        throw new AppError("Product not found.", 404);
    }

    return product;
};


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    getProductByKey,
    updateProduct,
    deleteProduct,
};