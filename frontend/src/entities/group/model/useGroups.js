import { useEffect, useState } from 'react'
import { getAllGroup } from '../api/group.api'

const useGroups = () => {
	const [groups, setGroups] = useState([])
	const [allGroups, setAllGroups] = useState([])
	const [loading, setLoading] = useState(false)

	const fetchGroups = async () => {
		setLoading(true)
		try {
			const data = await getAllGroup()
			setGroups(data)
			setAllGroups(data)
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchGroups()
	}, [])

	return {
		groups,
		setGroups,
		allGroups,
		refetch: fetchGroups,
		loading
	}
}

export default useGroups
