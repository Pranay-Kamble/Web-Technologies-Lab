const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
let db, notesCollection;

async function connectDB() {
    await client.connect();
    db = client.db('student_db');
    notesCollection = db.collection('notes');
    console.log("Connected to MongoDB");
}

connectDB();


app.post('/notes', async (req, res) => {
    const { title, subject, description } = req.body;
    const newNote = {
        title,
        subject,
        description,
        created_date: new Date().toISOString().split('T')[0]
    };
    await notesCollection.insertOne(newNote);
    res.status(201).json({ message: "Note added successfully" });
});


app.get('/notes', async (req, res) => {
    const notes = await notesCollection.find().toArray();
    res.json(notes);
});


app.put('/notes/:id', async (req, res) => {
    const { title, description } = req.body;
    await notesCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { title: title, description: description } }
    );
    res.json({ message: "Note updated" });
});


app.delete('/notes/:id', async (req, res) => {
    await notesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ message: "Note deleted" });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));