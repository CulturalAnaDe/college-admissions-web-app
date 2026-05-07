import { deleteQualification } from '@/entities/qualifications'
import { updateSpecialties, useSpecialties } from '@/entities/specialty'
import CustomButton from '@/shared/components/ui/CustomButton'
import CustomInput from '@/shared/components/ui/CustomInput'
import Loading from '@/widgets/common/Loading'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SpecialtyEditForm = () => {
	const { specialties, setSpecialties, loading } = useSpecialties()
	const { id } = useParams()
	const [qualifications, setQualifications] = useState([])

	const specialty = specialties.find(s => String(s.id) === String(id)) || null

	useEffect(() => {
		const fetchData = () => {
			setQualifications(specialty?.Qualifications || [])
		}

		fetchData()
	}, [specialty])

	const handleRemoveQualification = async id => {
		try {
			await deleteQualification(id)
			setQualifications(prev => prev.filter(q => q.id !== id))
		} catch (err) {
			console.error(err)
			alert('Ошибка при удалении квалификации')
		}
	}

	const handleChange = (field, value) => {
		setSpecialties(prev =>
			prev.map(s =>
				String(s.id) === String(id) ? { ...s, [field]: value } : s
			)
		)
	}

	const handleSubmit = async () => {
		try {
			await updateSpecialties(id, specialty)
			alert('Специальность успешно обновлена!')
		} catch (err) {
			console.log(err)
			alert('Ошибка при обновлении')
		}
	}

	if (loading) return <Loading />

	return (
		<div>
			<h1 className='text-2xl text-[#2a3956] dark:text-[#E0E6F2] font-bold mb-12'>
				Редактировать специальность
			</h1>

			<div className='flex flex-col bg-white rounded-lg w-md p-4 dark:bg-[#0A1424] border border-gray-300 dark:border-[#0E1A29] text-gray-800 dark:text-white mb-5'>
				<label className='text-[#3B568A]'>Название специальности</label>
				<CustomInput
					className='border border-[#E0DFDF] rounded-lg p-2'
					value={specialty?.name || 'Недоступно'}
					onChange={e => handleChange('name', e.target.value)}
				/>

				<label className='text-[#3B568A] mt-2'>Код специальности</label>
				<CustomInput
					className='border border-[#E0DFDF] rounded-lg p-2'
					value={specialty?.code || ''}
					onChange={e => handleChange('code', e.target.value)}
				/>
			</div>

			<div className='dark:bg-[#0A1424] border border-gray-300 dark:border-[#0E1A29] text-gray-800 dark:text-white rounded-lg w-md p-4 mb-4'>
				<h2 className='text-xl mb-2'>Квалификации</h2>

				{specialty?.Qualifications && specialty.Qualifications.length > 0 ? (
					<div className='flex flex-col gap-2 mb-4'>
						{qualifications?.map(q => (
							<div
								key={q.id}
								className='flex justify-between items-center border p-2 rounded'
							>
								<span>{q.name}</span>
								<CustomButton
									text='Удалить'
									onClick={() => handleRemoveQualification(q.id)}
								/>
							</div>
						))}
					</div>
				) : (
					<p className='mb-4 text-gray-500'>Квалификации не назначены</p>
				)}
			</div>

			<CustomButton
				onClick={handleSubmit}
				text='Сохранить изменения'
			/>
		</div>
	)
}

export default SpecialtyEditForm
