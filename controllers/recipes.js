const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')
const Ingredient = require('../models/ingredient')

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('ingredients').exec()
    res.render('recipes/index', { recipes })
  } catch (err) {
    console.error(err)
    res.status(500).send('Error fetching recipes')
  }
})

router.get('/new', async (req, res) => {
  try {
    const ingredients = await Ingredient.find()
    res.render('recipes/new', { ingredients })
  } catch (err) {
    console.error(err)
    res.status(500).send('Error loading recipe creation form')
  }
})

router.post('/', async (req, res) => {
  try {
    const { recipeName, instructions, ingredients } = req.body
    const newRecipe = new Recipe({
      recipeName,
      instructions,
      ingredients,
      owner: req.session.user._id
    })
    await newRecipe.save()
    res.redirect('/recipes')
  } catch (err) {
    console.error(err)
    res.status(500).send('Error creating recipe')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('ingredients')
      .exec()
    res.render('recipes/show', { recipe })
  } catch (err) {
    console.error(err)
    res.status(500).send('Error fetching recipe details')
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).exec()
    const ingredients = await Ingredient.find()
    res.render('recipes/edit', { recipe, ingredients })
  } catch (err) {
    console.error(err)
    res.status(500).send('Error loading recipe edit form')
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { recipeName, instructions, ingredients } = req.body
    await Recipe.findByIdAndUpdate(req.params.id, {
      recipeName,
      instructions,
      ingredients
    })
    res.redirect(`/recipes/${req.params.id}`)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error updating recipe')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id)
    res.redirect('/recipes')
  } catch (err) {
    console.error(err)
    res.status(500).send('Error deleting recipe')
  }
})

module.exports = router
