const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const { requireSuperAdmin } = require('../middlewares/auth.middleware')

router.get('/get-users', requireSuperAdmin, userController.getUserAll)
router.post('/add-user', requireSuperAdmin, userController.addUser)
router.delete('/delete-user/:id', requireSuperAdmin, userController.deleteUser)

module.exports = router
