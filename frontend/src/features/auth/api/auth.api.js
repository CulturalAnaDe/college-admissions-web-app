import apiClient from '@/shared/api/index'
export const sendCode = async telegramId => {
	const res = await apiClient.post('api/auth/send-code', { telegramId })
	return res.data
}

export const verifyCode = async data => {
	const res = await apiClient.post('api/auth/verify-code', data)
	return res.data
}

export const me = async () => {
	const res = await apiClient.get('/api/auth/me')
	return res.data
}

export const logout = async () => {
	const res = await apiClient.get('/api/auth/logout')
	return res.data
}
