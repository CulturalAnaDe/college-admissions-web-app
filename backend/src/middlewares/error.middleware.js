function errorHandler(err, req, res, next) {
	const status = err.status || 500
	const message = err.message || 'Сервер не отвечает'

	res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
	res.header('Access-Control-Allow-Credentials', 'true')

	res.status(status).json({ error: message })
}

module.exports = errorHandler
