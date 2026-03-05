const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
let booksCollection;

async function connectDB() {
    await client.connect();
    booksCollection = client.db('libraryDb').collection('books');
    console.log("Connected to MongoDB Book DB");
}
connectDB();

app.get('/books/search', async (req, res) => {
    const titleQuery = req.query.title;
    const books = await booksCollection.find({ title: { $regex: titleQuery, $options: "i" } }).toArray();
    res.json(books);
});

app.get('/books/category/:category', async (req, res) => {

    const books = await booksCollection.find({ category: { $regex: new RegExp(`^${req.params.category}$`, "i") } }).toArray();
    res.json(books);
});


app.get('/books/sort/:type', async (req, res) => {
    const type = req.params.type;
    let sortQuery = {};
    if (type === 'price') sortQuery = { price: 1 };
    if (type === 'rating') sortQuery = { rating: -1 };
    
    const books = await booksCollection.find().sort(sortQuery).toArray();
    res.json(books);
});


app.get('/books/top', async (req, res) => {
    const books = await booksCollection.find({ rating: { $gte: 4 } }).limit(5).toArray();
    res.json(books);
});

app.get('/books', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit; 
    
    const books = await booksCollection.find().skip(skip).limit(limit).toArray();
    res.json(books);
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));