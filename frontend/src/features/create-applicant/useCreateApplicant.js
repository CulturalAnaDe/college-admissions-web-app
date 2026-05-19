import { getAllBenefit } from '@/entities/benefit'
import { getAllGroup } from '@/entities/group'
import { getAllQualification } from '@/entities/qualifications'
import { getAllSpecialties } from '@/entities/specialty'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import submitApplicant from './submitApplicant'
import validateApplicant from './validateApplicant'

const useCreateApplicant = () => {
	const [groups, setGroups] = useState([])
	const [qualifications, setQualifications] = useState([])
	const [specialties, setSpecialties] = useState([])
	const [benefit, setBenefit] = useState([])
	const [loading, setLoading] = useState(true)

	const navigate = useNavigate()

	useEffect(() => {
		const loadData = async () => {
			const [g, q, s, b] = await Promise.all([
				getAllGroup(),
				getAllQualification(),
				getAllSpecialties(),
				getAllBenefit()
			])

			setGroups(g)
			setQualifications(q)
			setSpecialties(s)
			setBenefit(b)

			setLoading(false)
		}

		loadData()
	}, [])

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			middleName: '',
			iin: '',
			address: '',
			birthDate: '',
			phone: '',
			motherPhone: '',
			fatherPhone: '',
			email: '',
			status: 'pending',

			GroupId: null,
			QualificationId: null,
			SpecialtyId: null,

			Documents: [],
			Benefit: [],

			EducationInfo: {
				baseClass: '',
				graduationYear: '',
				educationLanguage: ''
			},

			SubjectGrades: []
		},

		validate: validateApplicant,

		onSubmit: values => submitApplicant(values, navigate)
	})

	return {
		formik,
		groups,
		qualifications,
		specialties,
		benefit,
		loading
	}
}

export default useCreateApplicant
