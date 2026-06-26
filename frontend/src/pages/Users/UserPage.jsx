import { deleteUser, useUsers } from '@/entities/user'
import CustomButton from '@/shared/components/ui/CustomButton'
import { Loading, PaginatedTable as UserPaginated } from '@/widgets/common'
import { MdCreateNewFolder, MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const UserPage = () => {
	const navigate = useNavigate()
	const { users, refetch, loading } = useUsers()

	const handleDelete = async id => {
		if (!window.confirm('Удалить пользователя?')) return
		try {
			await deleteUser(id)
			refetch()
		} catch (err) {
			console.error(err)
		}
	}

	if (loading) return <Loading />

	return (
		<>
			<div className='flex justify-between mb-4'>
				<h1 className='text-2xl text-[#2a3956] dark:text-[#E0E6F2] font-bold mb-6'>
					Панель администратора
				</h1>

				<div className='flex gap-2'>
					<CustomButton
						text='Добавить администратора'
						icon={MdCreateNewFolder}
						height={40}
						iconSize={18}
						onClick={() => navigate('/user/new')}
					/>
				</div>
			</div>
			<div>
				<UserPaginated
					data={users}
					columns={['ID', 'TelegramId', 'Роль', 'Дата добавления', 'Действия']}
					renderRow={user => (
						<tr key={user.id}>
							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-xs'>
								{user.id}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] font-medium'>
								{user.telegramId}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] font-medium'>
								{user.role === 'moderator' ? 'Модератор' : 'СуперАдмин'}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-xs'>
								{new Date(user.createdAt).toLocaleDateString('ru-RU')}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29]'>
								<div className='flex gap-2'>
									<CustomButton
										color='bg-none'
										className='bg-[#A33734]/80 border dark:bg-[#A33734]/20 dark:border-[#A33734]/50'
										icon={MdDelete}
										iconOnly
										iconSize={18}
										onClick={() => handleDelete(user.id)}
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

export default UserPage
