const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
const { sign } = require('jsonwebtoken');
const { signout, signup, signin, isSignedIn } = require('../controllers/authentication')


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


// @type   POST
// @route  /api/signin
// @desc   route for signing new user
// @access PUBLIC
router.post('/signin',
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 })
  ]
  , signin)



// @type   GET
// @route  /api/signout
// @desc   route for signing out 
// @access Private
router.get('/signout', signout)


// @type   GET
// @route  /api/signout
// @desc   Route for testing 
// @access Public
router.get('/testroute', isSignedIn, (req, res) => {
  res.json(req.auth)
})


module.exports = router

