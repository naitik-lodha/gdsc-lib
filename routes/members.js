const { MongoClient } = require("mongodb");
var express = require("express");
const router = express.Router();

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "library";
var temp = "",
  temp2 = "";

//Connecting to another collection for fetching members data
async function mains() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("members");
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);
  temp2 = findResult;
}
mains()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

router.get("/", (req, res) => {
  res.send(temp2);
});

//Finding members by UID
router.get("/:uid", (req, res) => {
  const member = temp2.find((c) => c.uid == req.params.uid);
  if (!member) res.status(404).send("Sorry not available");
  res.send(member);
});
//Finding the books issued by a member
router.get("/issued/:name", (req, res) => {
  if (req.params.name != "null") {
    const book = temp.find((c) => c.issued == req.params.name);
    if (!book)
      res.status(404).send("Sorry no books issued by  " + req.params.name);
    res.send(
      req.params.name +
        " issued " +
        book.title +
        " by " +
        book.author +
        " (ISBN : " +
        book.isbn +
        ")"
    );
  } else {
    res.send("Error,kindly enter member's name");
  }
});
//Finding member details by name
router.get("/name/:name", (req, res) => {
  if (req.params.name != "null") {
    const member = temp2.find((c) => c.name == req.params.name);
    if (!member) res.status(404).send("Sorry member not available");
    res.send(member);
  } else {
    res.send("Error,kindly enter member's name");
  }
});
//Finding member details by number
router.get("/number/:number", (req, res) => {
  const member = temp2.find((c) => c.number == req.params.number);
  if (!member)
    res.status(404).send("Sorry member not available try adding +91");
  res.send(member);
});

module.exports = router;
