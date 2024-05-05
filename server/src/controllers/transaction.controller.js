const {
	models: { Transaction, Product },
} = require("../models/db");

const createTransaction = async (req, res) => {
	const { total, product_id } = req.body;
	const customer_id = req.session.userId;

	try {
		const transaction = await Transaction.create({
			total,
			product_id,
			customer_id,
		});

		let product = await Product.findOne({
			where: {
				id: product_id
			}
		});

		await product.decrement(["quantity"], { by: 1});

		return res.send(transaction);
	} catch (error) {
		console.error("Error creating transaction:", error);
		return res.status(500).send("Internal Server Error");
	}
};

const getAllCustomerTransactions = async (req, res) => {
	const customer_id = req.session.userId;

	let { count, rows } = await Transaction.findAndCountAll({
		where: { customer_id },
	});

	return res.send(rows);
};

const refundTransaction = async (req, res) => {
	let id = req.query.transaction_id;

	try {
		await Transaction.destroy({
			where: {
				id,
			},
		});
		if (result[0] !== 0) {
			return res.send("Transaction refund successfully");
		}

		return res.status(404).send("Transaction not found.");
	} catch (error) {
		return res.send(error);
	}
};

module.exports = {
	createTransaction,
	getAllCustomerTransactions,
	refundTransaction,
};
