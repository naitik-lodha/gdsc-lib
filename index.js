const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const booksRoute = require("./routes/books.js");
const membersRoute = require("./routes/members.js");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "library";
var temp = "",
  temp2 = "";

//Default page
app.get("/", (req, res) => {
  res.send("Hello,Welcome to our Library please insert a route on search bar");
});
//Books page(List of all books)
app.use("/books", booksRoute);

//Showing all the members in the database
app.use("/members", membersRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port  ${port}.. `));
