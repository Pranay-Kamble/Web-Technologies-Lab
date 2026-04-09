const express = require('express');
const app = express();
app.use(express.json());

let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob',   email: 'bob@example.com' }
];

let nextId = 3;

app.get('/', function(req, res) {
    let output = "Available endpoints:<br>GET /users - Get all users<br>GET /users/:id - Get user by ID<br>POST /users - Create new user<br>PUT /users/:id - Update user by ID<br>DELETE /users/:id - Delete user by ID";
    res.send(output);
})

app.get('/users', function(req, res) {
    res.json(users);
});

app.get('/users/:id', function(req, res) {
    const id = parseInt(req.params.id);
    const user = users.find(function(u) { return u.id === id; });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
});

app.post('/users', function(req, res) {
    const newUser = {
        id: nextId,
        name: req.body.name,
        email: req.body.email
    };

    nextId++;
    users.push(newUser);

    res.status(201).json({ message: 'User created successfully', user: newUser });
});

app.put('/users/:id', function(req, res) {
    const id = parseInt(req.params.id);
    const user = users.find(function(u) { return u.id === id; });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.name  = req.body.name  || user.name;
    user.email = req.body.email || user.email;

    res.json({ message: 'User updated successfully', user: user });
});

app.delete('/users/:id', function(req, res) {
    const id = parseInt(req.params.id);
    const index = users.findIndex(function(u) { return u.id === id; });

    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users.splice(index, 1);

    res.json({ message: 'User deleted successfully' });
});

app.listen(3000, function() {
    console.log('Server running on http://localhost:3000');
    console.log('');
    console.log('Available endpoints:');
    console.log('GET /users - Get all users');
    console.log('GET /users/:id - Get user by ID');
    console.log('POST /users - Create new user');
    console.log('PUT /users/:id - Update user by ID');
    console.log('DELETE /users/:id - Delete user by ID');
});