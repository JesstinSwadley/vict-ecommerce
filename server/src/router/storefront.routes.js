const express = require("express");
const router = express.Router();

const authCheck = require("../middleware/authCheck.middleware");
const {
	createStorefront,
	getStorefront,
	updateStorefront,
	deleteStorefront
} = require("../controllers/storefront.controller");

router.post("/create", authCheck, createStorefront);
router.get("/get-store", getStorefront);
router.patch("/update", authCheck, updateStorefront);
router.delete("/delete", authCheck, deleteStorefront);


module.exports = router;