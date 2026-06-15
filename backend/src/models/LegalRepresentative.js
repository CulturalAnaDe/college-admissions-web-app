module.exports = (sequelize, DataTypes) => {
	return sequelize.define('LegalRepresentative', {
		lastName: { type: DataTypes.STRING, allowNull: true },
		firstName: { type: DataTypes.STRING, allowNull: true },
		middleName: { type: DataTypes.STRING, allowNull: true },
		phone: { type: DataTypes.STRING, allowNull: true },
		role: {
			type: DataTypes.ENUM('mother', 'father', 'guardian'),
			allowNull: true,
			defaultValue: null
		}
	})
}
