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

		res.send(seller);
	} catch (error) {
		res.send(error);
	}
};

const loginSeller = async (req, res) => {
	let email = req.body.email;

	try {
		const seller = await Seller.findOne({
			where: { email }
		});

		if(!seller) {
			res.send("Incorrect Email or Password");
		}

		res.send("Welcome to the server")
	} catch (error) {
		res.send(error);
	}
}

module.exports = { registerSeller, loginSeller };
