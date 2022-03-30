const User = require('../models/user')
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt');
const user = require('../models/user');




// Controller for SIGNUP
exports.signup = (req, res) => {

  // Custom error message for validation
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    })
  }

  // Saving User to DB
  const user = new User(req.body)
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save user in DB"
      })
    }

    res.json({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      _id: user.id
    })
  })
}


// Controller for SIGNIN
exports.signin = (req, res) => {

  // Destructuring email & password
  const { email, password } = req.body

  // Custom error message for validation
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    })
  }

  // Finding user from DB
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email does not exist"
      })
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "email and passwrod do not match"
      })
    }

    // Create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET)

    // Put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 })

    // Send responce to frontend
    const { _id, name, email, role } = user
    return res.json({ token, user: { _id, name, email, role } })

  })
}


// Controller for SIGNOUT
exports.signout = (req, res) => {
  // Clearing cookie for signing out
  res.clearCookie("token")

  res.json({
    message: "user signout successfully"
  })
}


// Protected routes (Middle ware for protected routes)
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ['RSA', 'sha1', 'RS256', 'HS256'],
  userProperty: "auth"
})



// custom middlewares for authentication check
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id
  if (!checker) {
    return res.status(403).json({ error: "Access Denied" })
  }
  next()
}


// custom middlewares for admin check
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    res.status(403).json({
      error: "You are not admin, Access Denied"
    })
  }

  next()
}
