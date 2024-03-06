module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define("products", 
	{
		product_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		price: {
			type: DataTypes.DECIMAL(10,2),
			allowNull: false
		},
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false
		}
	});

	return Product
}