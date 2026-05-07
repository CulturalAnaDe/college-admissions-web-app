import apiClient from '@/shared/api/index'
import { saveAs } from 'file-saver'

export const getAllDocuments = async () => {
	const res = await apiClient.get('/api/documents')
	return res.data
}

export const deleteDocument = async id => {
	const res = await apiClient.delete(`/api/documents/${id}`)
	return res.data
}

export const addDocuments = async (applicantId, formData) => {
	const res = await apiClient.post(
		`/api/documents/upload/${applicantId}`,
		formData,
		{
			headers: {
				'Content-Type': undefined
			}
		}
	)

	return res.data
}

export const downloadDocumentsApplicantId = async id => {
	const res = await apiClient.get(`/api/documents/download/${id}`, {
		responseType: 'blob'
	})

	return res.data
}

export const downloadDocumentsAllApplicants = async () => {
	const res = await apiClient.get(`/api/documents/download`, {
		responseType: 'blob',
		withCredentials: true
	})

	saveAs(res.data, 'documents_applicants.zip')
}
