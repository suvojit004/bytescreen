const Product = require("../models/product/product.model");
const AppError = require("../utils/AppError");

const DUPLICATE_KEY_ERROR = 11000;

const duplicateKeyError = () =>
    new AppError("Product key already exists.", 409);

const createProduct = async (productData) => {
    const existingProduct = await Product.findOne({
        "basicInfo.productKey": productData.basicInfo.productKey,
    });

    if (existingProduct) {
        throw duplicateKeyError();
    }

    try {
        return await Product.create(productData);
    } catch (e) {
        if (e.code === DUPLICATE_KEY_ERROR) throw duplicateKeyError();
        throw e;
    }
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

// Website and public API: only published products are visible
const getPublishedProductByKey = async (productKey) => {
    const product = await Product.findOne({
        "basicInfo.productKey": productKey.toLowerCase(),
        status: "published",
    }).lean();

    if (!product) {
        throw new AppError("Product not found.", 404);
    }

    return product;
};

// Sections are replaced as a whole; fields not sent are left unchanged
const updateProduct = async (productId, updateData) => {
    try {
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
    } catch (e) {
        if (e.code === DUPLICATE_KEY_ERROR) throw duplicateKeyError();
        throw e;
    }
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
    getPublishedProductByKey,
    updateProduct,
    deleteProduct,
};
