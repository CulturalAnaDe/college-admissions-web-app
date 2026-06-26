import { addUser } from '@/entities/user'
import CustomButton from '@/shared/components/ui/CustomButton'
import CustomInput from '@/shared/components/ui/CustomInput'
import CustomSelect from '@/shared/components/ui/CustomSelect'
import Guide from '@/widgets/learn-more'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserCreatePage = () => {
	const navigate = useNavigate()
	const [user, setUser] = useState({ telegramId: '', role: '' })

	const handleChange = (field, value) => {
		setUser(prev => ({ ...prev, [field]: value }))
	}

	const handleSubmit = async () => {
		try {
			await addUser(user)
			alert('Администратор успешно добавлен!')
			navigate('/user')
		} catch (err) {
			console.error(err)
			alert('Ошибка при добавлении администратора')
		}
	}

	const admins = [
		{ value: 'superadmin', label: 'СуперАдмин' },
		{ value: 'moderator', label: 'Модератор' }
	]

	return (
		<>
			<div className='flex justify-between mb-4'>
				<h1 className='text-2xl text-[#2a3956] dark:text-[#E0E6F2] font-bold mb-12'>
					Создать администратора
				</h1>

				<Guide
					text='Здесь можно создать нового администратора и назначить ему роль в
							системе.'
					guideInfo={[
						{
							number: '1',
							header: 'TelegramId',
							description:
								'Введите уникальный Telegram ID пользователя. Он может получить его в специальном боте.'
						},
						{
							number: '2',
							header: 'Роль',
							description:
								'Выберите роль, которая определяет права доступа администратора.'
						}
					]}
					description={`Описание ролей: \n СуперАдмин — добавлять новых администраторов, работа с таблицами; \n Модератор — работа с таблицами.`}
				/>
			</div>

			<div className='flex flex-col bg-white rounded-lg p-4 dark:bg-[#0A1424] border border-gray-300 dark:border-[#0E1A29] text-gray-800 dark:text-white'>
				<label className='text-[#3B568A]'>TelegramID</label>
				<CustomInput
					className='border border-[#E0DFDF] rounded-lg p-2'
					value={user.telegramId}
					onChange={e => handleChange('telegramId', e.target.value)}
				/>

				<div className='flex flex-col mb-2'>
					<label className='text-[#3B568A]'>Роль</label>
					<CustomSelect
						value={user.role}
						onChange={value => handleChange('role', value)}
						options={admins}
					/>
				</div>
			</div>

			<CustomButton
				className='mt-5'
				onClick={handleSubmit}
				text='Создать'
			/>
		</>
	)
}

export default UserCreatePage
