module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Documents', {
		type: {
			type: DataTypes.STRING,
			allowNull: false
		},
		filePath: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	})
}
