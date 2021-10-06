var mongoose = require("mongoose");

var Schema = mongoose.Schema;
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

var Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;