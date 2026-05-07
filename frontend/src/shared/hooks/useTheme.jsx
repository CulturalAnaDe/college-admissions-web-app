import { useState } from 'react'

export const useTheme = () => {
	const getInitialTheme = () => {
		const html = document.documentElement

		let initialTheme
		if (localStorage.theme === 'dark') {
			initialTheme = 'dark'
		} else if (localStorage.theme === 'light') {
			initialTheme = 'light'
		} else {
			initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'
		}

		if (initialTheme === 'dark') {
			html.classList.add('dark')
		} else {
			html.classList.remove('dark')
		}

		return initialTheme
	}

	const [theme, setThemeState] = useState(getInitialTheme)

	const setTheme = newTheme => {
		const html = document.documentElement

		if (newTheme === 'dark') {
			html.classList.add('dark')
			localStorage.setItem('theme', 'dark')
		} else if (newTheme === 'light') {
			html.classList.remove('dark')
			localStorage.setItem('theme', 'light')
		} else {
			html.classList.remove('dark')
			localStorage.removeItem('theme')
		}

		setThemeState(newTheme)
	}

	return { theme, setTheme }
}
