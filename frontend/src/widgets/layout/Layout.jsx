import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {
	return (
		<div className='flex h-screen overflow-hidden'>
			<Sidebar />

			<div className='flex-1 overflow-y-auto p-6 bg-gray-100 dark:bg-[#07111F] text-gray-800 dark:text-white'>
				<Outlet />
			</div>
		</div>
	)
}

export default Layout
