const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const {
	createProduct,
	getAllProducts,
	updateProduct,
	deleteProduct
} = require("../controllers/product.controller");

router.post("/create", requireAuth, createProduct);
router.get("/all-products", getAllProducts);
router.patch("/update", requireAuth, updateProduct);
router.delete("/delete", requireAuth, deleteProduct);

module.exports = router;