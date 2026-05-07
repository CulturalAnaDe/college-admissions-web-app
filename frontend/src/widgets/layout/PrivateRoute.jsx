import { useAuth } from '@/features/auth/model/useAuth'
import { Navigate } from 'react-router-dom'
import Loading from '../common/Loading'

const PrivateRoute = ({ children }) => {
	const { user, loading } = useAuth()

	if (loading) return <Loading />
	if (!user)
		return (
			<Navigate
				to='/auth'
				replace
			/>
		)

	return children
}

export default PrivateRoute
