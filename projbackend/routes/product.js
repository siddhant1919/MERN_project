const express = require('express')
const router = express.Router()

const { 
  getProductById, 
  createProduct, 
  getProduct, 
  photo, 
  deleteProduct, 
  updateProduct, 
  getAllProducts, 
  getAllUniqueCategories
} = require('../controllers/product')
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/authentication')
const { getUserById } = require('../controllers/user')


// Params
router.param('userId', getUserById)
router.param('productId', getProductById)


// @type   POST
// @route  /api/product/create/:userId
// @desc   Route to create new product by admin
// @access PRIVATE
router.post('/product/create/:userId', isSignedIn, isAuthenticated, isAdmin, createProduct)


// @type   GET
// @route  /api/product/:productId
// @desc   Route to get a products
// @access PUBLIC
router.get('/product/:productId', getProduct)


// @type   GET
// @route  /api/product/photo/:productId
// @desc   Route to get product's photo by productId
// @access PUBLIC
router.get('/product/photo/:productId', photo)


// @type   DELETE
// @route  /api/product/:productId/:userId
// @desc   Route to delete a product by admin
// @access PRIVATE
router.delete('/product/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, deleteProduct)


// @type   PUT
// @route  /api/product/:productId/:userId
// @desc   Route to update a product by admin
// @access PRIVATE
router.put('/product/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, updateProduct)


// @type   GET
// @route  /api/products
// @desc   Route to get all products
// @access PUBLIC
router.get('/products', getAllProducts)


// @type   GET
// @route  /api/products/categories
// @desc   Route to get the products by there category
// @access PUBLIC
router.get('/products/categories', getAllUniqueCategories)

module.exports = router