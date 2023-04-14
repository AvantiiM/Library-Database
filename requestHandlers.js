var fs = require('fs');
var sql = require('mssql');
var config = require('./db_connect');
var querystring = require('querystring');
var bcrypt = require('bcryptjs');

var cons = require('consolidate');


const { Console } = require('console');

function loginverify(response, postData, sessionData = null) {
    //function loginverify(response, postData) {
    var params = querystring.parse(postData);
    var username = params['Username'];
    var password = params['Password'];
    var adminlogin = params['adminLogin'];
    if (!sessionData) {
        console.log("SessionData is null");
    } else {
        console.log("Session ID in login verify: " + sessionData.getSessonId());
    }
    //    var connect = fs.readFileSync('db_connect.js');

    var conn = new sql.ConnectionPool(config);
    sql.connect(config).then(function () {
        var req = new sql.Request();
        req.input('username', sql.NVarChar, username);
        req.input('password', sql.NVarChar, password);
        req.query("SELECT HashedPassword, TemporaryPassword FROM Login WHERE Username=@username").then(function (recordset) {
            if (recordset.recordsets[0].length > 0) {
                var hash = recordset.recordsets[0][0].HashedPassword;
                var temp = recordset.recordsets[0][0].TemporaryPassword;
                bcrypt.compare(password, hash, function (err, result) {
                    if (result) {
                        // Passwords match, show a success message
                        console.log("success");
                        sessionData.logginId = username;
                        sessionData.loggedDT = new Date().toLocaleString().replace(',', '');
                        console.log("Temp =" + temp);
                        if (temp) {
                            cons.ejs('./changePassword.html', { username: username, oldpassword: password }, function (err, html) {
                                if (err) {
                                    console.error('Error templating with EJS');
                                    throw err;
                                }
                                response.write(html);
                                response.end();
                                //return;
                            });

                            //response.writeHead(302, {"Location": "/changePassword"})
                        } else {
                            if (adminlogin && (username.charAt(0) === 'F')) {
                                req.query("SELECT Admin_ID FROM Admin WHERE Admin_ID=@username").then(function (recordset) {
                                    if (recordset.recordsets[0].length > 0) {
                                        sendFile(response, "adminUI.html", sessionData.getSessonId());
                                        // response.writeHead(302, { "Location": "/adminUI" });
                                        // response.end();
                                    } else {
                                        sendFile(response, "borrowHolds.html", sessionData.getSessonId());
                                    }
                                    
                                }).catch(function (err) {
                                    console.log(err);
                                    response.end();
                                    return;
                                });
                                //response.writeHead(302, {'Cookie': 'sessionId=${sessionData.getSessonId()}' "Location": "/adminUI" });
                            } else {
                                //response.writeHead(302, {"Location": "/memberUI" });
                                sendFile(response, "borrowHolds.html", sessionData.getSessonId());

                                // var hd = "{'Set-Cookie': 'sessionId=" + sessionData.getSessonId() + "', 'Location': '/memberUI' }";
                                // response.writeHead(302, hd);
                                //                                response.writeHead(302, `{'Set-Cookie': 'sessionId=${sessionData.getSessonId()}', "Location": "/memberUI" }`);
                            }
                        }
                        console.log("response ended");
                    } else {
                        // Passwords do not match, show an error message
                        console.log("Failed");
                        sendEJSFile(response, "login.html", "Username/Password did not match!!!");
                        // response.writeHead(302, { "Location": "/login" });
                        // response.end();
                    }
                });
                //response.writeHead(302, { "Location": "/search" });
                //response.end();
            } else {
                sendEJSFile(response, "login.html", "Username/Password did not match!!!");
                // Username and password are incorrect, show an error message
                //response.writeHead(200, { "Content-Type": "text/html" });
                //response.write("<p>Login failed</p>");
                // response.writeHead(302, { "Location": "/login" });
                // response.end();
            }
            //conn.close();
        }).catch(function (err) {
            console.log(err);
            //conn.close();
        });
    }).catch(function (err) {
        console.log(err);
    });

}
function sendEJSFile(response, filename, msgtxt) {
    cons.ejs(filename, { msg: msgtxt }, function (err, html) {
        if (err) {
          console.error('Error templating with EJS');
          throw err;
        }
        response.write(html);
        response.end();
        return;
      });

}

function getInfo(response, postData, sessionData){
    req.input('userId', sql.NVarChar, sessionData.logginId);

    let firstN;
    let lastN;
    let middleN;
    let fullName;
    let email;
    let dep;
    let balance;
    console.log(sessionData.logginId)
    sql.connect(config).then(function() {
      var username = sessionData.logginId;
      var req = new sql.Request();
      req.query("SELECT Faculty_ID, StudentID, GuestID FROM Login WHERE Username=" + '\'' + username + '\'', function (result, recordset) {
        
        if (recordset.recordsets[0].length > 0) { 
          var faculty = recordset.recordsets[0][0].Faculty_ID;
          var stud = recordset.recordsets[0][0].StudentID;
          var guest = recordset.recordsets[0][0].GuestID;
        }
        if(faculty != null){
            req.query("SELECT FirstN, LastN, MiddleN, Email, Department, Balance FROM Faculty WHERE Faculty_ID=" + '\'' + faculty + '\'', function (result, recordset) {
            
            if (recordset.recordsets[0].length > 0) { 
                firstN = recordset.recordsets[0][0].FirstN;
                lastN = recordset.recordsets[0][0].LastN;
                middleN = recordset.recordsets[0][0].MiddleN;
                fullName = firstN +' '+ lastN;
                email = recordset.recordsets[0][0].Email;
                dep = recordset.recordsets[0][0].Department;
                balance = recordset.recordsets[0][0].Balance;
                balance = balance + '.00';
            
                window.localStorage.setItem("faculty", ID);
                window.localStorage.setItem("fullName", fullName);
                window.localStorage.setItem("email", email);
                window.localStorage.setItem("balance", balance);
                window.localStorage.setItem("dep", dep);
            //   document.getElementById("ID").innerHTML = faculty;
            //   document.getElementById("fullName").innerHTML = fullName;
            //   document.getElementById("email").innerHTML = email;
            //   document.getElementById("balance").innerHTML = balance;
            //   document.getElementById("dep").innerHTML = dep;
                return;
            }
          })
        }else if(stud != null){
            req.query("SELECT FirstN, LastN, MiddleN, Email, Major, Balance FROM Students WHERE StudentID=" + '\'' + stud + '\'', function (result, recordset) {
            if (recordset.recordsets[0].length > 0) { 
                firstN = recordset.recordsets[0][0].FirstN;
                lastN = recordset.recordsets[0][0].LastN;
                middleN = ' ' + recordset.recordsets[0][0].MiddleN + ' ';
                fullName = firstN +' '+ lastN;
                email = recordset.recordsets[0][0].Email;
                major = recordset.recordsets[0][0].Major;
                balance = recordset.recordsets[0][0].Balance;
                balance = balance + '.00';
                localStorage.setItem("stud", ID);
                localStorage.setItem("fullName", fullName);
                localStorage.setItem("email", email);
                localStorage.setItem("balance", balance);
                localStorage.setItem("major", dep);
            //   document.getElementById("ID").innerHTML = stud;
            //   document.getElementById("fullName").innerHTML = fullName;
            //   document.getElementById("email").innerHTML = email;
            //   document.getElementById("balance").innerHTML = balance;
            //   document.getElementById("dep").innerHTML = major;
                return;
            }
          })
        }
        else if(guest != null){
            req.query("SELECT FirstN, LastN, MiddleN, Email, Balance FROM Guest WHERE GuestID=" + '\'' + guest + '\'', function (result, recordset) {
            // console.log(result);
            if (recordset.recordsets[0].length > 0) { 
                firstN = recordset.recordsets[0][0].FirstN;
                lastN = recordset.recordsets[0][0].LastN;
                middleN = ' ' + recordset.recordsets[0][0].MiddleN + ' ';
                fullName = firstN +' '+ lastN;
                email = recordset.recordsets[0][0].Email;
                balance = recordset.recordsets[0][0].Balance;
                balance = balance + '.00';
                localStorage.setItem("guest", ID);
                localStorage.setItem("fullName", fullName);
                localStorage.setItem("email", email);
                localStorage.setItem("balance", balance);
                //   document.getElementById("ID").innerHTML = guest;
                //   document.getElementById("fullName").innerHTML = fullName;
                //   document.getElementById("email").innerHTML = email;
                //   document.getElementById("balance").innerHTML = balance;
                return;
            }
          })
        }
        else {
            console.log('Error');
            return;
        }
      })
    });
}

function PasswordChanger(response, postData) {
    var req = new sql.Request();
    var params = querystring.parse(postData);
    var NewPassword = params['newPassword'];
    var username = params["username"];
    bcrypt.hash(NewPassword, 10, function (err, hash) {
        if (err) {
            console.log(err);
        } else {
            let cquery = "UPDATE Login SET HashedPassword = @hashedPassword, TemporaryPassword = 0 WHERE username = @username"
            req.input('hashedPassword', sql.NVarChar, hash);
            req.input('username', sql.NVarChar, username);
            req.query(cquery).then(function (recordset) {
                console.log("Password Changed");
                response.writeHead(302, { "Location": "/login" });
                response.end();
            }).catch(function (err) {
                console.log(err);
            });
        }
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

function sendFile(response, pathname, sessionId = null) {
    console.log("In ----------------: " + pathname + " sessionID: " + sessionId);

    fs.readFile(pathname, function (err, data) {
        if (err) {
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.write("404 Not Found\n");
            response.end();
        } else {
            var contentType;
            if (pathname.endsWith(".css")) {
                contentType = "text/css";
            } else if (pathname.endsWith(".html")) {
                contentType = "text/html";
            } else if (pathname.endsWith(".js")) {
                contentType = "text/javascript";
            } else if (pathname.endsWith(".png")) {
                contentType = 'image/png';
            } else {
                contentType = "text/plain";
            }
            if (sessionId) {
                response.writeHead(200, { 'Set-Cookie': 'sessionId=' + sessionId, 'Content-Type': contentType, 'Content-Length': data.length });
            } else {
                //response.writeHead(200, { "Content-Type": contentType });
            }
            //console.log("DATA \n" + data);
            response.write(data);
            response.end();
        }
    });
}


function addItem(response, postData, sessionData) {
    var conn = new sql.ConnectionPool(config);
    sql.connect(config).then(function () {
        var req = new sql.Request();
        var querystring = require('querystring');
        var params = querystring.parse(postData);
        var mode = params['searchBy'];
        var itemID = params['itemID'];
        var itemName = params['itemName'];
        var DValue = params['DValue'];
        var MType = params['MType'];
        var Author = params['Author'];
        var Publisher = params['Publisher'];
        var PDate = params['PDate'];
        var NCopies = params['NCopies'];
        var Language = params['Language'];
        var Genre = params['Genre'];
        var Availability = params['Availability'];
        var Status = params['Status'];
        req.input('itemID', sql.NVarChar, itemID);
        req.input('itemName', sql.NVarChar, itemName);
        req.input('DValue', sql.Int, DValue);
        req.input('MType', sql.NVarChar, MType);
        req.input('Author', sql.NVarChar, Author);
        req.input('Publisher', sql.NVarChar, Publisher);
        req.input('PDate', sql.Date, PDate);
        req.input('NCopies', sql.Int, NCopies);
        req.input('Language', sql.NVarChar, Language);
        req.input('Genre', sql.NVarChar, Genre);
        req.input('Availability', sql.Bit, Availability);
        req.input('Status', sql.NVarChar, Status);
        req.input('userId', sql.NVarChar, sessionData.logginId);
        function generateMediaID() {
            const timestamp = new Date().getTime();
            const randomNumber = Math.floor(Math.random() * 100000000)
            const id = `${timestamp}${randomNumber}`;
            const truncatedID = id.slice(-8);
            return truncatedID.toString();
        }
        function generateObjectID() {
            const timestamp = new Date().getTime();
            const randomNumber = Math.floor(Math.random() * 1000000)
            const id = `${timestamp}${randomNumber}`;
            const truncatedID = id.slice(-6);
            return truncatedID.toString();
        }
        var MID = generateMediaID();
        var OID = generateObjectID();
        var failed = false;
        console.log("mode: " + mode);
        var queryStr = "";
        switch (mode) {
            case 'Electronic':
              queryStr = "INSERT INTO Electronics (Serial_No, Electronics_Name, Last_Updated, Created_By, Available, Item_Status, Created_Date, Last_Updated_By, Dollar_Value) VALUES (@itemID, @itemName, getdate(), @userID, @Availability, @Status, getdate(), @userID, @DValue)";
              req.query(queryStr).then(function(recordset) {
                console.log("Electronic entry inserted into database.");
                var fdata = fs.readFileSync('AdminUI/AdminUI-Entry/ElectronicsEntry.html');
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(fdata + "<script> alert('Electronic entry inserted into database.'); </script>");
                response.end();
            }).catch(function(err) {
                if (err.message.includes("Violation of PRIMARY KEY constraint 'Primary_KEY_FOR_ELECTRONICS'. Cannot insert duplicate key in object 'dbo.Electronics'")){
                    console.log("Electronic with serial num already exists in database."); 
                    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/ElectronicsEntry.html');
                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.write(edata + "<script> alert('Error: Electronic with Serial Num already exists'); </script>");
                    response.end();              
                }
                else{
                    console.log(err);
                    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/ElectronicsEntry.html');
                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.write(edata + "<script> alert('Electronic entry failed to insert into database.'); </script>");
                    response.end();
                }
            });
              break;
            case 'Book':
              queryStr = "INSERT INTO Book (ISBN, Book_Name, Last_Updated, Created_BY, Created_date, Updated_BY, Dollar_Value, Author, Publisher_Name, Published_Date, Num_of_Copies, Language, Genre) VALUES (@itemID, @itemName, getdate(), @userID, getdate(), @userID, @DValue, @Author, @Publisher, @PDate, @NCopies, @Language, @Genre)";
              req.query(queryStr).then(function(recordset) {
                console.log("Book entry inserted into database.");
                var fdata = fs.readFileSync('AdminUI/AdminUI-Entry/BookEntry.html');
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(fdata + "<script> alert('Book entry inserted into database.'); </script>");
                response.end();
            }).catch(function(err) {
                if (err.message.includes("Violation of PRIMARY KEY constraint 'PK_Book'. Cannot insert duplicate key in object 'dbo.Book'")){
                    console.log("Book with that ISBN already exists in database."); 
                    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/BookEntry.html');
                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.write(edata + "<script> alert('Error: Book with ISBN already exists'); </script>");
                    response.end();             
                }
                else{
                    console.log(err);
                    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/BookEntry.html');
                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.write(edata + "<script> alert('Book entry failed to insert into database.'); </script>");
                    response.end();
                }
            });

              break;
            case 'Media':
                function insertMediaQuery(req, tempMID) {
                    req.input('tempMID', sql.NVarChar, tempMID);
                    queryStr = "INSERT INTO Media (Media_ID, Media_Name, Updated_Date, Created_By, Created_Date, Updated_By, Dollar_Value, Media_Type, Author, Publisher_Name, Published_Date, Num_of_Copies) VALUES (@tempMID, @itemName, getdate(), @userID, getdate(), @userID, @DValue, @MType, @Author, @Publisher, @PDate, @NCopies)";
                    req.query(queryStr).then(function (recordset) {
                        console.log("Media entry inserted into database.");
                        var edata = fs.readFileSync('AdminUI/AdminUI-Entry/MediaEntry.html');
                        response.writeHead(200, { "Content-Type": "text/html" });
                        response.write(edata + "<script> alert('Media entry to insert into database.'); </script>");
                        response.end();
                       return;
                    }).catch(function(err) {
                        if (err.message.includes("Violation of PRIMARY KEY constraint 'PK_Media'. Cannot insert duplicate key in object 'dbo.Media'")){
                            console.log("Media ID already exists. Generating new ID...")  
                            var newMID = generateMediaID();
                            return insertMediaQuery(req, newMID);
                        }
                        else {
                            console.log(err);
                            var edata = fs.readFileSync('AdminUI/AdminUI-Entry/MediaEntry.html');
                            response.writeHead(200, { "Content-Type": "text/html" });
                            response.write(edata + "<script> alert('Media entry failed to insert into database.'); </script>");
                            response.end();
                            return;
                        }
                    });
                    return;
                }
                insertMediaQuery(req, MID);
              break;
            case 'Object':
                    function insertObjectQuery(req, tempOID){
                        req.input('tempOID', sql.NVarChar, tempOID);
                        queryStr = "INSERT INTO Object (Object_ID, Object_Name, Last_Updated, Created_BY, Created_date, Updated_BY, Dollar_Value, Num_of_Copies) VALUES (@tempOID, @itemName, getdate(), @userID, getdate(), @userID, @DValue, @NCopies)"
                        req.query(queryStr).then(function(recordset) {
                            console.log("Object entry inserted into database.");
                            var edata = fs.readFileSync('AdminUI/AdminUI-Entry/ObjectEntry.html');
                            response.writeHead(200, { "Content-Type": "text/html" });
                            response.write(edata + "<script> alert('Object entry inserted into database.'); </script>");
                            response.end();
                           return;
                        }).catch(function(err) {
                            if (err.message.includes("Violation of PRIMARY KEY constraint 'PK_Object'. Cannot insert duplicate key in object 'dbo.Object'")){
                                console.log("Object ID already exists. Generating new ID...")
                                var newOID = generateObjectID();
                                return insertObjectQuery(req, newOID);               
                            }
                            else{
                                console.log(err);
                                var edata = fs.readFileSync('AdminUI/AdminUI-Entry/ObjectEntry.html');
                                response.writeHead(200, { "Content-Type": "text/html" });
                                response.write(edata + "<script> alert('Object entry failed to insert into database.'); </script>");
                                response.end();
                                return;
                            }
                        });
                        return;
                    }
                    insertObjectQuery(req, OID);
              break;
              
          }   
          
        }).catch(function(err) {
            console.error("Unable to get a DB connection");
            console.log(err);
        });
    
}

function generateUsername() {
    let username = '';
    for (let i = 0; i < 9; i++) {
        username += Math.floor(Math.random() * 10);
    }
    return username;
}

function addLogin(response, postData, sessionData) {
    var conn = new sql.ConnectionPool(config);

    sql.connect(config).then(function () {
        var req = new sql.Request();
        var params = querystring.parse(postData);
        var Username = params['Username'];
        var FName = params['FName'];
        var MName = params['MName'];
        var LName = params['LName'];
        var Major = params['Major'];
        var Email = params['Email'];
        var Race = params['Race'];
        var Gender = params['Gender'];
        var BirthDate = params['BirthDate'];
        var PhoneNum = params['PhoneNum'];
        var Department = params['Department'];
        var tempPassword = params['tempPassword'];

        var mode = params['searchBy'];

        req.input('userId', sql.NVarChar, sessionData.logginId);

        var adminPermission = params['adminPermission']; // === 'on' ? 1 : 0;
        var adminp = 0;
        if (adminPermission !== undefined) {
            adminp = 1;
        }
        if (mode === 'guest') {
            Username = 'G' + generateUsername();
            console.log("UserName: " + Username);
        }
        let firstChar = Username.charAt(0);

        req.input('adminpermission', sql.Bit, adminp);

        req.input('username', sql.NVarChar, Username);
        req.input('fname', sql.NVarChar, FName);
        req.input('mname', sql.NVarChar, MName);
        req.input('lname', sql.NVarChar, LName);
        req.input('email', sql.NVarChar, Email);
        req.input('department', sql.NVarChar, Department);
        req.input('major', sql.NVarChar, Major);
        req.input('race', sql.NVarChar, Race);
        req.input('gender', sql.NVarChar, Gender);
        req.input('birthdate', sql.NVarChar, BirthDate);
        req.input('phonenum', sql.NVarChar, PhoneNum);
        var failed = false;
        console.log("mode: " + mode);
        var queryStr = "";
        function callback() {
            req.query(queryStr).then(function (recordset) {
                console.log("Admin entry inserted into database.");
                response.write("New admin user created. <br>Admin ID: " + Username);
                response.end();  
            }).catch(function (err) {
                console.log(err);
            });
        }
        switch (firstChar) {
            case 'S':
                queryStr = "INSERT INTO Students (StudentID, FirstN, MiddleN, LastN, Race, Email, Gender, PhoneN, Bday, Major, Created_BY, Updated_BY, Created_date, Last_Updated) VALUES (@username, @fname, @mname, @lname, @race, @email, @gender, @phonenum, @birthdate, @major, @userId, @userId, getdate(), getdate())";
                break;
            case 'F':
                if (mode === 'admin') {
                    req.query("SELECT Faculty_ID, FirstN, MiddleN, LastN FROM Faculty WHERE Faculty_ID=@username").then(function (recordset) {
                        if (recordset.recordsets[0].length > 0) {
                            var FadminN = recordset.recordsets[0][0].FirstN;
                            var MadminN = recordset.recordsets[0][0].MiddleN;
                            var LadminN = recordset.recordsets[0][0].LastN;
                            req.input('FadminN', sql.NVarChar, FadminN);
                            req.input('MadminN', sql.NVarChar, MadminN);
                            req.input('LadminN', sql.NVarChar, LadminN);
                            console.log("Faculty found: " + Username);
                            queryStr = "INSERT INTO Admin (Admin_ID, FirstN, LastN, MiddleN, Email, Created_BY, Updated_BY, Creation_date, Last_Updated) VALUES (@username, @FadminN, @LadminN, @MadminN, @email, @userId, @userId, getdate(), getdate())";
                            callback();
                        } else {
                            failed = true;
                            response.write("Faculty ID: " + Username + " is not valid");
                            response.end();
                            return;
                        }

                    }).catch(function (err) {
                        console.log(err);
                        response.write("Faculty ID: " + Username + " is not valid");
                        response.end();
                        return;
                    });

                } else {
                    queryStr = "INSERT INTO Faculty (Faculty_ID, FirstN, MiddleN, LastN, Email, Race, PhoneN, Bday, Gender, Admin_Permission, Department, Created_BY, Updated_BY, Created_date, Last_Updated) VALUES (@username, @fname, @mname, @lname, @email, @race, @phonenum, @birthdate, @gender, @adminpermission, @department, @userId, @userId, getdate(), getdate())";
                }

                break;
            case 'G':
                queryStr = "INSERT INTO Guest (GuestID, FirstN, MiddleN, LastN, Email, Race, PhoneN, Bday, Gender, Created_BY, Updated_BY, Created_date, Last_Updated) VALUES (@username, @fname, @mname, @lname, @email, @race, @phonenum, @birthdate, @gender,  @userId,  @userId, getdate(), getdate())";
                break;

        }


        if (!failed && mode !== "admin") {

            req.query(queryStr).then(function (recordset) {
                insertAdmin();
                insertLogin();
            }).catch(function (err) {
                console.log(err);
            });

            function insertAdmin() {
                if (adminp === 1 && firstChar === 'F') {
                    query = req.query("INSERT INTO Admin (Admin_ID, FirstN, LastN, Email, Created_BY, Updated_BY, Creation_date, Last_Updated) VALUES (@username, @fname, @lname, @email,  @userId,  @userId, getdate(), getdate())");
                    req.query(query).then(function (recordset) {
                        console.log("New admin user entry inserted into database.");

                    }).catch(function (err) {
                        Console.error("Insert into admin failed");
                        console.log(err);
                    });
                }
            }

            function insertLogin() {
                let squery = "INSERT INTO Login (Username, HashedPassword, TemporaryPassword,";
                switch (firstChar) {
                    case 'S': squery += " StudentID) VALUES (@username, @hashedPassword, 1, @Username)"; break;
                    case 'F': squery += " Faculty_ID) VALUES (@username, @hashedPassword, 1, @Username)"; break;
                    case 'G': squery += " GuestID) VALUES (@username, @hashedPassword, 1, @Username)"; break;
                }
                if (mode !== 'admin') {
                    bcrypt.hash(tempPassword, 10, function (err, hash) {
                        if (err) {
                            console.log(err);
                        } else {
                            let m = 0;
                            for (i = 0; i < 9999; i++) {
                                for (j = 0; j < 999; j++) {
                                    m += 1;
                                }
                            }

                            req.input('hashedPassword', sql.NVarChar, hash);

                            console.log("Query: " + squery);
                            req.query(squery).then(function (recordset) {
                                console.log("New " + mode + " login entry inserted into database.");
                                if(mode === 'guest') {
                                    response.write("New guest user created. <br>Guest ID: " + Username);
                                    response.end();                    
                                } else if(mode === 'student') {
                                    response.write("New student user created. <br>Student ID: " + Username);
                                    response.end();                    
                                } else if(mode === 'faculty') {
                                    response.write("New faculty user created. <br>Faculty ID: " + Username);
                                    response.end();                    
                                }
            
                            }).catch(function (err) {
                                console.log(err);
                            });
                        }
                    });
                }
            }
        }

    }).catch(function (err) {
        console.error("Unable to get a DB connection");
        console.log(err);
    });

}

function adminUI(response) {
    console.log("Request handler 'adminUI' was called.");
    var adata = fs.readFileSync('adminUI.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(adata);
    response.end();
}

function BookEntry(response) {
    console.log("Request handler 'BookEntry' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/BookEntry.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}

function ElectronicsEntry(response) {
    console.log("Request handler 'ElectronicsEntry' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/ElectronicsEntry.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}

function MediaEntry(response) {
    console.log("Request handler 'MediaEntry' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/MediaEntry.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}

function ObjectEntry(response) {
    console.log("Request handler 'ObjectEntry' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/ObjectEntry.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}

function TransactionEntry(response) {
    console.log("Request handler 'TransactionEntry' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/TransactionEntry.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}

function BookEdit(response) {

    console.log("Request handler 'BookEdit' was called.");
    var fdata = fs.readFileSync('AdminUI/AdminUI-Edit/BookEdit.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fdata);
    response.end();

}

function ElectronicsEdit(response) {

    console.log("Request handler 'ElectornicsEdit' was called.");
    var fdata = fs.readFileSync('AdminUI/AdminUI-Edit/ElectronicsEdit.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fdata);
    response.end();

}

function ObjectEdit(response) {

    console.log("Request handler 'ObjectEdit' was called.");
    var fdata = fs.readFileSync('AdminUI/AdminUI-Edit/ObjectEdit.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fdata);
    response.end();

}

function MediaEdit(response) {

    console.log("Request handler 'MediaEdit' was called.");
    var fdata = fs.readFileSync('AdminUI/AdminUI-Edit/MediaEdit.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fdata);
    response.end();

}

function FacultyEdit(response) {

    console.log("Request handler 'FacultyEdit' was called.");
    var fdata = fs.readFileSync('AdminUI/AdminUI-Edit/FacultyEdit.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fdata);
    response.end();

}

function StudentEdit(response) {

    console.log("Request handler 'StudentEdit' was called.");
    var fdata = fs.readFileSync('AdminUI/AdminUI-Edit/StudentEdit.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fdata);
    response.end();

}

function GuestEdit(response) {

    console.log("Request handler 'GuestEdit' was called.");
    var fdata = fs.readFileSync('AdminUI/AdminUI-Edit/GuestEdit.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fdata);
    response.end();

}

function TransactionsEdit(response) {

    console.log("Request handler 'TransactionsEdit' was called.");
    var fdata = fs.readFileSync('AdminUI/AdminUI-Edit/TransactionsEdit.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fdata);
    response.end();

}
function ReservationsEdit(response){
    console.log("Request handler 'ReservationsEdit' was called.");
    var fdata = fs.readFileSync('AdminUI/AdminUI-Edit/ReservationsEdit.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fdata);
    response.end();
}

function StudentEntry(response) {
    console.log("Request handler 'StudentEntry' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/StudentEntry.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}

function GuestEntry(response) {
    console.log("Request handler 'GuestEntry' was called.");
    cons.ejs('./AdminUI/AdminUI-Entry/GuestEntry.html', { uname: '' }, function (err, html) {
        if (err) {
            console.error('Error templating with EJS');
            throw err;
        }
        response.write(html);
        response.end();
    });

    // var edata = fs.readFileSync('AdminUI/AdminUI-Entry/GuestEntry.html');
    // response.writeHead(200, { "Content-Type": "text/html" });
    // response.write(edata);
    // response.end();
}

function FacultyEntry(response) {
    console.log("Request handler 'FacultyEntry' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/FacultyEntry.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}

function AdminEntry(response) {
    console.log("Request handler 'AdminEntry' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Entry/AdminEntry.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}

function AdminReportMain(response){
    console.log("Request handler 'AdminReportMain' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Report/AdminReportMain.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}

function AdminReportBook(response){
    console.log("Request handler 'AdminReportBook' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Report/AdminReportBook.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}

function AdminReportBookSearch(response){
    console.log("Request handler 'AdminReportBookSearch' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Report/AdminReportBookSearch.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}

function AdminTransactions(response){
    console.log("Request handler 'AdminTransactions' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Report/AdminTransactions.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}
function AdminTransactionsSearch(response){
    console.log("Request handler 'AdminTransactionsSearch' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Report/AdminTransactionsSearch.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}
function AdminTransactionsStatus(response){
    console.log("Request handler 'AdminTransactionsStatus' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Report/AdminTransactionsStatus.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}
function AdminSFaculty(response){
    console.log("Request handler 'AdminSFaculty' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Report/AdminSFaculty.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}
function AdminSGuest(response){
    console.log("Request handler 'AdminSGuest' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Report/AdminSGuest.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}
function AdminSStudents(response){
    console.log("Request handler 'AdminSStudent' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Report/AdminSStudents.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}


function AdminReportMain(response){
    console.log("Request handler 'AdminReportMain' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Report/AdminReportMain.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}

function AdminReportBook(response){
    console.log("Request handler 'AdminReportBook' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Report/AdminReportBook.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}

function AdminReportBookSearch(response){
    console.log("Request handler 'AdminReportBookSearch' was called.");
    var edata = fs.readFileSync('AdminUI/AdminUI-Report/AdminReportBookSearch.html');
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(edata);
    response.end();
}


function SearchBooks(response, postData) {

    sql.connect(config).then(function () {
        var req = new sql.Request();
        try {
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
            var Created_BY = params['createdBy'];
            var Created_date = params['createdDate'];
            var Updated_BY = params['updatedBy'];
            var Updated_date = params['updatedDate'];

            // string query to hold the SQL query
            var query = null;
            // counter for the # of attributes
            var counter = 0;
            // array to hold the attributes
            let StringArray = [];

            // if the attribute is not empty, add it to the array

            if (bookname != undefined && bookname != "") {
                var bookstring = "Book_Name = '" + bookname + "'";
                StringArray.push(bookstring);
                counter++;
            }
            if (dollarvalue != undefined && dollarvalue != "") {
                vardollarstring = "Dollar_Value = " + dollarvalue;
                StringArray.push(vardollarstring);
                counter++;
            }
            if (numOfCompies != undefined && numOfCompies != "") {
                varnumofcopiesstring = "Num_Of_Copies = " + numOfCompies;
                StringArray.push(varnumofcopiesstring);
                counter++;
            }
            if (author != undefined && author != "") {
                varauthorstring = "Author = '" + author + "'";
                StringArray.push(varauthorstring);
                counter++;
            }
            if (genre != undefined && genre != "") {
                vargenrestring = "Genre = '" + genre + "'";
                StringArray.push(vargenrestring);
                counter++;
            }
            if (isbn != undefined && isbn != "") {
                varisbnstring = "ISBN = '" + isbn + "'";
                StringArray.push(varisbnstring);
                counter++;
            }
            if (language != undefined && language != "") {
                varlanguagestring = "Language = '" + language + "'";
                StringArray.push(varlanguagestring);
                counter++;
            }
            if (publisher != undefined && publisher != "") {
                varpublisherstring = "Publisher_Name = '" + publisher + "'";
                StringArray.push(varpublisherstring);
                counter++;
            }
            if (Created_BY != undefined && Created_BY != "") {
                varcreatedbystring = "Created_By = '" + Created_BY + "'";
                StringArray.push(varcreatedbystring);
                counter++;
            }
            if (Created_date != undefined && Created_date != "") {
                varcreateddatestring = "Created_Date = '" + Created_date + "'";
                StringArray.push(varcreateddatestring);
                counter++;
            }
            if (Updated_BY != undefined && Updated_BY != "") {
                varupdatedbystring = "Updated_By = '" + Updated_BY + "'";
                StringArray.push(varupdatedbystring);
                counter++;
            }
            if (Updated_date != undefined && Updated_date != "") {
                varupdateddatestring = "Updated_Date = '" + Updated_date + "'";
                StringArray.push(varupdateddatestring);
                counter++;
            }
            // if the array is empty let the user know else build the query
            // this is the ultimate SELECT * query builder
            switch (counter) {
                case 0: console.log("No attributes entered, returning all books");
                    query = "SELECT * FROM dbo.Book;";
                    break;
                case 1: console.log("1 attribute entered, searching for " + StringArray[0]);
                    query = "SELECT * FROM dbo.Book WHERE " + StringArray[0] + ";";
                    break;
                case 2: console.log("2 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1]);
                    query = "SELECT * FROM dbo.Book WHERE " + StringArray[0] + " AND " + StringArray[1] + ";";
                    break;
                case 3: console.log("3 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2]);
                    query = "SELECT * FROM dbo.Book WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + ";";
                    break;
                case 4: console.log("4 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3]);
                    query = "SELECT * FROM dbo.Book WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + ";";
                    break;
                case 5: console.log("5 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4]);
                    query = "SELECT * FROM dbo.Book WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + ";";
                    break;
                case 6: console.log("6 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5]);
                    query = "SELECT * FROM dbo.Book WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + ";";
                    break;
                case 7: console.log("7 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6]);
                    query = "SELECT * FROM dbo.Book WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + ";";
                    break;
                case 8: console.log("8 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7]);
                    query = "SELECT * FROM dbo.Book WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + ";";
                    break;
                case 9: console.log("9 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8]);
                    query = "SELECT * FROM dbo.Book WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + ";";
                    break;
                case 10: console.log("10 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9]);
                    query = "SELECT * FROM dbo.Book WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + ";";
                    break;
                case 11: console.log("11 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10]);
                    query = "SELECT * FROM dbo.Book WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + ";";
                    break;
                case 12: console.log("12 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11]);
                    query = "SELECT * FROM dbo.Book WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + ";";
                    break;

            }

            req.query(query).then(function (recordset) {
                console.log("New admin user entry will be viewed in the database.");

                if (recordset.recordsets.length > 0) {
                    console.log("Found " + recordset.recordsets.length + " records");
                    console.log(recordset);
                    const resultArray = recordset.recordsets[0];
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

        }
        catch (err) {
            console.log(err);
            response.write("Error");
        }
    })
};

function DeleteBook(response, postData) {

    sql.connect(config).then(function () {
        var req = new sql.Request();

        var querystring = require('querystring');
        var data = querystring.parse(postData);
        var bookISBN = data.deletebookisbn;
        var query = "DELETE FROM dbo.Book WHERE ISBN = '" + bookISBN + "';";
        console.log(query);
        req.query(query).then(function (recordset) {
            console.log("a tuple in the book table will be deleted from the database.");
            response.write("Book deleted");
            response.end();
        }
        )
    })
};

function UpdateBook(response, postData,sessionData) {


    sql.connect(config).then(function () {
        var req = new sql.Request();

        var querystring = require('querystring');
        var data = querystring.parse(postData);
        req.input('userId', sql.NVarChar, sessionData.logginId);


        var bookISBN = data.ISBN;
        var bookName = data.Book_Name;
        var bookDollarValue = data.Dollar_Value;
        var Number_of_Copies = data.Number_of_Copies;
        var bookAuthor = data.Author;
        var bookGenre = data.Genre;
        var bookLanguage = data.Language;
        var bookPublisher = data.Publisher_Name;
        var updatedBy = sessionData.logginId;

        console.log("Updated By: " + updatedBy);
        console.log("Book ISBN: " + bookISBN);
        console.log("Book Name: " + bookName);
        console.log("Book Dollar Value: " + bookDollarValue);
        console.log("Number of Copies: " + Number_of_Copies);
        console.log("Book Author: " + bookAuthor);
        console.log("Book Genre: " + bookGenre);
        console.log("Book Language: " + bookLanguage);
        console.log("Book Publisher: " + bookPublisher);


        const currentDate = new Date();
        console.log(currentDate);
        const sqlFormattedDate =  currentDate.toISOString().slice(0, 10);

        var query = "UPDATE dbo.Book SET Book_Name = '" + bookName + "', Dollar_Value = '" + bookDollarValue + "', Num_of_Copies = '" + Number_of_Copies + "', Author = '" + bookAuthor + "', Genre = '" + bookGenre + "', Language = '" + bookLanguage + "', Publisher_Name = '" + bookPublisher + "', Updated_BY = '"+ updatedBy+ "', Last_Updated = '"+ sqlFormattedDate +"' WHERE ISBN = '" + bookISBN + "';";
        var secondquery = "UPDATE dbo.Book SET ISBN = '" + bookISBN + "' WHERE Book_Name = '" + bookName + "' AND Author = '" + bookAuthor + "' AND Genre = '" + bookGenre + "' AND Language = '" + bookLanguage + "' AND Publisher_Name = '" + bookPublisher + "' AND Dollar_Value = '" + bookDollarValue + "' AND Num_of_Copies = '" + Number_of_Copies + "';";


        req.query(query).then(function (recordset) {
            console.log("First query executed");
            req.query(secondquery).then(function (recordset) {
                response.write("Book Modified");
                response.end();
            }
            )
        });



    })
}

function insertTransaction(response, postData) {
    var conn = new sql.ConnectionPool(config);
    sql.connect(config).then(function() {
        var req = new sql.Request();

        var querystring = require('querystring');
        var params = querystring.parse(postData);

        var BID = params['BID'];
        var itemID = params['itemID'];
        var itemType = params['itemType'];
        var itemName = params['itemName'];

        req.input('itemName', sql.NVarChar, itemName);
        req.input('itemID', sql.NVarChar, itemID);
        req.input('BID', sql.NVarChar, BID);
        req.input('userId', sql.NVarChar, sessionData.logginId);

        var query = "INSERT INTO Transactions (Reciept_Num, ";
        
        // Students can take up to 5 Books from the library 
        // Students can take up to 1 Electronic from the library
        // Students can take up to 2 Objects from the library
        // Students can take up to 5 Media from the library
        // Faculty can take up to 30 Books from the library
        // Faculty can take up to 5 Electronic from the library
        // Faculty can take up to 10 Object from the library
        // Faculty can take up to 30 Media Books from the library
        // Guests can take up to 2 Books from the library
        // Guests can take up to 0 Electronic from the library
        // Guests can take up to 2 Objects from the library
        // Guests can take up to 2 Media from the library


        const DAYSOFWEEK = 7;
        let returnDate = new Date();
        switch (BID.charAt(0)) {
        case 'G':
            query += "GuestID, ";
            switch (itemType) {
                case 'Book':
                    returnDate.setDate(new Date().getDate() + 2 * DAYSOFWEEK);
                    query += "Book_ID, ";
                    break;
                case 'Media':
                    returnDate.setDate(new Date().getDate() + 2 * DAYSOFWEEK);
                    query += "Media_ID, ";
                    break;
                case 'Object':
                    returnDate.setDate(new Date().getDate() + DAYSOFWEEK);
                    query += "Object_ID, ";
                    break;
            }
            break;
        case 'S':
            query += "StudentID, ";
            switch (itemType) {
                case 'Book':
                    returnDate.setDate(new Date().getDate() + 15 * DAYSOFWEEK);
                    query += "Book_ID, ";
                    break;
                case 'Electronic':
                    returnDate.setDate(new Date().getDate() + DAYSOFWEEK);
                    query += "Electronics_ID, ";
                    break;
                case 'Media':
                    returnDate.setDate(new Date().getDate() + 2 * DAYSOFWEEK);
                    query += "Media_ID, ";
                    break;
                case 'Object':
                    returnDate.setDate(new Date().getDate() + DAYSOFWEEK);
                    query += "Object_ID, ";
                    break;
            }
            break;
        case 'F':
            query += "Faculty_ID, ";
            switch (itemType) {
                case 'Book':
                    returnDate.setDate(new Date().getDate() + 30 * DAYSOFWEEK);
                    query += "Book_ID, ";
                    break;
                case 'Electronic':
                    returnDate.setDate(new Date().getDate() + 4 * DAYSOFWEEK);
                    query += "Electronics_ID, ";
                    break;
                case 'Media':
                    returnDate.setDate(new Date().getDate() + 2 * DAYSOFWEEK);
                    query += "Media_ID, ";
                    break;
                case 'Object':
                    returnDate.setDate(new Date().getDate() + DAYSOFWEEK);
                    query += "Object_ID, ";
                    break;                
            }
            break;
        }

        req.input('returnDate', sql.Date, returnDate);
        query += "Active_Void_Status, Creation_Date, Return_Due_Date, Created_BY, Updated_BY) VALUES ('00000000001', @BID, @itemID, 1, getDate(), @returnDate, @userId, @userId)";

        req.query(query).then(function (recordset) {
            console.log("Transaction Completed.");
            response.alert("Transaction Completed.");
            response.end();
        }).catch(function (err) {
            console.error("error");
            console.log(err);
        });
	}).catch(function(err) {
        console.error("Unable to get a DB connection");
        console.log(err);
    });
}


exports.login = login;
exports.loginverify = loginverify;
exports.PasswordChanger = PasswordChanger;

exports.getInfo = getInfo;

exports.adminUI = adminUI;
exports.BookEntry = BookEntry;
exports.ElectronicsEntry = ElectronicsEntry;
exports.MediaEntry = MediaEntry;
exports.ObjectEntry = ObjectEntry;
exports.TransactionEntry = TransactionEntry;
exports.StudentEntry = StudentEntry;
exports.GuestEntry = GuestEntry;
exports.FacultyEntry = FacultyEntry;
exports.AdminEntry = AdminEntry;
exports.AdminReportMain = AdminReportMain;
exports.AdminReportBook = AdminReportBook;
exports.AdminReportBookSearch = AdminReportBookSearch;
exports.BookEdit = BookEdit;
exports.ElectronicsEdit = ElectronicsEdit;
exports.ObjectEdit = ObjectEdit;
exports.MediaEdit = MediaEdit;
exports.FacultyEdit = FacultyEdit;
exports.StudentEdit = StudentEdit;
exports.GuestEdit = GuestEdit;
exports.TransactionsEdit = TransactionsEdit;
exports.ReservationsEdit = ReservationsEdit;
exports.AdminTransactions = AdminTransactions;
exports.AdminTransactionsSearch = AdminTransactionsSearch;
exports.AdminTransactionsStatus = AdminTransactionsStatus;
exports.AdminSFaculty = AdminSFaculty;
exports.AdminSGuest = AdminSGuest;
exports.AdminSStudents = AdminSStudents;
exports.SearchBooks = SearchBooks;
exports.DeleteBook = DeleteBook;
exports.UpdateBook = UpdateBook;
//exports.searchresults = searchresults;

exports.createUser = createUser;
exports.addLogin = addLogin;
exports.addItem = addItem;
exports.insertTransaction = insertTransaction;