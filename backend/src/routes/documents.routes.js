const express = require('express')
const router = express.Router()
const documentsController = require('../controllers/documents.controller')
const upload = require('../middlewares/upload.middleware')

router.get('/', documentsController.getAllDocuments)
router.get('/file/:id', documentsController.getDocument)
router.get('/download', documentsController.downloadDocumentsAllApplicants)
router.get('/download/:id', documentsController.downloadDocumentsApplicantId)
router.get('/:id', documentsController.getDocumentById)
router.post(
	'/upload/:applicantId',
	upload.array('files'),
	documentsController.uploadDocuments
)
router.delete('/:id', documentsController.deleteDocument)

module.exports = router
