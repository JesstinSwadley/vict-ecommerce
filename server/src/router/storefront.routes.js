const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const {
	createStorefront,
	getStorefront,
	updateStorefront,
	deleteStorefront
} = require("../controllers/storefront.controller");

router.post("/create", requireAuth, createStorefront);
router.get("/get-store", getStorefront);
router.patch("/update", requireAuth, updateStorefront);
router.delete("/delete", requireAuth, deleteStorefront);


module.exports = router;