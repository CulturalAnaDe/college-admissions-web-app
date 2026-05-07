import { deleteGroup, useGroups } from '@/entities/group'
import { useSpecialties } from '@/entities/specialty'
import CustomButton from '@/shared/components/ui/CustomButton'
import {
	PaginatedTable as GroupPaginated,
	Loading,
	SearchFilter
} from '@/widgets/common'
import { FaEdit } from 'react-icons/fa'
import { MdCreateNewFolder, MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const GroupList = () => {
	const navigate = useNavigate()
	const { groups, setGroups, allGroups, refetch, loading } = useGroups()
	const { specialties } = useSpecialties()

	const handleDelete = async id => {
		if (!window.confirm('Удалить группу?')) return
		try {
			await deleteGroup(id)
			refetch()
		} catch (err) {
			console.error(err)
		}
	}

	const handleFilter = ({ name, specialty }) => {
		let filtered = [...allGroups]

		if (name) {
			filtered = filtered.filter(g =>
				g.name.toLowerCase().trim().includes(name.toLowerCase().trim())
			)
		}

		if (specialty) {
			filtered = filtered.filter(g => g.SpecialtyId === Number(specialty))
		}

		setGroups(filtered)
	}

	const groupFields = [
		{ name: 'name', type: 'input', placeholder: 'Название группы' },
		{
			name: 'specialty',
			type: 'select',
			placeholder: 'Специальности',
			options: specialties.map(s => ({
				value: s.id,
				label: s.name
			}))
		}
	]

	if (loading) return <Loading />

	return (
		<>
			<div className='flex justify-between mb-4'>
				<h1 className='text-2xl text-[#2a3956] dark:text-[#E0E6F2] font-bold mb-6'>
					Группы
				</h1>

				<div className='flex gap-2'>
					<CustomButton
						text='Создать группу'
						icon={MdCreateNewFolder}
						height={40}
						iconSize={18}
						onClick={() => navigate('/group/new')}
					/>
				</div>
			</div>
			<div>
				<SearchFilter
					fields={groupFields}
					onFilter={handleFilter}
				/>

				<GroupPaginated
					data={groups}
					columns={[
						'ID',
						'Название',
						'Год',
						'Язык обучения',
						'Специальность',
						'Дата добавления',
						'Действия'
					]}
					renderRow={group => (
						<tr key={group.id}>
							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-xs'>
								{group.id}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] font-medium'>
								{group.name}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-sm'>
								{group.year}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-sm'>
								{group.language == 'ru' ? 'Русский' : 'Казахский'}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-sm'>
								{specialties?.find(s => s.id === group.SpecialtyId)?.name ||
									'-'}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-xs'>
								{new Date(group.createdAt).toLocaleDateString('ru-RU')}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29]'>
								<div className='flex gap-2'>
									<CustomButton
										color='bg-none'
										className='bg-[#2563EB]/80 border dark:bg-[#2563EB]/20 dark:border-[#2563EB]/50'
										icon={FaEdit}
										iconOnly
										iconSize={18}
										onClick={() => navigate(`/group/${group.id}`)}
									/>
									<CustomButton
										color='bg-none'
										className='bg-[#A33734]/80 border dark:bg-[#A33734]/20 dark:border-[#A33734]/50'
										icon={MdDelete}
										iconOnly
										iconSize={18}
										onClick={() => handleDelete(group.id)}
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

export default GroupList
