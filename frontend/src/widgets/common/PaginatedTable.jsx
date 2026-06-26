import CustomButton from '@/shared/components/ui/CustomButton'
import { useState } from 'react'
import { GrFormNextLink } from 'react-icons/gr'

const PaginatedTable = ({ data = [], columns = [], renderRow }) => {
	const [page, setPage] = useState(1)
	const limit = 10

	const totalPages = Math.ceil(data.length / limit)
	const startIndex = (page - 1) * limit
	const currentData = data.slice(startIndex, startIndex + limit)

	const visiblePages = 5
	let startPage = Math.max(1, page - Math.floor(visiblePages / 2))
	let endPage = startPage + visiblePages - 1

	if (endPage > totalPages) {
		endPage = totalPages
		startPage = Math.max(1, endPage - visiblePages + 1)
	}

	return (
		<div className='dark:bg-[#0A1424] shadow rounded-lg overflow-x-auto mt-6 border border-gray-300 dark:border-[#0E1A29]'>
			<table className='w-full text-gray-800 dark:text-white'>
				<thead>
					<tr>
						{columns.map(col => (
							<th
								key={col}
								className='p-2 text-left'
							>
								{col}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{currentData.length === 0 ? (
						<tr>
							<td
								colSpan={columns.length}
								className='text-center p-4'
							>
								Нет данных
							</td>
						</tr>
					) : (
						currentData.map(item => renderRow(item))
					)}
				</tbody>
			</table>

			<div className='flex gap-2 justify-center mt-2 pb-2 items-center'>
				<CustomButton
					iconOnly={true}
					iconSize={18}
					icon={GrFormNextLink}
					className='scale-x-[-1]'
					onClick={() => setPage(p => Math.max(1, p - 1))}
				/>

				{Array.from(
					{ length: endPage - startPage + 1 },
					(_, i) => startPage + i
				).map(p => (
					<CustomButton
						key={p}
						onClick={() => setPage(p)}
						text={p}
					/>
				))}

				<CustomButton
					iconOnly={true}
					iconSize={18}
					icon={GrFormNextLink}
					onClick={() => setPage(p => Math.min(totalPages, p + 1))}
				/>
			</div>
		</div>
	)
}

export default PaginatedTable
