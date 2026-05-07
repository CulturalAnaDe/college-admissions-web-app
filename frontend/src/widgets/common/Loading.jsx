import { ClipLoader } from 'react-spinners'

const Loading = ({ size = 40, color = '#3498db' }) => {
	return (
		<div className='flex items-center justify-center h-full'>
			<ClipLoader
				size={size}
				color={color}
			/>
		</div>
	)
}

export default Loading
