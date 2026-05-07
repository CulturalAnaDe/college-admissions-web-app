import { downloadDocumentsAllApplicants } from '@/entities/applicant'
import CustomButton from '@/shared/components/ui/CustomButton'
import { useState } from 'react'
import { IoDocuments } from 'react-icons/io5'

const ApplicantDownloadDocs = () => {
	const [loading, setLoading] = useState(false)

	const handleProcess = async () => {
		const isProcess = confirm(
			'Вы собираете скачать все документы абитуриентов!'
		)
		if (!isProcess) return

		try {
			setLoading(true)
			await downloadDocumentsAllApplicants()
		} catch (err) {
			console.error(err)
			alert('Произошла ошибка при скачивании')
		} finally {
			setLoading(false)
		}
	}

	return (
		<CustomButton
			icon={IoDocuments}
			height={40}
			iconSize={18}
			text='Скачать все документы'
			onClick={handleProcess}
			disabled={loading}
		/>
	)
}

export default ApplicantDownloadDocs
