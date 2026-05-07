import CustomButton from '@/shared/components/ui/CustomButton'
import CustomSelect from '@/shared/components/ui/CustomSelect'
import { useState } from 'react'

const ApplicantBenefitData = ({ applicant, setApplicant, allBenefits }) => {
	const [selectedBenefit, setSelectedBenefit] = useState('')

	const handleSelectChange = e => {
		const val = e?.target ? e.target.value : (e?.value ?? e)
		setSelectedBenefit(val)
	}

	const handleAddBenefit = () => {
		if (!selectedBenefit && selectedBenefit !== 0) return

		const benefitToAdd = allBenefits?.find(
			q => q.id === Number(selectedBenefit)
		)
		if (!benefitToAdd) return

		const exists = (applicant?.Benefits || []).some(
			q => q.id === benefitToAdd.id
		)
		if (exists) return

		setApplicant(prev => ({
			...(prev || {}),
			Benefits: [...(prev?.Benefits || []), benefitToAdd]
		}))

		setSelectedBenefit('')
	}

	const handleRemoveBenefit = id => {
		setApplicant(prev => ({
			...(prev || {}),
			Benefits: (prev?.Benefits || []).filter(q => q.id !== id)
		}))
	}

	return (
		<div className='border-2 rounded-lg p-4 border-gray-300 dark:bg-[#0A1424] dark:border-[#0E1A29] flex flex-col'>
			<h2 className='text-xl mb-4'>Льготы</h2>

			<div className='grid grid-cols-3 gap-4 mb-6'>
				<div className='col-span-2'>
					<CustomSelect
						value={selectedBenefit}
						onChange={handleSelectChange}
						options={allBenefits?.map(q => ({
							value: q.id,
							label: q.name
						}))}
						placeholder='Выберите льготу'
					/>
				</div>
				<CustomButton
					onClick={handleAddBenefit}
					text='Добавить'
				/>
			</div>

			{applicant?.Benefits && applicant?.Benefits.length > 0 ? (
				<div className='grid grid-cols-4 gap-4'>
					{applicant.Benefits.map(q => (
						<div
							key={q.id}
							className='flex justify-between items-center p-2 border border-gray-300 dark:border-[#0E1A29] rounded-lg'
						>
							<span className='text-sm'>{q.name}</span>
							<CustomButton
								text='Удалить'
								onClick={() => handleRemoveBenefit(q.id)}
								className='text-red-500'
							/>
						</div>
					))}
				</div>
			) : (
				<p className='text-gray-500'>Льготы не назначены</p>
			)}
		</div>
	)
}

export default ApplicantBenefitData
