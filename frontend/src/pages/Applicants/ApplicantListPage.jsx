import {
	deleteApplicant,
	updateStatusId,
	useApplicants
} from '@/entities/applicant'
import StatusBadge from '@/entities/applicant/ui/StatusBadge.jsx'
import { useBenefits } from '@/entities/benefit'
import { useGroups } from '@/entities/group'
import { useSpecialties } from '@/entities/specialty'
import AcceptButton from '@/features/accept-applicant/AcceptButton.jsx'
import CustomButton from '@/shared/components/ui/CustomButton'
import CustomSelect from '@/shared/components/ui/CustomSelect'
import ApplicantDownloadDocs from '@/widgets/applicant-form/ApplicantDownloadDocs.jsx'
import ApplicantExport from '@/widgets/applicant-form/ApplicantExport.jsx'
import { Loading, PaginatedTable, SearchFilter } from '@/widgets/common'
import { FaEdit } from 'react-icons/fa'
import { MdCreateNewFolder, MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const ApplicantList = () => {
	const navigate = useNavigate()
	const { groups } = useGroups()
	const { applicants, allApplicants, refetch, setApplicants, loading } =
		useApplicants()
	const { specialties } = useSpecialties()
	const { benefits } = useBenefits()

	const handleDelete = async id => {
		if (!window.confirm('Удалить абитуриента?')) return
		try {
			await deleteApplicant(id)
			refetch()
		} catch (err) {
			console.error(err)
		}
	}

	const handleFilter = ({
		lastName,
		specialty,
		group,
		status,
		iin,
		birthDate,
		benefit,
		educationLanguage,
		document
	}) => {
		let filtered = [...allApplicants]

		if (lastName) {
			filtered = filtered.filter(a =>
				a.lastName.toLowerCase().trim().includes(lastName.toLowerCase().trim())
			)
		}

		if (specialty) {
			filtered = filtered.filter(
				a => a.Qualification?.SpecialtyId === +specialty
			)
		}

		if (status) {
			filtered = filtered.filter(a => a.status === status)
		}

		if (iin) {
			filtered = filtered.filter(a => (a.iin || '').includes(iin))
		}

		if (group) {
			filtered = filtered.filter(a => a.Group?.id === +group)
		}

		if (document) {
			filtered = filtered.filter(a =>
				a.Documents?.some(d => d.type === document)
			)
		}

		if (birthDate) {
			filtered = filtered.filter(a =>
				a.birthDate.trim().includes(birthDate.trim())
			)
		}

		if (educationLanguage) {
			filtered = filtered.filter(
				a => a.EducationInfo?.educationLanguage === educationLanguage
			)
		}

		if (benefit) {
			filtered = filtered.filter(a => a.Benefits?.some(b => b.id === +benefit))
		}

		setApplicants(filtered)
	}

	const applicantFields = [
		{ name: 'lastName', type: 'input', placeholder: 'Фамилия' },
		{ name: 'iin', type: 'input', inputType: 'number', placeholder: 'ИИН' },
		{
			name: 'specialty',
			type: 'select',
			placeholder: 'Специальности',
			options: specialties.map(s => ({
				value: s.id,
				label: s.name
			}))
		},
		{
			name: 'group',
			type: 'select',
			placeholder: 'Группы',
			options: groups.map(g => ({
				value: g.id,
				label: g.name
			}))
		},
		{
			name: 'status',
			type: 'select',
			placeholder: 'Статус',
			options: [
				{ value: 'accepted', label: 'Принят' },
				{ value: 'pending', label: 'В процессе' },
				{ value: 'rejected', label: 'Отклонен' }
			]
		},
		{
			name: 'document',
			type: 'select',
			placeholder: 'Документы',
			options: [
				{ label: 'Удостоверение личности / паспорт', value: 'id_card' },
				{ label: 'Аттестат (оригинал)', value: 'certificate' },
				{ label: 'Приложение к аттестату', value: 'certificate_appendix' },
				{ label: 'ЕНТ сертификат', value: 'ent_certificate' },
				{ label: 'Фотографии 3x4', value: 'photo' },
				{ label: 'Медицинская справка 075-У', value: 'medical_075' },
				{ label: 'Флюорография', value: 'fluorography' },
				{ label: 'Копия удостоверения личности', value: 'id_copy' },
				{
					label: 'Приписное свидетельство (для юношей)',
					value: 'military_certificate'
				},
				{ label: 'Документы, подтверждающие льготы', value: 'benefits_docs' }
			]
		},
		{
			name: 'birthDate',
			type: 'input',
			placeholder: '2007-03-19'
		},
		{
			name: 'educationLanguage',
			type: 'select',
			placeholder: 'По отделениям',
			options: [
				{ value: 'ru', label: 'Русское' },
				{ value: 'kz', label: 'Казахское' }
			]
		},
		{
			name: 'benefit',
			type: 'select',
			placeholder: 'По льготам',
			options: benefits.map(b => ({
				value: b.id,
				label: b.name
			}))
		}
	]

	const handleAcceptId = async (id, data) => {
		try {
			await updateStatusId(id, data)
			refetch()
		} catch (err) {
			console.error(err)
		}
	}

	if (loading) return <Loading />

	return (
		<>
			<div className='flex justify-between mb-4'>
				<h1 className='text-2xl text-[#2a3956] dark:text-[#E0E6F2] font-bold mb-6'>
					Абитуриенты
				</h1>

				<div className='flex gap-2'>
					<AcceptButton />

					<ApplicantExport
						applicants={applicants}
						specialties={specialties}
					/>

					<ApplicantDownloadDocs />

					<CustomButton
						text='Создать абитуриента'
						icon={MdCreateNewFolder}
						height={40}
						iconSize={18}
						onClick={() => navigate('/applicant/new')}
					/>
				</div>
			</div>

			<div className='flex justify-between'>
				<SearchFilter
					fields={applicantFields}
					onFilter={handleFilter}
				/>
			</div>

			<PaginatedTable
				data={applicants}
				columns={[
					'ID',
					'ФИО',
					'Специальность',
					'ИИН',
					'Дата рождения',
					'Адрес',
					'Телефон',
					'Статус',
					'Дата добавления',
					'Действия'
				]}
				renderRow={app => (
					<tr key={app.id}>
						<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-xs'>
							{app.id}
						</td>

						<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] font-medium'>
							{app.lastName} {app.firstName} {app.middleName}
						</td>

						<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-sm'>
							{specialties?.find(s => s.id === app.Qualification?.SpecialtyId)
								?.name || '-'}
						</td>

						<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-xs'>
							{app.iin}
						</td>
						<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-xs'>
							{app.birthDate}
						</td>
						<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-xs'>
							{app.address}
						</td>
						<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-sm'>
							{app.phone}
						</td>

						<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29]'>
							<StatusBadge status={app.status} />
						</td>

						<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-xs'>
							{new Date(app.createdAt).toLocaleDateString('ru-RU')}
						</td>

						<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29]'>
							<div className='flex gap-2'>
								<div className=''>
									<CustomSelect
										placeholder='Статус'
										onChange={value => handleAcceptId(app.id, value)}
										options={[
											{ value: 'accepted', label: 'Принять' },
											{ value: 'rejected', label: 'Отклонить' },
											{ value: 'pending', label: 'Ожидание' }
										]}
									/>
								</div>
								<CustomButton
									color='bg-none'
									className='bg-[#2563EB]/80 border dark:bg-[#2563EB]/20 dark:border-[#2563EB]/50'
									icon={FaEdit}
									iconOnly
									iconSize={18}
									onClick={() => navigate(`/applicant/${app.id}`)}
								/>
								<CustomButton
									color='bg-none'
									className='bg-[#A33734]/80 border dark:bg-[#A33734]/20 dark:border-[#A33734]/50'
									icon={MdDelete}
									iconOnly
									iconSize={18}
									onClick={() => handleDelete(app.id)}
								/>
							</div>
						</td>
					</tr>
				)}
			/>
		</>
	)
}

export default ApplicantList
