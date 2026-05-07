import { useEffect, useState } from 'react'
import { getAllApplicants } from '../api/applicant.api'

const useApplicants = () => {
	const [allApplicants, setAllApplicants] = useState([])
	const [applicants, setApplicants] = useState([])
	const [loading, setLoading] = useState(false)

	const fetchApplicants = async () => {
		try {
			setLoading(true)
			const data = await getAllApplicants()
			setAllApplicants(data)
			setApplicants(data)
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchApplicants()
	}, [])

	return {
		allApplicants,
		setAllApplicants,
		applicants,
		setApplicants,
		refetch: fetchApplicants,
		loading
	}
}

export default useApplicants
