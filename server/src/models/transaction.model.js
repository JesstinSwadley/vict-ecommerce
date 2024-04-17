module.exports = (sequelize, DataTypes) => {
	const Transaction = sequelize.define("transactions", 
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		total: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false
		},
		customer_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		product_id: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	return Transaction
}