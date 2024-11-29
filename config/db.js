const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'fanconnect'
});

db.connect(function (err) {
    if (err) throw err;
    console.log('DATABASE CONNECTED');
});

module.exports = db.promise(); // Cambia a promesas para usar async/await.
