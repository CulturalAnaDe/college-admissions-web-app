module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Group', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		year: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		language: {
			type: DataTypes.ENUM('ru', 'kz'),
			allowNull: false
		}
	})
}
