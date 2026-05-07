import { useEffect, useState } from 'react'
import { getAllSpecialties } from '../api/specialty.api'

const useSpecialties = () => {
	const [specialties, setSpecialties] = useState([])
	const [allSpecialties, setAllSpecialties] = useState([])
	const [loading, setLoading] = useState(false)

	const fetchSpecialty = async () => {
		setLoading(true)
		try {
			const data = await getAllSpecialties()
			setSpecialties(data)
			setAllSpecialties(data)
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchSpecialty()
	}, [])

	return {
		specialties,
		setSpecialties,
		allSpecialties,
		refetch: fetchSpecialty,
		loading
	}
}

export default useSpecialties
