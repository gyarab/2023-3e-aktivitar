var mysql = require('mysql2');
var conn = mysql.createConnection({
  host: 'aktivitar-krystof-aktivitar.b.aivencloud.com', 
  port: '23949',
  user: 'avnadmin',      
  password: 'HesloJsmeZBezpecnostnichDuvoduNezverejnili',      
  database: 'aktivitar' 
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;
