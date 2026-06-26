import { useAuth } from '@/features/auth/model/useAuth'
import ThemeSwitcherButton from '@/shared/components/ui/ThemeSwitcherButton'
import {
	FaChartBar,
	FaChild,
	FaUserGraduate,
	FaUsers,
	FaUsersCog,
	FaUserTie
} from 'react-icons/fa'
import { FaUserGroup } from 'react-icons/fa6'
import { IoSchool } from 'react-icons/io5'
import { Link } from 'react-router'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
	const { isAdmin } = useAuth()

	const listSideBar = [
		{ name: 'Абитуриенты', link: '/', icon: FaUsers, admin: false },
		{
			name: 'Специальности',
			link: '/specialty',
			icon: FaUserTie,
			admin: false
		},
		{
			name: 'Квалификации',
			link: '/qualification',
			icon: FaUserGraduate,
			admin: false
		},
		{ name: 'Группы', link: '/group', icon: FaUserGroup, admin: false },
		{ name: 'Льготы', link: '/benefit', icon: FaChild, admin: false },
		{ name: 'Статистика', link: '/stats', icon: FaChartBar, admin: false },
		{ name: 'Админ панель', link: '/user', icon: FaUsersCog, admin: true }
	]

	return (
		<div className='flex flex-col w-84 bg-white dark:bg-[#050E1A] text-gray-800 dark:text-white min-h-screen p-6 border-r border-gray-300 dark:border-[#152238]'>
			<div>
				<Link
					to={'/'}
					className='text-xl font-bold flex justify-center items-center gap-5 mb-5 text-gray-800 dark:text-white'
				>
					<div className='bg-blue-50 dark:bg-[#0A1B39] p-1 rounded-lg border-2 border-blue-200 dark:border-[#102D66]'>
						<IoSchool
							size={30}
							className='text-blue-600 dark:text-white'
						/>
					</div>
					Приёмная комиссия
				</Link>

				<div className='h-px bg-linear-to-r from-transparent via-slate-300 dark:via-slate-500 to-transparent mb-4' />

				<nav className='space-y-2 mt-6'>
					{listSideBar
						.filter(item => !item.admin || isAdmin)
						.map(item => {
							const Icon = item.icon
							return (
								<NavLink
									key={item.name}
									to={item.link}
									className={({ isActive }) =>
										`flex items-center gap-2 p-2 rounded transition-all duration-200 ${
											isActive
												? 'text-blue-600 dark:text-[#2991F1] bg-blue-50 dark:bg-[#0A1B39]'
												: 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#0A1B39]'
										}`
									}
								>
									{({ isActive }) => (
										<>
											{isActive && (
												<div className='bg-blue-500 dark:bg-[#3B82F6] w-1 h-8 rounded-full animate-expand-y' />
											)}
											{!isActive && <div className='w-1 h-8' />}
											<Icon size={25} />
											{item.name}
										</>
									)}
								</NavLink>
							)
						})}
				</nav>
			</div>

			<div className='mt-auto'>
				<hr className='-mx-8 border-gray-300 dark:border-[#152238] mb-6' />
				<ThemeSwitcherButton />
			</div>
		</div>
	)
}

export default Sidebar
