const { EducationInfo, Applicant } = require('../models')

const catchAsync = require('../utils/catchAsync')
const httpError = require('../utils/httpError')

exports.getEducationInfo = catchAsync(async (req, res) => {
	const education = await EducationInfo.findAll()
	res.json(education)
})

exports.getEducationInfoById = catchAsync(async (req, res) => {
	const { id } = req.params
	const education = await EducationInfo.findByPk(id)

	if (!education) throw httpError('Образование отсутствует', 404)
	res.json(education)
})

exports.createEducationInfo = catchAsync(async (req, res) => {
	const { applicantId } = req.params
	const { baseClass, honorsCertificate, graduationYear, educationLanguage } =
		req.body

	const applicant = await Applicant.findByPk(applicantId)
	if (!applicant) throw httpError('Абитуриент не найден', 404)

	const education = await EducationInfo.create({
		baseClass,
		honorsCertificate,
		graduationYear,
		educationLanguage,
		ApplicantId: applicant.id
	})
	res.status(201).json(education)
})

exports.deleteEducationInfo = catchAsync(async (req, res) => {
	const { id } = req.params
	const education = await EducationInfo.findByPk(id)
	if (!education) throw httpError('Образование отсутствует', 404)
	await education.destroy()
	res.json({ message: 'Образование удалено' })
})

exports.updateEducationInfo = catchAsync(async (req, res) => {
	const { id } = req.params
	const [updatedRows] = await EducationInfo.update(req.body, { where: { id } })
	if (updatedRows === 0) {
		throw httpError('Образование отсутствует', 404)
	}

	const updatedEducation = await EducationInfo.findByPk(id)
	res.json(updatedEducation)
})
