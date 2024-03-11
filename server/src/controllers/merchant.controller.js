const {
	models: { Merchant },
} = require("../models/db");

const registerMerchant = async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	try {
		const merchant = await Merchant.create({
			email,
			password,
		});

		return res.send(merchant);
	} catch (error) {
		return res.send(error);
	}
};

const loginMerchant = async (req, res) => {
	let email = req.body.email;
	try {
		const merchant = await Merchant.findOne({
			where: { email },
		});

		if (!merchant) {
			return res.send("Incorrect Email or Password");
		}
		console.log("Merchant found, ID:", merchant.id);
		return res.json({ message: "Welcome to the server", id: merchant.id });
	} catch (error) {
		return res.send(error);
	}
};

module.exports = { registerMerchant, loginMerchant };
