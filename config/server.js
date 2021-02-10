const express = require('express')
const path = require('path')
const { json } = require('body-parser')

const app = express()
const routes = require('../src/routes/index')

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(json())
app.use('/', routes)

module.exports = app