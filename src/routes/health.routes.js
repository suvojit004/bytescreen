const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    service: "Bytescreen API",
    status: "healthy",
    timestamp: new Date(),
  });
});

module.exports = router;