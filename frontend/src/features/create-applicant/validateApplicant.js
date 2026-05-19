const validateApplicant = values => {
	const errors = {}
	errors.EducationInfo = {}

	if (!values.firstName) {
		errors.firstName = 'Имя не заполнено'
	} else if (!/^[A-Za-zА-Яа-я]+$/.test(values.firstName)) {
		errors.firstName = 'Имя должно состоять только из букв'
	}

	if (!values.lastName) {
		errors.lastName = 'Фамилия не заполнена'
	} else if (!/^[A-Za-zА-Яа-я]+$/.test(values.lastName)) {
		errors.lastName = 'Фамилия должна состоять только из букв'
	}
	if (!values.iin) {
		errors.iin = 'ИИН не заполнен'
	} else if (!/^\d{12}$/.test(values.iin)) {
		errors.iin = 'ИИН должен состоять из 12 цифр'
	}

	if (!values.address) {
		errors.address = 'Адрес не заполнен'
	}

	if (!values.birthDate) errors.birthDate = 'Дата рождения не заполнена'
	if (!values.phone) {
		errors.phone = 'Телефон не заполнен'
	} else if (!/^\+\d{10,12}$/.test(values.phone)) {
		errors.phone = 'Телефон несоответствует стандартам'
	}

	if (!values.email) {
		errors.email = 'Почта не заполнена'
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
		errors.email = 'Почта несоответствует стандартам'
	}

	if (!values?.EducationInfo?.baseClass) {
		errors.EducationInfo.baseClass = 'Класс не заполнен'
	}

	if (!values?.EducationInfo?.graduationYear) {
		errors.EducationInfo.graduationYear = 'Год не заполнен'
	}

	if (!values?.EducationInfo?.educationLanguage) {
		errors.EducationInfo.educationLanguage = 'Язык не заполнен'
	}

	if (!values?.EducationInfo?.honorsCertificate) {
		errors.EducationInfo.honorsCertificate = 'Диплом не заполнен'
	}

	if (Object.keys(errors.EducationInfo).length === 0) {
		delete errors.EducationInfo
	}

	return errors
}

export default validateApplicant
