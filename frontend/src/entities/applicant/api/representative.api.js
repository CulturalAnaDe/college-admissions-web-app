import apiClient from '@/shared/api/index'

export const getAllRepresentative = async () => {
	const res = await apiClient.get('/api/representative')
	return res.data
}

export const getRepresentativeById = async id => {
	const res = await apiClient.get(`/api/representative/${id}`)
	return res.data
}

export const createRepresentative = async (applicantId, data) => {
	const res = await apiClient.post(`/api/representative/${applicantId}`, data)
	return res.data
}

export const updateRepresentative = async (applicantId, data) => {
	const res = await apiClient.put(`/api/representative/${applicantId}`, data)
	return res.data
}

export const deleteRepresentative = async id => {
	const res = await apiClient.delete(`/api/representative/${id}`)
	return res.data
}
