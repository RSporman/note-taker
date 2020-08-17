// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality

const express = require("express");
const fs = require("fs");
const path = require('path');



// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

app.use(express.static('./public'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ROUTER
// The below points our server to a series of "route" files.


require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


// The below code effectively "starts" our server

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
