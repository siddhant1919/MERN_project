const User = require('../models/user')
const Order = require('../models/order')
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


// Controller to to Get Purchase list of user
exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({ error: "No Order in this account" })
      }

      return res.json(order)
    })
}

// Middleware
exports.pushOrderInPurchaseList = (req, res, next) => {
  
  let purchases = []
  req.body.order.products.forEach(product => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quatity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id
    })
  }) 

  // Store this in DB
  User.findOneAndUpdate(
    {_id: req.profile._id},
    {$push: {purchases: purchases}},
    {new: true},
    (err, purchases) => {
      if (err) {
        return res.status(400).json({ error: "Enable to save purchase list" })
      }

      next()
    }
  )
}


