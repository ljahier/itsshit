module.exports = function (mysql, config, username, passwd) {
    var connection = mysql.createConnection({
        host: config.database.host,
        database: config.database.database,
        user: config.database.user,
        port: config.database.port,
        password: config.database.password
    })
    connection.connect(() => {
        console.log('Database Connected !')
    })
    let sql = connection.query('SELECT * FROM users WHERE username = \'' + username + '\'')
    sql.on('result', function (row) {
        if (row.username == username) {
            console.log(username)
            res.render('register', {
                error: "Username is already used !"
            })
            return
        }
    })
    myQuery = connection.query('INSERT INTO users (username, password) VALUES (\'' + username + '\', \'' + passwd + '\')')
    connection.end()
}
