const StatusBadge = ({ status }) => {
	let bgColor = ''
	let name = ''
	switch (status) {
		case 'accepted':
			bgColor =
				'border bg-[#10b981] text-[white] dark:text-[#10b981] dark:bg-[#10b981]/20 dark:border-[#10b981]'
			name = 'Принят'
			break
		case 'rejected':
			bgColor =
				'border bg-[#ef4444] text-[white] dark:text-[#ef4444] dark:bg-[#ef4444]/20 dark:border-[#ef4444]'
			name = 'Отклонен'
			break
		case 'pending':
		default:
			bgColor =
				'border bg-[#f59e0b] text-[white] dark:text-[#f59e0b] dark:bg-[#f59e0b]/20 dark:border-[#f59e0b]'
			name = 'В процессе'
			break
	}

	return (
		<span
			className={`px-2 py-1 rounded-lg text-sm font-semibold whitespace-nowrap ${bgColor}`}
		>
			{name || 'pending'}
		</span>
	)
}

export default StatusBadge
