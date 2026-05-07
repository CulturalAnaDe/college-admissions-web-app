const { Specialty, Qualification, Group } = require('../models')

const catchAsync = require('../utils/catchAsync')
const httpError = require('../utils/httpError')

exports.getAllSpecialties = catchAsync(async (req, res) => {
	const specialties = await Specialty.findAll({
		include: [Qualification, Group]
	})
	res.json(specialties)
})

exports.getSpecialtiesById = catchAsync(async (req, res) => {
	const { id } = req.params
	const specialty = await Specialty.findByPk(id)
	if (!specialty) throw httpError('Специальности не существует', 404)
	res.json(specialty)
})

exports.createSpecialty = catchAsync(async (req, res) => {
	const { code, name } = req.body
	const specialty = await Specialty.create({ code, name })
	res.status(201).json(specialty)
})

exports.updateSpecialty = catchAsync(async (req, res) => {
	const { id } = req.params
	const [updatedRows] = await Specialty.update(req.body, { where: { id } })
	if (!updatedRows) throw httpError('Специальности не существует', 404)

	const updateSpecialty = await Specialty.findByPk(id)
	res.json(updateSpecialty)
})

exports.deleteSpecialty = catchAsync(async (req, res) => {
	const { id } = req.params
	const specialty = await Specialty.findByPk(id)
	if (!specialty) throw httpError('Специальности не существует', 404)

	await specialty.destroy()
	res.json({ message: 'Специальность удалена!' })
})
