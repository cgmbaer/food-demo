const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors');
const db = require("./models/models.js");

const multer = require('multer');
const path = require('path')

const app = express()
const port = 5000

var corsOptions = {
  origin: process.env.CLIENT
}

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, './' + req.body.type);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ storage: storage })

app.use('/static/images', express.static("images"));
app.use('/static/recipes', express.static("recipes"));

app.get("/", function (req, res) {
  res.send("Hello from demo app!");
});

app.get("/api/recipes", function (req, res) {
  db.Recipe.find({})
    .then(function (dbRecipes) {
      res.json(dbRecipes);
    })
    .catch(function (err) {
      res.json(err);
    })
});

app.get("/api/ingredients", function (req, res) {
  db.Ingredient.find({})
    .then(function (dbIngredients) {
      res.json(dbIngredients);
    })
    .catch(function (err) {
      res.json(err);
    })
});

app.get("/api/recipeIngredients", function (req, res) {
  db.RecipeIngredient.find({})
    .then(function (dbRecipeIngredient) {
      res.json(dbRecipeIngredient);
    })
    .catch(function (err) {
      res.json(err);
    })
});

app.get("/api/recipes/:id", function (req, res) {
  db.Recipe.findOne({ _id: req.params.id })
    .populate({ path: 'recipeIngredients', populate: { path: 'ingredient' } })
    .then(function (dbRecipe) {
      res.json(dbRecipe);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.post("/api/recipe", function (req, res) {
  db.Recipe.create(req.body)
    .then(function (dbRecipe) {
      res.json(dbRecipe._id);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.post("/api/recipe/:id", function (req, res) {
  db.Recipe.findByIdAndUpdate(req.params.id, req.body)
    .then(function (dbRecipe) {
      res.json(dbRecipe._id);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.post("/api/ingredient", function (req, res) {
  db.Ingredient.create(req.body)
    .then(function (dbIngredient) {
      res.json(dbIngredient);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.post("/api/recipeingredient", function (req, res) {
  db.RecipeIngredient.create(req.body)
    .then(function (dbRecipeIngredient) {
      res.json(dbRecipeIngredient);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.post("/api/recipeingredient/:recipe_id", function (req, res) {
  db.RecipeIngredient.create(req.body)
    .then(function (dbRecipeIngredient) {
      return db.Recipe.findOneAndUpdate({ _id: req.params.recipe_id }, { $push: { recipeIngredients: dbRecipeIngredient._id } }, { "new": true });
    })
    .then(function (dbRecipe) {
      res.json(dbRecipe);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// app.post('/ttt', upload.single('image'), async (req, res) => {
//   const { filename: image } = req.file;

//   await sharp(req.file.path)
//     .resize(200, 200)
//     .jpeg({ quality: 90 })
//     .toFile(
//       path.resolve(req.file.destination, 'resized', image)
//     )
//   fs.unlinkSync(req.file.path)

//   res.redirect('/');
// });

app.post('/api/uploadImage', upload.single('image'), function (req, res) {
  try {
    res.json(req.file.filename);
  } catch (err) {
    res.send(400);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})