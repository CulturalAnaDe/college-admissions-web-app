module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Applicant', {
		iin: { type: DataTypes.STRING, allowNull: false, unique: true },
		lastName: { type: DataTypes.STRING, allowNull: false },
		firstName: { type: DataTypes.STRING, allowNull: false },
		middleName: { type: DataTypes.STRING, allowNull: false },
		birthDate: { type: DataTypes.DATEONLY, allowNull: false },
		phone: { type: DataTypes.STRING, allowNull: false },
		motherPhone: { type: DataTypes.STRING, allowNull: false },
		fatherPhone: { type: DataTypes.STRING, allowNull: false },
		email: { type: DataTypes.STRING, allowNull: false },
		status: {
			type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
			defaultValue: 'pending'
		}
	})
}
