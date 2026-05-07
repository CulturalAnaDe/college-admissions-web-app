import {
	createApplicant,
	createEducationInfo,
	createSubjectGrades
} from '@/entities/applicant'

const submitApplicant = async (values, navigate) => {
	const created = await createApplicant(values)

	const id = created.id

	if (values.EducationInfo) {
		await createEducationInfo(id, values.EducationInfo)
	}

	if (values.SubjectGrades?.length) {
		await Promise.all(
			values.SubjectGrades.map(sg =>
				createSubjectGrades({
					...sg,
					ApplicantId: id
				})
			)
		)
	}

	navigate?.(`/applicant/${id}`)

	return created
}

export default submitApplicant
