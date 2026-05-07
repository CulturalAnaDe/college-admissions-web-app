import apiClient from '@/shared/api/index'

export const getAllEducationInfo = async () => {
	const res = apiClient.get('api/education/')
	return res.data
}

export const createEducationInfo = async (applicantId, data) => {
	const res = apiClient.post(`api/education/applicant/${applicantId}`, data)
	return res.data
}

export const updateEducationInfo = async (id, data) => {
	const res = apiClient.put(`/api/education/${id}`, data)
	return res.data
}
