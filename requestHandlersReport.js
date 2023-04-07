var fs = require('fs');
var sql = require('mssql');
var config = require('./db_connect');
var querystring = require('querystring');



function UserReportSum(response, postData){

    sql.connect(config).then(function () {
        var req = new sql.Request();

        const query1 = "SELECT COUNT(*) AS student_count FROM dbo.Students";
        const query2 = "SELECT COUNT(*) AS faculty_count FROM dbo.Faculty";
        const query3 = "SELECT COUNT(*) AS guest_count FROM dbo.Guest";

    Promise.all([
        req.query(query1),
        req.query(query2),
        req.query(query3)
    ]).then(function (results) {
        // extract the counts from the result sets
        const student_count = results[0].recordset[0].student_count;
        const faculty_count = results[1].recordset[0].faculty_count;
        const guest_count = results[2].recordset[0].guest_count;

        // create an object to hold the counts
        const counts = {
            faculty: faculty_count,
            guests: guest_count,
            students: student_count
        };

        // send the counts to the frontend
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(counts));
    }).catch(function (err) {
        console.log(err);
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("Error retrieving user counts");
    });
}).catch(function (err) {
    console.log(err);
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Error connecting to database");
});}




    exports.UserReportSum = UserReportSum;