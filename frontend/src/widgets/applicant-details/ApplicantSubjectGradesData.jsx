import { createSubjectGrades, deleteSubjectGrade } from '@/entities/applicant'
import CustomButton from '@/shared/components/ui/CustomButton'
import CustomSelect from '@/shared/components/ui/CustomSelect'
import { useState } from 'react'

const ApplicantSubjectGrades = ({ applicant, setApplicant }) => {
	const [newSubjectName, setNewSubjectName] = useState('')
	const [newGrade, setNewGrade] = useState('')

	const handleChange = (name, e, id = null) => {
		const value = e?.target ? e.target.value : e

		if (id) {
			setApplicant(prev => ({
				...prev,
				SubjectGrades: (prev.SubjectGrades || []).map(sg =>
					sg.id === id ? { ...sg, grade: value } : sg
				)
			}))
			return
		}

		if (name === 'subjectName') setNewSubjectName(value)
		if (name === 'grade') setNewGrade(value)
	}

	const handleAdd = () => {
		if (!newSubjectName) return

		const exists = (applicant.SubjectGrades || []).some(
			sg => sg.subjectName === newSubjectName
		)
		if (exists) return

		if (newGrade === '') return

		const newSubject = {
			id: Date.now(),
			subjectName: newSubjectName,
			grade: newGrade || ''
		}

		setApplicant(prev => ({
			...prev,
			SubjectGrades: [...(prev.SubjectGrades || []), newSubject]
		}))

		setNewSubjectName('')
		setNewGrade('')

		createSubjectGrades(applicant.id, newSubject)
	}

	const handleDelete = id => {
		setApplicant(prev => ({
			...prev,
			SubjectGrades: (prev.SubjectGrades || []).filter(s => s.id !== id)
		}))

		deleteSubjectGrade(id)
	}

	const subjects = [
		'Русский язык',
		'Казахский язык',
		'История Казахстана',
		'Математика',
		'Физика',
		'Химия',
		'Биология',
		'Информатика',
		'География',
		'Иностранный язык',
		'Всемирная история',
		'Литература'
	]

	const grades = ['5', '4', '3', '2', '1']

	const gradesABS =
		Math.round(
			applicant.SubjectGrades?.reduce((sum, g) => sum + Number(g.grade), 0) /
				applicant.SubjectGrades?.length
		) || 0

	return (
		<div className='border-2 border-gray-300 dark:border-[#0E1A29] dark:bg-[#0A1424] rounded-lg p-4 flex flex-col'>
			<h2 className='text-xl mb-4'>Предметы и оценки</h2>

			<div className='grid grid-cols-3 gap-4 mb-4'>
				<div className='col-span-1'>
					<CustomSelect
						value={newSubjectName}
						onChange={value => handleChange('subjectName', value)}
						placeholder='Название предмета'
						options={subjects}
					/>
				</div>

				<div className='flex gap-4 col-span-2'>
					<CustomSelect
						value={newGrade}
						onChange={value => handleChange('grade', value)}
						placeholder='Оценка'
						options={grades}
					/>
					<CustomButton
						onClick={handleAdd}
						text='Добавить'
						className='whitespace-nowrap'
					/>
					<div className='flex justify-center items-center gap-4'>
						<span>Средняя оценка: </span>
						<div
							className={`
									w-8 h-8 shrink-0 flex items-center justify-center rounded-md text-xs font-bold
									${
										gradesABS >= 4
											? 'bg-emerald-600 text-white'
											: gradesABS <= 2
												? 'bg-rose-600 text-white'
												: 'bg-amber-500 text-white'
									}
								`}
						>
							{gradesABS}
						</div>
					</div>
				</div>
			</div>

			<div className='grid grid-cols-4 gap-4'>
				{(applicant.SubjectGrades || []).map(sg => (
					<div
						key={sg.id}
						className='flex justify-between items-center p-2 border border-gray-300 dark:border-[#0E1A29] rounded-lg'
					>
						<div className='flex items-center gap-3'>
							<span className='text-sm'>{sg.subjectName}</span>
							<div
								className={`
									w-8 h-8 shrink-0 flex items-center justify-center rounded-md text-xs font-bold
									${
										sg.grade >= 4
											? 'bg-emerald-600 text-white'
											: sg.grade <= 2
												? 'bg-rose-600 text-white'
												: 'bg-amber-500 text-white'
									}
								`}
							>
								{sg.grade}
							</div>
						</div>

						<CustomButton
							text='Удалить'
							onClick={() => handleDelete(sg.id)}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default ApplicantSubjectGrades
