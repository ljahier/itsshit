/*
 * developed with love by Lucas JAHIER https://github.com/ljahier
 */

var express = require('express')
var subDomain = require('express-subdomain')
var exphbs = require('express-handlebars')
var mysql = require('mysql')
var config = require('./config.json')
var SHA256 = require("crypto-js/sha256")
// var database = require('./database.js')
var bodyParser = require("body-parser");
var app = express()
var port = 8080

var connection = mysql.createConnection({
    host: config.database.host,
    database: config.database.database,
    user: config.database.user,
    port: config.database.port,
    password: config.database.password
})
connection.connect(function (err) {
    if (!err) {
        console.log('Database is connected !')
    } else {
        console.log('Error connecting database, : %s', err) 
    }
})
connection.end(()=>{
    console.log('End connection at database')
})
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
app.use(express.static('public/'))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.get('/', (req, res) => {
    let mydomain = req.hostname
    let subdomain = mydomain.split('.')

    if (subdomain.length === 2) {
        res.render('page', {
            subdomain: subdomain[0]
        })
        // console.log('Debug APP.GET `/` : ' + database.selectFromCommunity(subdomain[0]))
        return 0
    }
    res.render('home')
})
app.get('/home', (req, res) => {
    let mydomain = req.hostname
    let subdomain = mydomain.split('.')
    if (subdomain.length >= 2) { // For prod change the length 2 are 3
        res.redirect('http://' + subdomain[1] + ':' + port)
    } else {
        res.redirect('/')
    }
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/register', (req, res) => {
    res.render('register')
})
app.get('*', function (req, res) {
    res.redirect('/')
})
app.post('/post', (req, res) => {
    let mydomain = req.hostname
    let subdomain = mydomain.split('.')
    // console.log()
    res.redirect('http://' + req.body.search + '.' + mydomain + ':' + port)
})
app.listen(port, () => {
    console.log('localhost:%s', port)
})
