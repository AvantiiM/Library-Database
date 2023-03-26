var fs = require('fs');
var sql = require('mssql');
var config = require('./db_connect');

var bcrypt = require('bcryptjs'); 
const { Console } = require('console');
const { callbackify } = require('util');

function loginverify(response, postData) {
    var querystring = require('querystring');
    var params = querystring.parse(postData); 
    var username = params['Username'];
    var password = params['Password']; 

    var conn = new sql.ConnectionPool(config);
    sql.connect(config).then(function() {
        var req = new sql.Request();
        req.input('username', sql.NVarChar, username);
        req.input('password', sql.NVarChar, password);
        req.query("SELECT HashedPassword FROM Login WHERE Username=@username").then(function(recordset) {
            if (recordset.recordsets[0].length > 0) {
                var hash = recordset.recordsets[0][0].HashedPassword; 

                bcrypt.compare(password, hash, function(err, result) { 
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
            } else {
                response.writeHead(302, { "Location": "/login" });
                response.end();
            }
        }).catch(function(err) {
            console.log(err);
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

function generateUsername() {
    let username = '';
    for (let i = 0; i < 6; i++) {
      username += Math.floor(Math.random() * 10);
    }
    return username;
  }

function addLogin(response, postData) {
    var conn = new sql.ConnectionPool(config);
    sql.connect(config).then(function() {
        var req = new sql.Request();
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
            return emailRegex.test(email);
        }

        var querystring = require('querystring');
        var params = querystring.parse(postData); 
        var Username = params['Username'];
        var FName = params['FName'];
        var MName = params['MName'];
        var LName = params['LName'];
        var Race = params['Race'];
        var Major = params['Major'];
        var PhoneNum = params['PhoneNum'];
        var Email = params['Email'];
        var Gender = params['Gender'];
        var BirthDate = params['BirthDate'];
        var Department = params['Department'];
        var tempPassword = params['tempPassword'];

        
        var mode = params['searchBy'];

        var adminPermission = params['adminPermission']; // === 'on' ? 1 : 0;
        var adminp = 0;
        if(adminPermission !== undefined) {
            adminp = 1;
        }
        let firstChar = Username.charAt(0);

        req.input('adminpermission', sql.Bit, adminp);
        req.input('username', sql.NVarChar, Username);
        req.input('fname', sql.NVarChar, FName);
        req.input('mname',sql.NVarChar, MName);
        req.input('lname', sql.NVarChar, LName);
        req.input('race', sql.NVarChar, Race);
        req.input('major', sql.NVarChar, Major);
        req.input('phonenum', sql.NVarChar, PhoneNum);
        req.input('email', sql.NVarChar, Email);
        req.input('gender', sql.NVarChar, Gender);
        req.input('birthdate', sql.NVarChar, BirthDate);
        req.input('department', sql.NVarChar, Department);
        var failed = false;
        console.log("mode: " + mode);
        var queryStr = "";
        function callback() {
            req.query(queryStr).then(function(recordset) {
                console.log("Admin entry inserted into database.");
            }).catch(function(err) {
                console.log(err);
            });
        }
        switch (firstChar) {
          case 'S':
            queryStr = "INSERT INTO Students (StudentID, FirstN, MiddleN, LastN, Race, Major, PhoneN, Email, Gender, Bday, Created_BY, Updated_BY, Created_date, Last_Updated) VALUES (@username, @fname, @mname, @lname, @race, @major, @phonenum, @email, @gender, @birthdate, 'F111122223', 'F111122223', getdate(), getdate())";
            break;
          case 'F':
            if(mode === 'admin') {
                req.query("SELECT Faculty_ID FROM Faculty WHERE Faculty_ID=@username").then(function(recordset) {
                    if (recordset.recordsets[0].length > 0) {
                        console.log("Faculty found: " + Username);
                        queryStr = "INSERT INTO Admin (Admin_ID, FirstN, LastN, Email, Created_BY, Updated_BY, Creation_date, Last_Updated) VALUES (@username, @fname, @lname, @email, 'F111122223', 'F111122223', getdate(), getdate())";
                        callback();
                    } else {
                        failed = true;
                        response.write("Faculty ID: " + Username + " is not valid");
                        response.end();
                        return;
                    }

                }).catch(function(err) {
                    console.log(err);
                    response.write("Faculty ID: " + Username + " is not valid");
                    response.end();
                    return;
                });

            } else {
                queryStr = "INSERT INTO Faculty (Faculty_ID, FirstN, MiddleN, LastN, Race, PhoneN, Email, Gender, Bday, Admin_Permission, Department, Created_BY, Updated_BY, Created_date, Last_Updated) VALUES (@username, @fname, @mname, @lname, @race, @phonenum, @email, @gender, @birthdate, @adminpermission, @department, 'F111122223', 'F111122223', getdate(), getdate())";
            }
            break;
          case 'G':
            queryStr = "INSERT INTO Guest (GuestID, FirstN, MiddleN, LastN, Race, PhoneN, Email, Gender, Bday, Created_BY, Updated_BY, Created_date, Last_Updated) VALUES (@username, @fname, @mname, @lname, @race, @phonenum, @email, @gender, @birthdate, 'F111122223', 'F111122223', getdate(), getdate())";
            break;
            
        }


        if(!failed && mode!== "admin") {

            req.query(queryStr).then(function(recordset) {
                console.log("New " + mode + " user entry inserted into database.")
                insertAdmin();
                insertLogin();
            }).catch(function(err) {
                console.log(err);
            });

            function insertAdmin() {
                if ( adminp === 1 && firstChar === 'F') {
                    query = req.query("INSERT INTO Admin (Admin_ID, FirstN, MiddleN, LastN, Email, Created_BY, Updated_BY, Creation_date, Last_Updated) VALUES (@username, @fname, @mname, @lname, @email, 'F111122223', 'F111122223', getdate(), getdate())");
                    req.query(query).then(function(recordset) {
                        console.log("New admin user entry inserted into database.");
                        
                    }).catch(function(err) {
                        Console.error("Insert into admin failed");
                        console.log(err);
                    });
                }       
            }

            function insertLogin() {
            let squery = "INSERT INTO Login (Username, HashedPassword,";
            switch(firstChar) {
                case 'S': squery += " StudentID) VALUES (@username, @hashedPassword, @Username)"; break;
                case 'F': squery += " Faculty_ID) VALUES (@username, @hashedPassword, @Username)"; break;
                case 'G': squery += " GuestID) VALUES (@username, @hashedPassword, @Username)"; break;
            }
            if(mode !== 'admin') {
                bcrypt.hash(tempPassword, 10, function(err, hash) {
                    if (err) {
                        console.log(err);
                    } else {
                        let m =0;
                        for(i=0;i<9999;i++) {
                            for(j=0;j<999;j++) {
                                m +=1;
                            }
                        }
                        req.input('hashedPassword', sql.NVarChar, hash);
                        req.query(squery).then(function(recordset) {
                                console.log("New " + mode + " login entry inserted into database.");
                        }).catch(function(err) {
                            console.log(err);
                        });
                    }
                });
            }
        }
    }
        
    }).catch(function(err) {
        console.error("Unable to get a DB connection");
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

function BookEntry(response){
    console.log("Request handler 'BookEntry' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/BookEntry.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}

function ElectronicsEntry(response){
    console.log("Request handler 'ElectronicsEntry' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/ElectronicsEntry.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
    //sendResponse(response, 'AdminUI/AdminUI-Entry/ElectronicsEntry.html');
}

// function sendResponse(response, file) {
//     var edata = fs.readFileSync(file);
//     response.writeHead(200, { "Content-Type": "text/html" });
//     response.write(edata);
//     response.end();
// }

function MediaEntry(response){
    console.log("Request handler 'MediaEntry' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/MediaEntry.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}

function ObjectEntry(response){
    console.log("Request handler 'ObjectEntry' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/ObjectEntry.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}

function TransactionEntry(response){
    console.log("Request handler 'TransactionEntry' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/TransactionEntry.html');
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

function StudentEntry(response){
    console.log("Request handler 'StudentEntry' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/StudentEntry.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}

function GuestEntry(response){
    console.log("Request handler 'GuestEntry' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/GuestEntry.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}

function FacultyEntry(response){
    console.log("Request handler 'FacultyEntry' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/FacultyEntry.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}


function SearchBooks(response,postData){
   
   
    var conn = new sql.ConnectionPool(config);

    sql.connect(config).then(function () {
        var req = new sql.Request();
try{
        var querystring = require('querystring');
        var params = querystring.parse(postData);
        var bookname = params['bookName'];
        var dollarvalue = params['dollarValue'];
        var numOfCompies = params['numOfCopies'];
        var author = params['author'];
        var genre = params['genre'];
        var isbn = params['isbn'];
        var language = params['language'];
        var publisher = params['publisherName'];

        console.log(bookname + " is being searched");
        var query = "SELECT * FROM dbo.Book WHERE Book_Name = '" + bookname + "';";
       // var query = "SELECT * FROM Book WHERE BookName LIKE '%" + bookname + "%' AND DollarValue LIKE '%" + dollarvalue + "%' AND NumOfCopies LIKE '%" + numOfCompies + "%' AND Author LIKE '%" + author + "%' AND Genre LIKE '%" + genre + "%' AND ISBN LIKE '%" + isbn + "%' AND Language LIKE '%" + language + "%' AND PublisherName LIKE '%" + publisher + "%'";
       req.query(query).then(function(recordset) {
        console.log("New admin user entry inserted into database.");
        console.log(recordset);
        if(recordset.recordsets.length > 0) {
            console.log("Found " + recordset.recordsets.length + " records");
            
            const columns = ['Book_Name', 'Dollar_Value', 'Num_of_Copies', 'Author', 'Genre', 'ISBN', 'Language', 'Publisher_Name', 'Created_BY', 'Created_date', 'Updated_BY', 'Last_Updated'];
            console.table(recordset.recordsets, columns);
            } else {
                console.log("No records found")
        }
    }).catch(function(err) {
        Console.error("Insert into admin failed");
        console.log(err);
    });

}
catch(err){
    console.log(err);
}})}
    
    

/*function searchresults(response, postData) {
    var querystring = require('querystring');
    var params = querystring.parse(postData);
    var bookname = params['BookName'];
    var author = params['Author']; 
    var genre = params['Genre'];
    var language = params['Language'];
    var isbn = params['ISBN'];

}
*/

    
function AdminEntry(response){
    console.log("Request handler 'AdminEntry' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/AdminEntry.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}




exports.login = login;
exports.loginverify = loginverify;

exports.search = search;
exports.adminUI = adminUI;

exports.BookEntry = BookEntry;
exports.ElectronicsEntry = ElectronicsEntry;
exports.ObjectEntry = ObjectEntry;
exports.MediaEntry = MediaEntry;
exports.TransactionEntry = TransactionEntry;

exports.StudentEntry = StudentEntry;
exports.GuestEntry = GuestEntry;
exports.FacultyEntry = FacultyEntry;
exports.AdminEntry = AdminEntry;

exports.BookEdit = BookEdit;
exports.ElectronicsEdit = ElectronicsEdit;
exports.ObjectEdit = ObjectEdit;
exports.MediaEdit = MediaEdit;
exports.TransactionsEdit = TransactionsEdit;

exports.StudentEdit = StudentEdit;
exports.GuestEdit = GuestEdit;
exports.TransactionsEdit = TransactionsEdit;
exports.SearchBooks = SearchBooks;
//exports.searchresults = searchresults;
exports.FacultyEdit = FacultyEdit;

exports.createUser = createUser;
exports.addLogin = addLogin;