const Category = require('../models/category')


// Middleware to Get Category By Id
exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({ error: "category not found in DB" })
    }

    req.category = cate
    next()
  })
}


// Controller for creating category
exports.createCategory = (req, res) => {
  const category = new Category(req.body)
  category.save((err, cate) => {
    if (err) {
      return res.status(400).json({ error: "Not able to save category in DB" })
    }

    res.json(category)
  })
}


// Controller to get category
exports.getCategory = (req, res) => {
  return res.json(req.category)
}


// Controller get all categories
exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({ error: "No categories found" })
    }

    res.json(categories)
  })
}


// Controller for updating category
exports.updateCategory = (req, res) => {
  const category = req.category
  category.name = req.body.name

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({ error: "Failed to Update" })
    }
    res.json(updatedCategory)
  })
}


// Controller for deleting category
exports.removeCategory = (req, res) => {
  const category = req.category

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({ error: `Failed to delete this category ${category.name}` })
    }

    res.json({message: `successfully deleted the category ${category.name}`})
  })
}

