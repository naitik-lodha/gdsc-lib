const { MongoClient } = require('mongodb');
var express=require('express');
const router=express.Router();


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'library';
var temp="",temp2=""

//Connecting to collection for fetching books data
async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('books');

  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);
  

  temp=findResult

  return 'done.';  

}
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());


router.get('/',(req,res)=>{
    res.send(temp);
});

//Showing all books available for issuing
router.get('/available',(req,res)=>{
    
    const book=temp.find(c => c.issued=="null");
    if(!book) res.status(404).send("Sorry we do not have any book available")
    res.send(book)

});

//Showing books already issued
router.get('/issued',(req,res)=>{
    const book=temp.find(c => c.issued!="null");
    if(!book) res.status(404).send("Sorry we do not have any book available")
    res.send(book)
});

//Finding a book by isbn
router.get('isbn/:isbn',(req,res)=>{
    const book=temp.find(c => c.isbn == parseInt(req.params.isbn));
    if (!book) res.status(404).send("The book of ISBN " +req.params.isbn+" is not available")
    res.send(book)  
});

//Finding books by title
router.get('title/:title',(req,res)=>{
    const book=temp.find(c => c.title==req.params.title);
    if(!book) res.status(404).send("Sorry we do not have any book by the name  "+req.params.title )
    res.send(book)
});

//Finding books by author name
router.get('/author/:author',(req,res)=>{
   
    const book=temp.find(c => c.author==req.params.author);
    if(!book) res.status(404).send("Sorry we do not have any book written by "+req.params.author )
    res.send(book)

});









module.exports=router;