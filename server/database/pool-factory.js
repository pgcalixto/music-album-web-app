var mysql = require('mysql');

// connection pooling
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'music_records'
});

pool.on('acquire', function(connection) {
  console.log('Connected to the database pool!');
});

module.exports = pool;
