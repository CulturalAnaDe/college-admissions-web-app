module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Benefit', {
		name: { type: DataTypes.STRING, allowNull: false, unique: true },
		description: DataTypes.TEXT
	})
}
