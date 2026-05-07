module.exports = (sequelize, DataTypes) => {
	return sequelize.define('SubjectGrade', {
		subjectName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		grade: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 1,
				max: 5
			}
		}
	})
}
