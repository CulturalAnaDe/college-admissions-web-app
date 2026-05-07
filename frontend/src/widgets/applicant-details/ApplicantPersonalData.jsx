import CustomInput from '@/shared/components/ui/CustomInput'
import { useState } from 'react'

const ApplicantPersonalData = ({ applicant, setApplicant }) => {
	const [error, setError] = useState([])

	const handleChange = (name, e) => {
		const value = e?.target ? e.target.value : e

		const fieldCfg = objApplicant[name]

		if (fieldCfg?.pattern && !fieldCfg.pattern.test(value)) {
			setError(fieldCfg.errorMsg)
			return
		}

		setError('')
		setApplicant(prev => ({
			...(prev || {}),
			[name]: value
		}))
	}

	const objApplicant = {
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
		phone: {
			label: 'Телефон абитуриента',
			placeholder: '+7 701 123 4567',
			pattern: /^[0-9+\s()-]*$/,
			errorMsg: 'Некорректный формат телефона'
		},
		motherPhone: {
			label: 'Телефон матери',
			placeholder: '+7 701 123 4567',
			pattern: /^[0-9+\s()-]*$/,
			errorMsg: 'Некорректный формат телефона'
		},
		fatherPhone: {
			label: 'Телефон отца',
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

	return (
		<div className='border-2 rounded-lg p-4 border-gray-300 dark:bg-[#0A1424] dark:border-[#0E1A29]'>
			<h2 className='text-xl'>Личные данные</h2>
			<div className='grid grid-cols-6 gap-7'>
				{Object.entries(objApplicant).map(
					([key, { label, placeholder, type }]) => (
						<div
							className='flex flex-col'
							key={key}
						>
							<label className='text-[#3B568A]'>{label}</label>
							<CustomInput
								type={type || ''}
								className='border border-[#E0DFDF] rounded-lg p-2'
								name={key}
								placeholder={placeholder}
								value={applicant?.[key] || ''}
								onChange={e => handleChange(key, e)}
							/>
						</div>
					)
				)}
			</div>
			<div className='mt-3 text-[#EF5350]'>{error}</div>
		</div>
	)
}

export default ApplicantPersonalData
