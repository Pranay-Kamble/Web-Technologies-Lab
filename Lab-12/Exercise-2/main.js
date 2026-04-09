const express = require('express');
const app = express();

app.use(express.json());
app.use(function(req, res, next) {
    console.log('--- Logger Middleware ---');
    console.log('Method    :', req.method);
    console.log('URL       :', req.url);
    console.log('Timestamp :', new Date().toLocaleString());
    next();
});

app.use(function(req, res, next) {
    console.log('--- Request Info Middleware ---');
    req.requestTime = new Date().toISOString();
    console.log('Request time attached to req:', req.requestTime);
    next();
});

function specialMiddleware(req, res, next) {
    console.log('--- Special Route Middleware ---');
    console.log('This middleware runs only for /special route');
    next();
}

app.get('/', function(req, res) {
    res.send('Home Page - Check console to see middleware logs!');
});

app.get('/about', function(req, res) {
    res.json({
        page: 'About',
        requestReceivedAt: req.requestTime
    });
});


app.get('/special', specialMiddleware, function(req, res) {
    res.json({
        page: 'Special Route',
        message: 'This route has its own middleware!'
    });
});


app.listen(3000, function() {
    console.log('Server running on http://localhost:3000');
    console.log('');
    console.log('GET /        - Home page');
    console.log('GET /about   - About page');
    console.log('GET /special - Route with extra middleware');
});