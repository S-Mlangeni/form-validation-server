const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

//Creating a mysql connection:
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
})

//Connecting with mysql db:
connection.connect((error) => { //Call-back function is used to monitor the connection to the db.
    if(error) {
        console.error(error);
    } else {
        console.log ("DB connection is successful.")
    }
})

const db_entry = (req, res) => {

    // Inserting data using sql queries:
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const entry = `INSERT INTO formdata (username, email, password) VALUES ( "${username}", "${email}", "${password}")`;
    connection.query(entry, (error) => {
        if (error) {
            console.error(error)
        } else {
            console.log("Data row is successfully added.")
        }
    })

    res.end(); /* The "end()" method properly completes the request without sending an
    actual response back to the client as this is not necessary since the registration page 
    redirects after sending the user's data */

}

const db = (req, res) => {

    // Selecting data using sql queries:
    const username = req.body.username;
    const password = req.body.password;

    const selection = `SELECT * FROM formdata WHERE password="${password}" AND username="${username}"`;
    connection.query(selection, (error, result) => {
        if (error) {
            console.log(error);
            res.send({status: "database query error!"})
        } else if (result.length == 0) {
            console.log("Data combination does not exist in database. Result is shown below.");
            console.log(result);
            res.send({outcome: false, status: "database query success, but data combination is not found."});
        } else {
            console.log("Data is successfully found in database. Result is shown below.");
            console.log(result);
            res.send({outcome: true, status: "database query success and data combination is found."});
        }

    })

}

module.exports = {
    db_entry,
    db
}