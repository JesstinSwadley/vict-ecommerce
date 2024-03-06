const {
	models: { Product }
} = require("../models/product.model");

const createProduct = async (req, res) => {
	let product_name = req.body.product_name;
	let price = req.body.price;

	try {
		const product = await Product.create({
			product_name,
			price
		});

		return res.send(product);
	} catch (error) {
		return res.send(error);
	}
}

const getAllProducts = async (req, res) => {
	try {
		const {count, rows} = await Product.findAndCountAll({});

		return res.send(rows);
	} catch (error) {
		return res.send(error);
	}
}

const updateProduct = async (req, res) => {
	let product_name = req.body.product_name;
	let price = req.body.price;
	let id = req.body.product_id;

	try {
		const product = await Product.update({
			product_name,
			price
		}, {
			where: {
				id
			}
		});

		return res.send(product);
	} catch (error) {
		return res.send(error);
	}
}

const deleteProduct = async (req, res) => {
	let id = req.query.product_id

	try {
		await Product.destroy({
			where: {
				id
			}
		});

		return res.send("Product was deleted");
	} catch (error) {
		return res.send(error);
	}
}

module.exports = { createProduct, getAllProducts, updateProduct, deleteProduct }