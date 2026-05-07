import apiClient from '@/shared/api/index'

export const getAllBenefit = async () => {
	const res = await apiClient.get('/api/benefit')
	return res.data
}

export const deleteBenefit = async id => {
	const res = await apiClient.delete(`/api/benefit/${id}`)
	return res.data
}

export const updateBenefit = async (id, data) => {
	const res = await apiClient.put(`/api/benefit/${id}`, data)
	return res.data
}

export const createBenefit = async data => {
	const res = await apiClient.post('/api/benefit', data)
	return res.data
}
