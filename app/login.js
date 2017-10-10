module.exports = function (mysql, username, passwd) {
    var connection = mysql.createConnection({
        host: process.env.MYSQL_ADDON_HOST,
        database: process.env.MYSQL_ADDON_DB,
        user: process.env.MYSQL_ADDON_USER,
        port: process.env.MYSQL_ADDON_PORT,
        password: process.env.MYSQL_ADDON_PASSWORD
    })
    connection.connect(() => {
        console.log('Database connected')
    })
    let sql = connection.query('SELECT * FROM users WHERE username = \'' + username + '\' AND password = \'' + passwd + '\'')
    sql.on('result', function (row) {
        if (username != row.username || passwd != row.password) {
            console.log('error')
            /*res.render('login', {
            error: "Username or password don't match !"
            })*/
            return
        } else {
            console.log('GOOD !!!!!! your now connected !')
            /*res.redirect('/')*/
        }
        console.log('works')
    })
    connection.end()
}
