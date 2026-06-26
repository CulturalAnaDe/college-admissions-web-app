const httpError = require('../utils/httpError')

const requireAuth = (req, res, next) => {
	if (!req.session?.user) throw httpError('Нужна авторизация', 401)

	next()
}

const requireSuperAdmin = (req, res, next) => {
	if (!req.session?.user) throw httpError('Нужна авторизация', 401)

	if (req.session?.user.role !== 'superadmin') {
		return next(
			httpError(
				'Недостаточно прав. Доступно только главному администратору',
				403
			)
		)
	}

	next()
}

module.exports = { requireAuth, requireSuperAdmin }
