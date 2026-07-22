const connectProduct = (product) => {
    if (!product) return null;

    return {
        id: product._id,

        basicInfo: product.basicInfo,

        hero: product.hero,

        overview: product.overview,

        features: product.features,

        howItWorks: product.howItWorks,

        models: product.models,

        resources: product.resources,

        faq: product.faq,

        seo: product.seo,

        status: product.status,
    };
};

const connectProducts = (products = []) => {
    return products.map(connectProduct);
};

module.exports = {
    connectProduct,
    connectProducts,
};