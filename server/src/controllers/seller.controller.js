const { models: { Seller } } = require("../models/db");

const createSeller = async (req, res) => {
	let email = req.body.emaill
	let password = req.body.password

	try {
		const seller = await Seller.create({
			email,
			password
		});

		res.send(seller);
	} catch (error) {
		res.send(error);
	}
}