const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    let mydomain = req.hostname
    let subdomain = mydomain.split('.')

    if (subdomain.length === 2) { // 3 with domain and tld, 2 on localhost without tld
        res.render('page', {
            subdomain: subdomain[0]
        })
    } else {
        res.render('home')
    }
})

router.post('/school', (req, res) => {
    let mydomain = req.hostname
    let subdomain = mydomain.split('.')
    res.redirect('http://' + req.body.search + '.' + mydomain)
})

module.exports = router