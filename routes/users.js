const express = require('express')
const sha256 = require('sha256')

const router = express.Router()

router.get('/login', (req, res) => {
    res.render('login')
    return
})

router.get('/register', (req, res) => {
    res.render('register')
    return
})

router.get('/logout', function (req, res) {
    req.session.destroy()
    res.redirect('/')
})

router.post('/login', (req, res) => {
    let username = req.body.username
    let passwd = sha256(req.body.password)
    require('./login.js')(mysql, username, passwd) // change to use mongodb
})

router.post('/register', (req, res) => {
    let username = req.body.username
    let passwd = sha256(req.body.password)
    let passwdConfrmtn = sha256(req.body.passwordConfirmation)
    if (passwd != passwdConfrmtn) {
        res.render('register', {
            error: "The password and password confirm don't match"
        })
    }
    require('./register.js')(mysql, username, passwd) // change to use mongodb
    res.redirect('/home')
    console.log('GOOD !')
})


module.exports = router