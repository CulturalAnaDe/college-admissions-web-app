const express = require('express')
const router = express.Router()
const specialtiesController = require('../controllers/specialties.controller')

router.get('/', specialtiesController.getAllSpecialties)
router.get('/:id', specialtiesController.getSpecialtiesById)
router.post('/', specialtiesController.createSpecialty)
router.put('/:id', specialtiesController.updateSpecialty)
router.delete('/:id', specialtiesController.deleteSpecialty)

module.exports = router
