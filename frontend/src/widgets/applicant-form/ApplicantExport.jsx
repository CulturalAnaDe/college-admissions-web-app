import CustomButton from '@/shared/components/ui/CustomButton'
import { saveAs } from 'file-saver'
import { useState } from 'react'
import { FiDownload } from 'react-icons/fi'
import * as XLSX from 'xlsx'

const ApplicantExport = ({ applicants, specialties }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedFields, setSelectedFields] = useState({
		fio: true,
		iin: true,
		birthDate: true,
		address: true,
		qualification: true,
		specialty: true,
		group: true,
		status: true,
		language: true,
		benefits: true,
		phone: true,
		gender: false,
		nationality: false,
		citizenship: false,
		fioRepresentative: false,
		phoneRepresentative: false,
		roleRepresentative: false
	})
	const fieldsConfig = [
		{ key: 'fio', label: 'ФИО' },
		{ key: 'iin', label: 'ИИН' },
		{ key: 'address', label: 'Адрес' },
		{ key: 'birthDate', label: 'Дата рождения' },
		{ key: 'gender', label: 'Пол' },
		{ key: 'nationality', label: 'Национальность' },
		{ key: 'citizenship', label: 'Гражданство' },

		{ key: 'qualification', label: 'Квалификация' },
		{ key: 'specialty', label: 'Специальность' },
		{ key: 'group', label: 'Группа' },
		{ key: 'status', label: 'Статус' },
		{ key: 'language', label: 'Отделение' },
		{ key: 'benefits', label: 'Льготы' },
		{ key: 'phone', label: 'Телефон' },

		{ key: 'fioRepresentative', label: 'ФИО опекуна' },
		{ key: 'phoneRepresentative', label: 'Телефон опекуна' },
		{ key: 'roleRepresentative', label: 'Роль опекуна' }
	]

	const fieldMappers = {
		fio: a => `${a.lastName} ${a.firstName} ${a.middleName}`,
		iin: a => a.iin,
		birthDate: a => a.birthDate,
		address: a => a.address,
		qualification: a => a.Qualification?.name || '-',
		specialty: (a, specialties) =>
			specialties.find(s => s.id === a.Qualification?.SpecialtyId)?.name || '-',
		group: a => a.Group?.name || '-',
		status: a =>
			a.status === 'pending'
				? 'В процессе'
				: a.status === 'rejected'
					? 'Отклонен'
					: 'Принят',
		language: a =>
			a.EducationInfo?.educationLanguage === 'ru' ? 'Русское' : 'Казахское',
		benefits: a =>
			a.Benefits?.length ? a.Benefits.map(b => b.name).join(', ') : '-',
		phone: a => a.phone,
		gender: a => a.gender,
		nationality: a => a.nationality,
		citizenship: a => a.citizenship,
		fioRepresentative: a =>
			`${a.LegalRepresentative.lastName} ${a.LegalRepresentative.firstName} ${a.LegalRepresentative.middleName}`,
		phoneRepresentative: a => a.phoneRepresentative,
		roleRepresentative: a =>
			a.roleRepresentative === 'male' ? 'Мужской' : 'Женский'
	}

	const handleExport = () => {
		const activeFields = fieldsConfig.filter(f => selectedFields[f.key])

		const formatted = applicants.map(a => {
			const row = {}

			activeFields.forEach(field => {
				const mapper = fieldMappers[field.key]

				if (mapper) {
					row[field.label] = mapper(a, specialties)
				}
			})

			return row
		})

		const workSheet = XLSX.utils.json_to_sheet(formatted)
		const workBook = XLSX.utils.book_new()

		XLSX.utils.book_append_sheet(workBook, workSheet, 'Applicant')

		const buffer = XLSX.write(workBook, {
			bookType: 'xlsx',
			type: 'array'
		})

		const blob = new Blob([buffer], {
			type: 'application/octet-stream'
		})

		saveAs(blob, `applicants_${new Date().toLocaleDateString()}.xlsx`)
		setIsOpen(false)
	}

	return (
		<>
			{isOpen && (
				<div className='fixed inset-0 z-50 flex items-center justify-center'>
					<div
						className='absolute inset-0 bg-black/50'
						onClick={() => setIsOpen(false)}
					/>

					<div className='relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-10 border-gray-300 dark:border-[#0E1A29] dark:bg-[#0A1424]'>
						<h3 className='text-lg font-bold text-[#2a3956] dark:text-[#E0E6F2] mb-6'>
							Выберите поля для экспорта
						</h3>

						<div className='space-y-2 max-h-64 overflow-y-auto p-5 border border-gray-300 dark:border-[#0E1A29] bg-white dark:bg-[#0A1424]'>
							{fieldsConfig.map(field => (
								<label
									key={field.key}
									className='flex items-center gap-2 cursor-pointer'
								>
									<input
										type='checkbox'
										className='w-4 h-4'
										checked={selectedFields[field.key]}
										onChange={e =>
											setSelectedFields(prev => ({
												...prev,
												[field.key]: e.target.checked
											}))
										}
									/>
									<span>{field.label}</span>
								</label>
							))}
						</div>

						<div className='flex justify-end gap-2 mt-6'>
							<CustomButton
								text='Отмена'
								onClick={() => setIsOpen(false)}
							/>
							<CustomButton
								text='Экспорт'
								onClick={handleExport}
							/>
						</div>
					</div>
				</div>
			)}

			<CustomButton
				icon={FiDownload}
				height={40}
				iconSize={18}
				text='Скачать таблицу'
				onClick={() => setIsOpen(true)}
			/>
		</>
	)
}

export default ApplicantExport
