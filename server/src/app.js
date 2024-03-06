const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./models/db");

// Express Configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// IIFE to sequelize sync
(async () => {
	await db.sequelize.sync();
})();

// Router
const sellerRoutes = require("./router/seller.routes");

// Routes
app.use("/sellers", sellerRoutes);

app.listen(PORT, () => {
	console.log(`Server is on Port ${PORT}`);
});
