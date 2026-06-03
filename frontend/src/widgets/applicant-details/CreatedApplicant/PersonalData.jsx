import CustomInput from '@/shared/components/ui/CustomInput'
import CustomSelect from '@/shared/components/ui/CustomSelect'

import { objApplicant } from '../applicantConfig'
const PersonalData = ({ formik }) => {
	return (
		<div className='border-2 rounded-lg p-4 border-gray-300 dark:bg-[#0A1424] dark:border-[#0E1A29]'>
			<h2 className='text-xl'>Личные данные</h2>
			<div className='grid grid-cols-6 gap-7'>
				{Object.entries(objApplicant).map(([key, cfg]) => (
					<div
						className='flex flex-col'
						key={key}
					>
						<label className='text-[#3B568A]'>{cfg.label}</label>

						{cfg.type === 'select' ? (
							<CustomSelect
								name={key}
								value={formik.values[key] || ''}
								onChange={value => formik.setFieldValue(key, value)}
								onBlur={formik.handleBlur}
								options={cfg.options}
							/>
						) : (
							<CustomInput
								type={cfg.type || 'text'}
								name={key}
								placeholder={cfg.placeholder}
								value={formik.values[key]}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						)}

						{formik.touched[key] && formik.errors[key] && (
							<div className='text-[#EF5350] text-sm'>{formik.errors[key]}</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default PersonalData
