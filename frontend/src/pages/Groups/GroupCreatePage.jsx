import { createGroup } from '@/entities/group'
import { useSpecialties } from '@/entities/specialty'
import CustomButton from '@/shared/components/ui/CustomButton'
import CustomInput from '@/shared/components/ui/CustomInput'
import CustomSelect from '@/shared/components/ui/CustomSelect'
import Loading from '@/widgets/common/Loading'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GroupCreateForm = () => {
	const navigate = useNavigate()
	const { specialties, loading } = useSpecialties()
	const [group, setGroup] = useState({
		name: '',
		year: '',
		language: '',
		SpecialtyId: ''
	})

	const handleChange = (field, value) => {
		setGroup(prev => ({ ...prev, [field]: value }))
	}

	const handleSubmit = async () => {
		try {
			await createGroup(group)
			alert('Группа успешно создана!')
			navigate('/groups')
		} catch (err) {
			console.error(err)
			alert('Ошибка при создании группы')
		}
	}
	const fieldsSelectedGroups = [
		{
			label: 'Год группы',
			name: 'year',
			options: Array.from({ length: 30 }, (_, i) => {
				const year = new Date().getFullYear() - i
				return { label: String(year), value: String(year) }
			})
		},
		{
			label: 'Язык группы',
			name: 'language',
			options: [
				{ label: 'Русский', value: 'ru' },
				{ label: 'Казахский', value: 'kz' }
			]
		}
	]

	if (loading) return <Loading />

	return (
		<div>
			<h1 className='text-2xl text-[#2a3956] dark:text-[#E0E6F2] font-bold mb-12'>
				Создать группу
			</h1>

			<div className='flex flex-col bg-white rounded-lg p-4 dark:bg-[#0A1424] border border-gray-300 dark:border-[#0E1A29] text-gray-800 dark:text-white'>
				<label className='text-[#3B568A]'>Название группы</label>
				<CustomInput
					className='border border-[#E0DFDF] rounded-lg p-2'
					placeholder='ПО-22'
					value={group.name}
					onChange={e => handleChange('name', e.target.value)}
				/>

				{fieldsSelectedGroups.map(g => (
					<div
						key={g.name}
						className='flex flex-col mb-2'
					>
						<label className='text-[#3B568A]'>{g.label}</label>
						<CustomSelect
							className='border border-[#E0DFDF] rounded-lg p-2'
							value={group[g.name]}
							onChange={value => handleChange(g.name, value)}
							options={g.options}
						/>
					</div>
				))}

				<div className='flex flex-col mb-2'>
					<label className='text-[#3B568A]'>Специальность</label>
					<CustomSelect
						value={group.SpecialtyId}
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
		</div>
	)
}

export default GroupCreateForm
