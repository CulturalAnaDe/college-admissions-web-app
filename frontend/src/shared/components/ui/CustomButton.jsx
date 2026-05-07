const CustomButton = ({
	type = 'button',
	text = '',
	color = 'bg-[#2563EB]',
	textColor = 'text-white',
	width = 'auto',
	height = 'auto',
	icon: Icon = null,
	iconSize = 16,
	iconOnly = false,
	onClick,
	className = ''
}) => {
	const baseClasses = `
    inline-flex items-center justify-center gap-2
    rounded-lg px-4 py-2 text-sm font-medium
    transition-all duration-200
    cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-blue-500/20
    disabled:opacity-40 disabled:cursor-not-allowed
 		${className}
	`

	const style = {
		width: width === 'auto' ? 'auto' : width,
		height: height === 'auto' ? 'auto' : height
	}

	return (
		<button
			type={type}
			className={`${baseClasses} ${color} ${textColor}`}
			style={style}
			onClick={onClick}
		>
			{Icon && <Icon size={iconSize} />}
			{!iconOnly && text}
		</button>
	)
}

export default CustomButton
