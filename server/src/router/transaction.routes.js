const express = require("express");
const router = express.Router();

const authCheck = require("../middleware/authCheck.middleware");
const {
	createTransaction,
	getAllCustomerTransactions,
	refundTransaction
} = require("../controllers/transaction.controller");

router.post("/purchase", authCheck, createTransaction);
router.get("/get-all", authCheck, getAllCustomerTransactions);
router.delete("/refund", authCheck, refundTransaction);

module.exports = router;