const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors');
const db = require("./models/models.js");

const app = express()
const port = 5000

var corsOptions = {
    origin: 'http://localhost:3000'
    }

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public static folder
// app.use(express.static("public"));

// Routes

// Home route. Currently just to make sure app is running returns hello message.
app.get("/", function(req, res) {
  res.send("Hello from demo app!");
});

// Route to get all products
app.get("/recipes", function(req,res) {
  db.Recipe.find({})
  .then(function(dbRecipes) {
    res.json(dbRecipes);
  })
  .catch(function(err) {
    res.json(err);
  })
});

// Route to get all reviews
app.get("/ingredients", function(req,res) {
  db.Ingredient.find({})
  .then(function(dbIngredients) {
    res.json(dbIngredients);
  })
  .catch(function(err) {
    res.json(err);
  })
});

// Route to get all reviews
app.get("/recipeIngredients", function(req,res) {
  db.RecipeIngredient.find({})
  .then(function(dbRecipeIngredient) {
    res.json(dbRecipeIngredient);
  })
  .catch(function(err) {
    res.json(err);
  })
});

// Route for creating a new Product
app.post("/recipe", function(req, res) {
  db.Recipe.create(req.body)
    .then(function(dbRecipe) {
      // If we were able to successfully create a Product, send it back to the client
      res.json(dbRecipe);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for creating a new Product
app.post("/ingredient", function(req, res) {
  db.Ingredient.create(req.body)
    .then(function(dbIngredient) {
      // If we were able to successfully create a Product, send it back to the client
      res.json(dbIngredient);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for creating a new Review and updating Product "review" field with it

app.post("/recipeingredient", function(req, res) {
  db.RecipeIngredient.create(req.body)
    .then(function(dbRecipeIngredient) {
      // If we were able to successfully create a Product, send it back to the client
      res.json(dbRecipeIngredient);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for creating a new Review and updating Product "review" field with it
app.post("/recipeingredient/:recipe_id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.RecipeIngredient.create(req.body)
    .then(function(dbRecipeIngredient) {
      // If a Review was created successfully, find one Product with an `_id` equal to `req.params.id`. Update the Product to be associated with the new Review
      // { new: true } tells the query that we want it to return the updated Product -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Recipe.findOneAndUpdate({ _id: req.params.recipe_id}, {$push: { recipeIngredients: dbRecipeIngredient._id } }, { "new": true });
    })
    .then(function(dbRecipe) {
      // If we were able to successfully update a Product, send it back to the client
      res.json(dbRecipe);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for retrieving a Product by id and populating it's Review.
app.get("/recipes/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Recipe.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate({ path: 'recipeIngredients', populate: { path: 'ingredient' }})
    .then(function(dbRecipe) {
      // If we were able to successfully find an Product with the given id, send it back to the client
      res.json(dbRecipe);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})