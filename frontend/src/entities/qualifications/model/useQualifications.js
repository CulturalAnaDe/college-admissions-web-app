import { useEffect, useState } from 'react'
import { getAllQualification } from '../api/qualification.api'

const useQualification = () => {
	const [qualifications, setQualifications] = useState([])
	const [allQualification, setAllQualification] = useState([])
	const [loading, setLoading] = useState(false)

	const fetchQualification = async () => {
		setLoading(true)
		try {
			const data = await getAllQualification()
			setQualifications(data)
			setAllQualification(data)
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchQualification()
	}, [])

	return {
		qualifications,
		setQualifications,
		allQualification,
		refetch: fetchQualification,
		loading
	}
}

export default useQualification
