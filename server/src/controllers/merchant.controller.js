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
			where: { email }
		});

		if(!merchant) {
			return res.send("Incorrect Email or Password");
		}

		return res.send("Welcome to the server");
	} catch (error) {
		return res.send(error);
	}
}

module.exports = { registerMerchant, loginMerchant };
