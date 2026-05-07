import { useEffect, useState } from 'react'
import { getAllBenefit } from '../api/benefit.api'

const useBenefits = () => {
	const [benefits, setBenefits] = useState([])
	const [allBenefits, setAllBenefits] = useState([])
	const [loading, setLoading] = useState(false)

	const fetchBenefit = async () => {
		setLoading(true)
		try {
			const data = await getAllBenefit()
			setBenefits(data)
			setAllBenefits(data)
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchBenefit()
	}, [])

	return {
		benefits,
		setBenefits,
		allBenefits,
		refetch: fetchBenefit,
		loading
	}
}

export default useBenefits
