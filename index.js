var express = require('express')
var subDomain = require('express-subdomain')
var exphbs = require('express-handlebars')
var mysql = require('mysql')
var config = require('./config')
// var http = require('http')
var app = express()
var port = 3000

console.log(config.database.password)

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
        return 0
    }
    res.render('home')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('*', function(req, res){
    res.redirect('/')
})


app.listen(port, () => {
    console.log('localhost:%s', port)
})
