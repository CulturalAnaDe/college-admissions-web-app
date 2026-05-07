import CustomSelect from '@/shared/components/ui/CustomSelect'

const ApplicantGroupData = ({
	applicant,
	setApplicant,
	groups,
	qualifications,
	specialties
}) => {
	const handleChange = (name, e) => {
		const value = e?.target ? e.target.value : (e?.value ?? e)
		const parsed = value === '' ? '' : Number(value)
		setApplicant(prev => ({
			...(prev || {}),
			[name]: parsed
		}))
	}

	const selectedSpecialty = specialties?.find(s =>
		s.Qualifications.some(q => q.id === applicant?.QualificationId)
	)
	const specialtyName = selectedSpecialty?.name

	const groupOptions = groups?.map(g => ({ value: g.id, label: g.name }))

	const qualificationOptions = qualifications?.map(q => ({
		value: q.id,
		label: q.name
	}))

	return (
		<div className='border-2 rounded-lg p-4 border-gray-300 dark:bg-[#0A1424] dark:border-[#0E1A29]'>
			<h2 className='text-xl'>Группа/Специальность/Квалификация</h2>

			<div className='grid grid-cols-3 gap-7'>
				<div className='flex flex-col'>
					<label className='text-[#3B568A] mb-1'>Группа</label>
					<CustomSelect
						value={applicant?.GroupId || ''}
						onChange={value => handleChange('GroupId', value)}
						options={groupOptions}
						placeholder='Выберите группу'
						name='GroupId'
					/>
				</div>

				<div className='flex flex-col'>
					<label className='text-[#3B568A] mb-1'>Квалификация</label>
					<CustomSelect
						value={applicant?.QualificationId || ''}
						onChange={value => handleChange('QualificationId', value)}
						options={qualificationOptions}
						placeholder='Выберите квалификацию'
						name='QualificationId'
					/>
				</div>

				<div className='flex flex-col'>
					<label className='text-[#3B568A] mb-1'>Специальность</label>
					<CustomSelect
						value={selectedSpecialty?.id || ''}
						options={
							selectedSpecialty
								? [{ value: selectedSpecialty.id, label: specialtyName }]
								: []
						}
						placeholder={specialtyName || 'Не выбрано'}
						disabled
					/>
				</div>
			</div>
		</div>
	)
}

export default ApplicantGroupData
