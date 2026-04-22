const express = require("express");
const { getServiceAnalytics } = require("../controllers/analyticsController");

const router = express.Router();

router.get("/:serviceId", getServiceAnalytics);

module.exports = router;
