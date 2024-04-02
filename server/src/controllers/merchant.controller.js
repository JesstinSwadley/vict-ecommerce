const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
	models: { Merchant },
} = require("../models/db");

const registerMerchant = async (req, res) => {
	const { email, password, firstName, lastName } = req.body;
	const saltRounds = 10;

	try {
		const hashPassword = await bcrypt.hash(password, saltRounds);

		const merchant = await Merchant.create({
			firstName,
			lastName,
			email,
			password: hashPassword,
		});
		req.session.userId = merchant.id;

		return res
			.status(200)
			.send({ message: "Registration successful", merchant });
	} catch (error) {
		console.error("Registration error:", error);
		return res.status(500).send(error.message);
	}
};

const loginMerchant = async (req, res) => {
	const { email, password } = req.body;

	try {
		const merchant = await Merchant.findOne({ where: { email } });

		if (merchant) {
			const match = await bcrypt.compare(password, merchant.password);
			if (match) {
				req.session.userId = merchant.id;
				req.session.save((err) => {
					if (err) {
						console.error("Session save error:", err);
						return res.status(500).send("Internal Server Error");
					}
					console.log(
						`Session saved for userId: ${req.session.userId}`
					);
					res.status(200).send(merchant);
				});
			} else {
				return res.status(401).send("Incorrect Email or Password");
			}
		} else {
			return res.status(401).send("Incorrect Email or Password");
		}
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).send(error.message);
	}
};

module.exports = { registerMerchant, loginMerchant };
