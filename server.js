const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('path')
const authController = require('./controllers/auth')
const recipesController = require('./controllers/recipes')
const ingredientsController = require('./controllers/ingredients')
const isSignedIn = require('./middleware/is-Signed-in')
const passUserToView = require('./middleware/pass-user-to-view')
require('dotenv').config()

const app = express()

const port = process.env.PORT || '3000'

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

app.use(passUserToView)

app.use((req, res, next) => {
  if (req.session.message) {
    res.locals.message = req.session.message
    req.session.message = null
  }
  next()
})

app.use('/auth', authController)
app.use('/recipes', recipesController)
app.use('/ingredients', ingredientsController)

app.get('/', async (req, res) => {
  res.render('index', { user: req.session.user })
})

app.get('/recipes', isSignedIn, (req, res) => {
  res.send(
    `Welcome to the Recipe Collection, ${req.session.user.username}! Explore and enjoy cooking.`
  )
})

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`)
})
