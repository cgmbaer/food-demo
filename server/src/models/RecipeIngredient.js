var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var RecipeIngredientSchema = new Schema({
  recipeId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Recipe"
  },
  amount: {
    type: Number,
    required: false,
  },
  ingredient: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Ingredient"
  }
});

// Create model from the schema
var RecipeIngredient = mongoose.model("RecipeIngredient", RecipeIngredientSchema);

// Export model
module.exports = RecipeIngredient;