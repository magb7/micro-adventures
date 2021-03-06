const express = require("express");
const router = express.Router();

const citiesController = require("../controllers/cities");

// Get all cities
router.get("/", citiesController.getCities);

// Create new city
router.post("/", citiesController.createCity);

// Update city
// router.put("/:id", citiesController.updateCity);

module.exports = router;
