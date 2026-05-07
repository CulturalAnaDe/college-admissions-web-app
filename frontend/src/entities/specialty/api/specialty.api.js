import apiClient from '@/shared/api/index'

export const getAllSpecialties = async () => {
	const res = await apiClient.get('/api/specialties')
	return res.data
}

export const createSpecialties = async data => {
	const res = await apiClient.post('/api/specialties/', data)
	return res.data
}

export const updateSpecialties = async (id, data) => {
	const res = await apiClient.put(`/api/specialties/${id}`, data)
	return res.data
}

export const deleteSpecialties = async id => {
	const res = await apiClient.delete(`/api/specialties/${id}`)
	return res.data
}
