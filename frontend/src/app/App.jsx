import {
	ApplicantCreatePage,
	ApplicantEditPage,
	ApplicantListPage
} from '@/pages/Applicants'
import Authorization from '@/pages/Authorization'
import {
	BenefitCreatePage,
	BenefitEditPage,
	BenefitListPage
} from '@/pages/Benefit'
import { GroupCreatePage, GroupEditPage, GroupListPage } from '@/pages/Groups'
import {
	QualificationCreatePage,
	QualificationEditPage,
	QualificationListPage
} from '@/pages/Qualifications'
import {
	SpecialtyCreatePage,
	SpecialtyEditPage,
	SpecialtyListPage
} from '@/pages/Specialties'
import StatsListPage from '@/pages/Stats'
import { UserCreatePage, UserPage } from '@/pages/Users'
import { Layout, PrivateRoute } from '@/widgets/layout'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { useWindowSize } from '@/shared/hooks/useWindowSize'
import Mobile from '@/widgets/mobile-stub/Mobile'

import './index.css'
function App() {
	const width = useWindowSize()
	const isMobile = width < 768

	if (isMobile) {
		return <Mobile />
	}

	return (
		<Router>
			<Routes>
				<Route
					path='/auth'
					element={<Authorization />}
				/>

				<Route
					element={
						<PrivateRoute>
							<Layout />
						</PrivateRoute>
					}
				>
					<Route
						path='/'
						element={<ApplicantListPage />}
					/>
					<Route
						path='/applicant/new'
						element={<ApplicantCreatePage />}
					/>
					<Route
						path='/applicant/:id'
						element={<ApplicantEditPage />}
					/>
					<Route
						path='/group'
						element={<GroupListPage />}
					/>
					<Route
						path='/group/new'
						element={<GroupCreatePage />}
					/>
					<Route
						path='/group/:id'
						element={<GroupEditPage />}
					/>
					<Route
						path='/specialty'
						element={<SpecialtyListPage />}
					/>
					<Route
						path='/specialty/:id'
						element={<SpecialtyEditPage />}
					/>
					<Route
						path='/specialty/new'
						element={<SpecialtyCreatePage />}
					/>
					<Route
						path='/qualification'
						element={<QualificationListPage />}
					/>
					<Route
						path='/qualification/:id'
						element={<QualificationEditPage />}
					/>
					<Route
						path='/qualification/new'
						element={<QualificationCreatePage />}
					/>
					<Route
						path='/benefit'
						element={<BenefitListPage />}
					/>
					<Route
						path='/benefit/new'
						element={<BenefitCreatePage />}
					/>
					<Route
						path='/benefit/:id'
						element={<BenefitEditPage />}
					/>
					<Route
						path='/stats'
						element={<StatsListPage />}
					/>
					<Route
						path='/user'
						element={<UserPage />}
					/>
					<Route
						path='/user/new'
						element={<UserCreatePage />}
					/>
				</Route>
			</Routes>
		</Router>
	)
}

export default App
