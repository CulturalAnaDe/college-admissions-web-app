import { updateStatusAll } from '@/entities/applicant'
import CustomButton from '@/shared/components/ui/CustomButton'
import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'

const AcceptButton = () => {
	const [loading, setLoading] = useState(false)

	const handleProcess = async () => {
		const isProcess = confirm(
			'Абитуриенты, у кого не будет заполнены все поля и иметься нужные документы, заявки тех будут автоматически отклонены. Вы точно хотите принять всех абитуриентов'
		)
		if (!isProcess) return

		try {
			setLoading(true)
			await updateStatusAll()
			alert('Зачисление завершено')
		} catch (err) {
			console.error(err)
			alert('Произошла ошибка при обработке абитуриентов')
		} finally {
			setLoading(false)
		}
	}

	return (
		<CustomButton
			icon={FaCheck}
			height={40}
			iconSize={18}
			text='Принять всех'
			onClick={handleProcess}
			disabled={loading}
		/>
	)
}

export default AcceptButton
