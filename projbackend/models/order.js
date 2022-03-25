const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose.Schema

const productInCartSchema = new Schema({
  product: {
    type: ObjectId,
    ref: "Product"
  },
  name: String,
  count: Number,
  price: Number
})

const ProductInCart = new mongoose.model("ProductInCart", productInCartSchema)


const orderSchema = new Schema({
  products: [productInCartSchema],
  transaction_id: {},
  amount: {
    type: Number
  },
  address: {
    type: String
  },
  updated: Date,
  user: {
    type: ObjectId,
    ref: "User"
  }
}, 
{
  timestamps: true
});


const Order = new mongoose.model("", orderSchema)


module.exports = {Order, ProductInCart}