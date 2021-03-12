const express = require('express')
const { connect } = require('./config/mongodb')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 4000
const routes = require('./routes')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)

connect()
  .then(() => {
    console.log('Mongo Connected')
    app.listen(PORT, () => {
      console.log('Apps connected in port', PORT)
    })
  })
  .catch(err => {
    console.log(err, 'Mongo Connect Error')
  })