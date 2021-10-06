var mongoose = require("mongoose");

var Schema = mongoose.Schema;
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

var Ingredient = mongoose.model("Ingredient", IngredientSchema);

module.exports = Ingredient;