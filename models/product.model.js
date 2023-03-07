const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
       name: String,
       description: String,
       img: {
          type: String,
          default: "img url",
       },
    },
    { timestamps: true }
 );
 
 const productModel = mongoose.model("product", productSchema);

 module.exports = productModel