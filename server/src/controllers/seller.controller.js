const {
	models: { Seller },
} = require("../models/db");

const registerSeller = async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	try {
		const seller = await Seller.create({
			email,
			password,
		});

		return res.send(seller);
	} catch (error) {
		return res.send(error);
	}
};

const loginSeller = async (req, res) => {
	let email = req.body.email;

	try {
		const seller = await Seller.findOne({
			where: { email }
		});

		if(!seller) {
			return res.send("Incorrect Email or Password");
		}

		return res.send("Welcome to the server");
	} catch (error) {
		return res.send(error);
	}
}

module.exports = { registerSeller, loginSeller };
