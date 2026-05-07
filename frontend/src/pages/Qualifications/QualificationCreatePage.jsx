import { createQualification } from '@/entities/qualifications'
import { useSpecialties } from '@/entities/specialty'
import CustomButton from '@/shared/components/ui/CustomButton'
import CustomInput from '@/shared/components/ui/CustomInput'
import CustomSelect from '@/shared/components/ui/CustomSelect'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const QualificationCreateForm = () => {
	const navigate = useNavigate()
	const [qualification, setQualification] = useState({
		name: '',
		SpecialtyId: ''
	})
	const { specialties } = useSpecialties()

	const handleChange = (field, value) => {
		setQualification(prev => ({ ...prev, [field]: value }))
	}

	const handleSubmit = async () => {
		try {
			await createQualification(qualification)
			alert('Специальность успешно создана!')
			navigate('/qualification')
		} catch (err) {
			console.error(err)
			alert('Ошибка при создании специальности')
		}
	}

	return (
		<>
			<h1 className='text-2xl text-[#2a3956] dark:text-[#E0E6F2] font-bold mb-12'>
				Создать квалификацию
			</h1>

			<div className='flex flex-col bg-white rounded-lg p-4 dark:bg-[#0A1424] border border-gray-300 dark:border-[#0E1A29] text-gray-800 dark:text-white'>
				<label className='text-[#3B568A]'>Название квалификации</label>
				<CustomInput
					className='border border-[#E0DFDF] rounded-lg p-2'
					value={qualification.name}
					onChange={e => handleChange('name', e.target.value)}
				/>

				<div className='flex flex-col mb-2'>
					<label className='text-[#3B568A]'>Специальность</label>
					<CustomSelect
						value={qualification.SpecialtyId}
						onChange={value => handleChange('SpecialtyId', Number(value))}
						options={specialties.map(s => ({
							value: s.id,
							label: s.name
						}))}
					/>
				</div>
			</div>

			<CustomButton
				className='mt-5'
				onClick={handleSubmit}
				text='Создать'
			/>
		</>
	)
}

export default QualificationCreateForm
