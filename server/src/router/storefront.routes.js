const express = require("express");
const router = express.Router();

const {
	createStorefront,
	getStorefront,
	updateStorefront,
	deleteStorefront
} = require("../controllers/storefront.controller");

router.post("/create", createStorefront);
router.get("/get-store", getStorefront);
router.patch("/update", updateStorefront);
router.delete("/delete", deleteStorefront);

module.exports = router;