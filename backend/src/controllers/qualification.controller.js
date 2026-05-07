const { Qualification } = require('../models')

const catchAsync = require('../utils/catchAsync')
const httpError = require('../utils/httpError')

exports.getAllQualifications = catchAsync(async (req, res) => {
	const qualifications = await Qualification.findAll()
	res.json(qualifications)
})

exports.getQualificationById = catchAsync(async (req, res) => {
	const { id } = req.params
	const qualifications = await Qualification.findByPk(id)
	if (!qualifications) throw httpError('Квалификации не существует!', 404)
	res.json(qualifications)
})

exports.createQualification = catchAsync(async (req, res) => {
	const { name, SpecialtyId } = req.body
	const qualifications = await Qualification.create({ name, SpecialtyId })
	res.status(201).json(qualifications)
})

exports.updateQualification = catchAsync(async (req, res) => {
	const { id } = req.params
	const [updatedRows] = await Qualification.update(req.body, {
		where: { id }
	})

	if (!updatedRows) throw httpError('Квалификации не существует!', 404)

	const updatedQualification = await Qualification.findByPk(id)
	res.json(updatedQualification)
})

exports.deleteQualification = catchAsync(async (req, res) => {
	const { id } = req.params
	const qualification = await Qualification.findByPk(id)
	if (!qualification) throw httpError('Квалификации не существует!', 404)

	await qualification.destroy()
	res.json({ message: 'Квалификация удалена!' })
})
