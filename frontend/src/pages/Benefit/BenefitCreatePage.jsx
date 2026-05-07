import { createBenefit } from '@/entities/benefit'
import CustomButton from '@/shared/components/ui/CustomButton'
import CustomInput from '@/shared/components/ui/CustomInput'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BenefitCreateForm = () => {
	const navigate = useNavigate()
	const [benefit, setBenefit] = useState({
		name: '',
		description: ''
	})

	const handleChange = (field, value) => {
		setBenefit(prev => ({ ...prev, [field]: value }))
	}

	const handleSubmit = async () => {
		try {
			await createBenefit(benefit)
			alert('Льгота успешно создана!')
			navigate('/benefit')
		} catch (err) {
			console.error(err)
			alert('Ошибка при создании льготы')
		}
	}

	return (
		<div className='ml-10'>
			<h1 className='text-2xl text-[#2a3956] dark:text-[#E0E6F2] font-bold mb-12'>
				Создать льготу
			</h1>

			<div className='flex flex-col bg-white rounded-lg w-md p-4 dark:bg-[#0A1424] border border-gray-300 dark:border-[#0E1A29] text-gray-800 dark:text-white'>
				<label className='text-[#3B568A]'>Название льготы</label>
				<CustomInput
					className='border border-[#E0DFDF] rounded-lg p-2'
					placeholder='Общежитие'
					value={benefit.name}
					onChange={e => handleChange('name', e.target.value)}
				/>

				<label className='text-[#3B568A]'>Описание льготы</label>
				<CustomInput
					placeholder='Студент нуждается в общежитии'
					className='border border-[#E0DFDF] rounded-lg p-2'
					value={benefit.description}
					onChange={e => handleChange('description', e.target.value)}
				/>
			</div>

			<CustomButton
				className='mt-5'
				onClick={handleSubmit}
				text='Создать'
			/>
		</div>
	)
}

export default BenefitCreateForm
