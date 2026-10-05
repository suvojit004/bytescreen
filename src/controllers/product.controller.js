const asyncHandler = require("../utils/asyncHandler");

const ProductService = require("../services/product.service");
const ProductConnector = require("../connector/product.connector");
const CUSTOMER_GROUPS = require("../data/customers");

const BRAND = "Bytescreen";

// Turn a site-relative URL ("/images/x.png") into an absolute one for SEO tags
const absoluteUrl = (req, url) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    return `${req.protocol}://${req.get("host")}${url.startsWith("/") ? "" : "/"}${url}`;
};

// Title, description, canonical URL, share image and structured data for a product page
const buildPageMeta = (req, product) => {
    const { basicInfo, seo = {}, hero, faq } = product;

    const title = seo.title || `${basicInfo.productName} | ${BRAND}`;
    const description =
        seo.description || basicInfo.shortDescription || hero?.description || "";
    const canonical = absoluteUrl(req, `/products/${basicInfo.productKey}`);
    const heroImage =
        hero?.backgroundImage?.type === "image" ? hero.backgroundImage.url : "";
    const ogImage = absoluteUrl(req, seo.ogImage || heroImage);

    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "Product",
            name: basicInfo.productName,
            description,
            url: canonical,
            brand: { "@type": "Brand", name: BRAND },
            ...(basicInfo.category && { category: basicInfo.category }),
            ...(ogImage && { image: [ogImage] }),
        },
    ];

    if (faq.length) {
        jsonLd.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map(({ question, answer }) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: { "@type": "Answer", text: answer },
            })),
        });
    }

    return {
        title,
        description,
        canonical,
        ogImage,
        noIndex: Boolean(seo.noIndex),
        jsonLd,
    };
};

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
    const product = await ProductService.getPublishedProductByKey(
        req.params.productKey
    );

    res.status(200).json({
        success: true,
        data: ProductConnector.connectProduct(product),
    });
});

const renderProductPage = asyncHandler(async (req, res) => {
    const product = ProductConnector.connectProduct(
        await ProductService.getPublishedProductByKey(req.params.productKey)
    );

    const customerCount = CUSTOMER_GROUPS.reduce(
        (sum, group) => sum + group.customers.length,
        0
    );

    res.render("product", {
        ...buildPageMeta(req, product),
        product,
        customerCount,
        demoUrl: `/demo?product=${encodeURIComponent(product.basicInfo.productName)}`,
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
