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

const XLSX = require('xlsx')
const fs = require('fs')
const path = require('path')

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
			LegalRepresentative,
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
			LegalRepresentative,
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

exports.uploadApplicantFile = catchAsync(async (req, res) => {
	if (!req.file) throw httpError('Файла не существует', 404)

	const book = XLSX.readFile(req.file.path)
	const sheetName = book.SheetNames[0]
	const sheet = book.Sheets[sheetName]
	const data = XLSX.utils.sheet_to_json(sheet)

	let createdCount = 0

	for (const row of data) {
		if (!row['Фамилия'] || !row['Имя'] || !row['ИИН']) continue

		const t = await sequelize.transaction()

		try {
			const applicant = await Applicant.create(
				{
					lastName: row['Фамилия'].trim(),
					firstName: row['Имя'].trim(),
					middleName: row['Отчество'] ? row['Отчество'].trim() : null,
					iin: String(row['ИИН']).trim(),
					birthDate: row['Дата рождения'],
					gender: row['Пол'],
					nationality: row['Национальность'],
					citizenship: row['Гражданство'],
					address: row['Адрес'],
					phone: row['Телефон абитуриента']
						? String(row['Телефон абитуриента']).trim()
						: null,
					email: row['Почта'] ? row['Почта'].trim() : null,
					status: 'pending'
				},
				{ transaction: t }
			)

			await EducationInfo.create(
				{
					ApplicantId: applicant.id,
					baseClass: row['База (класс)'],
					graduationYear: row['Год окончания'],
					educationLanguage: row['Язык обучения'],
					honorsCertificate: row['Красный диплом'] === 'Да'
				},
				{ transaction: t }
			)

			if (row['Оценки']) {
				const gradesData = []

				const pairs = String(row['Оценки']).split(',')

				for (const pair of pairs) {
					const trimmedPair = pair.trim()

					const [subjectName, grade] = trimmedPair.split('-')

					if (subjectName && grade) {
						gradesData.push({
							ApplicantId: applicant.id,
							subjectName: subjectName,
							grade: +grade
						})
					}
				}

				if (gradesData.length > 0) {
					await SubjectGrade.bulkCreate(gradesData, { transaction: t })
				}
			}

			if (row['Опекун']) {
				await LegalRepresentative.create(
					{
						ApplicantId: applicant.id,
						lastName: row['Имя опекуна'] ? row['Имя опекуна'].trim() : null,
						firstName: row['Фамилия опекуна']
							? row['Фамилия опекуна'].trim()
							: null,
						middleName: row['Отчество опекуна']
							? row['Отчество опекуна'].trim()
							: null,
						phone: row['Телефон опекуна']
							? String(row['Телефон опекуна']).trim()
							: null,
						role: row['Роль опекуна'] ? row['Роль опекуна'].trim() : null
					},
					{ transaction: t }
				)
			}

			if (row['Льготы']) {
				const benefitsData = []

				const benefits = String(row['Льготы'])
					.split(',')
					.map(name => name.trim())

				for (const name of benefits) {
					const [benefit] = await Benefit.findOrCreate({
						where: { name: name },
						transaction: t
					})

					benefitsData.push(benefit)
				}

				await applicant.setBenefits(benefitsData, { transaction: t })
			}

			await t.commit()
			createdCount++
		} catch (err) {
			await t.rollback()
			console.error(`Ошибка при импорте строки с ИИН ${row['ИИН']}:`, err)
		}
	}

	if (fs.existsSync(req.file.path)) {
		fs.unlinkSync(req.file.path)
	}

	res.json({
		message: `Импорт завершен успешно. Добавлено абитуриентов: ${createdCount} из ${data.length}`
	})
})
