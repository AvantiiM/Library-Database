
const {createPool} = require('mssql')

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "rootuser",
    connectionLimit: 10
})

pool.query('SELECT * FROM Login', (err,res)=>{
    return console.log(res)
})