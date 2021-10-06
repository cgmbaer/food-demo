var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var RecipeIngredientSchema = new Schema({
  recipe: {
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

var RecipeIngredient = mongoose.model("RecipeIngredient", RecipeIngredientSchema);

module.exports = RecipeIngredient;