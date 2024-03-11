const {
	models: { Storefront },
} = require("../models/db");

const createStorefront = async (req, res) => {
	let storefront_name = req.body.storefront_name;
	let merchant_id = req.body.merchant_id;

	try {
		const storefront = await Storefront.create({
			storefront_name,
			merchant_id,
		});

		console.log("Storefront found, ID:", storefront.id);
		return res.send(storefront);
	} catch (error) {
		return res.send(error);
	}
};

const getStorefront = async (req, res) => {
	let merchant_id = req.query.merchant_id;

	try {
		// Fetch all storefronts that belong to a specific merchant
		const storefronts = await Storefront.findAll({
			where: {
				merchant_id: merchant_id, // Corrected to filter by merchant_id
			},
		});

		return res.send(storefronts); // Returns an array of storefronts
	} catch (error) {
		console.error("Error fetching storefronts:", error);
		return res.status(500).send(error.message);
	}
};

const updateStorefront = async (req, res) => {
	let storefront_name = req.body.storefront_name;
	let id = req.body.storefront_id;

	try {
		const storefront = await Storefront.update(
			{
				storefront_name,
			},
			{
				where: {
					id,
				},
			}
		);

		return res.send(storefront);
	} catch (error) {
		return res.send(error);
	}
};

const deleteStorefront = async (req, res) => {
	let id = req.query.storefront_id;

	try {
		await Storefront.destroy({
			where: {
				id,
			},
		});

		return res.send("Storefront was deleted");
	} catch (error) {
		return res.send(error);
	}
};

module.exports = {
	createStorefront,
	getStorefront,
	updateStorefront,
	deleteStorefront,
};
