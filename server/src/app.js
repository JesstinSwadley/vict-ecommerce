const express = require("express");
const cors = require("cors");
const session = require("express-session");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const db = require("./models/db");

// Express Configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "random",
		store: new SequelizeStore({
			db: db.sequelize
		}),
		resave: false,
		proxy: true,
		cookie: {
			maxAge: 60000 * 60,
		}
	}),
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

// Routes
app.use("/merchants", merchantRoutes);
app.use("/products", productRoutes);
app.use("/store", storefrontRoutes);

app.listen(PORT, () => {
	console.log(`Server is on Port ${PORT}`);
});
