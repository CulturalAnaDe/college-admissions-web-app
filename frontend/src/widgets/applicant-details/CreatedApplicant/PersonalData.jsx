import CustomInput from '@/shared/components/ui/CustomInput'

const PersonalData = ({ formik }) => {
	const objApplicant = {
		lastName: {
			label: 'Фамилия',
			placeholder: 'Иванов',
			type: 'text'
		},
		firstName: {
			label: 'Имя',
			placeholder: 'Иван',
			type: 'text'
		},
		middleName: {
			label: 'Отчество',
			placeholder: 'Иванович',
			type: 'text'
		},
		iin: {
			label: 'ИИН',
			placeholder: '850728300123',
			type: 'text'
		},
		birthDate: {
			label: 'Дата рождения',
			type: 'date'
		},
		address: {
			label: 'Адрес',
			placeholder: 'Улица такая такая',
			type: 'text'
		},
		phone: {
			label: 'Телефон абитуриента',
			placeholder: '+7 701 123 4567',
			type: 'text'
		},
		motherPhone: {
			label: 'Телефон матери',
			placeholder: '+7 701 123 4567',
			type: 'text'
		},
		fatherPhone: {
			label: 'Телефон отца',
			placeholder: '+7 701 123 4567',
			type: 'text'
		},
		email: {
			label: 'Почта',
			placeholder: 'ivan@mail.ru',
			type: 'email'
		}
	}

	return (
		<div className='border-2 rounded-lg p-4 border-gray-300 dark:bg-[#0A1424] dark:border-[#0E1A29]'>
			<h2 className='text-xl'>Личные данные</h2>
			<div className='grid grid-cols-6 gap-7'>
				{Object.entries(objApplicant).map(([key, cfg]) => (
					<div
						className='flex flex-col'
						key={key}
					>
						<label className='text-[#3B568A]'>{cfg.label}</label>

						<CustomInput
							type={cfg.type || 'text'}
							name={key}
							placeholder={cfg.placeholder}
							value={formik.values[key]}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>

						{formik.touched[key] && formik.errors[key] && (
							<div className='text-[#EF5350] text-sm'>{formik.errors[key]}</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default PersonalData
