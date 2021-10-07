var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true
  },
  departments: {
    type: Array,
    required: true
  },
  review: {
    type: Schema.Types.ObjectId,
    ref: "Review"
  }
});

// Create model from the schema
var Product = mongoose.model("Product", ProductSchema);

// Export model
module.exports = Product;