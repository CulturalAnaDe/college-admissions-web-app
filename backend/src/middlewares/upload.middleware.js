const multer = require('multer')
const path = require('path')

const ALLOWED_MIME_TYPES = [
	'image/jpeg',
	'image/png',
	'image/gif',
	'image/webp',
	'application/pdf',
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'application/vnd.ms-excel',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	'text/plain'
]

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/documents')
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname)
		cb(null, `${Date.now()}-${Math.random()}${ext}`)
	}
})

const fileFilter = (req, file, cb) => {
	if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
		cb(null, true)
	} else {
		cb(new Error(`Недопустимый тип файла: ${file.mimetype}`), false)
	}
}

module.exports = multer({
	storage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 }
})
