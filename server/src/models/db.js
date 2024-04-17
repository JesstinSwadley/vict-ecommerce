const { Sequelize, DataTypes } = require("sequelize");

// Variable Configs
const db_database = process.env.DB_DATABASE;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOST;

const sequelize = new Sequelize(db_database, db_user, db_password, {
	host: db_host,
	dialect: "mysql",
});

// Initalize Sequelize
const db = {};
db.sequelize = sequelize;

// Sequelize Models
db.models = {};
db.models.Merchant = require("./merchant.model")(sequelize, DataTypes);
db.models.Product = require("./product.model")(sequelize, DataTypes);
db.models.Storefront = require("./storefront.model")(sequelize, DataTypes);
db.models.Customer = require("./customer.model")(sequelize, DataTypes);

module.exports = db;
