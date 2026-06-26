module.exports = (sequelize, DataTypes) => {
	return sequelize.define('User', {
		telegramId: { type: DataTypes.STRING, allowNull: false, unique: true },
		role: {
			type: DataTypes.ENUM('superadmin', 'moderator', 'user'),
			allowNull: false
		}
	})
}
