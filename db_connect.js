const sql = require('mssql');
const config = {
    user: 'Your user name',
    password: 'Your password',
    server: 'funserver.database.windows.net',
    database: 'Library Database',
    port: 1433,
    options: {
        encrypt: true
    }
};

var conn = new sql.ConnectionPool(config);

sql.connect(config)
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Failed to connect to database', err)); 

//exports.conn = conn;
exports.config = config;