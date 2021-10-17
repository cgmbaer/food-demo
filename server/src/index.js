const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
const db = require("./models/models.js")

const request = require('request');

const multer = require('multer')
const sharp = require('sharp')
const path = require('path')

const app = express()
const port = 5000

const corsOptions = {
  origin: process.env.CLIENT
}

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO, { useNewUrlParser: true });

sharp.cache(false);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, './' + req.body.type);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg');
  }
});

const upload = multer({ storage: storage })

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

app.post('/api/uploadImage', upload.single('image'), async function (req, res) {
  try {
    const fn = req.file.filename
    const fp = path.resolve(req.file.destination, fn)
    let dbField = 'recipeFn'

    if (req.body.type === 'images') {
      let buffer = await sharp(req.file.path)
        .resize(320, 240, { fit: sharp.fit.cover })
        .jpeg({ quality: 50, force: true })
        .toBuffer()
      await sharp(buffer).toFile(fp)
      dbField = 'imageFn'
    }
    db.Recipe.findByIdAndUpdate(req.body.id, { [dbField]: fn })
      .then(function () {
        res.json(fn);
      })
      .catch(function (err) {
        res.json(err);
      });
  } catch (err) {
    res.send(err);
  }
});

app.get("/api/testOCR", function (req, res) {
  let url = "http://ocr:5000";
  let options = { json: true };
  request(url, options, (error, res, body) => {
    if (error) {
      return console.log(error)
    };
    if (!error && res.statusCode == 200) {
      return res.body
    };
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})