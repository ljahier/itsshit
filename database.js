var mysql = require('mysql')
var config = require('./config.json')
var connection = mysql.createConnection({
    host: config.database.host,
    database: config.database.database,
    user: config.database.user,
    port: config.database.port,
    password: config.database.password
})

connection.connect(function (err) {
    if (!err) {
        console.log('Database is connected !')
    } else {
        console.log('Error connecting database, : %s', err)
    }
})

module.exports = {
    selectFromCommunity: function (subDomain) {
        connection.query('SELECT * FROM community', function (err, results, fields) {
            if (!err) {
                var result = results[0]
                 
                if (subDomain !== result['communityName']) {
                    console.log('FUCKU')
                    return
                    connection.end()
                }
                
                var communityNameVar = result['communityName']
                console.log('The solution is: ', result['communityName'])
                return communityNameVar
                connection.end()
            } else {
                console.log('Error while performing Query: %s', err)
                connection.end()
            }
        })
    },
    insertInto: function (subDomain) {
        console.log(subDomain)
    }
}
