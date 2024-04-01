module.exports = (req, res, next) => {
	try {
		if (req.session.userId) {
			next();
		} else {
			res.status(400).send("Please login");
		}	
	} catch (error) {
		res.send(error);
	}
}