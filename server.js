require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // lets Express parse JSON request bodies

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let booksCollection;

async function connectDB() { //connects to mongoDB cluster
    try {
        await client.connect();
        const db = client.db("libraryApp"); //access the databse/creates if it does not exist
        booksCollection = db.collection("books"); //creates a collection called books and stores the reference to that collection
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
    }
}

// what happens when a GET request comes into server 
app.get('/books', async (req, res) => { // req holds info about the incoming request, res is the servers respond to the request 
    try {
        //.find() with no argument means find all matches, toArray() pulls results and converts into JS array  
        const books = await booksCollection.find().toArray();
        res.json(books); //respond back to the browser request with the found results as an array
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

// what happens when a POST request come into server 
app.post('/books', async (req, res) => {
    try {
        const newBook = req.body; // req.body contains the data the browser sent along the request 
        const result = await booksCollection.insertOne(newBook); // insertsa new document into the books collection. MongoDb automatically assigns a id 
        res.status(201).json(result); //201 = resource (book successfully added) created + whatever newBook is 
    } catch (err) {
        res.status(500).json({ error: "Failed to add book" });
    }
});

// DELETE a book by its MongoDB _id
app.delete('/books/:id', async (req, res) => {
    try {
        const id = req.params.id; // pulls out the id given to each document
        await booksCollection.deleteOne({ _id: new ObjectId(id) }); //mongodb stores each document as a unique ObjectID, so this line is converting id (43213) -> ObjectID(43213) for mongodb
        res.json({ message: "Book deleted" }); //sends back message which can not be used .message
    } catch (err) {
        res.status(500).json({ error: "Failed to delete book" });
    }
});

app.listen(PORT, async () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    await connectDB();
});