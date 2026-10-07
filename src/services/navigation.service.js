const mongoose = require("mongoose");
const Product = require("../models/product/product.model");

// Published products for the nav's Products dropdown.
// Cached briefly so each page view doesn't query the database; product changes clear the cache.
const CACHE_TTL_MS = 60 * 1000;
let cache = null;
let cachedAt = 0;

const loadNavProducts = async () => {
    const products = await Product.find(
        { status: "published" },
        {
            "basicInfo.productName": 1,
            "basicInfo.productKey": 1,
            "basicInfo.category": 1,
            "basicInfo.navGroup": 1,
            "basicInfo.sortOrder": 1,
        }
    ).lean();

    const items = products
        .map(({ basicInfo }) => ({
            name: basicInfo.productName,
            key: basicInfo.productKey,
            summary: basicInfo.category || "",
            group: basicInfo.navGroup || "products",
            sortOrder: basicInfo.sortOrder || 0,
        }))
        .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));

    return {
        products: items.filter((item) => item.group !== "platform"),
        platform: items.filter((item) => item.group === "platform"),
    };
};

const getNavProducts = async () => {
    if (cache && Date.now() - cachedAt < CACHE_TTL_MS) return cache;

    // Not connected: don't wait on Mongoose's query buffering (up to 10s), which would stall every page
    if (mongoose.connection.readyState !== 1) return cache || { products: [], platform: [] };

    try {
        cache = await loadNavProducts();
        cachedAt = Date.now();
    } catch (error) {
        // If the database is unavailable, keep the last good list (or show none) rather than failing the page
        console.error("Could not load nav products:", error.message);
        if (!cache) return { products: [], platform: [] };
    }
    return cache;
};

const clearNavCache = () => {
    cache = null;
    cachedAt = 0;
};

module.exports = {
    getNavProducts,
    clearNavCache,
};
