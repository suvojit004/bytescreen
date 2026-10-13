const router = require("express").Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.status(ready ? 200 : 503).json({
    success: ready,
    service: "Bytescreen API",
    status: ready ? "healthy" : "unavailable",
    timestamp: new Date(),
  });
});

module.exports = router;
