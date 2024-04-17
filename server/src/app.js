const express = require("express");
const cors = require("cors");
const session = require("express-session");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const db = require("./models/db");

const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true, // Ensures that cookies (like session cookies) are sent with requests from the frontend
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "random", // Ensure you use a strong secret in production
		store: new SequelizeStore({
			db: db.sequelize,
		}),
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 60000 * 60, // Adjust according to your session expiration needs
			secure: false, // Set to true in production when using HTTPS
			sameSite: "Lax", // This is often necessary for cross-origin requests
		},
	})
);

const PORT = process.env.PORT || 3000;

// IIFE to sequelize sync
(async () => {
	await db.sequelize.sync();
})();

// Router
const merchantRoutes = require("./router/merchant.routes");
const productRoutes = require("./router/product.routes");
const storefrontRoutes = require("./router/storefront.routes");
const customerRoutes = require("./router/customer.routes");

// Routes
app.use("/merchants", merchantRoutes);
app.use("/products", productRoutes);
app.use("/store", storefrontRoutes);
app.use("/customer", customerRoutes);

app.listen(PORT, () => {
	console.log(`Server is on Port ${PORT}`);
});
