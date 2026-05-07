import { deleteSpecialties, useSpecialties } from '@/entities/specialty'
import CustomButton from '@/shared/components/ui/CustomButton'
import { Loading, PaginatedTable, SearchFilter } from '@/widgets/common'
import { FaEdit } from 'react-icons/fa'
import { MdCreateNewFolder, MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const SpecialtyList = () => {
	const navigate = useNavigate()
	const { specialties, setSpecialties, allSpecialties, refetch, loading } =
		useSpecialties()

	const handleDelete = async id => {
		if (!window.confirm('Удалить специальность?')) return
		try {
			await deleteSpecialties(id)
			refetch()
		} catch (err) {
			console.error(err)
		}
	}

	const handleFilter = ({ name, code }) => {
		let filtered = [...allSpecialties]

		if (name) {
			filtered = filtered.filter(s =>
				s.name.toLowerCase().trim().includes(name.toLowerCase().trim())
			)
		}

		if (code) {
			filtered = filtered.filter(s => s.code.trim() === code.trim())
		}

		setSpecialties(filtered)
	}

	const specialtiesFields = [
		{ name: 'name', type: 'input', placeholder: 'Название специальности' },
		{ name: 'code', type: 'input', placeholder: 'Код специальности' }
	]

	if (loading) return <Loading />

	return (
		<>
			<div className='flex justify-between mb-4'>
				<h1 className='text-2xl text-[#2a3956] dark:text-[#E0E6F2] font-bold mb-6'>
					Специальности
				</h1>

				<div className='flex gap-2'>
					<CustomButton
						text='Создать специальность'
						icon={MdCreateNewFolder}
						height={40}
						iconSize={18}
						onClick={() => navigate('/specialty/new')}
					/>
				</div>
			</div>
			<div>
				<SearchFilter
					fields={specialtiesFields}
					onFilter={handleFilter}
				/>

				<PaginatedTable
					data={specialties}
					columns={[
						'ID',
						'Название',
						'Код',
						'Квалификации',
						'Дата добавления',
						'Действия'
					]}
					renderRow={spec => (
						<tr key={spec.id}>
							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-xs'>
								{spec.id}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] font-medium'>
								{spec.name}
							</td>
							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29]'>
								{spec.code}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-sm'>
								{spec.Qualifications?.map(q => q.name).join(', ') ||
									'Отсутствуют'}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-xs'>
								{new Date(spec.createdAt).toLocaleDateString('ru-RU')}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29]'>
								<div className='flex gap-2'>
									<CustomButton
										color='bg-none'
										className='bg-[#2563EB]/80 border dark:bg-[#2563EB]/20 dark:border-[#2563EB]/50'
										icon={FaEdit}
										iconOnly
										iconSize={18}
										onClick={() => navigate(`/specialty/${spec.id}`)}
									/>
									<CustomButton
										color='bg-none'
										className='bg-[#A33734]/80 border dark:bg-[#A33734]/20 dark:border-[#A33734]/50'
										icon={MdDelete}
										iconOnly
										iconSize={18}
										onClick={() => handleDelete(spec.id)}
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

export default SpecialtyList
