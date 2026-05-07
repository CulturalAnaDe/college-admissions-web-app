const express = require('express')
const router = express.Router()
const educationController = require('../controllers/educationInfo.controller')

router.get('/', educationController.getEducationInfo)
router.get('/:id', educationController.getEducationInfoById)
router.post('/applicant/:applicantId', educationController.createEducationInfo)
router.delete('/:id', educationController.deleteEducationInfo)
router.put('/:id', educationController.updateEducationInfo)

module.exports = router
