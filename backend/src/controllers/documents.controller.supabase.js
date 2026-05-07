const { Document, Applicant } = require('../models')
const supabase = require('../config/supabase')

const catchAsync = require('../utils/catchAsync')
const httpError = require('../utils/httpError')

const archiver = require('archiver')
const path = require('path')

exports.getAllDocuments = catchAsync(async (req, res) => {
	const documents = await Document.findAll()
	res.json(documents)
})

exports.getDocumentById = catchAsync(async (req, res) => {
	const { id } = req.params

	const document = await Document.findByPk(id)

	if (!document) {
		throw httpError('Документа не существует', 404)
	}

	const { data, error } = await supabase.storage
		.from('student-docs')
		.createSignedUrl(document.filePath, 60 * 5)

	if (error) {
		throw httpError(error.message, 500)
	}

	res.json({
		url: data.signedUrl
	})
})

exports.deleteDocument = catchAsync(async (req, res) => {
	const { id } = req.params
	const document = await Document.findByPk(id)
	if (!document) throw httpError('Документа не существует', 404)

	const { error: storageError } = await supabase.storage
		.from('student-docs')
		.remove([document.filePath])

	if (storageError) {
		console.log(storageError)
		throw httpError(storageError.message, 500)
	}

	await document.destroy()
	res.json({ message: 'Документ удален!' })
})

exports.uploadDocuments = catchAsync(async (req, res) => {
	const { applicantId } = req.params
	const files = req.files
	const types = req.body.types

	if (!files || files.length === 0) throw httpError('Файлы не загружены', 400)

	const applicant = await Applicant.findByPk(applicantId)
	if (!applicant) throw httpError('Абитуриента не существует', 404)

	const docsToCreate = []

	for (let i = 0; i < files.length; i++) {
		const file = files[i]
		const type = Array.isArray(types) ? types[i] : types

		const filePath = `applicants/${applicantId}/${Date.now()}-${file.originalname}`

		const { data, error } = await supabase.storage
			.from('student-docs')
			.upload(filePath, file.buffer, {
				contentType: file.mimetype,
				upsert: false
			})

		if (error) throw httpError(error.message, 500)

		console.log(file.mimetype)
		console.log(file.size)

		docsToCreate.push({
			type,
			filePath: data.path,
			ApplicantId: applicant.id
		})
	}

	const savedDocs = await Document.bulkCreate(docsToCreate)

	res.status(201).json(savedDocs)
})

exports.downloadDocumentsApplicantId = catchAsync(async (req, res) => {
	const { id } = req.params

	const archive = archiver('zip')

	const documents = await Document.findAll({ where: { ApplicantId: id } })
	if (!documents.length) {
		return res.status(404).json({ message: 'Документы не найдены' })
	}

	if (documents.length === 1) {
		return res.download(documents[0].filePath)
	}

	res.setHeader('Content-Type', 'application/zip')
	res.setHeader(
		'Content-Disposition',
		`attachment; filename=documents_${id}.zip`
	)

	archive.pipe(res)
	documents.forEach(doc => {
		archive.file(doc.filePath, { name: path.basename(doc.filePath) })
	})
	await archive.finalize()
})
