var fs = require('fs');
var sql = require('mssql');
var config = require('./db_connect');

var bcrypt = require('bcryptjs'); //new

function loginverify(response, postData) {
    var querystring = require('querystring');
    var params = querystring.parse(postData); 
    var username = params['Username'];
    var password = params['Password']; 

//    var connect = fs.readFileSync('db_connect.js');

    var conn = new sql.ConnectionPool(config);
    sql.connect(config).then(function() {
        var req = new sql.Request();
        req.input('username', sql.NVarChar, username);
        req.input('password', sql.NVarChar, password);
        req.query("SELECT HashedPassword FROM Login WHERE Username=@username").then(function(recordset) {
            if (recordset.recordsets[0].length > 0) {
                // Username and password are correct, show a success message
                //response.writeHead(200, { "Content-Type": "text/html" });
                //response.write("<p>Login successful</p>");
                var hash = recordset.recordsets[0][0].HashedPassword; // new
                /* bcrypt.hash(password, 10, function(err, hash) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(hash);
                    }
                }); 
                */

                bcrypt.compare(password, hash, function(err, result) { //new
                    if (result) {
                        // Passwords match, show a success message
                        console.log("success");
                        response.writeHead(302, { "Location": "/search" });
                        response.end();
                    } else {
                        // Passwords do not match, show an error message
                        console.log("Failed");
                        response.writeHead(302, { "Location": "/login" });
                        response.end();
                    }
                });
                //response.writeHead(302, { "Location": "/search" });
                //response.end();
            } else {
                // Username and password are incorrect, show an error message
                //response.writeHead(200, { "Content-Type": "text/html" });
                //response.write("<p>Login failed</p>");
                response.writeHead(302, { "Location": "/login" });
                response.end();
            }
            //conn.close();
        }).catch(function(err) {
            console.log(err);
            //conn.close();
        });
    }).catch(function(err) {
        console.log(err);
    });
}

function login(response, postData) {
    console.log("Request handler 'login' was called.");
    var data = fs.readFileSync('login.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();

}

function createUser(response, postData) {
    console.log("Request handler 'createUser' was called.");
    var data = fs.readFileSync('createUser.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();

}

function addLogin(response, postData) {

    var conn = new sql.ConnectionPool(config);
    sql.connect(config).then(function() {
        var req = new sql.Request();

        var querystring = require('querystring');
        var params = querystring.parse(postData); 
        var Username = params['Username'];
        var tempPassword = params['tempPassword'];

        req.input('username', sql.NVarChar, Username);
        req.input('password', sql.NVarChar, tempPassword);
        bcrypt.hash(tempPassword, 10, function(err, hash) {
            if (err) {
                console.log(err);
            } else {
                req.input('hashedPassword', sql.NVarChar, hash);
                req.query("INSERT INTO Login (Username, HashedPassword) VALUES (@username, @hashedPassword)").then(function(recordset) {
                    console.log("New login entry inserted into database.");
                }).catch(function(err) {
                    console.log(err);
                });
            }
        });
    }).catch(function(err) {
        console.log(err);
    });
}

function search(response) {
    console.log("Request handler 'search' was called.");
    var sdata = fs.readFileSync('search.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(sdata);
    response.end();
}

function adminUI(response){
    console.log("Request handler 'adminUI' was called.");
    var adata = fs.readFileSync('adminUI.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(adata);
    response.end();
}

function Entry(response){
    console.log("Request handler 'Entry' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/BookEntry.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}

function BookEdit(response){

    console.log("Request handler 'BookEdit' was called.");
    var fdata = fs.readFileSync('AdminUI/AdminUI-Edit/BookEdit.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fdata);
    response.end();

}

function ElectronicsEdit(response){

    console.log("Request handler 'ElectornicsEdit' was called.");
    var fdata = fs.readFileSync('AdminUI/AdminUI-Edit/ElectronicsEdit.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fdata);
    response.end();

}

function ObjectEdit(response){

    console.log("Request handler 'ObjectEdit' was called.");
    var fdata = fs.readFileSync('AdminUI/AdminUI-Edit/ObjectEdit.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fdata);
    response.end();

}

function MediaEdit(response){

    console.log("Request handler 'MediaEdit' was called.");
    var fdata = fs.readFileSync('AdminUI/AdminUI-Edit/MediaEdit.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fdata);
    response.end();

}

function FacultyEdit(response){

    console.log("Request handler 'FacultyEdit' was called.");
    var fdata = fs.readFileSync('AdminUI/AdminUI-Edit/FacultyEdit.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fdata);
    response.end();

}

function StudentEdit(response){

    console.log("Request handler 'StudentEdit' was called.");
    var fdata = fs.readFileSync('AdminUI/AdminUI-Edit/StudentEdit.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fdata);
    response.end();

}

function GuestEdit(response){

    console.log("Request handler 'GuestEdit' was called.");
    var fdata = fs.readFileSync('AdminUI/AdminUI-Edit/GuestEdit.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fdata);
    response.end();

}

function TransactionsEdit(response){

    console.log("Request handler 'TransactionsEdit' was called.");
    var fdata = fs.readFileSync('AdminUI/AdminUI-Edit/TransactionsEdit.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fdata);
    response.end();

}



/*
function searchresults(response, searchData) {
    var querystring = require('querystring');
    var params = querystring.parse(postData);
    var bookname = params['BookName'];
    var author = params['Author']; 
    var genre = params['Genre'];
    var language = params['Language'];
    var isbn = params['ISBN'];

    
}
*/

exports.login = login;
exports.loginverify = loginverify;

exports.search = search;
exports.adminUI = adminUI;
exports.Entry = Entry;
exports.BookEdit = BookEdit;
exports.ElectronicsEdit = ElectronicsEdit;
exports.ObjectEdit = ObjectEdit;
exports.MediaEdit = MediaEdit;
exports.FacultyEdit = FacultyEdit;
exports.StudentEdit = StudentEdit;
exports.GuestEdit = GuestEdit;
exports.TransactionsEdit = TransactionsEdit;
//exports.searchresults = searchresults;

exports.createUser = createUser;
exports.addLogin = addLogin;