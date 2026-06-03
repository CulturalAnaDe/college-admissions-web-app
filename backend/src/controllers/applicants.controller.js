const {
	Applicant,
	EducationInfo,
	Qualification,
	Group,
	SubjectGrade,
	Document,
	Benefit,
	LegalRepresentative,
	sequelize
} = require('../models')

const catchAsync = require('../utils/catchAsync')
const httpError = require('../utils/httpError')

exports.getAllApplicants = catchAsync(async (req, res) => {
	const applicant = await Applicant.findAll({
		include: [
			Qualification,
			Group,
			EducationInfo,
			SubjectGrade,
			Document,
			Benefit,
			LegalRepresentative
		]
	})
	res.json(applicant)
})

exports.getApplicantById = catchAsync(async (req, res) => {
	const { id } = req.params
	const applicant = await Applicant.findByPk(id, {
		include: [
			Qualification,
			Group,
			EducationInfo,
			SubjectGrade,
			Document,
			Benefit,
			LegalRepresentative
		]
	})
	if (!applicant) throw httpError('Абитуриента не существует', 404)
	res.json(applicant)
})

exports.createApplicant = catchAsync(async (req, res) => {
	const { benefitIds, ...applicantData } = req.body
	const applicant = await Applicant.create(applicantData)

	if (benefitIds && benefitIds.length > 0) {
		const benefits = await Benefit.findAll({ where: { id: benefitIds } })
		for (const benefit of benefits) {
			await sequelize.models.ApplicantBenefit.create({
				ApplicantId: applicant.id,
				BenefitId: benefit.id
			})
		}
	}

	const result = await Applicant.findByPk(applicant.id, {
		include: [
			Benefit,
			Qualification,
			Group,
			EducationInfo,
			SubjectGrade,
			Document,
			LegalRepresentative
		]
	})

	res.status(201).json(result)
})

exports.updateApplicant = catchAsync(async (req, res) => {
	const { id } = req.params
	const [updatedCount] = await Applicant.update(req.body, { where: { id } })

	if (!updatedCount) throw httpError('Абитуриента не существует', 404)

	const updatedApplicant = await Applicant.findByPk(id, {
		include: [
			Benefit,
			Qualification,
			Group,
			EducationInfo,
			SubjectGrade,
			Document,
			LegalRepresentative
		]
	})
	res.json(updatedApplicant)
})

exports.assignGroup = catchAsync(async (req, res) => {
	const { id } = req.params
	const { GroupId } = req.body
	const applicant = await Applicant.findByPk(id)

	if (!applicant) throw httpError('Абитуриента не существует', 404)
	applicant.GroupId = GroupId
	await applicant.save()

	res.json(applicant)
})

exports.assignQualification = catchAsync(async (req, res) => {
	const { id } = req.params
	const { QualificationId } = req.body

	const applicant = await Applicant.findByPk(id)
	if (!applicant) throw httpError('Абитуриента не существует', 404)

	applicant.QualificationId = QualificationId
	await applicant.save()

	res.json(applicant)
})

exports.deleteApplicant = catchAsync(async (req, res) => {
	const { id } = req.params
	const applicant = await Applicant.findByPk(id)
	if (!applicant) throw httpError('Абитуриента не существует', 404)

	await applicant.destroy()
	res.json({ message: 'Абитуриент удален!' })
})

exports.assignBenefits = catchAsync(async (req, res) => {
	const { id } = req.params
	const { benefitIds } = req.body

	const applicant = await Applicant.findByPk(id)
	if (!applicant) throw httpError('Абитуриента не существует', 404)

	await sequelize.models.ApplicantBenefit.destroy({
		where: { ApplicantId: id }
	})

	if (benefitIds && benefitIds.length > 0) {
		const benefits = await Benefit.findAll({ where: { id: benefitIds } })
		for (const benefit of benefits) {
			await sequelize.models.ApplicantBenefit.create({
				ApplicantId: applicant.id,
				BenefitId: benefit.id
			})
		}
	}

	const result = await Applicant.findByPk(applicant.id, {
		include: [
			Benefit,
			Qualification,
			Group,
			EducationInfo,
			SubjectGrade,
			Document
		]
	})

	res.json(result)
})

exports.updateStatusApplicant = catchAsync(async (req, res) => {
	const { id } = req.params
	const { status } = req.body

	if (!['pending', 'accepted', 'rejected'].includes(status))
		throw httpError('Неверный статус', 400)

	const applicant = await Applicant.findByPk(id)
	if (!applicant) throw httpError('Абитуриента не существует', 404)

	await applicant.update({ status })

	res.json({ message: `Статус изменен на ${status}`, applicant })
})

exports.updateStatusAll = catchAsync(async (req, res) => {
	const applicants = await Applicant.findAll({
		include: [
			EducationInfo,
			SubjectGrade,
			Benefit,
			Document,
			{ model: Qualification }
		]
	})

	const allGroups = await Group.findAll({
		include: [{ model: Applicant }]
	})

	const groupsBySpecialty = {}
	for (const group of allGroups) {
		if (!groupsBySpecialty[group.SpecialtyId]) {
			groupsBySpecialty[group.SpecialtyId] = []
		}
		groupsBySpecialty[group.SpecialtyId].push(group)
	}

	const documentsList = [
		'id_card',
		'certificate',
		'certificate_appendix',
		'ent_certificate',
		'photo',
		'medical_075',
		'fluorography',
		'id_copy'
	]

	for (const applicant of applicants) {
		try {
			const hasEducation = !!applicant.EducationInfo
			const hasGrades = applicant.SubjectGrades?.length > 0

			if (!hasEducation || !hasGrades) {
				applicant.status = 'rejected'
				await applicant.save()
				continue
			}

			const applicantDocumentsTypes = applicant.Documents.map(d => d.type) || []
			const missingDocuments = documentsList.some(
				doc => !applicantDocumentsTypes.includes(doc)
			)
			if (missingDocuments) {
				applicant.status = 'rejected'
				await applicant.save()
				continue
			}

			const specialtyId = applicant.Qualification?.SpecialtyId
			if (!specialtyId) {
				applicant.status = 'rejected'
				await applicant.save()
				continue
			}

			const groups = groupsBySpecialty[specialtyId] || []

			if (!groups.length) {
				applicant.status = 'rejected'
				await applicant.save()
				continue
			}

			let targetGroup = null
			let minStudents = Infinity
			const lang = applicant.EducationInfo?.educationLanguage

			for (const group of groups) {
				const count = group.Applicants?.length || 0
				const groupLang = group.language

				if (groupLang === lang && count < 25 && count < minStudents) {
					minStudents = count
					targetGroup = group
				}
			}

			if (!targetGroup) {
				applicant.status = 'rejected'
				await applicant.save()
				continue
			}

			applicant.status = 'accepted'
			applicant.GroupId = targetGroup.id
			await applicant.save()
		} catch (err) {
			console.error(`Ошибка при обработке абитуриента ${applicant.id}:`, err)
			applicant.status = 'rejected'
			await applicant.save().catch(() => {})
		}
	}

	res.json({ message: 'Зачисление завершено' })
})
