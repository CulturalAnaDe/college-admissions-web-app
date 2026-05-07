const express = require('express')
const router = express.Router()
const qualificationsController = require('../controllers/qualification.controller')

router.get('/', qualificationsController.getAllQualifications)
router.get('/:id', qualificationsController.getQualificationById)
router.post('/', qualificationsController.createQualification)
router.put('/:id', qualificationsController.updateQualification)
router.delete('/:id', qualificationsController.deleteQualification)

module.exports = router
