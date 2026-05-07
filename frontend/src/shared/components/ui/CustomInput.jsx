const CustomInput = ({
	name = '',
	id = '',
	type = 'text',
	placeholder = '',
	value = '',
	onChange = () => {},
	width = 'auto',
	height = '40px',
	className = '',
	required = false
}) => {
	const baseClasses = `
		w-full
		bg-[#f3f4f6]
		border border-gray-300
		text-[#2a3956]
		px-4
		rounded-lg
		outline-none
		focus:ring-1 focus:ring-[#3c5078]/30
		placeholder-gray-400
		dark:border-[#152238]
		dark:bg-[#0E1426]
		dark:text-[#E0E6F2]
	`

	const style = {
		width,
		height
	}

	return (
		<input
			name={name}
			id={id}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className={`${baseClasses} ${className}`}
			style={style}
			required={required}
		/>
	)
}

export default CustomInput
