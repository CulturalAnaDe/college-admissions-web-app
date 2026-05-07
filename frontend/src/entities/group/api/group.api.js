import apiClient from '@/shared/api/index'

export const getAllGroup = async () => {
	const res = await apiClient.get('/api/groups')
	return res.data
}

export const createGroup = async data => {
	const res = await apiClient.post('/api/groups', data)
	return res.data
}

export const updateGroup = async (id, data) => {
	const res = await apiClient.put(`/api/groups/${id}`, data)
	return res.data
}

export const deleteGroup = async id => {
	const res = await apiClient.delete(`/api/groups/${id}`)
	return res.data
}
