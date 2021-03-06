const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')


// Controller for param
exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({ error: "Product not found" })
      }

      req.product = product
      next()
    })
}


// Controller for creating new product
exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ error: "Problem with image" })
    }


    // destructuring the fields
    const { name, description, price, category, stock } = fields

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({ error: "Please include all fields" })
    }

    // restrictions on fields
    let product = new Product(fields)

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: "File size too big!" })
      }

      product.photo.data = fs.readFileSync(file.photo.filepath);
      product.photo.contentType = file.photo.mimetype;
    }

    // console.log(product)

    // Save to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({ error: "Saving tshirt in DB failed" })
      }
      res.json(product)
    })
  })
}


// Controller for getting a product
exports.getProduct = (req, res) => {
  req.product.photo = undefined
  return res.json(req.product)
}


// Controller for getting a photo of product 
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType)
    return res.send(req.product.photo.data)
  }

  next()
}


// Controller for deleting a product
exports.deleteProduct = (req, res) => {
  let product = req.product
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({ error: "Failed to delete the product" })
    }

    res.json({ message: "Deletion was success" })
    deletedProduct
  })
}


// Controller for updating a product
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ error: "Problem with image" })
    }

    // updation code
    let product = req.product
    product = _.extend(product, fields)


    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: "File size too big!" })
      }

      product.photo.data = fs.readFileSync(file.photo.filepath);
      product.photo.contentType = file.photo.mimetype;
    }

    // console.log(product)

    // Save to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({ error: "Updation of product failed" })
      }

      res.json(product)
    })
  })
}


// Controller for getting all products
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id"

  Product.find()
    .select('-photo')
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({ error: "No product found" })
      }

      res.json(products)
    })
}


// Controller for getting the products by there category
exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if(err){
      return res.status(400).json({error: "No category found"})
    }

    res.json(category)

  })
}


// Controller for updating stock and sold count
exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.product.map(prod => {
    return {
      updateOne: {
        filter: {_id: prod._id},
        update: {$inc: {stock: -prod.count, sold: +prod.count}}
      }
    }
  })

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if(err){
      return res.status(400).json({error: "Bulk operations failed"})
    }

    next()
  })
}

