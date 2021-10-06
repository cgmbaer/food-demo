var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var IngredientSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  recipeIngredients: [{
    type: Schema.Types.ObjectId,
    required: false,
    ref: "RecipeIngredient"
  }],
});

// Create model from the schema
var Ingredient = mongoose.model("Ingredient", IngredientSchema);

// Export model
module.exports = Ingredient;