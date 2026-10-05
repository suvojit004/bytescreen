const { ZodError } = require("zod");

// API endpoints always answer with JSON, even for browser requests
const API_PREFIXES = [
  "/api",
  "/products/api",
  "/leads",
  "/users",
  "/createuser",
];

// Show the 404 page to browsers visiting a website URL
const wantsPage = (req) =>
  req.method === "GET" &&
  !API_PREFIXES.some((prefix) => req.path.startsWith(prefix)) &&
  req.accepts(["html", "json"]) === "html";

const renderNotFound = (req, res) => {
  res.status(404).render(
    "404",
    {
      title: "Page not found | Bytescreen",
      description: "The page you were looking for could not be found.",
      noIndex: true,
    },
    (renderError, html) => {
      // If the page itself fails to render, fall back to JSON
      if (renderError) {
        return res.json({ success: false, message: "Page not found" });
      }
      res.send(html);
    }
  );
};

const errorHandler = (err, req, res, next) => {

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      errors: err.issues.map(
        (issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })
      ),
    });
  }

  // Use a status set earlier (e.g. 404 from notFound) when the error has none of its own
  const statusCode =
    err.statusCode ||
    (res.statusCode >= 400 ? res.statusCode : 500);

  if (statusCode === 404 && wantsPage(req)) {
    return renderNotFound(req, res);
  }

  const message =
    err.message ||
    "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;