export const objApplicant = {
	lastName: {
		label: 'Фамилия',
		placeholder: 'Иванов',
		pattern: /^[a-zа-яё\s-]*$/gi,
		errorMsg: 'Используйте только буквы'
	},
	firstName: {
		label: 'Имя',
		placeholder: 'Иван',
		pattern: /^[a-zа-яё\s-]*$/gi,
		errorMsg: 'Используйте только буквы'
	},
	middleName: {
		label: 'Отчество',
		placeholder: 'Иванович',
		pattern: /^[a-zа-яё\s-]*$/gi,
		errorMsg: 'Используйте только буквы'
	},
	iin: {
		label: 'ИИН',
		placeholder: '850728300123',
		pattern: /^\d{0,12}$/,
		errorMsg: 'ИИН должен состоять из 12 цифр'
	},
	birthDate: {
		label: 'Дата рождения',
		placeholder: '19.03.2007',
		type: 'date'
	},
	gender: {
		label: 'Пол',
		type: 'select',
		options: [
			{ value: 'male', label: 'Мужской' },
			{ value: 'female', label: 'Женский' }
		]
	},
	nationality: {
		label: 'Национальность',
		placeholder: 'Русский',
		pattern: /^[a-zа-яё\s-]*$/gi,
		errorMsg: 'Используйте только буквы'
	},
	citizenship: {
		label: 'Гражданство',
		placeholder: 'Казахстан',
		pattern: /^[a-zа-яё\s-]*$/gi,
		errorMsg: 'Используйте только буквы'
	},
	address: {
		label: 'Адрес',
		placeholder: 'ул. Шакарима, д. 15, кв. 45.'
	},
	phone: {
		label: 'Телефон абитуриента',
		placeholder: '+7 701 123 4567',
		pattern: /^[0-9+\s()-]*$/,
		errorMsg: 'Некорректный формат телефона'
	},
	email: {
		label: 'Почта',
		placeholder: 'ivan@mail.ru',
		pattern: /^[a-zA-Z0-9@._-]*$/,
		errorMsg: 'Недопустимые символы в почте'
	}
}
