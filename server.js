/**
 * Developed by Lucas JAHIER https://jahier.dev
 */

const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require("body-parser")
const indexRoutes = require('./routes/index.js')
const usersRoutes = require('./routes/users.js')
const adminRoutes = require('./routes/admin.js')

const app = express()
const port = 8080

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public/'));
app.use(bodyParser.urlencoded({ extended: false }))

app.use(indexRoutes)
app.use(usersRoutes)
app.use(adminRoutes)

app.listen(port, () => console.log(`Server running on localhost:${port}`))
