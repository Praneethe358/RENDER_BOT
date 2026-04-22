const express = require("express");
const { getServiceAnalytics } = require("../controllers/analyticsController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:serviceId", authMiddleware, getServiceAnalytics);

module.exports = router;
