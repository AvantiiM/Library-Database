var fs = require('fs');
var sql = require('mssql');
var config = require('./db_connect');
var querystring = require('querystring');



function UserReportSum(response, postData) {

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
    });
}

// ############################################################################################################




function TransactionReportSum(response, postData) {

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
    });
}


// ############################################################################################################



function MaxReportSum(response, postData) {

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
    });
}








// Available BOOKS ###################################################################################################################################################################################################################################################




function AvailableBooks(response, postData) {

    sql.connect(config).then(function () {
        var req = new sql.Request();
        try {
            const query = "SELECT B.*, STUFF(( SELECT ', ' + CAST(Reciept_num AS VARCHAR(10)) FROM Transactions T WHERE T.Book_ID = B.ISBN AND T.Actual_Return_Date IS NULL FOR XML PATH('')), 1, 2, '') AS Receipt_Numbers FROM Book B WHERE B.Num_of_Copies > 0;";

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


// Transactions Report ###################################################################################################################################################################################################################################################

function TransactionPeriods(response, postData) {

    sql.connect(config).then(function () {
        var req = new sql.Request();

        var querystring = require('querystring');
        var params = querystring.parse(postData);
        var answer = params['Month'];
        let query1 = null;





        switch (answer) {
            case "1":
                query1 = "SELECT * FROM dbo.Transactions WHERE Creation_Date BETWEEN '2023-01-01' AND '2023-01-31';";
                break;
            case "2":
                query1 = "SELECT * FROM dbo.Transactions WHERE Creation_Date BETWEEN '2023-02-01' AND '2023-02-28';";
                break;
            case "3":
                query1 = "SELECT * FROM dbo.Transactions WHERE Creation_Date BETWEEN '2023-03-01' AND '2023-03-31';";
                break;
            case "4":
                query1 = "SELECT * FROM dbo.Transactions WHERE Creation_Date BETWEEN '2023-04-01' AND '2023-04-30';";
                break;
        }


        console.log(query1);


        req.query(query1).then(function (recordset) {
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




    )
};



function TransactionPeriodsBalance(response, postData) {

    sql.connect(config).then(function () {
        var req = new sql.Request();

        var querystring = require('querystring');
        var params = querystring.parse(postData);
        var answer = params['Month'];
        if (answer == null) {
            answer = "1";
        }
        let query1 = null;
        let query2 = null;

        switch (answer) {
            case "1":
                query1 = "SELECT COUNT(*) AS count FROM dbo.Transactions WHERE Creation_Date BETWEEN '2023-01-01' AND '2023-01-31';";
                query2 = "SELECT SUM(Late_Fees) AS sum FROM dbo.Transactions WHERE Creation_Date BETWEEN '2023-01-01' AND '2023-01-31' AND Late_Fees > 0;";
                break;
            case "2":
                query1 = "SELECT COUNT(*) AS count FROM dbo.Transactions WHERE Creation_Date BETWEEN '2023-02-01' AND '2023-02-28';";
                query2 = "SELECT SUM(Late_Fees) AS sum FROM dbo.Transactions WHERE Creation_Date BETWEEN '2023-02-01' AND '2023-02-28' AND Late_Fees > 0;";
                break;
            case "3":
                query1 = "SELECT COUNT(*) AS count FROM dbo.Transactions WHERE Creation_Date BETWEEN '2023-03-01' AND '2023-03-31';";
                query2 = "SELECT SUM(Late_Fees) AS sum FROM dbo.Transactions WHERE Creation_Date BETWEEN '2023-03-01' AND '2023-03-31' AND Late_Fees > 0;";
                break;
            case "4":
                query1 = "SELECT COUNT(*) AS count FROM dbo.Transactions WHERE Creation_Date BETWEEN '2023-04-01' AND '2023-04-30';";
                query2 = "SELECT SUM(Late_Fees) AS sum FROM dbo.Transactions WHERE Creation_Date BETWEEN '2023-04-01' AND '2023-04-30' AND Late_Fees > 0;";
                break;
            case null:
                query1 = "SELECT COUNT(*) AS count FROM dbo.Transactions WHERE Creation_Date BETWEEN '2023-01-01' AND '2023-01-31';";
                query2 = "SELECT SUM(Late_Fees) AS sum FROM dbo.Transactions WHERE Creation_Date BETWEEN '2023-01-01' AND '2023-01-31' AND Late_Fees > 0;";
                break;
            case "0":
                query1 = "SELECT COUNT(*) AS count FROM dbo.Transactions WHERE Creation_Date BETWEEN '2023-01-01' AND '2023-01-31';";
                query2 = "SELECT SUM(Late_Fees) AS sum FROM dbo.Transactions WHERE Creation_Date BETWEEN '2023-01-01' AND '2023-01-31' AND Late_Fees > 0;";
                break;
            default:
                query1 = "SELECT COUNT(*) AS count FROM dbo.Transactions WHERE Creation_Date BETWEEN '2023-01-01' AND '2023-01-31';";
                query2 = "SELECT SUM(Late_Fees) AS sum FROM dbo.Transactions WHERE Creation_Date BETWEEN '2023-01-01' AND '2023-01-31' AND Late_Fees > 0;";
                break;
        }

        Promise.all([req.query(query1), req.query(query2)]).then(function (results) {
            console.log(results); // add this line to log the results
            const count = results[0].recordset[0].count;
            const sum = results[1].recordset[0].sum;
            const resultObject = { count, sum };
            console.log(resultObject); // add this line to log the result object
            const resultArray = [resultObject];
            console.log(resultArray);
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify(resultArray));
            response.end();
        }).catch(function (err) {
            console.error("error");
            console.log(err);
            response.end();
        });
    }).catch(function (err) {
        console.log(err);
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("Error connecting to database");
    });
}


// Suspended Users ###################################################################################################################################################################################################################################################



function SuspendedStudents(response, postData) {

    sql.connect(config).then(function () {
        var req = new sql.Request();

        var query = "SELECT * FROM dbo.Students WHERE SUSPENSION = 'Y';";

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

    });

}




function SuspendedFaculty(response, postData) {

    sql.connect(config).then(function () {
        var req = new sql.Request();

        var query = "SELECT * FROM dbo.Faculty WHERE SUSPENSION = 'Y';";
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

    });

}



function SuspendedGuests(response, postData) {

    sql.connect(config).then(function () {
        var req = new sql.Request();

        var query = "SELECT * FROM dbo.Guest WHERE SUSPENSION = 'Y';";

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

    });

}

// Transaction Status Report #######################################################################################
function TransactionStatusBooks(response, postData) {
    sql.connect(config).then(function() {
      var req = new sql.Request();
      var querystring = require('querystring');
      var params = querystring.parse(postData);
      var answer = params['Month'];
      var year = answer.substring(0, 4);
      var month = answer.substring(5, 7);
      console.log(year);
      console.log(month);
      let query1 = `
        SELECT T.*, B.Book_Name, B.ISBN, B.Dollar_Value
        FROM Transactions T
        INNER JOIN Book B
        ON T.Book_ID = B.ISBN
        WHERE YEAR(T.Creation_Date) = ${year} AND MONTH(T.Creation_Date) = ${month}
        AND T.Reciept_num IN (
          SELECT Reciept_num
          FROM Transactions
          WHERE Damage_Fees = 1 AND Media_ID IS NULL AND Object_ID IS NULL AND Electronics_ID IS NULL
        )
        ORDER BY T.Book_ID;
      `;
      req.query(query1).then(function(recordset) {
        console.log("New admin user entry will be viewed in the database.");
  
        if (recordset.recordsets.length > 0) {
          console.log("Found " + recordset.recordsets.length + " records");
          console.log(recordset);
          const resultArray = recordset.recordsets[0];
          response.writeHead(200, { "Content-Type": "application/json" });
          response.write(JSON.stringify(resultArray));
          response.end();
        } else {
            console.log("No records found")
            response.write("No records found");
        }
    }).catch(function (err) {
        console.error("error");
        console.log(err);
    });

}
)};

function TransactionStatusLate(response, postData) {
    sql.connect(config).then(function() {
        var req = new sql.Request();
        var querystring = require('querystring');
        var params = querystring.parse(postData);
        var answer = params['Month'];
        var year = answer.substring(0, 4);
        var month = answer.substring(5, 7);
        console.log(year);
        console.log(month);

        var userID = []; // declare empty userID array

        query1 = `SELECT Return_Due_Date, Creation_Date, Reciept_num, Late_Fees, Faculty_ID, StudentID, GuestID, Book_ID, Object_ID, Electronics_ID, Media_ID 
        FROM Transactions 
        WHERE Late_Fees > 0 AND MONTH(Creation_Date) = ${month} AND YEAR(Creation_Date) = ${year};`

        req.query(query1).then(function (result, recordset){
            console.log("Late Fee transaction Found")
            console.log(recordset);
            if (recordset.recordsets.length > 0) {
                console.log("Found " + recordset.recordsets.length + " records");
                console.log(recordset);

                if (recordset.recordsets[0].length > 0) { 
                    var faculty = recordset.recordsets[0][0].Faculty_ID;
                    var stud = recordset.recordsets[0][0].StudentID;
                    var guest = recordset.recordsets[0][0].GuestID;
                }

                if(faculty != null){
                    console.log("This is the Faculty ID called: " + faculty)
                    req.query("SELECT Faculty_ID, FirstN, LastN, MiddleN, Email, Department, Balance FROM Faculty WHERE Faculty_ID=" + '\'' + faculty + '\'', function (result, recordset) {
                        if (recordset.recordsets[0].length > 0) { 
                            const userId = recordset.recordsets[0]
                            console.log("User information pulled: " + userId);
                            userID.push(userId); // push userId into the array
                        }
                    })
                }
                else if(stud != null){                
                    req.query("SELECT StudentID, FirstN, LastN, MiddleN, Email, Major, Balance FROM Students WHERE StudentID=" + '\'' + stud + '\'', function (result, recordset) {
                        if (recordset.recordsets[0].length > 0) { 
                            const userId = recordset.recordsets[0]
                            userID.push(userId); // push userId into the array
                        }
                    })
                }
                else if(guest != null){
                    req.query("SELECT GuestID, FirstN, LastN, MiddleN, Email, Balance FROM Guest WHERE GuestID=" + '\'' + guest + '\'', function (result, recordset) {
                        if (recordset.recordsets[0].length > 0) { 
                            const userId = recordset.recordsets[0]
                            userID.push(userId); // push userId into the array
                        }
                    })
                }

                const resultArray = recordset.recordsets[0].concat(userID); // concatenate the two arrays
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
        })
    }
)};

function TransactionStatusObjects(response, postData) {
    sql.connect(config).then(function() {
      var req = new sql.Request();
      var querystring = require('querystring');
      var params = querystring.parse(postData);
      var answer = params['Month'];
      var year = answer.substring(0, 4);
      var month = answer.substring(5, 7);
      console.log(year);
      console.log(month);
      let query1 = `
        SELECT T.*, O.Object_Name, O.Object_ID, O.Dollar_Value
        FROM Transactions T
        INNER JOIN Object O
        ON T.Object_ID = O.Object_ID
        WHERE YEAR(T.Creation_Date) = ${year} AND MONTH(T.Creation_Date) = ${month}
        AND T.Reciept_num IN (
          SELECT Reciept_num
          FROM Transactions
          WHERE Damage_Fees = 1 AND Media_ID IS NULL AND Book_ID IS NULL AND Electronics_ID IS NULL
        )
        ORDER BY T.Object_ID;
      `;
      req.query(query1).then(function(recordset) {
        console.log("New admin user entry will be viewed in the database.");
  
        if (recordset.recordsets.length > 0) {
          console.log("Found " + recordset.recordsets.length + " records");
          console.log(recordset);
          const resultArray = recordset.recordsets[0];
          response.writeHead(200, { "Content-Type": "application/json" });
          response.write(JSON.stringify(resultArray));
          response.end();
        } else {
            console.log("No records found")
            response.write("No records found");
        }
    }).catch(function (err) {
        console.error("error");
        console.log(err);
    });

}
)};
function TransactionStatusMedia(response, postData) {
    sql.connect(config).then(function() {
        var req = new sql.Request();
        var querystring = require('querystring');
        var params = querystring.parse(postData);
        var answer = params['Month'];
        var year = answer.substring(0, 4);
        var month = answer.substring(5, 7);
        console.log(year);
        console.log(month);
        let query1 = `
            SELECT T.*, M.Media_Name, M.Media_ID, M.Dollar_Value
            FROM Transactions T
            INNER JOIN Media M
            ON T.Media_ID = M.Media_ID
            WHERE YEAR(T.Creation_Date) = ${year} AND MONTH(T.Creation_Date) = ${month}
            AND T.Reciept_num IN (
                SELECT Reciept_num
                FROM Transactions
                WHERE Damage_Fees = 1 AND Book_ID IS NULL AND Object_ID IS NULL AND Electronics_ID IS NULL
            )
            ORDER BY T.Media_ID;
        `;
        req.query(query1).then(function(recordset) {
            console.log("New admin user entry will be viewed in the database.");
            
        if (recordset.recordsets.length > 0) {
            console.log("Found " + recordset.recordsets.length + " records");
            console.log(recordset);
            const resultArray = recordset.recordsets[0];
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify(resultArray));
            response.end();
          } else {
              console.log("No records found")
              response.write("No records found");
          }
      }).catch(function (err) {
          console.error("error");
          console.log(err);
      });
  
  }
  )};
    function TransactionStatusElectronics(response, postData) {
        sql.connect(config).then(function() {
            var req = new sql.Request();
            var querystring = require('querystring');
            var params = querystring.parse(postData);
            var answer = params['Month'];
            var year = answer.substring(0, 4);
            var month = answer.substring(5, 7);
            console.log(year);
            console.log(month);
            let query1 = `
                SELECT T.*, E.Electronics_Name, E.Serial_No, E.Dollar_Value
                FROM Transactions T
                INNER JOIN Electronics E
                ON T.Electronics_ID = E.Serial_No
                WHERE YEAR(T.Creation_Date) = ${year} AND MONTH(T.Creation_Date) = ${month}
                AND T.Reciept_num IN (
                    SELECT Reciept_num
                    FROM Transactions
                    WHERE Damage_Fees = 1 AND Book_ID IS NULL AND Object_ID IS NULL AND Media_ID IS NULL
                )
                ORDER BY T.Electronics_ID;
            `;
            req.query(query1).then(function(recordset) {
                console.log("New admin user entry will be viewed in the database.");
                            
        if (recordset.recordsets.length > 0) {
            console.log("Found " + recordset.recordsets.length + " records");
            console.log(recordset);
            const resultArray = recordset.recordsets[0];
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify(resultArray));
            response.end();
          } else {
              console.log("No records found")
              response.write("No records found");
          }
      }).catch(function (err) {
          console.error("error");
          console.log(err);
      });
  
  }
  )};





// exports #####################################################################################################
    exports.UserReportSum = UserReportSum;
    exports.TransactionReportSum = TransactionReportSum;
    exports.MaxReportSum = MaxReportSum;
    exports.AvailableBooks = AvailableBooks;
    exports.TransactionPeriods = TransactionPeriods;
    exports.TransactionPeriodsBalance = TransactionPeriodsBalance;
    exports.SuspendedStudents = SuspendedStudents;
    exports.SuspendedFaculty = SuspendedFaculty;
    exports.SuspendedGuests = SuspendedGuests;
    exports.TransactionStatusBooks = TransactionStatusBooks;
    exports.TransactionStatusElectronics = TransactionStatusElectronics;
    exports.TransactionStatusMedia = TransactionStatusMedia;
    exports.TransactionStatusObjects = TransactionStatusObjects;
    exports.TransactionStatusLate = TransactionStatusLate;