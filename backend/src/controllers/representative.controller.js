const { LegalRepresentative, Applicant } = require('../models')

const catchAsync = require('../utils/catchAsync')
const httpError = require('../utils/httpError')

exports.getAllRepresentative = catchAsync(async (req, res) => {
	const represent = await LegalRepresentative.findAll()
	res.json(represent)
})

exports.getRepresentativeById = catchAsync(async (req, res) => {
	const { id } = req.params
	const represent = await LegalRepresentative.findByPk(id)

	if (!represent) throw httpError('Представитель отсутствует', 404)
	res.json(represent)
})

exports.createRepresentative = catchAsync(async (req, res) => {
	const { applicantId } = req.params

	const applicant = await Applicant.findByPk(applicantId)
	if (!applicant) throw httpError('Абитуриент отсутствует', 404)

	const { lastName, firstName, middleName, phone, role } = req.body

	const represent = await LegalRepresentative.create({
		lastName,
		firstName,
		middleName,
		phone,
		role,
		ApplicantId: applicant.id
	})
	res.status(201).json(represent)
})

exports.updateRepresentative = catchAsync(async (req, res) => {
	const { applicantId } = req.params
	const applicant = await Applicant.findByPk(applicantId)
	if (!applicant) throw httpError('Абитуриент отсутствует', 404)

	const [affectedRows] = await LegalRepresentative.update(req.body, {
		where: { ApplicantId: applicantId }
	})

	return res.status(200).json({
		updatedCount: affectedRows
	})
})

exports.deleteRepresentative = catchAsync(async (req, res) => {
	const { id } = req.params

	const represent = await LegalRepresentative.findByPk(id)
	if (!represent) throw httpError('Представитель отсутствует', 404)

	represent.destroy()
	res.json({ message: 'Представитель удален' })
})
