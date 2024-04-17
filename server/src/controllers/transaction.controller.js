const {
	models: { Transaction }
} = require("../models/db");

const createTransaction = async (req, res) => {
	const { total, product_id, customer_id } = req.body;

	try {
		const transaction = await Transaction.create({
			total,
			product_id,
			customer_id
		});

		return res.status(201).send("Transaction complete");
	} catch (error) {
		return res.send(error);
	}
};

const getAllCustomerTransactions = async (req, res) => {
	const customer_id = req.body.customer_id
	
	let { count, rows } = await Transaction.findAndCountAll({ where: { customer_id }});

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
}

module.exports = {
	createTransaction,
	getAllCustomerTransactions,
	refundTransaction
}