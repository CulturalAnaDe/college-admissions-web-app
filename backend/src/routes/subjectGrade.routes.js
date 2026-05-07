const express = require('express')
const router = express.Router()
const subjectGradeController = require('../controllers/subjectGrade.controller')

router.get('/', subjectGradeController.getSubjectGrade)
router.post(
	'/applicant/:applicantId',
	subjectGradeController.createSubjectGrade
)
router.put('/:id', subjectGradeController.updateSubjectGrade)
router.delete('/:id', subjectGradeController.deleteSubjectGrade)

module.exports = router
