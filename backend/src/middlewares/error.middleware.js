function errorHandler(err, req, res, next) {
	if (res.headersSent) {
		return next(err)
	}

	const status = err.status || 500
	const message = err.message || 'Сервер не отвечает'

	console.error(`[Error] ${status} - ${message}`)

	res.status(status).json({ error: message })
}

module.exports = errorHandler
