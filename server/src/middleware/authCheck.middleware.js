module.exports = (req, res, next) => {
	console.log("authCheck middleware triggered");
	
	if (!req.session) {
		console.error("Session object is missing");
		return res.status(500).json({ error: "Internal server error" });
	}

	try {
		if (req.session.userId) {
			console.log(`User authenticated with ID: ${req.session.userId}`);
			next();
		} else {
			console.log("User not authenticated. Redirecting to login.");
			res.status(401).json({ error: "Unauthorized. Please login." });
		}
	} catch (error) {
		console.error("Error in authCheck middleware:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
