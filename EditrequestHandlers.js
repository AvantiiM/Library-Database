var fs = require('fs');
var sql = require('mssql');
var config = require('./db_connect');
var querystring = require('querystring');





// Electronics ####################################################################################################################


function SearchElectronics(response, postData){

    sql.connect(config).then(function () {
        var req = new sql.Request();
try{
        var querystring = require('querystring');
        var params = querystring.parse(postData);
        var ElectronicName = params['ElectronicName'];
        var dollarvalue = params['dollarValue'];
        var Availability = params['Availability'];
        var itemStatus = params['itemStatus'];
        var SerialNumber = params['SerialNumber'];
        var Created_BY = params['createdBy'];
        var Created_date = params['createdDate'];
        var Updated_BY = params['updatedBy'];
        var Updated_date = params['lastUpdated'];


        // string query to hold the SQL query
        var query = null;
        // counter for the # of attributes
        var counter = 0;
        // array to hold the attributes
        let StringArray = [];

        // if the attribute is not empty, add it to the array

        if(ElectronicName != undefined && ElectronicName != ""){
            var Electronicstring = "Electronics Name = '" + ElectronicName + "'";
            StringArray.push(Electronicstring);
            counter++;
        }
        if(dollarvalue != undefined && dollarvalue != ""){
            vardollarstring = "Dollar_Value = " + dollarvalue;
            StringArray.push(vardollarstring);
            counter++;
        }
        if(Availability != undefined && Availability != ""){
            varavailabilitystring = "Availability = '" + Availability + "'";
            StringArray.push(varavailabilitystring);
            counter++;
        }
        if(itemStatus != undefined && itemStatus != ""){
            varitemstatusstring = "Item_Status = '" + itemStatus + "'";
            StringArray.push(varitemstatusstring);
            counter++;
        }
        if(SerialNumber != undefined && SerialNumber != ""){
            varserialnumberstring = "Serial_Number = '" + SerialNumber + "'";
            StringArray.push(varserialnumberstring);
            counter++;
        }
        if(Created_BY != undefined && Created_BY != ""){
            varcreatedbystring = "Created_By = '" + Created_BY + "'";
            StringArray.push(varcreatedbystring);
            counter++;
        }
        if(Created_date != undefined && Created_date != ""){
            varcreateddatestring = "Created_Date = '" + Created_date + "'";
            StringArray.push(varcreateddatestring);
            counter++;
        }
        if(Updated_BY != undefined && Updated_BY  != ""){
            varupdatedbystring = "Updated_By = '" + Updated_BY + "'";
            StringArray.push(varupdatedbystring);
            counter++;
        }
        if(Updated_date != undefined && Updated_date != ""){
            varupdateddatestring = "Updated_Date = '" + Updated_date + "'";
            StringArray.push(varupdateddatestring);
            counter++;
        }
        // if the array is empty let the user know else build the query
        // this is the ultimate SELECT * query builder
        switch(counter){
            case 0: console.log("No attributes entered, returning all Electronicss");
            query = "SELECT * FROM dbo.Electronics;";
            break;
            case 1: console.log("1 attribute entered, searching for " + StringArray[0]);
            query = "SELECT * FROM dbo.Electronics WHERE " + StringArray[0] + ";";
            break;
            case 2: console.log("2 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1]);
            query = "SELECT * FROM dbo.Electronics WHERE " + StringArray[0] + " AND " + StringArray[1] + ";";
            break;
            case 3: console.log("3 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2]);
            query = "SELECT * FROM dbo.Electronics WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + ";";
            break;
            case 4: console.log("4 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3]);
            query = "SELECT * FROM dbo.Electronics WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + ";";
            break;
            case 5: console.log("5 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4]);
            query = "SELECT * FROM dbo.Electronics WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + ";";
            break;
            case 6: console.log("6 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5]);
            query = "SELECT * FROM dbo.Electronics WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + ";";
            break;
            case 7: console.log("7 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6]);
            query = "SELECT * FROM dbo.Electronics WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + ";";
            break;
            case 8: console.log("8 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7]);
            query = "SELECT * FROM dbo.Electronics WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + ";";
            break;
            case 9: console.log("9 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8]);
            query = "SELECT * FROM dbo.Electronics WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + ";";
            break;

        }

       req.query(query).then(function(recordset) {
        console.log("New admin user entry will be viewed in the database.");
        
        if(recordset.recordsets.length > 0) {
            console.log("Found " + recordset.recordsets.length + " records");
            console.log(recordset);
            const resultArray = recordset.recordsets[0];     
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(JSON.stringify(resultArray));
            response.end(); 
        } 
        else {
            console.log("No records found")
            response.write("No records found");
        }
    }).catch(function(err) {
        console.error("error");
        console.log(err);
    });

}
catch(err){
    console.log(err);
    response.write("Error");
}})};



function DeleteElectronics(response, postData) {

    sql.connect(config).then(function () {
        var req = new sql.Request();

        var querystring = require('querystring');
        var data = querystring.parse(postData);
        var ElectronicDelete = data.deleteElectronicSerialNo;
        var query = "DELETE FROM dbo.Electronics WHERE Serial_No = '" + ElectronicDelete + "';";
        console.log(query);
        req.query(query).then(function(recordset) {
            console.log("a tuple in the Electronics table will be deleted from the database.");
            response.write("Electronics deleted");
            response.end();}
        )
        })};

function UpdateElectronics(response, postData){


    sql.connect(config).then(function () {
        var req = new sql.Request();

        var querystring = require('querystring');
        var data = querystring.parse(postData);


        var ElectronicsSerialNumber = data.SerialNumber;
        var Electronic_Name = data.Electronic_Name;   
        var ElectronicsDollar_Value = data.Dollar_Value;
        var Electronicavailability = data.availability;
        var ElectronicItem_Status = data.Item_Status;
        
      
        

        console.log("Serial_No: " + ElectronicsSerialNumber);
        console.log("Electronics_Name: " + Electronic_Name);
        console.log("Dollar_Value: " + ElectronicsDollar_Value);
        console.log("Available: " + Electronicavailability);
        console.log("Item_Status: " + ElectronicItem_Status);
      

        var query = "UPDATE dbo.Electronics SET Electronics_Name = '" + Electronic_Name + "', Dollar_Value = '" + ElectronicsDollar_Value + "', Available = '" + Electronicavailability + "', Item_Status = '" + ElectronicItem_Status + "' WHERE Serial_No = '" + ElectronicsSerialNumber + "';";
        var secondquery = "UPDATE dbo.Electronics SET Serial_No = '" + ElectronicsSerialNumber + "' WHERE Electronics_Name = '" + Electronic_Name + "' AND Dollar_Value = '" + ElectronicsDollar_Value + "' AND Available = '" + Electronicavailability + "' AND Item_Status = '" + ElectronicItem_Status + "';";



        req.query(query).then(function(recordset) {
            console.log("First query executed");
            req.query(secondquery).then(function(recordset) {
            response.write("Electronics Modified");
            response.end();}
        )});



    })}


// Objects ####################################################################################################################




function SearchObjects(response, postData){

    sql.connect(config).then(function () {
        var req = new sql.Request();
try{
        var querystring = require('querystring');
        var params = querystring.parse(postData);
        var ObjectName = params['ObjectName'];
        var ObjectID = params['ObjectID'];
        var dollarvalue = params['dollarValue'];
        var numOfCopies = params['numOfCopies'];
        var Created_BY = params['createdBy'];
        var Created_date = params['createdDate'];
        var Updated_BY = params['updatedBy'];
        var Updated_date = params['lastUpdated'];



        // string query to hold the SQL query
        var query = null;
        // counter for the # of attributes
        var counter = 0;
        // array to hold the attributes
        let StringArray = [];

        // if the attribute is not empty, add it to the array

        if(ObjectName != undefined && ObjectName != ""){
            var Electronicstring = "Object_Name = '" + ObjectName + "'";
            StringArray.push(Electronicstring);
            counter++;
        }
        if(dollarvalue != undefined && dollarvalue != ""){
            vardollarstring = "Dollar_Value = " + dollarvalue;
            StringArray.push(vardollarstring);
            counter++;
        }
        if(ObjectID != undefined && ObjectID != ""){
            var ObjectIDstring = "Object_ID = " + ObjectID;
            StringArray.push(ObjectIDstring);
            counter++;
        }
        if(numOfCopies != undefined && numOfCopies != ""){
            varnumOfCopiesstring = "Number_Of_Copies = " + numOfCopies;
            StringArray.push(varnumOfCopiesstring);
            counter++;
        }
        if(Created_BY != undefined && Created_BY != ""){
            varcreatedbystring = "Created_By = '" + Created_BY + "'";
            StringArray.push(varcreatedbystring);
            counter++;
        }
        if(Created_date != undefined && Created_date != ""){
            varcreateddatestring = "Created_Date = '" + Created_date + "'";
            StringArray.push(varcreateddatestring);
            counter++;
        }
        if(Updated_BY != undefined && Updated_BY  != ""){
            varupdatedbystring = "Updated_By = '" + Updated_BY + "'";
            StringArray.push(varupdatedbystring);
            counter++;
        }
        if(Updated_date != undefined && Updated_date != ""){
            varupdateddatestring = "Updated_Date = '" + Updated_date + "'";
            StringArray.push(varupdateddatestring);
            counter++;
        }
        // if the array is empty let the user know else build the query
        // this is the ultimate SELECT * query builder
        switch(counter){
            case 0: console.log("No attributes entered, returning all Objects");
            query = "SELECT * FROM dbo.Object;";
            break;
            case 1: console.log("1 attribute entered, searching for " + StringArray[0]);
            query = "SELECT * FROM dbo.Object WHERE " + StringArray[0] + ";";
            break;
            case 2: console.log("2 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1]);
            query = "SELECT * FROM dbo.Object WHERE " + StringArray[0] + " AND " + StringArray[1] + ";";
            break;
            case 3: console.log("3 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2]);
            query = "SELECT * FROM dbo.Object WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + ";";
            break;
            case 4: console.log("4 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3]);
            query = "SELECT * FROM dbo.Object WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + ";";
            break;
            case 5: console.log("5 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4]);
            query = "SELECT * FROM dbo.Object WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + ";";
            break;
            case 6: console.log("6 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5]);
            query = "SELECT * FROM dbo.Object WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + ";";
            break;
            case 7: console.log("7 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6]);
            query = "SELECT * FROM dbo.Object WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + ";";
            break;
            case 8: console.log("8 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7]);
            query = "SELECT * FROM dbo.Object WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + ";";
            break;

        }

       req.query(query).then(function(recordset) {
        console.log("New admin user entry will be viewed in the database.");
        
        if(recordset.recordsets.length > 0) {
            console.log("Found " + recordset.recordsets.length + " records");
            console.log(recordset);
            const resultArray = recordset.recordsets[0];     
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(JSON.stringify(resultArray));
            response.end(); 
        } 
        else {
            console.log("No records found")
            response.write("No records found");
        }
    }).catch(function(err) {
        console.error("error");
        console.log(err);
    });

}
catch(err){
    console.log(err);
    response.write("Error");
}})};



function DeleteObjects(response, postData) {

    sql.connect(config).then(function () {
        var req = new sql.Request();

        var querystring = require('querystring');
        var data = querystring.parse(postData);
        var ObjectsDelete = data.deleteObjectID;
        var query = "DELETE FROM dbo.Object WHERE Object_ID = '" + ObjectsDelete + "';";
        console.log(query);
        req.query(query).then(function(recordset) {
            console.log("a tuple in the Object table will be deleted from the database.");
            response.write("Object deleted");
            response.end();}
        )
        })};

function UpdateObjects(response, postData){


    sql.connect(config).then(function () {
        var req = new sql.Request();

        var querystring = require('querystring');
        var data = querystring.parse(postData);


        var ObjectIDstring = data.Object_ID;
        var Object_Name = data.Object_Name;   
        var ObjectDollar_Value = data.Dollar_Value;
        var Object_num_of_items = data.Num_of_Copies;
        
      
        

        console.log("Serial_No: " + ObjectIDstring );
        console.log("Object_Name: " + Object_Name);
        console.log("Dollar_Value: " + ObjectDollar_Value);
        console.log("Number of items: " + Object_num_of_items);

      



        var query = "UPDATE dbo.Object SET Object_Name = '" + Object_Name + "', Dollar_Value = '" + ObjectDollar_Value  + "', Num_Of_Copies = '" + Object_num_of_items  + "' WHERE Object_ID = '" + ObjectIDstring + "';";
        var secondquery = "UPDATE dbo.Object SET Object_ID = '" + ObjectIDstring  + "' WHERE Object_Name = '" + Object_Name + "' AND Dollar_Value = '" + ObjectDollar_Value + "' AND Num_Of_Copies = '" + Object_num_of_items + "';";

        req.query(query).then(function(recordset) {
            console.log("First query executed");
            req.query(secondquery).then(function(recordset) {
            response.write("Object Modified");
            response.end();}
        )});



    })}




// Media #####################################################################


function SearchMedia(response, postData){

    sql.connect(config).then(function () {
        var req = new sql.Request();
try{
        var querystring = require('querystring');
        var params = querystring.parse(postData);

        // "Media_ID","Media_Name","Dollar_Value","Num_of_Copies","Author","Media_Type","Total_Num_of_Copies","Publisher_Name"

        var MediaName = params['MediaNameInput'];
        var MediaID = params['MediaID'];
        var dollarvalue = params['dollarValue'];
        var numOfCopies = params['numOfCopies'];
        var MaxNumOfCopies = params['TotalNumOfCopies'];
        var author = params['author']
        var Created_BY = params['createdBy'];
        var Created_date = params['createdDate'];
        var Updated_BY = params['updatedBy'];
        var Updated_date = params['lastUpdated'];



        // string query to hold the SQL query
        var query = null;
        // counter for the # of attributes
        var counter = 0;
        // array to hold the attributes
        let StringArray = [];

        // if the attribute is not empty, add it to the array

        if(MediaName != undefined && MediaName != ""){
            var Electronicstring = "Media_Name = '" + MediaName + "'";
            StringArray.push(Electronicstring);
            counter++;
        }
        if(dollarvalue != undefined && dollarvalue != ""){
            vardollarstring = "Dollar_Value = " + dollarvalue;
            StringArray.push(vardollarstring);
            counter++;
        }
        if(MediaID != undefined && MediaID != ""){
            var ObjectIDstring = "Media_ID = " + MediaID;
            StringArray.push(ObjectIDstring);
            counter++;
        }
        if(numOfCopies != undefined && numOfCopies != ""){
            varnumOfCopiesstring = "Number_Of_Copies = " + numOfCopies;
            StringArray.push(varnumOfCopiesstring);
            counter++;
        }
        if(MaxNumOfCopies != undefined && MaxNumOfCopies != ""){
            varMaxNumOfCopiesstring = "Total_Num_Of_Copies = " + MaxNumOfCopies;
            StringArray.push(varMaxNumOfCopiesstring);
            counter++;
        }
        if(author != undefined && author != ""){
            varauthorstring = "Author = '" + author + "'";
            StringArray.push(varauthorstring);
            counter++;
        }
        if(Created_BY != undefined && Created_BY != ""){
            varcreatedbystring = "Created_By = '" + Created_BY + "'";
            StringArray.push(varcreatedbystring);
            counter++;
        }
        if(Created_date != undefined && Created_date != ""){
            varcreateddatestring = "Created_Date = '" + Created_date + "'";
            StringArray.push(varcreateddatestring);
            counter++;
        }
        if(Updated_BY != undefined && Updated_BY  != ""){
            varupdatedbystring = "Updated_By = '" + Updated_BY + "'";
            StringArray.push(varupdatedbystring);
            counter++;
        }
        if(Updated_date != undefined && Updated_date != ""){
            varupdateddatestring = "Updated_Date = '" + Updated_date + "'";
            StringArray.push(varupdateddatestring);
            counter++;
        }
        // if the array is empty let the user know else build the query
        // this is the ultimate SELECT * query builder
        switch(counter){
            case 0: console.log("No attributes entered, returning all media");
            query = "SELECT * FROM dbo.media;";
            break;
            case 1: console.log("1 attribute entered, searching for " + StringArray[0]);
            query = "SELECT * FROM dbo.media WHERE " + StringArray[0] + ";";
            break;
            case 2: console.log("2 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1]);
            query = "SELECT * FROM dbo.media WHERE " + StringArray[0] + " AND " + StringArray[1] + ";";
            break;
            case 3: console.log("3 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2]);
            query = "SELECT * FROM dbo.media WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + ";";
            break;
            case 4: console.log("4 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3]);
            query = "SELECT * FROM dbo.media WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + ";";
            break;
            case 5: console.log("5 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4]);
            query = "SELECT * FROM dbo.media WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + ";";
            break;
            case 6: console.log("6 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5]);
            query = "SELECT * FROM dbo.media WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + ";";
            break;
            case 7: console.log("7 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6]);
            query = "SELECT * FROM dbo.media WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + ";";
            break;
            case 8: console.log("8 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7]);
            query = "SELECT * FROM dbo.media WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + ";";
            break;

        }

       req.query(query).then(function(recordset) {
        console.log("New admin user entry will be viewed in the database.");
        
        if(recordset.recordsets.length > 0) {
            console.log("Found " + recordset.recordsets.length + " records");
            console.log(recordset);
            const resultArray = recordset.recordsets[0];     
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(JSON.stringify(resultArray));
            response.end(); 
        } 
        else {
            console.log("No records found")
            response.write("No records found");
        }
    }).catch(function(err) {
        console.error("error");
        console.log(err);
    });

}
catch(err){
    console.log(err);
    response.write("Error");
}})};



function DeleteMedia(response, postData) {

    sql.connect(config).then(function () {
        var req = new sql.Request();

        var querystring = require('querystring');
        var data = querystring.parse(postData);
        var MediaDelete = data.deleteMediaID;
        var query = "DELETE FROM dbo.media WHERE Media_ID = '" + MediaDelete + "';";
        console.log(query);
        req.query(query).then(function(recordset) {
            console.log("a tuple in the Object table will be deleted from the database.");
            response.write("Object deleted");
            response.end();}
        )
        })};

function UpdateMedia(response, postData){


    sql.connect(config).then(function () {
        var req = new sql.Request();

        var querystring = require('querystring');
        var data = querystring.parse(postData);


        var MediaIDstring = data.Media_ID;
        var Media_Name = data.Media_Name;   
        var MediaDollar_Value = data.Dollar_Value;
        var Media_num_of_items = data.Num_of_Copies;
        var Media_Type = data.Media_Type;
        var Media_author = data.Media_author;
        var TotalNumOfCopies = data.Total_Num_of_Copies;
        var PublisherName = data.Publisher_Name;
        

        console.log(MediaIDstring);
        console.log(Media_Name);
        console.log(MediaDollar_Value);
        console.log(Media_num_of_items);
        console.log(Media_Type);
        console.log(Media_author);
        console.log(TotalNumOfCopies);
        console.log(PublisherName);



        var query = "UPDATE dbo.media SET Media_Name = '" + Media_Name + "', Dollar_Value = '" + MediaDollar_Value  + "', Num_Of_Copies = '" + Media_num_of_items  + "', Media_Type = '" + Media_Type  + "', Author = '" + Media_author  + "', Total_Num_of_Copies = '" + TotalNumOfCopies  + "', Publisher_Name = '" + PublisherName  + "' WHERE Media_ID = '" + MediaIDstring + "';";
        var secondquery = "UPDATE dbo.media SET Media_ID = '" + MediaIDstring  + "' WHERE Media_Name = '" + Media_Name + "' AND Dollar_Value = '" + MediaDollar_Value + "' AND Num_Of_Copies = '" + Media_num_of_items + "';";


        req.query(query).then(function(recordset) {
            console.log("First query executed");
            req.query(secondquery).then(function(recordset) {
            response.write("Object Modified");
            response.end();}
        )});



    })}






























// Exports ####################################################################################################################
exports.SearchElectronics = SearchElectronics;
exports.DeleteElectronics = DeleteElectronics;
exports.UpdateElectronics = UpdateElectronics;
exports.SearchObjects = SearchObjects;
exports.DeleteObjects = DeleteObjects;
exports.UpdateObjects = UpdateObjects;
exports.SearchMedia = SearchMedia;
exports.DeleteMedia = DeleteMedia;
exports.UpdateMedia = UpdateMedia;