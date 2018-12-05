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
  console.log('Connected, my magnificent!');
});

module.exports = pool;
