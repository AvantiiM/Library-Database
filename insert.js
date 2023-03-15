const sql = require('mssql');

async function insertAdmin(firstName, middleName, lastName, AdminID, createdBy, email) {
  try {
    // Create a new connection pool
    const pool = await sql.connect({
        user: 'daniel',
        password: 'SK1NNT3@',
        server: 'funserver.database.windows.net',
        database: 'Library Database',
      options: {
        encrypt: true // Use SSL encryption
      }
    });

    // Execute the insert query
    const result = await pool.request()
      .input('firstN', sql.NVarChar(100), firstName)
      .input('middleN', sql.NVarChar(100), middleName)
      .input('lastN', sql.NVarChar(100), lastName)
      .input('AdminID', sql.NVarChar(10), AdminID)
      .input('createdBy', sql.NVarChar(50), createdBy)
      .input('email', sql.NVarChar(100), email)
      .query(`INSERT INTO Admin (FirstN, MiddleN, LastN, Admin_ID, Faculty_ID, Creation_Date, Created_By, Updated_date, Update_By, Email) 
              VALUES (@firstN, @middleN, @lastN, @AdminID, null, GETDATE(), @createdBy, GETDATE(), @createdBy, @email)`);
    
    // Log the number of rows affected by the insert
    console.log(`Inserted ${result.rowsAffected} rows.`);

    // Close the connection pool
    await sql.close();
  } catch (err) {
    console.error('Error inserting admin:', err);
  }
}

// Example usage: insert a new admin record
insertAdmin('John', 'D', 'Doe', '123456891', null, 'laidaniel06@gmail.com');

//hi my name is daniel