import {
	addDocuments,
	assignBenefits,
	createRepresentative,
	deleteDocument,
	getApplicantById,
	updateApplicant,
	updateEducationInfo,
	updateRepresentative
} from '@/entities/applicant'
import { getAllBenefit } from '@/entities/benefit'
import { getAllGroup } from '@/entities/group'
import { getAllQualification } from '@/entities/qualifications'
import { getAllSpecialties } from '@/entities/specialty'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const useEditApplicant = () => {
	const { id } = useParams()
	const [applicant, setApplicant] = useState(null)
	const [groups, setGroups] = useState([])
	const [qualifications, setQualifications] = useState([])
	const [specialties, setSpecialties] = useState([])
	const [benefits, setBenefits] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!id) return
		const fetchAllData = async () => {
			try {
				setLoading(true)
				const [
					applicantData,
					groupsData,
					qualificationsData,
					specialtiesData,
					benefitsData
				] = await Promise.all([
					getApplicantById(id),
					getAllGroup(),
					getAllQualification(),
					getAllSpecialties(),
					getAllBenefit()
				])
				setBenefits(benefitsData)
				setApplicant(applicantData)
				setGroups(groupsData)
				setQualifications(qualificationsData)
				setSpecialties(specialtiesData)
			} catch (err) {
				console.error(err)
			} finally {
				setLoading(false)
			}
		}
		fetchAllData()
	}, [id])

	const documentDelete = async docId => {
		if (!docId) return

		if (String(docId).startsWith('new-')) {
			setApplicant(prev => ({
				...prev,
				Documents: prev.Documents.filter(doc => doc.id !== docId)
			}))
			return
		}

		if (!confirm('Вы точно хотите удалить документ?')) return

		try {
			setLoading(true)
			await deleteDocument(docId)
			setApplicant(prev => ({
				...prev,
				Documents: prev.Documents.filter(doc => doc.id !== docId)
			}))
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	const handleSubmit = async () => {
		try {
			setLoading(true)

			await updateApplicant(id, applicant)

			if (applicant.EducationInfo?.id) {
				await updateEducationInfo(
					applicant.EducationInfo.id,
					applicant.EducationInfo
				)
			}

			const rep = applicant?.LegalRepresentative
			const hasData = rep && (rep.firstName?.trim() || rep.lastName?.trim())

			if (rep?.id) {
				await updateRepresentative(applicant.id, rep)
			} else if (hasData) {
				await createRepresentative(applicant.id, rep)
			}

			const newDocs = applicant.Documents.filter(
				doc => doc.file instanceof File && doc.type
			)

			if (newDocs.length > 0) {
				const formData = new FormData()

				newDocs.forEach(doc => {
					formData.append('types', doc.type)
					formData.append('files', doc.file)
				})

				const savedDocs = await addDocuments(id, formData)

				setApplicant(prev => ({
					...prev,
					Documents: [
						...prev.Documents.filter(d => !(d.file instanceof File)),
						...savedDocs
					]
				}))
			}

			const benefitIds = applicant.Benefits?.map(q => q.id) || []
			await assignBenefits(id, benefitIds)

			alert('Данные сохранены')
		} catch (err) {
			console.error(err)
			alert('Ошибка сохранения')
		} finally {
			setLoading(false)
		}
	}

	return {
		applicant,
		setApplicant,
		groups,
		qualifications,
		specialties,
		loading,
		handleSubmit,
		documentDelete,
		benefits
	}
}

export default useEditApplicant
