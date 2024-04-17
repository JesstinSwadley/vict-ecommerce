const bcrypt = require("bcrypt");
const {
	models: { Customer }
} = require("../models/db");

const registerCustomer = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	const saltRounds = 10;

	try {
		const hashPassword = await bcrypt.hash(password, saltRounds);

		const customer = await Customer.create({
			firstName,
			lastName,
			email,
			password: hashPassword
		});

		req.session.userId = customer.id;
		return res.status(200).send({message: "Registration successful", customer});
	} catch (error) {
		console.error("Registration error:", error);
		return res.status(500).send(error.message);
	}
}

const loginCustomer = async (req, res) => {
	const { email, password } = req.body;

	try {
		const customer = await Customer.findOne({ where: { email } });
		const passwordMatch = await bcrypt.compare(password, customer.password);

		if (customer == null || !passwordMatch) {
			return res.status(401).send("Incorrect Email or Password");
		}

		req.session.userId = customer.id;
		res.status(200).send(customer);
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).send(error.message);
	}
}

const logoutCustomer = async (req, res) => {
	const sId = req.session.id;

	req.session.destroy(sId, () => {
		res.send("Customer has been logged out");
	});
}

module.exports = { registerCustomer, loginCustomer, logoutCustomer };