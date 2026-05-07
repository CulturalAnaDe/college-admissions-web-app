import useCreateApplicant from '@/features/create-applicant/useCreateApplicant'

import CustomButton from '@/shared/components/ui/CustomButton'

import {
	EducationInfoData,
	PersonalData
} from '@/widgets/applicant-details/CreatedApplicant'

import Loading from '@/widgets/common/Loading'

const ApplicantCreate = () => {
	const { formik, loading } = useCreateApplicant()

	if (loading) return <Loading />

	const photoUrl = '/default-photo.jpg'

	return (
		<>
			<h1 className='text-2xl text-[#2a3956] dark:text-[#E0E6F2] font-bold'>
				Создание абитуриента
			</h1>

			<div className='flex items-center gap-5 mt-6 mb-5 p-2 rounded-lg dark:bg-[#0A1424] border border-gray-300 dark:border-[#0E1A29] text-gray-800 dark:text-white'>
				<img
					src={photoUrl}
					alt='Фото'
					className='w-16 h-16 rounded-full object-cover border-3 border-gray-300 dark:border-[#0E1A29]'
				/>

				<div className='flex flex-col'>
					<h2 className='text-xl'>Новая запись</h2>
					<p className='text-xs'>Будет создана после сохранения</p>
				</div>
			</div>

			<form onSubmit={formik.handleSubmit}>
				<div className='flex flex-col gap-5'>
					<PersonalData formik={formik} />

					<EducationInfoData formik={formik} />
				</div>

				<CustomButton
					className='mt-5'
					type='submit'
					text='Создать'
				/>
			</form>
		</>
	)
}

export default ApplicantCreate
