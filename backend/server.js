require('dotenv').config()
const app = require('./app')
const { sequelize } = require('./src/models')
const { Telegraf } = require('telegraf')
const fs = require('fs')

const PORT = process.env.PORT || 3000

if (!fs.existsSync('./uploads')) {
	fs.mkdirSync('./uploads')
}

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => {
	ctx.reply(
		`Этот бот отправляет коды для входа на сайт.\n
Ваш telegramID: <code>${ctx.from.id}</code>`,
		{ parse_mode: 'HTML' }
	)
})

app.set('bot', bot)
;(async () => {
	try {
		await sequelize.authenticate()
		console.log('База данных подключена')

		//await sequelize.sync({ force: true }) СБРОСИТЬ СТРУКТУРУ БД АККУРАТНО!
		//await sequelize.sync({ alter: true })

		await sequelize.sync()
		console.log('Таблицы синхронизированы')

		bot
			.launch()
			.then(() => console.log('Telegram бот запущен'))
			.catch(err => console.error('Ошибка бота:', err))

		app.listen(PORT, () => {
			console.log(`Сервер работает на порту ${PORT}`)
		})
	} catch (err) {
		console.error('Критическая ошибка при старте:', err)
	}
})()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
