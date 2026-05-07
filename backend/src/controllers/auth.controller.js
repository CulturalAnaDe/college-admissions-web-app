const crypto = require('crypto')

const catchAsync = require('../utils/catchAsync')
const httpError = require('../utils/httpError')

const pendingCodes = new Map()

const ALLOWED_IDS = process.env.ALLOWED_IDS
	? process.env.ALLOWED_IDS.split(',').map(id => id.trim())
	: []

const sendCode = catchAsync(async (req, res) => {
	const { telegramId } = req.body

	if (!telegramId) throw httpError('Введите свой TelegramId', 400)

	const id = String(telegramId)

	if (!ALLOWED_IDS.includes(id)) throw httpError('Нет доступа', 403)
	const code = crypto.randomInt(100000, 999999).toString()

	pendingCodes.set(id, {
		code,
		expiresAt: Date.now() + 5 * 60 * 1000
	})

	const response = await fetch(
		`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: id,
				text: `Ваш код для входа: *${code}*\n\nКод действителен 5 минут. Никому не сообщайте его.`,
				parse_mode: 'Markdown'
			})
		}
	)

	const data = await response.json()

	if (!data.ok)
		throw httpError('Не удалось отправить сообщение, напишите боту /start', 500)

	res.json({ message: 'Код отправлен в Telegram' })
})

const verifyCode = catchAsync(async (req, res) => {
	const { telegramId, code } = req.body
	const id = String(telegramId)
	const pending = pendingCodes.get(id)

	if (!pending) throw httpError('Сначала запросите код', 400)

	if (Date.now() > pending.expiresAt) {
		pendingCodes.delete(id)
		throw httpError('Код истек, запросите новый', 400)
	}

	if (pending.code !== code.trim()) throw httpError('Неверный код', 400)

	pendingCodes.delete(id)

	req.session.user = { telegramId: id }

	res.json()
})

const me = (req, res) => {
	res.json({ user: req.session.user || null })
}

const logout = catchAsync(async (req, res) => {
	req.session.destroy()
	res.json()
})

module.exports = { sendCode, verifyCode, me, logout }
