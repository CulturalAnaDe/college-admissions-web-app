module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Qualification', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	})
}
