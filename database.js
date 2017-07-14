/*
var mysql = require('mysql')
var config = require('./config.json')
var con = mysql.createConnection({
    host: config.database.host,
    database: config.database.database,
    user: config.database.user,
    port: config.database.port,
    password: config.database.password
})

module.exports = {
    insertInto: function (subDomain) {
        console.log(subDomain)
    },
    selectFromCommunity: function (subDomain) {
        con.connect(function (err) {
            if (err) throw err
            con.query("SELECT * FROM community", function (err, result, fields) {
                if (err) throw err
                if (result.subDomain === true) {
                    console.log(subDomain)
                } else {
                    console.log('PUTEUH!!!')
                }
            })
        })
    }
}

con.end()
*/
