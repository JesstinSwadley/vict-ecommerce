const express = require("express");
const router = express.Router();
const {
	createProduct,
	getAllProducts,
	updateProduct,
	deleteProduct
} = require("../controllers/product.controller");

router.post("/create", createProduct);
router.get("/all-products", getAllProducts);
router.patch("/update", updateProduct);
router.delete("/delete", deleteProduct);

module.exports = router;