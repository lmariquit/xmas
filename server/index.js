const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const path = require('path')

app.use(morgan('dev'))
app.use(helmet())
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// If API route not found...
// router.use(function(req, res, next) {
//   const err = new Error('Not found.')
//   err.status = 404
//   next(err)
// })

// default to index.html if API route not provided
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

// We messed up...
app.use(function(err, req, res, next) {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

const port = process.env.PORT || 3000 // this can be very useful if you deploy to Heroku!
app.listen(port, function() {
  console.log('Knock, knock')
  console.log("Who's there?")
  console.log(`Your server, listening on port ${port}`)
})
