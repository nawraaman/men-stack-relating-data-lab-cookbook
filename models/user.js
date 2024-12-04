const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: [3, 'Username must be at least 3 characters.'],
      maxlength: [10, 'Username must be no more than 10 characters.']
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
