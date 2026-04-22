const express = require("express");
const { addService, getServices, deleteService } = require("../controllers/serviceController");

const router = express.Router();

router.post("/", addService);
router.get("/", getServices);
router.delete("/:id", deleteService);

module.exports = router;
