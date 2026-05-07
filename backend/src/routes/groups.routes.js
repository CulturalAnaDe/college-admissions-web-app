const express = require('express')
const router = express.Router()
const groupsController = require('../controllers/groups.controller')

router.get('/', groupsController.getAllGroup)
router.get('/:id', groupsController.getGroupById)
router.post('/', groupsController.createGroup)
router.put('/:id', groupsController.updateGroup)
router.delete('/:id', groupsController.deleteGroup)

module.exports = router
