module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Specialty', {
		code: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	})
}
