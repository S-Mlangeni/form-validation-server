// Our express server

const express = require("express");
const cors = require("cors");
const dbController = require("./database") // "database" file in current/same directory/folder

const express_app = express();

express_app.listen(process.env.PORT || 3000); /* Port number used on the cloud server */


/* express_app.set("view engine", "ejs"); *//* Sets the ejs view-engines/files as the 
app's view-engine instead of static/plain-html files. */
/* express_app.set("views", "ourviews") *//* Sets the "ourviews" folder as the app's views folder
*/

/*express_app.use(express.static("publicfiles")); *//* Middleware that uses the express package/
module to load static files (i.e. css files, image files, etc.) from the specified folder
to the server which can then be accessed by the server's associated files (i.e. ejs files). */
/*express_app.use(express.urlencoded({ extended: true })); *//* Middleware function that connects the url data 
(html data from ejs files) to the request object on the server file. */
express_app.use(cors()); /* Middleware that activates the "cors" function to allow the client-side
.js file to access the server side. Otherwise, file will be denied access to the server side
by the browser. */ 
express_app.use(express.json()); /* Middleware to help server read the posted/incomming data 
in json format. Otherwise, requested data will result in an "undefined" result. */

express_app.get("/", (request, response) => {
    /*res.render("index"); *//* The "render()" method is used to send the specified ejs view to 
    the browser/client-side. */
    /*response.sendFile("client/index.html", {root: __dirname}); *//* (file path and name, with respect 
    to the specified directory (the "NodeJs Tutorial"/(project root) directory in this case)). 
    {root: __dirname}" refers to the current directory used the by the project (i.e 
    NODEJS TUTORIAL). */
    response.send("<h1>hello</h1>");
})

express_app.post("/registration-API", dbController.db_entry /*(req, res) => {
    console.log("client message is: " + req.body.myname);
    console.log("Server route is activated!");
    res.send({servermessage: "Got your post.", mymessage: req.body.myname, MyUserName: 
    "Ben", MyPassword: 10});
} */ )

express_app.post("/login-API", dbController.db)

express_app.get("/registration", (req, res) => {
    res.render("registration");
})

express_app.use((req, res) => { /* Responses to a request that has missed the abovementioned 
    requests (i.e. it acts as the default response to an unknown/unrecognized resquest).
    Note that the server only returns a single response to the browser/client-side. */
    res.status(404).send("<h1>Error!</h1> <p>Page is not found.</p>"); /* "404" is the actual
    error status seen in the browser */
})

express_app.post("/registration", (req, res) => {
    res.render("registration");
})

console.log("Our server is running")