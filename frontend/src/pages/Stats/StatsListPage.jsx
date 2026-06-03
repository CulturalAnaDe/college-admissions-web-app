import { useApplicants } from '@/entities/applicant'
import { useSpecialties } from '@/entities/specialty'
import Loading from '@/widgets/common/Loading'
import { BarChart, PieChart } from '@/widgets/stats-charts'
import { FaUserGraduate } from 'react-icons/fa'
import { MdLanguage } from 'react-icons/md'

const StatsList = () => {
	const { applicants, loading: appLoading } = useApplicants()
	const { specialties, loading: specLoading } = useSpecialties()

	const allApplicants = applicants.length

	const applicantRU = applicants.filter(
		a => a.EducationInfo?.educationLanguage === 'ru'
	).length

	const applicantKz = applicants.filter(
		a => a.EducationInfo?.educationLanguage === 'kz'
	).length

	const applicantAccepted = applicants.filter(
		a => a.status === 'accepted'
	).length

	const applicantRejected = applicants.filter(
		a => a.status === 'rejected'
	).length

	const applicantPending = applicants.filter(a => a.status === 'pending').length

	const applicantInfo = [
		{
			name: 'Общее количество абитуриентов',
			value: allApplicants,
			icon: <FaUserGraduate size={30} />,
			color: 'text-blue-500'
		},
		{
			name: 'Русский язык',
			value: applicantRU,
			icon: <MdLanguage size={30} />,
			color: 'text-indigo-500'
		},
		{
			name: 'Казахский язык',
			value: applicantKz,
			icon: <MdLanguage size={30} />,
			color: 'text-emerald-500'
		}
	]

	const specialtyCounts = specialties.map(s => {
		const count = applicants.filter(
			a => a.Qualification?.SpecialtyId === s.id
		).length

		const num1 = s.name.split(' ')
		return {
			name: (num1[0]?.slice(0, 1) + num1[1]?.slice(0, 1)).toUpperCase(),
			value: count
		}
	})

	const dataStatus = [
		{ name: 'Принято', value: applicantAccepted },
		{ name: 'В процессе', value: applicantPending },
		{ name: 'Отказано', value: applicantRejected }
	]

	if (appLoading && specLoading) return <Loading />

	return (
		<div className='space-y-8'>
			<h1 className='text-2xl font-bold text-[#2a3956] dark:text-[#E0E6F2]'>
				Статистика
			</h1>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				{applicantInfo.map((a, i) => (
					<div
						key={i}
						className='flex items-center justify-between p-5 rounded-xl border border-gray-300 dark:border-[#0E1A29] bg-white dark:bg-[#0A1424] shadow-sm hover:shadow-md transition'
					>
						<div className='flex items-center gap-4'>
							<div className={`${a.color}`}>{a.icon}</div>

							<div>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									{a.name}
								</p>

								<p className='text-2xl font-bold'>{a.value}</p>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				<div className='p-6 rounded-xl border border-gray-300 dark:border-[#0E1A29] bg-white dark:bg-[#0A1424]'>
					<h2 className='text-lg font-semibold mb-4'>Статус абитуриентов</h2>

					<PieChart
						name='Абитуриенты'
						data={dataStatus}
					/>

					<div className=''>
						{dataStatus.map(s => (
							<div
								key={s.name}
								className='flex gap-2 text-lg'
							>
								<span>Заявок {s.name.toLowerCase()}</span>
								<span className='font-bold'>{s.value}</span>
							</div>
						))}
					</div>
				</div>

				<div className='p-6 rounded-xl border border-gray-300 dark:border-[#0E1A29] bg-white dark:bg-[#0A1424]'>
					<h2 className='text-lg font-semibold mb-4'>
						Специальности абитуриентов
					</h2>

					<BarChart data={specialtyCounts} />
				</div>
			</div>
		</div>
	)
}

export default StatsList
