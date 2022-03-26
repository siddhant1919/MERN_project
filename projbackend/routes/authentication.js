const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
const { signout, signup } = require('../controllers/authentication')


// @type   POST
// @route  /api/signup
// @desc   route for signing new user
// @access PUBLIC
router.post('/signup',
// Validation
[
  check("name", "name Should be at least 3 char").isLength({ min: 3 }),
  check("email", "email is required").isEmail(),
  check("password", "password should be atleast 3 char").isLength({ min: 3 })

], signup)


// @type   GET
// @route  /api/signout
// @desc   route for signing out 
// @access Private
router.get('/signout', signout)


module.exports = router

