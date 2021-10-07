const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors');
const db = require("./models/models.js");

const app = express()
const port = 5000

var corsOptions = {
    origin: process.env.CLIENT
    }

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public static folder
// app.use(express.static("public"));

app.get("/", function(req, res) {
  res.send("Hello from demo app!");
});

app.get("/recipes", function(req,res) {
  db.Recipe.find({})
  .then(function(dbRecipes) {
    res.json(dbRecipes);
  })
  .catch(function(err) {
    res.json(err);
  })
});

app.get("/ingredients", function(req,res) {
  db.Ingredient.find({})
  .then(function(dbIngredients) {
    res.json(dbIngredients);
  })
  .catch(function(err) {
    res.json(err);
  })
});

app.get("/recipeIngredients", function(req,res) {
  db.RecipeIngredient.find({})
  .then(function(dbRecipeIngredient) {
    res.json(dbRecipeIngredient);
  })
  .catch(function(err) {
    res.json(err);
  })
});

app.get("/recipes/:id", function(req, res) {
  db.Recipe.findOne({ _id: req.params.id })
    .populate({ path: 'recipeIngredients', populate: { path: 'ingredient' }})
    .then(function(dbRecipe) {
      res.json(dbRecipe);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/recipe", function(req, res) {
  db.Recipe.create(req.body)
    .then(function(dbRecipe) {
      res.json(dbRecipe._id);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/recipe/:id", function(req, res) {
  db.Recipe.findByIdAndUpdate(req.params.id, req.body)
    .then(function(dbRecipe) {
      res.json(dbRecipe._id);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/ingredient", function(req, res) {
  db.Ingredient.create(req.body)
    .then(function(dbIngredient) {
      res.json(dbIngredient);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/recipeingredient", function(req, res) {
  db.RecipeIngredient.create(req.body)
    .then(function(dbRecipeIngredient) {
      res.json(dbRecipeIngredient);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/recipeingredient/:recipe_id", function(req, res) {
  db.RecipeIngredient.create(req.body)
    .then(function(dbRecipeIngredient) {
      return db.Recipe.findOneAndUpdate({ _id: req.params.recipe_id}, {$push: { recipeIngredients: dbRecipeIngredient._id } }, { "new": true });
    })
    .then(function(dbRecipe) {
      res.json(dbRecipe);
    })
    .catch(function(err) {
      res.json(err);
    });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})