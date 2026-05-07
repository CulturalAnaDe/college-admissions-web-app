const { Group } = require('../models')

const catchAsync = require('../utils/catchAsync')
const httpError = require('../utils/httpError')

exports.getAllGroup = catchAsync(async (req, res) => {
	const groups = await Group.findAll()
	res.json(groups)
})

exports.getGroupById = catchAsync(async (req, res) => {
	const { id } = req.params
	const group = await Group.findByPk(id)
	if (!group) throw httpError('Группы не существует', 404)
	res.json(group)
})

exports.createGroup = catchAsync(async (req, res) => {
	const { name, year, language, SpecialtyId } = req.body
	const groups = await Group.create({ name, year, language, SpecialtyId })
	res.status(201).json(groups)
})

exports.updateGroup = catchAsync(async (req, res) => {
	const { id } = req.params
	const [updatedGroup] = await Group.update(req.body, { where: { id } })
	if (!updatedGroup) throw httpError('Группы не существует', 404)

	res.json(updatedGroup)
})

exports.deleteGroup = catchAsync(async (req, res) => {
	const { id } = req.params
	const group = await Group.findByPk(id)
	if (!group) throw httpError('Группы не существует', 404)

	await Group.destroy({ where: { id } })
	res.json({ message: 'Группа удалена!' })
})
