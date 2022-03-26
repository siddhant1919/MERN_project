const User = require('../models/user')
const { check, validationResult } = require('express-validator');



exports.signup = (req, res) => {

  // Custom error message for validation
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(422).json({
      error: errors.array()[0].msg
    })
  }

  // Saving User to Database
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


exports.signout = (req, res) => {
  res.json({
    message: "user signout"
  })
}
