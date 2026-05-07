import CustomButton from '@/shared/components/ui/CustomButton'
import CustomInput from '@/shared/components/ui/CustomInput'
import CustomSelect from '@/shared/components/ui/CustomSelect'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchFilter = ({ fields = [], onFilter }) => {
	const [values, setValues] = useState({})

	const handleChange = (name, value) => {
		setValues(prev => ({
			...prev,
			[name]: value
		}))
	}

	const handleFilter = () => {
		onFilter(values)
	}

	return (
		//flex flex-wrap
		<div className='grid grid-cols-5 gap-4 max-h-50 overflow-y-auto dark:bg-[#0A1424] border border-gray-300 dark:border-[#152238] p-4 rounded-lg'>
			{fields.map(field => {
				if (field.type === 'input') {
					return (
						<CustomInput
							key={field.name}
							type={field.inputType || 'text'}
							placeholder={field.placeholder}
							value={values[field.name] || ''}
							onChange={e => handleChange(field.name, e.target.value)}
						/>
					)
				}

				if (field.type === 'select') {
					return (
						<CustomSelect
							key={field.name}
							value={values[field.name] || ''}
							onChange={value => handleChange(field.name, value)}
							options={field.options}
							placeholder={field.placeholder}
						/>
					)
				}

				return null
			})}

			<CustomButton
				text='Поиск'
				icon={FaSearch}
				height={40}
				iconSize={18}
				onClick={handleFilter}
			/>
		</div>
	)
}

export default SearchFilter
