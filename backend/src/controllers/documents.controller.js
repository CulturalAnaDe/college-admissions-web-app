const { Document, Applicant } = require('../models')

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

	res.json(document)
})

exports.deleteDocument = catchAsync(async (req, res) => {
	const { id } = req.params
	const document = await Document.findByPk(id)
	if (!document) throw httpError('Документа не существует', 404)

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

	const createdDocs = []

	files.forEach((file, index) => {
		const type = Array.isArray(types) ? types[index] : types
		createdDocs.push(
			Document.create({
				type,
				filePath: `uploads/documents/${file.filename}`,
				ApplicantId: applicant.id
			})
		)
	})

	const savedDocs = await Promise.all(createdDocs)
	res.status(201).json(savedDocs)
})

exports.downloadDocumentsAllApplicants = catchAsync(async (req, res) => {
	const fs = require('fs')

	const archive = archiver('zip', { zlib: { level: 6 } })

	const applicants = await Applicant.findAll({
		include: [{ model: Document }]
	})

	if (!applicants?.length)
		throw httpError('Данные для выгрузки отсутствуют', 404)

	res.setHeader('Content-Type', 'application/zip')
	res.setHeader(
		'Content-Disposition',
		'attachment; filename=all_applicants_documents.zip'
	)

	archive.pipe(res)

	archive.on('error', err => {
		throw httpError(err.message, 500)
	})

	for (const applicant of applicants) {
		const safeName = (applicant.firstName || 'unknown').replace(
			/[^a-zA-Z0-9а-яА-Я_-]/g,
			'_'
		)

		const folderName = `${applicant.id}_${applicant.iin}_${safeName}`

		for (const doc of applicant.Documents || []) {
			const absolutePath = path.resolve(__dirname, '..', '..', doc.filePath)

			try {
				await fs.promises.access(absolutePath)

				archive.file(absolutePath, {
					name: path.join(folderName, path.basename(doc.filePath))
				})
			} catch {}
		}
	}

	await archive.finalize()
})

exports.downloadDocumentsApplicantId = catchAsync(async (req, res) => {
	const { id } = req.params

	const archive = archiver('zip')

	const documents = await Document.findAll({ where: { ApplicantId: id } })
	if (!documents.length) {
		return res.status(404).json({ message: 'Документы не найдены' })
	}

	if (documents.length === 1) {
		const absolutePath = path.resolve(
			__dirname,
			'..',
			'..',
			documents[0].filePath
		)
		return res.download(absolutePath)
	}

	res.setHeader('Content-Type', 'application/zip')
	res.setHeader(
		'Content-Disposition',
		`attachment; filename=documents_${id}.zip`
	)

	archive.pipe(res)
	documents.forEach(doc => {
		const fileAbsPath = path.resolve(__dirname, '..', '..', doc.filePath)
		archive.file(fileAbsPath, { name: path.basename(doc.filePath) })
	})
	await archive.finalize()
})
