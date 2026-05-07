const CustomSelect = ({
	name = '',
	value = '',
	onChange = () => {},
	options = [],
	width = 'auto',
	height = '40px',
	className = '',
	placeholder = 'Выберите'
}) => {
	const baseClasses = `
		w-full
		bg-[#f3f4f6]
		border border-gray-300
		text-[#2a3956]
		px-4 pr-10
		rounded-lg
		outline-none
		appearance-none
		focus:ring-2 focus:ring-[#3c5078]/30
		cursor-pointer
		dark:border-[#152238]
		dark:bg-[#0E1426]
		dark:text-[#E0E6F2]
	`

	return (
		<div
			className='relative'
			style={{ width, height }}
		>
			<select
				name={name}
				value={value}
				onChange={e => onChange(e.target.value)}
				className={`${baseClasses} ${className} h-full`}
			>
				<option value=''>{placeholder}</option>

				{options.map(opt => {
					const val = typeof opt === 'object' ? opt.value : opt
					const label = typeof opt === 'object' ? opt.label : opt

					return (
						<option
							key={val}
							value={val}
						>
							{label}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default CustomSelect
