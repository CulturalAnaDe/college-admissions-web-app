import { uploadApplicant } from '@/entities/applicant'
import CustomButton from '@/shared/components/ui/CustomButton'
import { useRef, useState } from 'react'
import { FaFileImport } from 'react-icons/fa6'

const UploadApplicantButton = () => {
	const [loading, setLoading] = useState(false)
	const fileInputRef = useRef(null)

	const handleFileChange = async e => {
		const file = e.target.files?.[0]

		if (!file) return

		try {
			setLoading(true)

			const formData = new FormData()
			formData.append('file', file)

			await uploadApplicant(formData)

			alert('Импорт завершен')
			location.reload()
		} catch (err) {
			console.error(err)
			alert('Произошла ошибка при импорте')
		} finally {
			setLoading(false)
			e.target.value = ''
		}
	}

	return (
		<>
			<input
				ref={fileInputRef}
				type='file'
				accept='.xlsx,.xls'
				style={{ display: 'none' }}
				onChange={handleFileChange}
			/>

			<CustomButton
				icon={FaFileImport}
				height={40}
				iconSize={18}
				text='Импортировать абитуриентов'
				disabled={loading}
				onClick={() => fileInputRef.current?.click()}
			/>
		</>
	)
}

export default UploadApplicantButton
