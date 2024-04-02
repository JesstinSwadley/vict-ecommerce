const {
	models: { Storefront },
} = require("../models/db");

const createStorefront = async (req, res) => {
	let storefront_name = req.body.storefront_name;
	let merchant_id = req.session.userId; // Get the merchant ID from session

	try {
		const storefront = await Storefront.create({
			storefront_name,
			merchant_id,
		});

		console.log("Storefront created, ID:", storefront.id);
		return res.send(storefront);
	} catch (error) {
		console.error("Error creating storefront:", error);
		return res.status(500).send(error.message);
	}
};

const getStorefront = async (req, res) => {
	try {
		const storefronts = await Storefront.findAll({
			where: {
				merchant_id: req.session.userId,
			},
		});
		res.json(storefronts);
	} catch (error) {
		console.error("Error fetching storefronts:", error);
		res.status(500).send(error.message);
	}
};

const updateStorefront = async (req, res) => {
	const { storefront_id, storefront_name } = req.body;
	const merchant_id = req.session.userId;

	try {
		const result = await Storefront.update(
			{ storefront_name },
			{
				where: {
					id: storefront_id,
					merchant_id,
				},
			}
		);

		if (result[0] !== 0) {
			return res.send("Storefront updated successfully");
		}

		return res.status(404).send("Storefront not found or does not belong to the current user.");		
	} catch (error) {
		console.error("Error updating storefront:", error);
		return res.status(500).send(error.message);
	}
};

const deleteStorefront = async (req, res) => {
	const { storefront_id } = req.query;
	const merchant_id = req.session.userId;

	try {
		const result = await Storefront.destroy({
			where: {
				id: storefront_id,
				merchant_id,
			},
		});

		if (result[0] !== 0) {
			return res.send("Storefront deleted successfully");
		}

		return res.status(404).send("Storefront not found or does not belong to the current user.")
	} catch (error) {
		console.error("Error deleting storefront:", error);
		return res.status(500).send(error.message);
	}
};

module.exports = {
	createStorefront,
	getStorefront,
	updateStorefront,
	deleteStorefront,
};
