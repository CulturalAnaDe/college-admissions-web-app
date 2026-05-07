import CustomSelect from '@/shared/components/ui/CustomSelect'

const ApplicantEducationInfo = ({ applicant, setApplicant }) => {
	const handleChange = (name, e) => {
		const { value, type, checked } = e.target

		setApplicant(prev => ({
			...prev,
			EducationInfo: {
				...(prev?.EducationInfo || {}),
				[name]: type === 'checkbox' ? checked : value
			}
		}))
	}
	const fields = [
		{
			label: 'База (класс)',
			name: 'baseClass',
			options: [
				{ label: '9 класс', value: '9' },
				{ label: '11 класс', value: '11' }
			]
		},
		{
			label: 'Год окончания',
			name: 'graduationYear',
			options: Array.from({ length: 30 }, (_, i) => {
				const year = new Date().getFullYear() - i
				return { label: String(year), value: String(year) }
			})
		},
		{
			label: 'Язык обучения',
			name: 'educationLanguage',
			options: [
				{ label: 'Русский', value: 'ru' },
				{ label: 'Казахский', value: 'kz' }
			]
		},
		{
			label: 'Красный диплом',
			name: 'honorsCertificate',
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
							value={applicant?.EducationInfo?.[f.name] || ''}
							onChange={value => handleChange(f.name, value)}
							placeholder='Выберите'
							options={f.options}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default ApplicantEducationInfo
