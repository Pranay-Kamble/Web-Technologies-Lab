const express  = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
mongoose.connect('mongodb://localhost:27017/studentdb')
    .then(function() {
        console.log('Connected to MongoDB successfully!');
    })
    .catch(function(err) {
        console.log('MongoDB connection error:', err.message);
    });

const studentSchema = new mongoose.Schema({
    name:   { type: String,  required: true },
    email:  { type: String,  required: true },
    age:    { type: Number,  required: true },
    course: { type: String,  required: true }
});

const Student = mongoose.model('Student', studentSchema);

app.post('/students', async function(req, res) {
    try {
        const student = new Student({
            name:   req.body.name,
            email:  req.body.email,
            age:    req.body.age,
            course: req.body.course
        });

        const savedStudent = await student.save();
        res.status(201).json({ message: 'Student created!', student: savedStudent });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/students', async function(req, res) {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/students/:id', async function(req, res) {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/students/:id', async function(req, res) {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ message: 'Student updated!', student: updatedStudent });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/students/:id', async function(req, res) {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);

        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ message: 'Student deleted successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, function() {
    console.log('Server running on http://localhost:3000');
    console.log('');
    console.log('Available endpoints:');
    console.log('POST   /students     - Create a new student');
    console.log('GET    /students     - Get all students');
    console.log('GET    /students/:id - Get student by ID');
    console.log('PUT    /students/:id - Update student by ID');
    console.log('DELETE /students/:id - Delete student by ID');
});