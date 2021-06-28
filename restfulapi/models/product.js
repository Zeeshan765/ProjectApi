var mongoose = require("mongoose");
const Joi = require("@hapi/joi");

//Schema
var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      
      
      picture: {
        type: String,
        required: true,
      },
    

});

//Model
var Product =  mongoose.model("Product", productSchema);

//Hapi Joi Validation
function validateProduct(data) {
 const schema = Joi.object({
   name: Joi.string().min(3).max(100).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().min(3).max(100).required(),
    picture:Joi.string().min(3).max(200).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.Product = Product;
module.exports.validate= validateProduct;