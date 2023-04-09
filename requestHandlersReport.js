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

// ############################################################################################################




function TransactionReportSum(response, postData){

    sql.connect(config).then(function () {
        var req = new sql.Request();

        const query1 = "SELECT COUNT(*) AS Book_count_April FROM dbo.Transactions WHERE Book_ID IS NOT NULL AND MONTH(Creation_Date) = 4";
        const query2 = "SELECT COUNT(*) AS Object_count_April FROM dbo.Transactions WHERE Object_ID IS NOT NULL AND MONTH(Creation_Date) = 4";
        const query3 = "SELECT COUNT(*) AS Electronic_count_April FROM dbo.Transactions WHERE Electronics_ID IS NOT NULL AND MONTH(Creation_Date) = 4";
        const query4 = "SELECT COUNT(*) AS Media_count_April FROM dbo.Transactions WHERE Media_ID IS NOT NULL AND MONTH(Creation_Date) = 4";

        const query5 = "SELECT COUNT(*) AS Book_count_March FROM dbo.Transactions WHERE Book_ID IS NOT NULL AND MONTH(Creation_Date) = 3";
        const query6 = "SELECT COUNT(*) AS Object_count_March FROM dbo.Transactions WHERE Object_ID IS NOT NULL AND MONTH(Creation_Date) = 3";
        const query7 = "SELECT COUNT(*) AS Electronic_count_March FROM dbo.Transactions WHERE Electronics_ID IS NOT NULL AND MONTH(Creation_Date) = 3";
        const query8 = "SELECT COUNT(*) AS Media_count_March FROM dbo.Transactions WHERE Media_ID IS NOT NULL AND MONTH(Creation_Date) = 3";

        const query9 = "SELECT COUNT(*) AS Book_count_Feb FROM dbo.Transactions WHERE Book_ID IS NOT NULL AND MONTH(Creation_Date) = 2";
        const query10 = "SELECT COUNT(*) AS Object_count_Feb FROM dbo.Transactions WHERE Object_ID IS NOT NULL AND MONTH(Creation_Date) = 2";
        const query11 = "SELECT COUNT(*) AS Electronic_count_Feb FROM dbo.Transactions WHERE Electronics_ID IS NOT NULL AND MONTH(Creation_Date) = 2";
        const query12 = "SELECT COUNT(*) AS Media_count_Feb FROM dbo.Transactions WHERE Media_ID IS NOT NULL AND MONTH(Creation_Date) = 2";


    Promise.all([
        req.query(query1),
        req.query(query2),
        req.query(query3),
        req.query(query4),
        req.query(query5),
        req.query(query6),
        req.query(query7),
        req.query(query8),
        req.query(query9),
        req.query(query10),
        req.query(query11),
        req.query(query12)


    ]).then(function (results) {
        // extract the counts from the result sets
            const book_count_april = results[0].recordset[0].Book_count_April;
            const object_count_april = results[1].recordset[0].Object_count_April;
            const electronic_count_april = results[2].recordset[0].Electronic_count_April;
            const media_count_april = results[3].recordset[0].Media_count_April;

            const book_count_march = results[4].recordset[0].Book_count_March;
            const object_count_march = results[5].recordset[0].Object_count_March;
            const electronic_count_march = results[6].recordset[0].Electronic_count_March;
            const media_count_march = results[7].recordset[0].Media_count_March;

            const book_count_feb = results[8].recordset[0].Book_count_Feb;
            const object_count_feb = results[9].recordset[0].Object_count_Feb;
            const electronic_count_feb = results[10].recordset[0].Electronic_count_Feb;
            const media_count_feb = results[11].recordset[0].Media_count_Feb;

        // create an object to hold the counts
        const counts = {
            april: {
                books: book_count_april,
                objects: object_count_april,
                electronics: electronic_count_april,
                media: media_count_april
            },
            march: {
                books: book_count_march,
                objects: object_count_march,
                electronics: electronic_count_march,
                media: media_count_march
            },
            feb: {
                books: book_count_feb,
                objects: object_count_feb,
                electronics: electronic_count_feb,
                media: media_count_feb
            }
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


// ############################################################################################################



function MaxReportSum(response, postData){

    sql.connect(config).then(function () {
        var req = new sql.Request();

        const query1 = "SELECT SUM(Total_Num_of_Copies) AS total_Book_copies FROM dbo.book";
        const query2 = "SELECT SUM(Num_of_Copies) AS Book_copies FROM dbo.book";

        const query3 = "SELECT SUM(Total_Num_of_Copies) AS total_Object_copies FROM dbo.object";
        const query4 = "SELECT SUM(Num_of_Copies) AS Object_copies FROM dbo.object";

        const query5 = "SELECT COUNT(*) AS total_Electronic_copies FROM dbo.Electronics";
        const query6 = "SELECT COUNT(*) AS Electronic_count FROM dbo.Electronics WHERE Available = 1";

        const query7 = "SELECT SUM(Total_Num_of_Copies) AS total_Media_copies FROM dbo.Media";
        const query8 = "SELECT SUM(Num_of_Copies) AS Media_copies FROM dbo.Media";

    Promise.all([
        req.query(query1),
        req.query(query2),
        req.query(query3),
        req.query(query4),
        req.query(query5),
        req.query(query6),
        req.query(query7),
        req.query(query8)

    ]).then(function (results) {
         // extract the counts from the result sets
         const total_Book_copies = results[0].recordset[0].total_Book_copies;
         const Book_copies = results[1].recordset[0].Book_copies;
         const total_Object_copies = results[2].recordset[0].total_Object_copies;
         const Object_copies = results[3].recordset[0].Object_copies;
         const total_Electronic_copies = results[4].recordset[0].total_Electronic_copies;
         const Electronic_count = results[5].recordset[0].Electronic_count;
         const total_Media_copies = results[6].recordset[0].total_Media_copies;
         const Media_copies = results[7].recordset[0].Media_copies;

         // create an object to hold the counts
         const counts = {
             total_Book_copies: total_Book_copies,
             Book_copies: Book_copies,
             total_Object_copies: total_Object_copies,
             Object_copies: Object_copies,
             total_Electronic_copies: total_Electronic_copies,
             Electronic_count: Electronic_count,
             total_Media_copies: total_Media_copies,
             Media_copies: Media_copies
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















// exports #####################################################################################################
    exports.UserReportSum = UserReportSum;
    exports.TransactionReportSum = TransactionReportSum;
    exports.MaxReportSum = MaxReportSum;