const { Order, ProductInCart } = require("../models/order")


// Middleware for getting ordersId
exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({ error: "No order found in DB" })
      }

      req.order = order
      next()
    })
}


// Controller to create the order
exports.createOrder = (req, res) => {
  req.body.order.user = req.profile
  const order = new Order(req.body.order)
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({ error: "Failed to save order in DB" })
    }

    res.json(order)
  })
}


// Controller to get all orders
exports.getAllOrders = (req, res) =>  {
  Order.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({ error: "No orders found in DB" })
      }

      res.json(orders)
    })
}


// Controller to get the status of all orders
exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues)
}

// Controller to update the order
exports.updateStatus = (req, res) => {
  Order.update(
    {_id: req.body.order},
    {$set: {status: req.body.status}},
    (err, order) => {
      if(err){
        return res.status(400).json({error: "Cannot update order status"})
      }

      res.json(order)
    }
  )
}