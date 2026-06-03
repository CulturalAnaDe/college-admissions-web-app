module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Applicant', {
		iin: { type: DataTypes.STRING, allowNull: false, unique: true },
		lastName: { type: DataTypes.STRING, allowNull: false },
		firstName: { type: DataTypes.STRING, allowNull: false },
		middleName: { type: DataTypes.STRING, allowNull: true },
		birthDate: { type: DataTypes.DATEONLY, allowNull: false },
		gender: { type: DataTypes.ENUM('male', 'female'), allowNull: false },
		nationality: { type: DataTypes.STRING, allowNull: false },
		citizenship: { type: DataTypes.STRING, allowNull: false },

		address: { type: DataTypes.STRING, allowNull: false },
		phone: { type: DataTypes.STRING, allowNull: false },
		email: { type: DataTypes.STRING, allowNull: false },

		status: {
			type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
			defaultValue: 'pending'
		}
	})
}
