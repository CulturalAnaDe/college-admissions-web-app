const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Applicant = require('./Applicant')(sequelize, DataTypes)
const EducationInfo = require('./EducationInfo')(sequelize, DataTypes)
const SubjectGrade = require('./SubjectGrade')(sequelize, DataTypes)
const Document = require('./Document')(sequelize, DataTypes)
const Specialty = require('./Specialty')(sequelize, DataTypes)
const Qualification = require('./Qualification')(sequelize, DataTypes)
const Group = require('./Group')(sequelize, DataTypes)
const Benefit = require('./Benefit')(sequelize, DataTypes)
const LegalRepresentative = require('./LegalRepresentative')(
	sequelize,
	DataTypes
)

Applicant.hasOne(LegalRepresentative, { onDelete: 'CASCADE' })
LegalRepresentative.belongsTo(Applicant)

Specialty.hasMany(Qualification, { onDelete: 'CASCADE' })
Qualification.belongsTo(Specialty)

Qualification.hasMany(Applicant)
Applicant.belongsTo(Qualification)

Applicant.hasOne(EducationInfo, { onDelete: 'CASCADE' })
EducationInfo.belongsTo(Applicant)

Applicant.hasMany(SubjectGrade, { onDelete: 'CASCADE' })
SubjectGrade.belongsTo(Applicant)

Applicant.hasMany(Document, { onDelete: 'CASCADE' })
Document.belongsTo(Applicant)

Specialty.hasMany(Group, { onDelete: 'CASCADE' })
Group.belongsTo(Specialty)

Group.hasMany(Applicant)
Applicant.belongsTo(Group)

Applicant.belongsToMany(Benefit, { through: 'ApplicantBenefit' })
Benefit.belongsToMany(Applicant, { through: 'ApplicantBenefit' })

module.exports = {
	sequelize,
	Applicant,
	EducationInfo,
	SubjectGrade,
	Document,
	Specialty,
	Qualification,
	Group,
	Benefit,
	LegalRepresentative
}
