const express = require('express')
const router = express.Router()

const { getUserById, getUser, updateUser, userPurchaseList } = require('../controllers/user')
const { isSignedIn, isAuthenticated } = require('../controllers/authentication')

// Param
router.param('userId', getUserById)


// @type   GET
// @route  /api/user/:userId
// @desc   Route to get user by thier ID's
// @access PRIVATE
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser)


// @type   PUT
// @route  /api/user/:userId
// @desc   Route to update the info of user
// @access PRIVATE
router.put('/user/:userId', isSignedIn, isAuthenticated, updateUser)

// @type   PUT
// @route  /api/ordes/user/:userId
// @desc   Route to Get Purchase list of user
// @access PRIVATE
router.put('/orders/user/:userId', isSignedIn, isAuthenticated, userPurchaseList)


module.exports = router