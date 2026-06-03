import apiClient from '@/shared/api/index'

export const getAllEducationInfo = async () => {
	const res = await apiClient.get('api/education/')
	return res.data
}

export const createEducationInfo = async (applicantId, data) => {
	const res = await apiClient.post(
		`api/education/applicant/${applicantId}`,
		data
	)
	return res.data
}

export const updateEducationInfo = async (id, data) => {
	const res = await apiClient.put(`/api/education/${id}`, data)
	return res.data
}
