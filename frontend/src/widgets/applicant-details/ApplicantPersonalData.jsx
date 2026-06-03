import CustomInput from '@/shared/components/ui/CustomInput'
import CustomSelect from '@/shared/components/ui/CustomSelect'
import { useState } from 'react'

import { objApplicant } from './applicantConfig'

const ApplicantPersonalData = ({ applicant, setApplicant }) => {
	const [error, setError] = useState([])

	const handleChange = (name, e) => {
		const value = e?.target ? e.target.value : e

		const fieldCfg = objApplicant[name]

		if (fieldCfg?.pattern && !fieldCfg.pattern.test(value)) {
			setError(fieldCfg.errorMsg)
			return
		}

		setError('')
		setApplicant(prev => ({
			...(prev || {}),
			[name]: value
		}))
	}

	return (
		<div className='border-2 rounded-lg p-4 border-gray-300 dark:bg-[#0A1424] dark:border-[#0E1A29]'>
			<h2 className='text-xl'>Личные данные</h2>
			<div className='grid grid-cols-6 gap-7'>
				{Object.entries(objApplicant).map(
					([key, { label, placeholder, type, options }]) => (
						<div
							className='flex flex-col'
							key={key}
						>
							<label className='text-[#3B568A]'>{label}</label>

							{type === 'select' ? (
								<CustomSelect
									name={key}
									value={applicant?.[key]}
									onChange={e => handleChange(key, e)}
									options={options}
								/>
							) : (
								<CustomInput
									type={type || ''}
									className='border border-[#E0DFDF] rounded-lg p-2'
									name={key}
									placeholder={placeholder}
									value={applicant?.[key] || ''}
									onChange={e => handleChange(key, e)}
								/>
							)}
						</div>
					)
				)}
			</div>
			<div className='mt-3 text-[#EF5350]'>{error}</div>
		</div>
	)
}

export default ApplicantPersonalData
