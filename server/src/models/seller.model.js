module.exports = (sequelize, DataTypes) => {
	const Seller = sequelize.define("sellers", 
	{
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: {
					msg: "Must be a valid email address"
				}
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false
		}
	});

	return Seller
}