const express = require('express')
const router = express.Router()


const {
    validSign,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../helpers/valid')


const {
    signinController,
    requireSignin,
    registerController
} = require('../controllers/auth.controller.js')


router.post('/register',
    validSign,
    registerController)

router.post('/login',
    validLogin, signinController)

router.post('/',
    requireSignin)

// router.post('/activation', activationController)

module.exports = router