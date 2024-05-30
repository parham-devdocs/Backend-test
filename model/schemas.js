
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email:String,
  password: String,
    refreshToken:String,
    accessToken:String
});
const products = new mongoose.Schema({
  product_name: String,
  description: String,
  price: Number,
  
 
})

const Users= mongoose.model("User", UserSchema)
const Products = mongoose.model("Products", products)

module.exports={Users ,Products}