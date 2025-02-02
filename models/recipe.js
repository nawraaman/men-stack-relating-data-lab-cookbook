const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema(
  {
    recipeName: {
      type: String,
      required: true
    },
    instructions: {
      type: String,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    ingredients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient'
      }
    ]
  },
  {
    timestamps: true
  }
)

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
