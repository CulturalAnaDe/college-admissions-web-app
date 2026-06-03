import CustomInput from '@/shared/components/ui/CustomInput'
import CustomSelect from '@/shared/components/ui/CustomSelect'

const ApplicantRepresentativeData = ({ applicant, setApplicant }) => {
	const handleChange = (name, e) => {
		const value = e?.target ? e.target.value : e

		setApplicant(prev => ({
			...prev,
			LegalRepresentative: {
				...(prev?.LegalRepresentative || {}),
				[name]: value
			}
		}))
	}

	const fields = [
		{
			label: 'Фамилия',
			name: 'firstName'
		},
		{
			label: 'Имя',
			name: 'lastName'
		},
		{
			label: 'Отчество',
			name: 'middleName'
		},
		{
			label: 'Телефон',
			name: 'phone'
		},
		{
			label: 'Роль',
			name: 'role',
			type: 'select',
			options: [
				{ label: 'Мать', value: 'mother' },
				{ label: 'Отец', value: 'father' },
				{ label: 'Другой опекун', value: 'guardian' }
			]
		}
	]

	return (
		<div className='border-2 rounded-lg p-4 border-gray-300 dark:bg-[#0A1424] dark:border-[#0E1A29]'>
			<h2 className='text-xl'>Опекуны</h2>
			<div className='grid grid-cols-3 gap-7'>
				{fields.map(f => (
					<div
						className='flex flex-col'
						key={f.name}
					>
						<label className='text-[#3B568A]'>{f.label}</label>

						{f.type === 'select' ? (
							<CustomSelect
								value={applicant?.LegalRepresentative?.[f.name] || ''}
								onChange={value => handleChange(f.name, value)}
								placeholder='Выберите'
								options={f.options}
							/>
						) : (
							<CustomInput
								name={f.name}
								placeholder={f.label}
								value={applicant?.LegalRepresentative?.[f.name] || ''}
								onChange={e => handleChange(f.name, e)}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default ApplicantRepresentativeData
