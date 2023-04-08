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


// Transactions ####################################################################################################################



function SearchTransactions(response, postData){

    sql.connect(config).then(function () {
        var req = new sql.Request();
try{
        var querystring = require('querystring');
        var params = querystring.parse(postData);
        var RecieptNumber = params['RecieptNumber'];
        var ReturnDueDate = params['ReturnDueDate'];
        var ActiveVoidStatus = params['AVStatus'];
        var ReturnedItemsActualReturnDate = params['ActualReturnDate'];
        var LateFees = params['LateFees'];
        var DamageFees = params['DamageFees'];
        var StudentID = params['StudentID'];
        var FacultyID = params['FacultyID'];
        var GuestID = params['GuestID'];
        var BookISBN = params['BookISBN'];
        var ElectronicsID = params['ElectronicsID'];
        var MediaID = params['MediaID'];
        var ObjectID = params['ObjectID'];
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





        if(RecieptNumber != undefined && RecieptNumber != ""){
            var bookstring = "Reciept_num = '" + RecieptNumber + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(ReturnDueDate != undefined && ReturnDueDate != ""){
            var bookstring = "Return_Due_Date = '" + ReturnDueDate + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(ActiveVoidStatus != undefined && ActiveVoidStatus != ""){
            var bookstring = "Active_Void_Status = '" + ActiveVoidStatus + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(ReturnedItemsActualReturnDate != undefined && ReturnedItemsActualReturnDate != ""){
            var bookstring = "Actual_return_Date = '" + ReturnedItemsActualReturnDate + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(LateFees != undefined && LateFees != ""){
            var bookstring = "Late_Fees = '" + LateFees + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(DamageFees != undefined && DamageFees != ""){
            var bookstring = "Damage_Fees = '" + DamageFees + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(StudentID != undefined && StudentID != ""){
            var bookstring = "Student_ID = '" + StudentID + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(FacultyID != undefined && FacultyID != ""){
            var bookstring = "Faculty_ID = '" + FacultyID + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(GuestID != undefined && GuestID != ""){
            var bookstring = "Guest_ID = '" + GuestID + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(BookISBN != undefined && BookISBN != ""){
            var bookstring = "Book_ID = '" + BookISBN + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(ElectronicsID != undefined && ElectronicsID != ""){
            var bookstring = "Electronics_ID = '" + ElectronicsID + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(MediaID != undefined && MediaID != ""){
            var bookstring = "Media_ID = '" + MediaID + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(ObjectID != undefined && ObjectID != ""){
            var bookstring = "Object_ID = '" + ObjectID + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(Created_BY != undefined && Created_BY != ""){
            var bookstring = "Created_By = '" + Created_BY + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(Created_date != undefined && Created_date != ""){
            var bookstring = "Created_Date = '" + Created_date + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(Updated_BY != undefined && Updated_BY != ""){
            var bookstring = "Updated_By = '" + Updated_BY + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(Updated_date != undefined && Updated_date != ""){
            var bookstring = "Last_Updated = '" + Updated_date + "'";
            StringArray.push(bookstring);
            counter++;
        }

        // if the array is empty let the user know else build the query
        // this is the ultimate SELECT * query builder
        switch(counter){
            case 0: console.log("No attributes entered, returning all Transactions");
            query = "SELECT * FROM dbo.Transactions;";
            break;
            case 1: console.log("1 attribute entered, searching for " + StringArray[0]);
            query = "SELECT * FROM dbo.Transactions WHERE " + StringArray[0] + ";";
            break;
            case 2: console.log("2 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1]);
            query = "SELECT * FROM dbo.Transactions WHERE " + StringArray[0] + " AND " + StringArray[1] + ";";
            break;
            case 3: console.log("3 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2]);
            query = "SELECT * FROM dbo.Transactions WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + ";";
            break;
            case 4: console.log("4 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3]);
            query = "SELECT * FROM dbo.Transactions WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + ";";
            break;
            case 5: console.log("5 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4]);
            query = "SELECT * FROM dbo.Transactions WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + ";";
            break;
            case 6: console.log("6 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5]);
            query = "SELECT * FROM dbo.Transactions WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + ";";
            break;
            case 7: console.log("7 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6]);
            query = "SELECT * FROM dbo.Transactions WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + ";";
            break;
            case 8: console.log("8 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7]);
            query = "SELECT * FROM dbo.Transactions WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + ";";
            break;
            case 9: console.log("9 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8]);
            query = "SELECT * FROM dbo.Transactions WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + ";";
            break;
            case 10: console.log("10 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9]);
            query = "SELECT * FROM dbo.Transactions WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + ";";
            break;
            case 11: console.log("11 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10]);
            query = "SELECT * FROM dbo.Transactions WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + ";";
            break;
            case 12: console.log("12 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11]);
            query = "SELECT * FROM dbo.Transactions WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + ";";
            break;
            case 13: console.log("13 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12]);
            query = "SELECT * FROM dbo.Transactions WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12] + ";";
            break;
            case 14: console.log("14 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12] + " AND " + StringArray[13]);
            query = "SELECT * FROM dbo.Transactions WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12] + " AND " + StringArray[13] + ";";
            break;
            case 15: console.log("15 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12] + " AND " + StringArray[13] + " AND " + StringArray[14]);
            query = "SELECT * FROM dbo.Transactions WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12] + " AND " + StringArray[13] + " AND " + StringArray[14] + ";";
            break;
            case 16: console.log("16 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12] + " AND " + StringArray[13] + " AND " + StringArray[14] + " AND " + StringArray[15]);
            query = "SELECT * FROM dbo.Transactions WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12] + " AND " + StringArray[13] + " AND " + StringArray[14] + " AND " + StringArray[15] + ";";
            break;
            case 17: console.log("17 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12] + " AND " + StringArray[13] + " AND " + StringArray[14] + " AND " + StringArray[15] + " AND " + StringArray[16]);
            query = "SELECT * FROM dbo.Transactions WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12] + " AND " + StringArray[13] + " AND " + StringArray[14] + " AND " + StringArray[15] + " AND " + StringArray[16] + ";";
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
    
function DeleteTransactions(response, postData) {

    sql.connect(config).then(function () {
        var req = new sql.Request();

        var querystring = require('querystring');
        var data = querystring.parse(postData);
        var TransactionsR = data.deleteTransactionsReciept;
        var query = "DELETE FROM dbo.Transactions WHERE ISBN = '" +  TransactionsR + "';";
        console.log(query);
        req.query(query).then(function(recordset) {
            console.log("a tuple in the Transactions table will be deleted from the database.");
            response.write("Transactions deleted");
            response.end();}
        )
        })};

function UpdateTransactions(response, postData){


    sql.connect(config).then(function () {
        var req = new sql.Request();

        var querystring = require('querystring');
        var data = querystring.parse(postData);


        var TransactionsR = data.Reciept_num;
        var TransactionsRD = data.Return_Due_Date;
        var TransactionsAVS = data.Active_Void_Status;
        var TransactionsARD = data.Actual_return_Date;
        var TransactionsLF = data.Late_Fees;
        var TransactionsDF = data.Damage_Fees;
        var TransactionsSID = data.Student_ID;
        var TransactionsFID = data.Faculty_ID;
        var TransactionsGID = data.Guest_ID;
        var TransactionsBID = data.Book_ID;
        var TransactionsEID = data.Electronics_ID;
        var TransactionsMID = data.Media_ID;
        var TransactionsOID = data.Object_ID;


        var query = "UPDATE dbo.Transactions SET Return_Due_Date = '" + TransactionsRD + "', Active_Void_Status = '" + TransactionsAVS + "', Actual_return_Date = '" + TransactionsARD + "', Late_Fees = '" + TransactionsLF + "', Damage_Fees = '" + TransactionsDF + "', Student_ID = '" + TransactionsSID + "', Faculty_ID = '" + TransactionsFID + "', Guest_ID = '" + TransactionsGID + "', Book_ID = '" + TransactionsBID + "', Electronics_ID = '" + TransactionsEID + "', Media_ID = '" + TransactionsMID + "', Object_ID = '" + TransactionsOID + "' WHERE Reciept_num = '" + TransactionsR + "';";
        var secondquery = "UPDATE dbo.Transactions SET Reciept_num = '" + TransactionsR + "' WHERE Return_Due_Date = '" + TransactionsRD + "' AND Active_Void_Status = '" + TransactionsAVS + "' AND Actual_return_Date = '" + TransactionsARD + "' AND Late_Fees = '" + TransactionsLF + "' AND Damage_Fees = '" + TransactionsDF + "' AND Student_ID = '" + TransactionsSID + "' AND Faculty_ID = '" + TransactionsFID + "' AND Guest_ID = '" + TransactionsGID + "' AND Book_ID = '" + TransactionsBID + "' AND Electronics_ID = '" + TransactionsEID + "' AND Media_ID = '" + TransactionsMID + "' AND Object_ID = '" + TransactionsOID + "';";


        req.query(query).then(function(recordset) {
            console.log("First query executed");
            req.query(secondquery).then(function(recordset) {
            response.write("Transactions Modified");
            response.end();}
        )});



    })}


// Reservations ####################################################################################################################



function SearchReservations(response, postData){

    sql.connect(config).then(function () {
        var req = new sql.Request();
try{
        var querystring = require('querystring');
        var params = querystring.parse(postData);
        var RecieptNumber = params['RecieptNumber'];
        var ReturnDueDate = params['ReturnDueDate'];
        var ActiveVoidStatus = params['AVStatus'];
        var ReturnedItemsActualReturnDate = params['ActualReturnDate'];
        var LateFees = params['LateFees'];
        var DamageFees = params['DamageFees'];
        var StudentID = params['StudentID'];
        var FacultyID = params['FacultyID'];
        var GuestID = params['GuestID'];
        var BookISBN = params['BookISBN'];
        var ElectronicsID = params['ElectronicsID'];
        var MediaID = params['MediaID'];
        var ObjectID = params['ObjectID'];
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





        if(RecieptNumber != undefined && RecieptNumber != ""){
            var bookstring = "Reciept_num = '" + RecieptNumber + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(ReturnDueDate != undefined && ReturnDueDate != ""){
            var bookstring = "Return_Due_Date = '" + ReturnDueDate + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(ActiveVoidStatus != undefined && ActiveVoidStatus != ""){
            var bookstring = "Active_Void_Status = '" + ActiveVoidStatus + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(ReturnedItemsActualReturnDate != undefined && ReturnedItemsActualReturnDate != ""){
            var bookstring = "Actual_return_Date = '" + ReturnedItemsActualReturnDate + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(LateFees != undefined && LateFees != ""){
            var bookstring = "Late_Fees = '" + LateFees + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(DamageFees != undefined && DamageFees != ""){
            var bookstring = "Damage_Fees = '" + DamageFees + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(StudentID != undefined && StudentID != ""){
            var bookstring = "Student_ID = '" + StudentID + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(FacultyID != undefined && FacultyID != ""){
            var bookstring = "Faculty_ID = '" + FacultyID + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(GuestID != undefined && GuestID != ""){
            var bookstring = "Guest_ID = '" + GuestID + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(BookISBN != undefined && BookISBN != ""){
            var bookstring = "Book_ID = '" + BookISBN + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(ElectronicsID != undefined && ElectronicsID != ""){
            var bookstring = "Electronics_ID = '" + ElectronicsID + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(MediaID != undefined && MediaID != ""){
            var bookstring = "Media_ID = '" + MediaID + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(ObjectID != undefined && ObjectID != ""){
            var bookstring = "Object_ID = '" + ObjectID + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(Created_BY != undefined && Created_BY != ""){
            var bookstring = "Created_By = '" + Created_BY + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(Created_date != undefined && Created_date != ""){
            var bookstring = "Created_Date = '" + Created_date + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(Updated_BY != undefined && Updated_BY != ""){
            var bookstring = "Updated_By = '" + Updated_BY + "'";
            StringArray.push(bookstring);
            counter++;
        }
        if(Updated_date != undefined && Updated_date != ""){
            var bookstring = "Last_Updated = '" + Updated_date + "'";
            StringArray.push(bookstring);
            counter++;
        }

        // if the array is empty let the user know else build the query
        // this is the ultimate SELECT * query builder
        switch(counter){
            case 0: console.log("No attributes entered, returning all Reservations");
            query = "SELECT * FROM dbo.Reservations;";
            break;
            case 1: console.log("1 attribute entered, searching for " + StringArray[0]);
            query = "SELECT * FROM dbo.Reservations WHERE " + StringArray[0] + ";";
            break;
            case 2: console.log("2 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1]);
            query = "SELECT * FROM dbo.Reservations WHERE " + StringArray[0] + " AND " + StringArray[1] + ";";
            break;
            case 3: console.log("3 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2]);
            query = "SELECT * FROM dbo.Reservations WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + ";";
            break;
            case 4: console.log("4 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3]);
            query = "SELECT * FROM dbo.Reservations WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + ";";
            break;
            case 5: console.log("5 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4]);
            query = "SELECT * FROM dbo.Reservations WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + ";";
            break;
            case 6: console.log("6 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5]);
            query = "SELECT * FROM dbo.Reservations WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + ";";
            break;
            case 7: console.log("7 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6]);
            query = "SELECT * FROM dbo.Reservations WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + ";";
            break;
            case 8: console.log("8 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7]);
            query = "SELECT * FROM dbo.Reservations WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + ";";
            break;
            case 9: console.log("9 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8]);
            query = "SELECT * FROM dbo.Reservations WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + ";";
            break;
            case 10: console.log("10 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9]);
            query = "SELECT * FROM dbo.Reservations WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + ";";
            break;
            case 11: console.log("11 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10]);
            query = "SELECT * FROM dbo.Reservations WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + ";";
            break;
            case 12: console.log("12 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11]);
            query = "SELECT * FROM dbo.Reservations WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + ";";
            break;
            case 13: console.log("13 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12]);
            query = "SELECT * FROM dbo.Reservations WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12] + ";";
            break;
            case 14: console.log("14 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12] + " AND " + StringArray[13]);
            query = "SELECT * FROM dbo.Reservations WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12] + " AND " + StringArray[13] + ";";
            break;
            case 15: console.log("15 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12] + " AND " + StringArray[13] + " AND " + StringArray[14]);
            query = "SELECT * FROM dbo.Reservations WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12] + " AND " + StringArray[13] + " AND " + StringArray[14] + ";";
            break;
            case 16: console.log("16 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12] + " AND " + StringArray[13] + " AND " + StringArray[14] + " AND " + StringArray[15]);
            query = "SELECT * FROM dbo.Reservations WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12] + " AND " + StringArray[13] + " AND " + StringArray[14] + " AND " + StringArray[15] + ";";
            break;
            case 17: console.log("17 attributes entered, searching for " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12] + " AND " + StringArray[13] + " AND " + StringArray[14] + " AND " + StringArray[15] + " AND " + StringArray[16]);
            query = "SELECT * FROM dbo.Reservations WHERE " + StringArray[0] + " AND " + StringArray[1] + " AND " + StringArray[2] + " AND " + StringArray[3] + " AND " + StringArray[4] + " AND " + StringArray[5] + " AND " + StringArray[6] + " AND " + StringArray[7] + " AND " + StringArray[8] + " AND " + StringArray[9] + " AND " + StringArray[10] + " AND " + StringArray[11] + " AND " + StringArray[12] + " AND " + StringArray[13] + " AND " + StringArray[14] + " AND " + StringArray[15] + " AND " + StringArray[16] + ";";
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
    
function DeleteReservations(response, postData) {

    sql.connect(config).then(function () {
        var req = new sql.Request();

        var querystring = require('querystring');
        var data = querystring.parse(postData);
        var TransactionsR = data.deleteReservationsReciept;
        var query = "DELETE FROM dbo.Reservations WHERE ISBN = '" +  TransactionsR + "';";
        console.log(query);
        req.query(query).then(function(recordset) {
            console.log("a tuple in the Reservations table will be deleted from the database.");
            response.write("Reservations deleted");
            response.end();}
        )
        })};

function UpdateReservations(response, postData){


    sql.connect(config).then(function () {
        var req = new sql.Request();

        var querystring = require('querystring');
        var data = querystring.parse(postData);


        var TransactionsR = data.Reciept_num;
        var TransactionsRD = data.Return_Due_Date;
        var TransactionsAVS = data.Active_Void_Status;
        var TransactionsARD = data.Actual_return_Date;
        var TransactionsLF = data.Late_Fees;
        var TransactionsDF = data.Damage_Fees;
        var TransactionsSID = data.Student_ID;
        var TransactionsFID = data.Faculty_ID;
        var TransactionsGID = data.Guest_ID;
        var TransactionsBID = data.Book_ID;
        var TransactionsEID = data.Electronics_ID;
        var TransactionsMID = data.Media_ID;
        var TransactionsOID = data.Object_ID;



        // var query = "UPDATE dbo.Book SET Book_Name = '" + bookName + "', Dollar_Value = '" + bookDollarValue + "', Num_of_Copies = '" + Number_of_Copies + "', Author = '" + bookAuthor + "', Genre = '" + bookGenre + "', Language = '" + bookLanguage + "', Publisher_Name = '" + bookPublisher + "' WHERE ISBN = '" + bookISBN + "';";
        // var secondquery = "UPDATE dbo.Book SET ISBN = '" + bookISBN + "' WHERE Book_Name = '" + bookName + "' AND Author = '" + bookAuthor + "' AND Genre = '" + bookGenre + "' AND Language = '" + bookLanguage + "' AND Publisher_Name = '" + bookPublisher + "' AND Dollar_Value = '" + bookDollarValue + "' AND Num_of_Copies = '" + Number_of_Copies + "';";

        var query = "UPDATE dbo.Reservations SET Return_Due_Date = '" + TransactionsRD + "', Active_Void_Status = '" + TransactionsAVS + "', Actual_return_Date = '" + TransactionsARD + "', Late_Fees = '" + TransactionsLF + "', Damage_Fees = '" + TransactionsDF + "', Student_ID = '" + TransactionsSID + "', Faculty_ID = '" + TransactionsFID + "', Guest_ID = '" + TransactionsGID + "', Book_ID = '" + TransactionsBID + "', Electronics_ID = '" + TransactionsEID + "', Media_ID = '" + TransactionsMID + "', Object_ID = '" + TransactionsOID + "' WHERE Reciept_num = '" + TransactionsR + "';";
        var secondquery = "UPDATE dbo.Reservations SET Reciept_num = '" + TransactionsR + "' WHERE Return_Due_Date = '" + TransactionsRD + "' AND Active_Void_Status = '" + TransactionsAVS + "' AND Actual_return_Date = '" + TransactionsARD + "' AND Late_Fees = '" + TransactionsLF + "' AND Damage_Fees = '" + TransactionsDF + "' AND Student_ID = '" + TransactionsSID + "' AND Faculty_ID = '" + TransactionsFID + "' AND Guest_ID = '" + TransactionsGID + "' AND Book_ID = '" + TransactionsBID + "' AND Electronics_ID = '" + TransactionsEID + "' AND Media_ID = '" + TransactionsMID + "' AND Object_ID = '" + TransactionsOID + "';";


        req.query(query).then(function(recordset) {
            console.log("First query executed");
            req.query(secondquery).then(function(recordset) {
            response.write("Reservations Modified");
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
exports.SearchTransactions = SearchTransactions;
exports.DeleteTransactions = DeleteTransactions;
exports.UpdateTransactions = UpdateTransactions;
exports.SearchReservations = SearchReservations;
exports.DeleteReservations = DeleteReservations;
exports.UpdateReservations = UpdateReservations;