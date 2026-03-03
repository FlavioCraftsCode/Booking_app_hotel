const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'debian-sys-maint',
    password: 'dStj4JrMdODtsrIz',
    database: 'luxestay_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    dateStrings: true
});


const db = pool.promise();

module.exports = db;
