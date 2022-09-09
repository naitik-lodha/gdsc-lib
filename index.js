const { response } = require('express');
const express=require('express')
const app=express();
const { MongoClient } = require('mongodb');
const nodemon = require('nodemon');


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

 

//Default page
app.get('/',(req,res)=>{
   
    res.send("Hello,Welcome to our Library please insert a route on search bar")

});
//Books page(List of all books)
app.get('/books',(req,res)=>{
 
    res.send(temp)

});
//Finding a book by isbn
app.get('/books/isbn/:isbn',(req,res)=>{

    const book=temp.find(c => c.isbn == parseInt(req.params.isbn));
    if (!book) res.status(404).send("The book of ISBN " +req.params.isbn+" is not available")
     res.send(book)   
    
})
//Showing all books available for issuing
app.get('/books/available',(req,res)=>{
    
    const book=temp.find(c => c.issued=="null");
    if(!book) res.status(404).send("Sorry we do not have any book available")
    res.send(book)

})
//Showing books already issued
app.get('/books/issued',(req,res)=>{

    const book=temp.find(c => c.issued=="null");
    if(!book) res.status(404).send("Sorry we do not have any book available")
    res.send(book)
    
})
//Finding books by title
app.get('/books/title/:title',(req,res)=>{
   
    const book=temp.find(c => c.title==req.params.title);
    if(!book) res.status(404).send("Sorry we do not have any book by the name  "+req.params.title )
    res.send(book)

})
//Finding books by author name
app.get('/books/author/:author',(req,res)=>{
   
    const book=temp.find(c => c.author==req.params.author);
    if(!book) res.status(404).send("Sorry we do not have any book written by "+req.params.author )
    res.send(book)

})
//Connecting to another collection for fetching members data
async function mains()
{
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('members');
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    temp2=findResult
   
}
mains() 
 .then(console.log)
.catch(console.error)
.finally(() => client.close());

//Showing all the members in the database
app.get('/members',(req,res)=>{
    
  res.send(temp2)

})
//Finding members by their unique ID
app.get('/members/:uid',(req,res)=>{

    const member=temp2.find(c=>c.uid == req.params.uid);
    if(!member)res.status(404).send("Sorry not available")
    res.send(member)

})
//Finding the books issued by a member
app.get('/members/issued/:name',(req,res)=>{
    if(req.params.name!="null")
    {
        const book=temp.find(c=>c.issued==req.params.name);
        if(!book)res.status(404).send("Sorry no books issued by  "+req.params.name)
        res.send(req.params.name+" issued "+book.title+ " by "+book.author+" (ISBN : "+book.isbn+")")
    
    }
    else
    {
        res.send("Error,kindly enter member's name")
    }

})
//Finding member details by name
app.get('/members/name/:name',(req,res)=>{
    if(req.params.name!="null")
    {
        const member= temp2.find(c=>c.name== req.params.name)
        if(!member)res.status(404).send("Sorry member not available")
        res.send(member)
    }
    else
    {
        res.send("Error,kindly enter member's name")
    }
    

})
//Finding member details by number
app.get('/members/number/:number',(req,res)=>{

    const member= temp2.find(c=>c.number == req.params.number)
    if(!member)res.status(404).send("Sorry member not available try adding +91")
    res.send(member)

})



const port=process.env.PORT || 3000
app.listen(port,()=>console.log(`Listening on port  ${port}.. `));