const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
	models: { Merchant },
} = require("../models/db");


const registerMerchant = async (req, res) => {
	const saltRounds = 10;
	const email = req.body.email;
	const password = req.body.password;

	try {
		const hashPassword = await bcrypt.hash(password, saltRounds);

		const merchant = await Merchant.create({
			email,
			hashPassword
		});

		const token = jwt.sign(
			{ 
				data: merchant 
			}, 
			privateKey,
			{ 
				expiresIn: '1h' 
			}
		);

		return res.send(token);
	} catch (error) {
		return res.send(error);
	}
};

const loginMerchant = async (req, res) => {
	const email = req.body.email;
	const merchantPassword = req.body.password

	try {
		const merchant = await Merchant.findOne({
			where: { email },
		});

		const match = await bcrypt.compare(merchantPassword, merchant.password);

		if (!merchant || !match) {
			return res.send("Incorrect Email or Password");
		}

		const token = jwt.sign(
			{ 
				data: {
					merchantId: merchant.id
				}
			}, 
			privateKey,
			{ 
				expiresIn: '1h' 
			}
		);

		return res.json(token);
	} catch (error) {
		return res.send(error);
	}
};

module.exports = { registerMerchant, loginMerchant };
