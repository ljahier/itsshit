module.exports = function (mysql, username, passwd) {
    var connection = mysql.createConnection({
        host: process.env.MYSQL_ADDON_HOST,
        database: process.env.MYSQL_ADDON_DB,
        user: process.env.MYSQL_ADDON_USER,
        port: process.env.MYSQL_ADDON_PORT,
        password: process.env.MYSQL_ADDON_PASSWORD
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
