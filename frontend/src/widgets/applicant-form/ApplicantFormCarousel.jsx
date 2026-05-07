import {
	ApplicantBenefitData,
	ApplicantDocumentData,
	ApplicantEducationInfo,
	ApplicantGroupData,
	ApplicantPersonalData,
	ApplicantSubjectGradesData
} from '@/widgets/applicant-details'

const ApplicantFormCarousel = ({
	applicant,
	setApplicant,
	groups,
	qualifications,
	specialties,
	benefits,
	documentDelete
}) => {
	return (
		<div className='flex flex-col gap-5'>
			<ApplicantPersonalData
				applicant={applicant}
				setApplicant={setApplicant}
			/>
			<ApplicantGroupData
				applicant={applicant}
				setApplicant={setApplicant}
				groups={groups}
				qualifications={qualifications}
				specialties={specialties}
			/>
			<ApplicantEducationInfo
				applicant={applicant}
				setApplicant={setApplicant}
			/>
			<ApplicantBenefitData
				applicant={applicant}
				setApplicant={setApplicant}
				allBenefits={benefits}
			/>
			<ApplicantSubjectGradesData
				applicant={applicant}
				setApplicant={setApplicant}
			/>

			<ApplicantDocumentData
				applicant={applicant}
				setApplicant={setApplicant}
				documentDelete={documentDelete}
			/>
		</div>
	)
}

export default ApplicantFormCarousel
