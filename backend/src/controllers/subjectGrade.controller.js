const { SubjectGrade, Applicant } = require('../models')

const catchAsync = require('../utils/catchAsync')
const httpError = require('../utils/httpError')

exports.getSubjectGrade = catchAsync(async (req, res) => {
	const grade = await SubjectGrade.findAll()
	res.json(grade)
})

exports.createSubjectGrade = catchAsync(async (req, res) => {
	const { applicantId } = req.params
	const { subjectName, grade } = req.body

	const applicant = await Applicant.findByPk(applicantId)
	if (!applicant) throw httpError('Абитуриента не существует', 404)

	const subGrade = await SubjectGrade.create({
		subjectName,
		grade,
		ApplicantId: applicantId
	})
	res.status(201).json(subGrade)
})

exports.updateSubjectGrade = catchAsync(async (req, res) => {
	const { id } = req.params
	const [updatedRows] = await SubjectGrade.update(req.body, { where: { id } })
	if (updatedRows === 0) {
		throw httpError('Оценка отсутствует', 404)
	}

	const updatedGrade = await SubjectGrade.findByPk(id)
	res.json(updatedGrade)
})

exports.deleteSubjectGrade = catchAsync(async (req, res) => {
	const { id } = req.params
	const grade = await SubjectGrade.findByPk(id)
	if (!grade) throw httpError('Оценок нет', 404)

	await grade.destroy()
	res.json('Оценки удалены')
})
