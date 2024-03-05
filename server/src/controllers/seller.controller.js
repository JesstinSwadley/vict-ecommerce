const {
	models: { Seller },
} = require("../models/db");

const createSeller = async (req, res) => {
	console.log(req.body);
	let email = req.body.email;
	let password = req.body.password;

	try {
		const seller = await Seller.create({
			email,
			password,
		});

		res.send(seller);
	} catch (error) {
		res.send(error);
	}
};

module.exports = { createSeller };
