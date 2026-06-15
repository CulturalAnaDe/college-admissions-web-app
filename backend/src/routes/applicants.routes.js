const express = require('express')
const router = express.Router()
const applicantsController = require('../controllers/applicants.controller')
const upload = require('../middlewares/upload.middleware')

router.get('/', applicantsController.getAllApplicants)
router.get('/:id', applicantsController.getApplicantById)
router.post('/', applicantsController.createApplicant)
router.post(
	'/upload',
	upload.single('file'),
	applicantsController.uploadApplicantFile
)
router.put('/:id', applicantsController.updateApplicant)
router.put('/:id/group', applicantsController.assignGroup)
router.put('/:id/qualification', applicantsController.assignQualification)
router.put('/:id/benefits', applicantsController.assignBenefits)
router.delete('/:id', applicantsController.deleteApplicant)
router.patch('/:id/status', applicantsController.updateStatusApplicant)
router.patch('/statuses', applicantsController.updateStatusAll)

module.exports = router
