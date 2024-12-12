const sql = require('mssql');

// Database configuration
const config = {
  user: 'carpooling',         // SQL Server username
  password: 'carpooling', // SQL Server password
  server: 'localhost', // SQL Server hostname or IP address
  database: 'carpoolingdb',
  options: {
    encrypt: true,   // Use encryption
    trustServerCertificate: true // Use when working with self-signed certificates
  }
};

// Connect to SQL Server
async function connectToDb() {
  try {
    await sql.connect(config);
    console.log('Connected to the database.');
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
}

module.exports = sql;
