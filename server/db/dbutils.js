const mysql2 = require('mysql2')

const pool = mysql2.createPool({

    user : 'D6_89421_Mahesh',
    host : 'localhost',
    password : 'manager',
    database : 'hackathon'


})

module.exports = pool;