import CustomSelect from '@/shared/components/ui/CustomSelect'

const EducationInfoData = ({ formik }) => {
	const fields = [
		{
			label: 'База (класс)',
			name: 'EducationInfo.baseClass',
			options: [
				{ label: '9 класс', value: '9' },
				{ label: '11 класс', value: '11' }
			]
		},
		{
			label: 'Год окончания',
			name: 'EducationInfo.graduationYear',
			options: Array.from({ length: 30 }, (_, i) => {
				const year = new Date().getFullYear() - i
				return { label: String(year), value: String(year) }
			})
		},
		{
			label: 'Язык обучения',
			name: 'EducationInfo.educationLanguage',
			options: [
				{ label: 'Русский', value: 'ru' },
				{ label: 'Казахский', value: 'kz' }
			]
		},
		{
			label: 'Красный диплом',
			name: 'EducationInfo.honorsCertificate',
			options: [
				{ label: 'Да', value: true },
				{ label: 'Нет', value: false }
			]
		}
	]

	return (
		<div className='border-2 rounded-lg p-4 border-gray-300 dark:bg-[#0A1424] dark:border-[#0E1A29]'>
			<h2 className='text-xl'>Образование</h2>
			<div className='grid grid-cols-3 gap-7'>
				{fields.map(f => (
					<div
						className='flex flex-col'
						key={f.name}
					>
						<label className='text-[#3B568A]'>{f.label}</label>

						<CustomSelect
							name={f.name}
							value={formik.values?.EducationInfo?.[f.name.split('.')[1]] || ''}
							onChange={values => formik.setFieldValue(f.name, values)}
							placeholder='Выберите'
							options={f.options}
						/>

						{formik.touched?.EducationInfo?.[f.name.split('.')[1]] &&
							formik.errors?.EducationInfo?.[f.name.split('.')[1]] && (
								<div className='text-red-400 text-sm'>
									{formik.errors.EducationInfo[f.name.split('.')[1]]}
								</div>
							)}
					</div>
				))}
			</div>
		</div>
	)
}

export default EducationInfoData
