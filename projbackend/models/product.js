const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose.Schema

const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  description: {
    type: String,
    trim: true,
    required: true,
    maxlength: 3000
  },
  price: {
    type: Number,
    required: true,
    trim: 32,
    maxlength: 32
  },
  category: {
    type: ObjectId,
    ref: "Category",
    required: true
  },
  stock: {
    type: Number,
  },
  sold: {
    type: Number,
    default: 0
  },
  photo: {
    data: Buffer,
    contentType: String
  }
},
  {
    timestamps: true
  })


module.exports = mongoose.model("Product", productSchema)