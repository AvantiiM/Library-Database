var fs = require('fs');
var sql = require('mssql');
var config = require('./db_connect');
var querystring = require('querystring');
var cons = require('consolidate');


function memberUI(response, postData) {
    console.log("Request handler 'memberUI' was called.");
    var data = fs.readFileSync('memberUI.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
}

function bookSearch(response, postData) {
    console.log("Request handler 'bookSearch' was called.");
    var data = fs.readFileSync('bookSearch.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
}

function librarySearch(response, postData) {

    console.log("In librarySearch");
    var conn = new sql.ConnectionPool(config);
    sql.connect(config).then(function () {
        var req = new sql.Request();
        var params = querystring.parse(postData);
        var Title = params['Title'];
        var Author = params['Author'];
        var Genre = params['Genre'];
        var Language = params['Language'];
        var ISBN = params['ISBN'];
        console.log("title: " + Title);
        var MediaName = params['MediaName'];
        var MediaType = params['MediaType'];

        var ElectronicName = params['ElectronicName'];
        var SerialNo = params['SerialNo'];

        var mode = params['searchBy'];
        mode = 'book';

        if (mode === 'book') {
            var query = "Select Book_Name as Title, Author, Genre, Language  FROM Book WHERE 1=1 ";
        } else if (mode === 'media') {
            var query = "Select * FROM Media WHERE 1=1 ";
        } else if (mode === 'electronic') {
            var query = "Select * FROM Electronics WHERE 1=1 ";
        }

        if (Title != undefined && Title != "") {
            if (mode === 'book') {
                query = query + " and Book_Name LIKE '" + Title + "%' ";
            } else if (mode === 'media') {
                query = query + " and Media_Name LIKE '" + Title + "%' ";
            } else if (mode === 'electronic') {
                query = query + " and Electronics_Name LIKE '" + Title + "%' ";
            }
        }

        if (Author != undefined && Author != "") {
            query = query + " and Author LIKE '" + Author + "%' ";
        }

        if (Genre != undefined && Genre != "") {
            query = query + " and  Genre LIKE '" + Genre + "%' ";
        }

        if (Language != undefined && Language != "") {
            query = query + " and  Language LIKE '" + Language + "%' ";
        }
        console.log("Final query \n" + query);

        req.query(query).then(function (recordset) {
            console.log("Search Complete");

            if (recordset.recordsets.length > 0) {
                console.log("Found " + recordset.recordsets.length + " records");
                console.log(recordset);
                const resultArray = recordset.recordsets[0];
                console.log(" data from DB \n " + resultArray);
                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify(resultArray));
                response.end();
            }
            else {
                console.log("No records found")
                response.write("No records found");
            }
        }).catch(function (err) {
            console.error("error");
            console.log(err);
        });

    }).catch(function (err) {
        console.error("Unable to search");
        console.log(err);
    });

}








exports.memberUI = memberUI;
exports.bookSearch = bookSearch;
exports.librarySearch = librarySearch;