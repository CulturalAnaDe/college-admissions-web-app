module.exports = (sequelize, DataTypes) => {
	return sequelize.define('LegalRepresentative', {
		lastName: { type: DataTypes.STRING, allowNull: false },
		firstName: { type: DataTypes.STRING, allowNull: false },
		middleName: { type: DataTypes.STRING, allowNull: true },
		phone: { type: DataTypes.STRING, allowNull: false },
		role: { type: DataTypes.ENUM('mother', 'father', 'guardian') }
	})
}
