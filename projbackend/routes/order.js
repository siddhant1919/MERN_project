const express = require('express')
const router = express.Router()

const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/authentication')
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user')
const { updateStock } = require("../controllers/product")
const { getOrderById, createOrder, getAllOrders, updateStatus, getOrderStatus } = require("../controllers/order")

// Params
router.param("userId", getUserById)
router.param("orderId", getOrderById)

// @type   POST
// @route  /api/order/create/:userId
// @desc   Route to create new order
// @access PRIVATE
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
)


// @type   GET
// @route  /api/order/all/:userId
// @desc   Route to get all orders by admin
// @access PRIVATE
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders)


// @type   GET
// @route  /api/order/status/:userId
// @desc   Route to get the status of all orders by admin
// @access PRIVATE
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus)


// @type   PUT
// @route  /api/order/:orderId/status/:userId
// @desc   Route to update the order status by admin
// @access PRIVATE
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus)

module.exports = router



