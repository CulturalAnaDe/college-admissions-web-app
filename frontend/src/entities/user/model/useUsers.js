import { useEffect, useState } from 'react'
import { getAllUsers } from '../api/user.api'

const useUsers = () => {
	const [users, setUsers] = useState([])
	const [allAllUsers, setAllUsers] = useState([])
	const [loading, setLoading] = useState(false)

	const fetchUsers = async () => {
		setLoading(true)
		try {
			const data = await getAllUsers()
			setUsers(data)
			setAllUsers(data)
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	return {
		users,
		setUsers,
		allAllUsers,
		refetch: fetchUsers,
		loading
	}
}

export default useUsers
