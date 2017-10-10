module.exports = function (app, mysql, config, subDomain, exphbs, sha256, bodyParser, port) {
    app.get('/', (req, res) => {
        let mydomain = req.hostname
        let subdomain = mydomain.split('.')

        if (subdomain.length === 3) {
            res.render('page', {
                subdomain: subdomain[0]
            })
            return 0
        }
        res.render('home')
    })
    app.get('/home', (req, res) => {
        let mydomain = req.hostname
        let subdomain = mydomain.split('.')

        res.redirect('/')
    })
    app.get('/sign-in', (req, res) => {
        res.render('login')
    })
    app.get('/sign-up', (req, res) => {
        res.render('register')
    })
    app.post('/sign-up', (req, res) => {
        let username = req.body.username
        let passwd = sha256(req.body.password)
        let passwdConfrmtn = sha256(req.body.passwordConfirmation)
        if (passwd != passwdConfrmtn) {
            res.render('register', {
                error: "The password and password confirm don't match"
            })
            return
        }
        require('./register.js')(mysql, config, username, passwd)
        res.redirect('/home')
        console.log('GOOD !')
    })
    app.post('/sign-in', (req, res) => {
        let username = req.body.username
        let passwd = sha256(req.body.password)
        require('./login.js')(mysql, config, username, passwd)
    })
    app.get('/logout', function (req, res) {
        req.session.destroy()
        res.redirect('/')
    })

    app.post('/post', (req, res) => {
        let mydomain = req.hostname
        let subdomain = mydomain.split('.')
        // console.log()
        res.redirect('http://' + req.body.search + '.' + mydomain + ':' + port)
    })
    app.get('*', function (req, res) {
        res.redirect('/')
    })
}
