import apiClient from '@/shared/api/index'

export const getAllUsers = async () => {
	const res = await apiClient.get('/api/user/get-users')
	return res.data
}

export const addUser = async data => {
	const res = await apiClient.post('/api/user/add-user', data)
	return res.data
}

export const deleteUser = async id => {
	const res = await apiClient.delete(`/api/user/delete-user/${id}`)
	return res.data
}
