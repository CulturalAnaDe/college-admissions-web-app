import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { me, sendCode, verifyCode } from '../api/auth.api'
import validateAuth from '../validateAuth'

export const useAuth = navigate => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const [step, setStep] = useState('id')

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const data = await me()
				setUser(data?.user || null)
			} catch (error) {
				console.error(error)
				setUser(null)
			} finally {
				setLoading(false)
			}
		}

		fetchUser()
	}, [])

	const formik = useFormik({
		initialValues: {
			telegramId: '',
			code: ''
		},
		validate: values => validateAuth(values, step),

		onSubmit: async values => {
			try {
				setLoading(true)

				if (step === 'id') {
					const res = await sendCode(values.telegramId)

					if (res?.error) {
						formik.setFieldError('telegramId', res.error)
						return
					}

					setStep('code')
					return
				}

				if (step === 'code') {
					const res = await verifyCode({
						telegramId: values.telegramId,
						code: values.code
					})

					if (res?.error) {
						formik.setFieldError('code', res.error)
						return
					}

					navigate('/')
				}
			} catch {
				formik.setFieldError('code', 'Неверный код')
			} finally {
				setLoading(false)
			}
		}
	})

	return {
		user,
		loading,
		formik,
		step,
		setStep
	}
}
