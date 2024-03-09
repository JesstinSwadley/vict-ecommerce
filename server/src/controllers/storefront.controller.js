const {
	models: { Storefront}
} = require("../models/db");

const createStorefront = async (req, res) => {
	let storefront_name = req.body.storefront_name;
	let merchant_id = req.body.merchant_id;

	try {
		const storefront = await Storefront.create({
			storefront_name,
			merchant_id
		});

		return res.send(storefront);
	} catch (error) {
		return res.send(error);
	}
};

const getStorefront = async (req, res) => {
	let storefront_id = req.query.storefront_id

	try {
		const storefront = await Project.findOne({ 
			where: { 
				id: storefront_id
			} 
		});

		return res.send(storefront);
	} catch (error) {
		return res.send(error);
	}
}

const updateStorefront = async (req, res) => {
	let storefront_name = req.body.storefront_name;
	let id = req.body.storefront_id;

	try {
		const storefront = await Storefront.update(
			{
				storefront_name
			},
			{
				where: {
					id
				}
			}
		);

		return res.send(storefront);
	} catch (error) {
		return res.send(error);
	}
}

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
	deleteStorefront
}