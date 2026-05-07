import apiClient from '@/shared/api/index'

export const getAllQualification = async () => {
	const res = await apiClient.get('/api/qualifications')
	return res.data
}

export const createQualification = async data => {
	const res = await apiClient.post('/api/qualifications', data)
	return res.data
}

export const updateQualification = async (id, data) => {
	const res = await apiClient.put(`/api/qualifications/${id}`, data)
	return res
}

export const deleteQualification = async id => {
	const res = await apiClient.delete(`/api/qualifications/${id}`)
	return res.data
}
