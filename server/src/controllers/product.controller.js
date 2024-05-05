const {
	models: { Product },
} = require("../models/db");

const createProduct = async (req, res) => {
	let { product_name, price, storefront_id, quantity, description, style, size, color } = req.body

	try {
		const product = await Product.create({
			product_name,
			price,
			storefront_id,
			quantity,
			description,
			style,
			size,
			color
		});

		return res.status(201).send(product);
	} catch (error) {
		return res.send(error);
	}
};

const getAllProducts = async (req, res) => {
	try {
		const { count, rows } = await Product.findAndCountAll({});

		return res.send(rows);
	} catch (error) {
		return res.send(error);
	}
};

const getStorefrontProducts = async (req, res) => {
	let { storefront_id } = req.query;

	try {
		const { count, rows } = await Product.findAndCountAll({
			where: {
				storefront_id
			}
		});

		return res.send(rows);
	} catch (error) {
		return res.send(error);
	}
}

const updateProduct = async (req, res) => {
	let { product_name, price, product_id, quantity, description, style, size, color } = req.body

	try {
		await Product.update(
			{
				product_name,
				price,
				quantity,
				description,
				style,
				size,
				color
			},
			{
				where: {
					id: product_id,
				},
			}
		);

		if (result[0] !== 0) {
			return res.send("Product updated successfully");
		}

		return res.status(404).send("Product not found.");	
	} catch (error) {
		return res.send(error);
	}
};

const deleteProduct = async (req, res) => {
	let id = req.query.product_id;

	try {
		await Product.destroy({
			where: {
				id,
			},
		});
		if (result[0] !== 0) {
			return res.send("Product deleted successfully");
		}

		return res.status(404).send("Product not found.");	
	} catch (error) {
		return res.send(error);
	}
};

module.exports = {
	createProduct,
	getAllProducts,
	getStorefrontProducts,
	updateProduct,
	deleteProduct,
};
