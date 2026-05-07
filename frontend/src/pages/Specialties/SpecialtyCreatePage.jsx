import { createSpecialties } from '@/entities/specialty'
import CustomButton from '@/shared/components/ui/CustomButton'
import CustomInput from '@/shared/components/ui/CustomInput'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SpecialtyCreateForm = () => {
	const navigate = useNavigate()
	const [specialty, setSpecialty] = useState({ name: '', code: '' })

	const handleChange = (field, value) => {
		setSpecialty(prev => ({ ...prev, [field]: value }))
	}

	const handleSubmit = async () => {
		try {
			await createSpecialties(specialty)
			alert('Специальность успешно создана!')
			navigate('/specialty')
		} catch (err) {
			console.error(err)
			alert('Ошибка при создании специальности')
		}
	}

	return (
		<>
			<h1 className='text-2xl text-[#2a3956] dark:text-[#E0E6F2] font-bold mb-12'>
				Создать специальность
			</h1>

			<div className='flex flex-col bg-white rounded-lg p-4 dark:bg-[#0A1424] border border-gray-300 dark:border-[#0E1A29] text-gray-800 dark:text-white'>
				<label className='text-[#3B568A]'>Название специальности</label>
				<CustomInput
					className='border border-[#E0DFDF] rounded-lg p-2'
					value={specialty.name}
					onChange={e => handleChange('name', e.target.value)}
				/>

				<label className='text-[#3B568A]'>Код специальности</label>
				<CustomInput
					className='border border-[#E0DFDF] rounded-lg p-2'
					value={specialty.code}
					onChange={e => handleChange('code', e.target.value)}
				/>
			</div>

			<CustomButton
				className='mt-5'
				onClick={handleSubmit}
				text='Создать'
			/>
		</>
	)
}

export default SpecialtyCreateForm
