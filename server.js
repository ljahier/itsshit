/*
 * developed with love by Lucas JAHIER https://github.com/ljahier
 */

var express = require('express')
var subDomain = require('express-subdomain')
var exphbs = require('express-handlebars')
var session = require('express-session')
var mysql = require('mysql')
var config = require('./config.json')
var sha256 = require('sha256')
var bodyParser = require("body-parser")
var app = express()
var port = 8080

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
app.use(express.static('public/'))
app.use(bodyParser.urlencoded({
    extended: true
}))

require('./app/routes.js')(app, mysql, config, subDomain, exphbs, sha256, bodyParser, port)

app.listen(port, () => {
    console.log('localhost:%s', port)
})
