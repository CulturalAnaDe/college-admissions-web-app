const { Benefit } = require('../models')

const catchAsync = require('../utils/catchAsync')
const httpError = require('../utils/httpError')

exports.getAllBenefit = catchAsync(async (req, res) => {
	const benefit = await Benefit.findAll()
	res.json(benefit)
})

exports.createBenefit = catchAsync(async (req, res) => {
	const { name, description } = req.body
	const benefit = await Benefit.create({ name, description })
	res.status(201).json(benefit)
})

exports.updateBenefit = catchAsync(async (req, res) => {
	const { id } = req.params
	const [updatedRows] = await Benefit.update(req.body, { where: { id } })
	if (!updatedRows) throw httpError('Льготы не существует', 404)

	const updateBenefit = await Benefit.findByPk(id)
	res.json(updateBenefit)
})

exports.deleteBenefit = catchAsync(async (req, res) => {
	const { id } = req.params
	const benefit = await Benefit.findByPk(id)
	if (!benefit) throw httpError('Льготы не существует', 404)

	await benefit.destroy()
	res.json({ message: 'Льгота удалена!' })
})
