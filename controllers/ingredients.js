const express = require('express')
const router = express.Router()
const Ingredient = require('../models/ingredient')

router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find()
    res.render('ingredients/index', { ingredients })
  } catch (err) {
    console.error(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const newIngredient = new Ingredient(req.body)
    await newIngredient.save()
    res.redirect('/ingredients')
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
