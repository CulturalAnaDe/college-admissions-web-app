import apiClient from '@/shared/api/index'

export const getAllApplicants = async () => {
	const res = await apiClient.get('/api/applicant')
	return res.data
}

export const getApplicantById = async id => {
	const res = await apiClient.get(`/api/applicant/${id}`)
	return res.data
}

export const createApplicant = async data => {
	const res = await apiClient.post('/api/applicant', data)
	return res.data
}

export const updateApplicant = async (id, data) => {
	const res = await apiClient.put(`/api/applicant/${id}`, data)
	return res.data
}

export const deleteApplicant = async id => {
	const res = await apiClient.delete(`/api/applicant/${id}`)
	return res.data
}

export const assignGroup = async (id, GroupId) => {
	const res = await apiClient.put(`/api/applicant/${id}/group`, { GroupId })
	return res.data
}

export const assignQualification = async (id, QualificationId) => {
	const res = await apiClient.put(`/api/applicant/${id}/qualification`, {
		QualificationId
	})
	return res.data
}

export const assignBenefits = async (id, benefitIds) => {
	const res = await apiClient.put(`/api/applicant/${id}/benefits`, {
		benefitIds
	})
	return res.data
}

export const updateStatus = async (id, status) => {
	const res = await apiClient.put(`/applicant/${id}/status`, { status })
	return res.data
}

export const updateStatusAll = async () => {
	const res = await apiClient.patch(`/api/applicant/statuses`)
	return res.data
}

export const updateStatusId = async (id, status) => {
	const res = await apiClient.patch(`/api/applicant/${id}/status`, { status })
	return res.data
}

export const uploadApplicant = async formData => {
	const res = await apiClient.post('/api/applicant/upload', formData, {
		headers: {
			'Content-Type': undefined
		}
	})

	return res.data
}
