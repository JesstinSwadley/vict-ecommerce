const express = require("express");
const router = express.Router();

const authCheck = require("../middleware/authCheck.middleware");
const {
	createProduct,
	getAllProducts,
	updateProduct,
	deleteProduct
} = require("../controllers/product.controller");

router.post("/create", authCheck, createProduct);
router.get("/all-products", getAllProducts);
router.patch("/update", authCheck, updateProduct);
router.delete("/delete", authCheck, deleteProduct);

module.exports = router;