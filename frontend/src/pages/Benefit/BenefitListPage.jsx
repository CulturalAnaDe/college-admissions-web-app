import { deleteBenefit, useBenefits } from '@/entities/benefit'
import CustomButton from '@/shared/components/ui/CustomButton'
import {
	PaginatedTable as BenefitPaginated,
	Loading,
	SearchFilter
} from '@/widgets/common'
import { FaEdit } from 'react-icons/fa'
import { MdCreateNewFolder, MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const BenefitList = () => {
	const navigate = useNavigate()
	const { benefits, setBenefits, allBenefits, refetch, loading } = useBenefits()

	const handleDelete = async id => {
		if (!window.confirm('Удалить льготу?')) return

		try {
			await deleteBenefit(id)
			refetch()
		} catch (err) {
			console.error(err)
		}
	}

	const handleFilter = ({ name, description }) => {
		let filtered = [...allBenefits]

		if (name) {
			filtered = filtered.filter(b =>
				b.name.toLowerCase().trim().includes(name.toLowerCase().trim())
			)
		}

		if (description) {
			filtered = filtered.filter(b =>
				b.description
					.toLowerCase()
					.trim()
					.includes(description.toLowerCase().trim())
			)
		}

		setBenefits(filtered)
	}

	const benefitFields = [
		{ name: 'name', type: 'input', placeholder: 'Название льготы' },
		{ name: 'description', type: 'input', placeholder: 'Описание льготы' }
	]

	if (loading) return <Loading />

	return (
		<>
			<div className='flex justify-between mb-4'>
				<h1 className='text-2xl text-[#2a3956] dark:text-[#E0E6F2] font-bold mb-6'>
					Льготы
				</h1>

				<div className='flex gap-2'>
					<CustomButton
						text='Создать Льготу'
						icon={MdCreateNewFolder}
						height={40}
						iconSize={18}
						onClick={() => navigate('/benefit/new')}
					/>
				</div>
			</div>
			<div>
				<SearchFilter
					fields={benefitFields}
					onFilter={handleFilter}
				/>

				<BenefitPaginated
					data={benefits}
					columns={[
						'ID',
						'Название',
						'Описание',
						'Дата добавления',
						'Действия'
					]}
					renderRow={benefit => (
						<tr key={benefit.id}>
							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-xs'>
								{benefit.id}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] font-medium'>
								{benefit.name}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-sm'>
								{benefit.description}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29] text-xs'>
								{new Date(benefit.createdAt).toLocaleDateString('ru-RU')}
							</td>

							<td className='p-2 border-t border-gray-300 dark:border-[#0E1A29]'>
								<div className='flex gap-2'>
									<CustomButton
										color='bg-none'
										className='bg-[#2563EB]/80 border dark:bg-[#2563EB]/20 dark:border-[#2563EB]/50'
										icon={FaEdit}
										iconOnly
										iconSize={18}
										onClick={() => navigate(`/benefit/${benefit.id}`)}
									/>
									<CustomButton
										color='bg-none'
										className='bg-[#A33734]/80 border dark:bg-[#A33734]/20 dark:border-[#A33734]/50'
										icon={MdDelete}
										iconOnly
										iconSize={18}
										onClick={() => handleDelete(benefit.id)}
									/>
								</div>
							</td>
						</tr>
					)}
				/>
			</div>
		</>
	)
}

export default BenefitList
