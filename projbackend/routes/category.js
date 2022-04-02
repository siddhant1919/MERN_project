const express = require('express')
const router = express.Router()

const { getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory } = require('../controllers/category')
const { isAuthenticated, isAdmin, isSignedIn } = require('../controllers/authentication')
const { getUserById } = require('../controllers/user')


// Params
router.param('userId', getUserById)
router.param('categoryId', getCategoryById)


// @type   POST
// @route  /api/category/create/:userId
// @desc   Route create new category
// @access PRIVATE
router.post('/category/create/:userId', isSignedIn, isAuthenticated, isAdmin, createCategory)


// @type   GET
// @route  /api/category/:categoryId
// @desc   Route to get category created by admin
// @access PRIVATE
router.get('/category/:categoryId', getCategory)


// @type   GET
// @route  /api/categoryies
// @desc   Route to get all categories
// @access PUBLIC
router.get('/categoryies', getAllCategory)


// @type   PUT
// @route  /api/category/:categoryId/:userId
// @desc   Route to update the category by admin
// @access PRIVATE
router.put('/category/:categoryId/:userId', isSignedIn, isAuthenticated, isAdmin, updateCategory)


// @type   DELETE
// @route  /api/category/:categoryId/:userId
// @desc   Route to delete the category by admin
// @access PRIVATE
router.delete('/category/:categoryId/:userId', isSignedIn, isAuthenticated, isAdmin, removeCategory)


module.exports = router