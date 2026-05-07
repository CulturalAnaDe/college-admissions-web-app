import {
	deleteQualification,
	useQualifications
} from '@/entities/qualifications'
import { useSpecialties } from '@/entities/specialty'
import CustomButton from '@/shared/components/ui/CustomButton'
import { Loading, PaginatedTable, SearchFilter } from '@/widgets/common'
import { FaEdit } from 'react-icons/fa'
import { MdCreateNewFolder, MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const QualificationList = () => {
	const navigate = useNavigate()
	const {
		qualifications,
		setQualifications,
		allQualification,
		refetch,
		loading
	} = useQualifications()
	const { specialties } = useSpecialties()

	const handleDelete = async id => {
		if (!window.confirm('Удалить квалификацию?')) return
		try {
			await deleteQualification(id)
			refetch()
		} catch (err) {
			console.error(err)
		}
	}

	const handleFilter = ({ name, code }) => {
		let filtered = [...allQualification]

		if (name) {
			filtered = filtered.filter(s =>
				s.name.toLowerCase().trim().includes(name.toLowerCase().trim())
			)
		}

		if (code) {
			filtered = filtered.filter(s => s.code.trim() === code.trim())
		}

		setQualifications(filtered)
	}

	const qualificationFields = [
		{ name: 'name', type: 'input', placeholder: 'Название квалификации' }
	]

	const getSpecialtyName = id => {
		const specialty = specialties.find(s => s.id === id)
		return specialty ? specialty.name : 'Отсутствует'
	}

	if (loading) return <Loading />

	return (
		<>
			<div className='flex justify-between mb-4'>
				<h1 className='text-2xl text-[#2a3956] dark:text-[#E0E6F2] font-bold mb-6'>
					Специальности
				</h1>

				<div className='flex gap-2'>
					<CustomButton
						text='Создать квалификацию'
						icon={MdCreateNewFolder}
						height={40}
						iconSize={18}
						onClick={() => navigate('/qualification/new')}
					/>
				</div>
			</div>
			<div>
				<SearchFilter
					fields={qualificationFields}
					onFilter={handleFilter}
				/>

				<PaginatedTable
					data={qualifications}
					columns={[
						'ID',
						'Название',
						'Специальность',
						'Дата добавления',
						'Действия'
					]}
					renderRow={qual => (
						<tr key={qual.id}>
							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-xs'>
								{qual.id}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] font-medium'>
								{qual.name}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-sm'>
								{getSpecialtyName(qual.SpecialtyId)}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-xs'>
								{new Date(qual.createdAt).toLocaleDateString('ru-RU')}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29]'>
								<div className='flex gap-2'>
									<CustomButton
										color='bg-none'
										className='bg-[#2563EB]/80 border dark:bg-[#2563EB]/20 dark:border-[#2563EB]/50'
										icon={FaEdit}
										iconOnly
										iconSize={18}
										onClick={() => navigate(`/qualification/${qual.id}`)}
									/>
									<CustomButton
										color='bg-none'
										className='bg-[#A33734]/80 border dark:bg-[#A33734]/20 dark:border-[#A33734]/50'
										icon={MdDelete}
										iconOnly
										iconSize={18}
										onClick={() => handleDelete(qual.id)}
									/>
								</div>
							</td>
						</tr>
					)}
				/>
			</div>
		</>
	)
}

export default QualificationList
