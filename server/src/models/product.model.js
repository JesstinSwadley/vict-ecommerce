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
		},
		storefront_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false
		},
		style: {
			type: DataTypes.STRING,
			allowNull: false
		},
		size: {
			type: DataTypes.STRING,
			allowNull: false
		},
		color: {
			type: DataTypes.STRING,
			allowNull: false
		},
	});

	return Product
}