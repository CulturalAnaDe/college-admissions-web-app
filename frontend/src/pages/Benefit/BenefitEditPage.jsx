import { updateBenefit, useBenefits } from '@/entities/benefit'
import CustomButton from '@/shared/components/ui/CustomButton'
import CustomInput from '@/shared/components/ui/CustomInput'
import Loading from '@/widgets/common/Loading'
import { useParams } from 'react-router-dom'

const BenefitEditForm = () => {
	const { benefits, setBenefits, loading } = useBenefits()
	const { id } = useParams()

	const benefit = benefits.find(b => String(b.id) === String(id)) || null

	const handleChange = (field, value) => {
		setBenefits(prev =>
			prev.map(b =>
				String(b.id) === String(id) ? { ...b, [field]: value } : b
			)
		)
	}

	const handleSubmit = async () => {
		try {
			await updateBenefit(id, benefit)
			alert('Льгота успешно обновлена!')
		} catch (err) {
			console.error(err)
			alert('Ошибка при обновлении')
		}
	}

	if (loading) return <Loading />
	if (!benefit) return <div>Такой отсутствует</div>

	return (
		<div className='ml-10'>
			<h1 className='text-2xl text-[#2a3956] dark:text-[#E0E6F2] font-bold mb-12'>
				Редактировать льготу
			</h1>

			<div className='flex flex-col bg-white rounded-lg w-md p-4 dark:bg-[#0A1424] border border-gray-300 dark:border-[#0E1A29] text-gray-800 dark:text-white'>
				<label className='text-[#3B568A]'>Название льготы</label>
				<CustomInput
					className='border border-[#E0DFDF] rounded-lg p-2'
					value={benefit?.name || ''}
					onChange={e => handleChange('name', e.target.value)}
				/>

				<label className='text-[#3B568A]'>Описание льготы</label>
				<CustomInput
					className='border border-[#E0DFDF] rounded-lg p-2'
					value={benefit?.description || ''}
					onChange={e => handleChange('description', e.target.value)}
				/>
			</div>
			<CustomButton
				className='mt-5'
				onClick={handleSubmit}
				text='Сохранить изменения'
			/>
		</div>
	)
}

export default BenefitEditForm
