const express = require('express')
const router = express.Router()
const representativeController = require('../controllers/representative.controller')

router.get('/', representativeController.getAllRepresentative)
router.get('/:id', representativeController.getRepresentativeById)
router.post('/:applicantId', representativeController.createRepresentative)
router.put('/:applicantId', representativeController.updateRepresentative)
router.delete('/:id', representativeController.deleteRepresentative)

module.exports = router
