const bcrypt = require("bcrypt");
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
		return res.status(200).send({ message: "Registration successful", merchant });
	} catch (error) {
		console.error("Registration error:", error);
		return res.status(500).send(error.message);
	}
};

const loginMerchant = async (req, res) => {
	const { email, password } = req.body;

	try {
		const merchant = await Merchant.findOne({ where: { email } });
		const passwordMatch = await bcrypt.compare(password, merchant.password);

		if (merchant == null || !passwordMatch) {
			return res.status(401).send("Incorrect Email or Password");
		}

		req.session.userId = merchant.id;
		res.status(200).send(merchant);
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).send(error.message);
	}
};

const logoutMerchant = async (req, res) => {
	const sId = req.session.id;

	req.session.destroy(sId, () => {
		res.send("Merchant has been logged out");
	});
}

module.exports = { registerMerchant, loginMerchant, logoutMerchant };
