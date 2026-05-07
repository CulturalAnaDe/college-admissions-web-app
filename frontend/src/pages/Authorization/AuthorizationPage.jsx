import qrCode from '@/shared/assets/qrcode.svg'
import CustomButton from '@/shared/components/ui/CustomButton'
import CustomInput from '@/shared/components/ui/CustomInput'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/features/auth/model/useAuth'

const Authorization = () => {
	const navigate = useNavigate()
	const { formik, step, error, loading } = useAuth(navigate)

	return (
		<div className='flex flex-col min-h-screen'>
			<div className='flex flex-col items-center justify-center grow gap-8'>
				<h2 className='text-2xl font-bold text-[#113151] dark:text-white'>
					Авторизация
				</h2>

				{step === 'id' && (
					<form
						onSubmit={formik.handleSubmit}
						className='flex flex-col gap-4 w-sm'
					>
						<CustomInput
							name='telegramId'
							value={formik.values.telegramId}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>

						{formik.touched.telegramId && formik.errors.telegramId && (
							<div className='text-[#EF5350] text-sm'>
								{formik.errors.telegramId}
							</div>
						)}

						<CustomButton
							type='submit'
							text={loading ? 'Отправка...' : 'Отправить код'}
							disabled={loading}
						/>
					</form>
				)}

				{step === 'code' && (
					<form
						onSubmit={formik.handleSubmit}
						className='flex flex-col gap-4 w-sm'
					>
						<CustomInput
							name='code'
							value={formik.values.code}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>

						{formik.touched.code && formik.errors.code && (
							<div className='text-[#EF5350] text-sm'>{formik.errors.code}</div>
						)}

						<CustomButton
							type='submit'
							text={loading ? 'Проверка...' : 'Подтвердить'}
							disabled={loading}
						/>
					</form>
				)}

				{error && <div className='text-red-500'>{error}</div>}
			</div>

			{step === 'id' && (
				<div className='flex flex-col items-center justify-center mb-8'>
					<img
						src={qrCode}
						alt='QR Code'
						className='w-60 h-60 border-3 rounded-lg border-[#0E1A29] dark:border-white'
					/>
					<h3 className='text-lg text-[#2a3956] dark:text-[#E0E6F2]'>
						t.me/Auth9314Bot
					</h3>
				</div>
			)}
		</div>
	)
}

export default Authorization
