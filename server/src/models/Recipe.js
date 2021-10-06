var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var RecipeSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  },
  recipeIngredients: [{
    type: Schema.Types.ObjectId,
    ref: "RecipeIngredient"
  }]
});

// Create model from the schema
var Recipe = mongoose.model("Recipe", RecipeSchema);

// Export model
module.exports = Recipe;