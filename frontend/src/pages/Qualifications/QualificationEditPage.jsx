import {
	updateQualification,
	useQualifications
} from '@/entities/qualifications'
import { useSpecialties } from '@/entities/specialty'
import CustomButton from '@/shared/components/ui/CustomButton'
import CustomInput from '@/shared/components/ui/CustomInput'
import CustomSelect from '@/shared/components/ui/CustomSelect'
import Loading from '@/widgets/common/Loading'
import { useParams } from 'react-router-dom'

const QualificationEditForm = () => {
	const {
		qualifications,
		setQualifications,
		loading: loadingQual
	} = useQualifications()
	const { specialties, loading: loadingSpec } = useSpecialties()

	const { id } = useParams()
	const qualification =
		qualifications.find(q => String(q.id) === String(id)) || null

	const handleChange = (field, value) => {
		setQualifications(prev =>
			prev.map(s =>
				String(s.id) === String(id) ? { ...s, [field]: value } : s
			)
		)
	}

	const handleSubmit = async () => {
		try {
			await updateQualification(id, qualification)
			alert('Квалификация успешно обновлена!')
		} catch (err) {
			console.log(err)
			alert('Ошибка при обновлении')
		}
	}

	if (loadingQual && loadingSpec) return <Loading />

	return (
		<>
			<h1 className='text-2xl text-[#2a3956] dark:text-[#E0E6F2] font-bold mb-12'>
				Редактировать квалификацию
			</h1>

			<div className='flex flex-col bg-white rounded-lg p-4 dark:bg-[#0A1424] border border-gray-300 dark:border-[#0E1A29] text-gray-800 dark:text-white'>
				<label className='text-[#3B568A]'>Название квалификации</label>
				<CustomInput
					className='border border-[#E0DFDF] rounded-lg p-2'
					value={qualification?.name || 'Недоступно'}
					onChange={e => handleChange('name', e.target.value)}
				/>

				<div className='flex flex-col mb-2'>
					<label className='text-[#3B568A]'>Специальность</label>
					<CustomSelect
						value={qualification?.SpecialtyId || ''}
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
				text='Сохранить изменения'
			/>
		</>
	)
}

export default QualificationEditForm
