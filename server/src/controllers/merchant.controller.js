const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
	models: { Merchant },
} = require("../models/db");

const privateKey = "your_secret_private_key";

const registerMerchant = async (req, res) => {
	const saltRounds = 10;
	const email = req.body.email;
	const password = req.body.password;

	try {
		const hashPassword = await bcrypt.hash(password, saltRounds);

		const merchant = await Merchant.create({
			email,
			password: hashPassword,
		});

		const token = jwt.sign({ merchantId: merchant.id }, privateKey, {
			expiresIn: "1h",
		});

		return res.json({ token });
	} catch (error) {
		console.error("Registration error:", error);
		return res.status(500).send(error.message);
	}
};

const loginMerchant = async (req, res) => {
	const email = req.body.email;
	const merchantPassword = req.body.password;

	try {
		const merchant = await Merchant.findOne({ where: { email } });

		if (merchant) {
			const match = await bcrypt.compare(
				merchantPassword,
				merchant.password
			);
			if (match) {

				req.session.userId = merchant.id

				return res.status(200).send(merchant);

				// const token = jwt.sign(
				// 	{ merchantId: merchant.id },
				// 	privateKey,
				// 	{ expiresIn: "1h" }
				// );

				// return res.json({ token });
			}
		}

		return res.status(401).send("Incorrect Email or Password");
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).send(error.message);
	}
};

module.exports = { registerMerchant, loginMerchant };
