import { downloadDocumentsApplicantId } from '@/entities/applicant'
import StatusBadge from '@/entities/applicant/ui/StatusBadge'
import useEditApplicant from '@/features/edit-applicant/useEditApplicant'
import CustomButton from '@/shared/components/ui/CustomButton'
import { useGetImage } from '@/shared/hooks/useGetImage'
import ApplicantFormCarousel from '@/widgets/applicant-form/ApplicantFormCarousel'
import Loading from '@/widgets/common/Loading'

const ApplicantForm = () => {
	const {
		applicant,
		setApplicant,
		groups,
		qualifications,
		specialties,
		loading,
		handleSubmit,
		documentDelete,
		benefits,
		representative
	} = useEditApplicant()

	const { photoUser } = useGetImage(applicant)

	if (loading || !applicant) return <Loading />

	const photoUrl = photoUser

	const isAllDocuments = () => {
		const requiredDocuments = [
			{ label: 'Удостоверение личности / паспорт', value: 'id_card' },
			{ label: 'Аттестат (оригинал)', value: 'certificate' },
			{ label: 'ЕНТ сертификат', value: 'ent_certificate' },
			{ label: 'Фотографии 3x4', value: 'photo' },
			{ label: 'Медицинская справка 075-У', value: 'medical_075' },
			{ label: 'Флюорография', value: 'fluorography' },
			{ label: 'Копия удостоверения личности', value: 'id_copy' }
		]

		const missingDocs = []

		requiredDocuments.forEach(reqDoc => {
			const found = applicant.Documents?.some(doc => doc.type === reqDoc.value)
			if (!found) {
				missingDocs.push(reqDoc.label)
			}
		})

		return missingDocs.length === 0
	}

	return (
		<>
			<h1 className='text-2xl text-[#2a3956] dark:text-[#E0E6F2] font-bold'>
				Редактирование абитуриента
			</h1>

			<div className='flex items-center gap-5 mt-6 mb-5 p-2 rounded-lg dark:bg-[#0A1424] border border-gray-300 dark:border-[#0E1A29] text-gray-800 dark:text-white'>
				<img
					src={photoUrl}
					alt='Фото абитуриента'
					className='w-16 h-16 rounded-full object-cover border-3 border-gray-300 dark:border-[#0E1A29]'
				/>
				<p className='text-xl'>
					{applicant?.lastName || ''} {applicant?.firstName || ''}
				</p>
				<StatusBadge status={applicant?.status} />

				<div className='ml-auto'>
					{isAllDocuments() ? (
						<div className='flex gap-4 border bg-[#059669] text-[white] dark:bg-[#064e3b] dark:border-[#065f46] p-2 rounded-lg text-sm font-semibold'>
							<span className='flex items-center gap-2'>
								Все обязательные документы загружены
							</span>
							<CustomButton
								text='Скачать'
								onClick={() => downloadDocumentsApplicantId(applicant?.id)}
							/>
						</div>
					) : (
						<div className='flex gap-4 border bg-[#b91c1c] text-[white] dark:bg-[#451a1a] dark:border-[#7f1d1d] p-2 rounded-lg text-sm font-semibold'>
							<span className='flex items-center gap-2'>
								Не все документы загружены
							</span>
							<CustomButton
								text='Скачать'
								onClick={() => downloadDocumentsApplicantId(applicant?.id)}
							/>
						</div>
					)}
				</div>
			</div>

			<div className='flex gap-5'>
				<ApplicantFormCarousel
					applicant={applicant}
					setApplicant={setApplicant}
					groups={groups}
					qualifications={qualifications}
					specialties={specialties}
					benefits={benefits}
					documentDelete={documentDelete}
					representative={representative}
				/>
			</div>

			<div className='flex justify-end'>
				<CustomButton
					className='mt-5'
					onClick={handleSubmit}
					text='Сохранить изменения'
				/>
			</div>
		</>
	)
}

export default ApplicantForm
