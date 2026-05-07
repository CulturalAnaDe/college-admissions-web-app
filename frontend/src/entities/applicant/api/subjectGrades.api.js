import apiClient from '@/shared/api/index'

export const getAllSubjectGrades = async () => {
	const res = await apiClient.get('/api/subjectgrade')
	return res.data
}

export const createSubjectGrades = async (applicantId, data) => {
	const res = await apiClient.post(
		`/api/subjectgrade/applicant/${applicantId}`,
		data
	)
	return res.data
}

export const updateSubjectGrades = async (applicantId, data) => {
	const res = await apiClient.put(
		`/api/subjectgrade/applicant/${applicantId}`,
		data
	)
	return res.status
}

export const deleteSubjectGrade = async id => {
	const res = await apiClient.delete(`/api/subjectgrade/${id}`)
	return res.data
}
