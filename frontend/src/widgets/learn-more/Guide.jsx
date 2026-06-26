import CustomButton from '@/shared/components/ui/CustomButton'
import { useState } from 'react'
import { FaInfoCircle } from 'react-icons/fa'
const Guide = ({ text, guideInfo = [], description }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			{isOpen && (
				<div className='fixed inset-0 z-50 flex items-center justify-center'>
					<div
						className='absolute inset-0 bg-black/50'
						onClick={() => setIsOpen(false)}
					/>

					<div className='relative w-full max-w-md p-6 z-10 transition-all bg-white rounded-2xl shadow-xl border border-gray-300 dark:bg-[#0A1424] dark:border-blue-500/30 dark:shadow-[0_0_25px_rgba(37,99,235,0.2)]'>
						<div className='flex gap-3 items-center mb-4'>
							<FaInfoCircle size={32} />
							<h3 className='text-lg font-bold text-[#2a3956] dark:text-[#E0E6F2]'>
								Подсказка
							</h3>
						</div>

						<p className='text-sm text-gray-600 dark:text-slate-400 mb-5 leading-relaxed'>
							{text}
						</p>

						<hr className='border-gray-200 dark:border-slate-800/80 my-4' />

						<div className='space-y-4 mb-6'>
							{guideInfo.map(e => (
								<div
									key={e.number}
									className='flex gap-4'
								>
									<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 border border-gray-200 text-gray-500 dark:bg-blue-950/40 dark:border-blue-500/10 dark:text-blue-400'>
										{e.number}
									</div>
									<div>
										<h4 className='text-sm font-semibold text-gray-800 dark:text-white'>
											{e.header}
										</h4>
										<p className='text-xs text-gray-500 dark:text-slate-400 mt-0.5'>
											{e.description}
										</p>
									</div>
								</div>
							))}
						</div>

						{description && (
							<>
								<hr className='border-gray-200 dark:border-slate-800/80 my-4' />

								<p className='text-xs text-gray-500 dark:text-slate-400 mt-0.5 whitespace-pre-line'>
									{description}
								</p>
							</>
						)}

						<div className='flex justify-start mt-6'>
							<CustomButton
								text='Понятно'
								onClick={() => setIsOpen(false)}
							/>
						</div>
					</div>
				</div>
			)}

			<div>
				<CustomButton
					text='Подсказка'
					onClick={() => setIsOpen(true)}
				/>
			</div>
		</>
	)
}

export default Guide
