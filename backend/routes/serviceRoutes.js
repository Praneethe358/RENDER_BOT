const express = require("express");
const { addService, getServices, deleteService } = require("../controllers/serviceController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addService);
router.get("/", authMiddleware, getServices);
router.delete("/:id", authMiddleware, deleteService);

module.exports = router;
