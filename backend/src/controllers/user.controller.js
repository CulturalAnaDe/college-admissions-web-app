const { User } = require('../models')

const catchAsync = require('../utils/catchAsync')
const httpError = require('../utils/httpError')

exports.getUserAll = catchAsync(async (req, res) => {
	const users = await User.findAll()
	res.json(users)
})

exports.addUser = catchAsync(async (req, res) => {
	const { telegramId, role } = req.body

	const user = await User.create({
		telegramId,
		role
	})

	res.status(201).json(user)
})

exports.deleteUser = catchAsync(async (req, res) => {
	const { id } = req.params
	const user = await User.findByPk(id)

	if (!user) throw httpError('Пользователя не существует', 404)

	await user.destroy()
	res.json({ message: 'Пользователь удален' })
})
