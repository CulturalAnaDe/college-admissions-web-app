import { FaSun } from 'react-icons/fa'
import { MdNightlight } from 'react-icons/md'
import { useTheme } from '../../hooks/useTheme'

const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme()

	const isDark = theme === 'dark'

	return (
		<button
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			className={`
        relative flex items-center w-16 h-8 px-1 rounded-lg
        transition-colors duration-300
        ${isDark ? 'bg-[#0F2040]' : 'bg-blue-400'}
    `}
		>
			<span
				className={`
            absolute left-1 top-1 w-6 h-6 rounded-lg bg-white
            flex items-center justify-center
            transition-transform duration-300
            ${isDark ? 'translate-x-8 text-[#0F2040]' : 'translate-x-0 text-blue-400'}
        `}
			>
				{isDark ? <MdNightlight size={16} /> : <FaSun size={16} />}
			</span>
		</button>
	)
}

export default ThemeSwitcher
