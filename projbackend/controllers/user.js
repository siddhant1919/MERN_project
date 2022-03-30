const User = require('../models/user')
const router = require('../routes/user')


// Controller to get User by _id
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      })
    }

    req.profile = user
    next()
  })
}

// Controller to get the User
exports.getUser = (req, res) => {

  // hidding some properties from user
  req.profile.salt = undefined
  req.profile.encry_password = undefined
  req.profile.createdAt = undefined
  req.profile.updatedAt = undefined
  
  return res.json(req.profile)
}

// Controller to update the User's info
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({ error: "Not Authorized" })
      }
      req.profile.salt = undefined
      req.profile.encry_password = undefined
      res.json(user)
    }
  )
}