const mysql = require('mysql2');

require('dotenv').config();

// Create a connection pool instead of a single connection
const pool = mysql.createPool({
    host: 'localhost',         // WAMP MySQL host
    user: 'root',              // WAMP MySQL default user
    password: '',              // WAMP MySQL default password (empty string)
    database: 'car_rental', // <<< CHANGE THIS to your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Use pool.promise() to use modern async/await syntax
const promisePool = pool.promise();

module.exports = promisePool;