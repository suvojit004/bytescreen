const connectProduct = (product) => {
    if (!product) return null;

    return {
        id: product._id,

        basicInfo: product.basicInfo,

        status: product.status,

        seo: product.seo,

        hero: product.hero,

        overview: product.overview,

        features: product.features,

        benefits: product.benefits,

        models: product.models,

        resources: product.resources || [],

        faq: product.faq || [],

        cta: product.cta,

        createdAt: product.createdAt,

        updatedAt: product.updatedAt,
    };
};

const connectProducts = (products = []) => {
    return products.map(connectProduct);
};

module.exports = {
    connectProduct,
    connectProducts,
};
