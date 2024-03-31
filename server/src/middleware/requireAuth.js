const requireAuth = (req, res, next) => {
	if (req.session.userId) {
		next();
	} else {
		res.status(400).send("Please login");
	}
}

module.exports = { requireAuth };