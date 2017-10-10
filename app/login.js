module.exports = function (mysql, config, username, passwd) {
    var connection = mysql.createConnection({
        host: config.database.host,
        database: config.database.database,
        user: config.database.user,
        port: config.database.port,
        password: config.database.password
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
