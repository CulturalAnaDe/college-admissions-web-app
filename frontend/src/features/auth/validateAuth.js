const validateAuth = (values, step) => {
	const errors = {}

	if (step === 'id') {
		if (!values.telegramId) {
			errors.telegramId = 'Telegram ID не заполнен'
		} else if (!/^\d+$/.test(values.telegramId)) {
			errors.telegramId = 'Telegram ID должен содержать только цифры'
		}
	}

	if (step === 'code') {
		if (!values.code) {
			errors.code = 'Код не заполнен'
		} else if (!/^\d+$/.test(values.code)) {
			errors.code = 'Код должен содержать только цифры'
		}
	}

	return errors
}

export default validateAuth
