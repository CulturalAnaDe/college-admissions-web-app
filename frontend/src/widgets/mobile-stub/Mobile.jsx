import { FaRegFrown } from 'react-icons/fa'

const Mobile = () => {
	return (
		<div className='flex flex-col gap-5 justify-center text-center items-center h-dvh'>
			<h1>Доступ ограничен</h1>
			<p>
				Пожалуйста, откройте приложение с компьютера. Мобильная версия пока не
				поддерживается.
			</p>
			<FaRegFrown size={65} />
		</div>
	)
}

export default Mobile
