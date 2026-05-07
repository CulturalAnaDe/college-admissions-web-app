import CustomButton from '@/shared/components/ui/CustomButton'
import CustomSelect from '@/shared/components/ui/CustomSelect'

const ApplicantDocumentData = ({ applicant, setApplicant, documentDelete }) => {
	const handleDocumentChange = (index, field, value) => {
		setApplicant(prev => {
			const docs = [...(prev.Documents || [])]
			docs[index] = { ...docs[index], [field]: value }
			return { ...prev, Documents: docs }
		})
	}

	const handleFileChange = (index, file) => {
		if (!file) return

		setApplicant(prev => {
			const docs = [...(prev.Documents || [])]

			docs[index] = {
				...docs[index],
				file,
				preview: URL.createObjectURL(file)
			}

			return { ...prev, Documents: docs }
		})
	}

	const handleAddNew = () => {
		setApplicant(prev => ({
			...prev,
			Documents: [
				...(prev.Documents || []),
				{
					id: `new-${Date.now()}`,
					type: '',
					file: null,
					preview: null
				}
			]
		}))
	}

	const documents = [
		{ label: 'Удостоверение личности / паспорт', value: 'id_card' },
		{ label: 'Аттестат (оригинал)', value: 'certificate' },
		{ label: 'Приложение к аттестату', value: 'certificate_appendix' },
		{ label: 'ЕНТ сертификат', value: 'ent_certificate' },
		{ label: 'Фотографии 3x4', value: 'photo' },
		{ label: 'Медицинская справка 075-У', value: 'medical_075' },
		{ label: 'Флюорография', value: 'fluorography' },
		{ label: 'Копия удостоверения личности', value: 'id_copy' },
		{ label: 'Приписное свидетельство', value: 'military_certificate' },
		{ label: 'Документы по льготам', value: 'benefits_docs' }
	]

	return (
		<div className='border-2 border-gray-300 dark:border-[#0E1A29] dark:bg-[#0A1424] rounded-lg p-4 flex flex-col'>
			<h2 className='text-xl mb-4'>Документы</h2>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
				{applicant?.Documents?.length > 0 ? (
					applicant.Documents.map((doc, index) => (
						<div
							key={doc.id}
							className='flex flex-col gap-3 border-2 border-gray-300 dark:border-[#0E1A29] rounded-lg p-3 justify-between'
						>
							<div className='flex flex-col gap-1'>
								<label className='text-sm text-[#3B568A]'>Тип документа</label>
								<CustomSelect
									value={doc.type || ''}
									onChange={value => handleDocumentChange(index, 'type', value)}
									options={documents}
								/>
							</div>

							<div className='flex flex-col gap-1'>
								<label className='text-sm text-[#3B568A]'>Файл</label>
								<div className='flex items-center min-h-10'>
									{doc.file || doc.filePath ? (
										<a
											href={
												doc.filePreview ||
												`http://localhost:3000/${doc.filePath}`
											}
											target='_blank'
											rel='noreferrer'
											className='text-blue-500 underline text-sm truncate block w-full hover:text-blue-600 transition-colors'
										>
											{doc.file ? 'Новый файл' : 'Сохранённый файл'}
										</a>
									) : (
										<div className='w-full'>
											<label
												htmlFor={`file-upload-${index}`}
												className='flex items-center justify-center bg-[#f3f4f6] border border-gray-300 text-[#2a3956] px-3 py-2 rounded-lg cursor-pointer text-sm dark:border-[#152238] dark:bg-[#0E1426] dark:text-[#E0E6F2] hover:opacity-80 transition-opacity'
											>
												Выберите файл
											</label>
											<input
												type='file'
												id={`file-upload-${index}`}
												className='hidden'
												onChange={e =>
													handleFileChange(index, e.target.files[0])
												}
											/>
										</div>
									)}
								</div>
							</div>

							<CustomButton
								onClick={() => documentDelete(doc.id)}
								text='Удалить'
								className='w-full'
							/>
						</div>
					))
				) : (
					<div className='text-gray-500 col-span-full'>
						Документы отсутствуют
					</div>
				)}
			</div>

			<div className='mt-6'>
				<CustomButton
					onClick={handleAddNew}
					text='Добавить документ'
				/>
			</div>
		</div>
	)
}

export default ApplicantDocumentData
