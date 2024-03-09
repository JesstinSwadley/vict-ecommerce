module.exports = (sequelize, DataTypes) => {
	const Storefront = sequelize.define("storefronts", 
	{
		storefront_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		merchant_id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false
		},
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false
		}
	});

	return Storefront
}