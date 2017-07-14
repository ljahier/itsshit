/*
 * developed with love by Lucas JAHIER https://github.com/ljahier
 */

var express = require('express')
var subDomain = require('express-subdomain')
var exphbs = require('express-handlebars')
var mysql = require('mysql')
var config = require('./config.json')
var SHA256 = require("crypto-js/sha256")
var database = require('./database.js')
var app = express()
var port = 3000

var con = mysql.createConnection({
    host: config.database.host,
    database: config.database.database,
    user: config.database.user,
    port: config.database.port,
    password: config.database.password
})
/*con.connect(function (err) {
    if (err) throw err
    console.log("Database work!")
})*/
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
app.use(express.static('public/'))
app.get('/', (req, res) => {
    let mydomain = req.hostname
    let subdomain = mydomain.split('.')

    if (subdomain.length === 2) {
        res.render('page', {
            subdomain: subdomain[0]
        })
        database.insertInto(subdomain[0])
        return 0
    }
    res.render('home')
})
app.get('/home', (req, res) => {
    let mydomain = req.hostname
    let subdomain = mydomain.split('.')
    res.redirect('http://localhost:3000')
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
app.listen(port, () => {
    console.log('localhost:%s', port)
})
con.end()
