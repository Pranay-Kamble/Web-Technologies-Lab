const http = require('http');
 
const PORT = 3000;

const server = http.createServer(function(request, response) {
    response.setHeader('Content-Type', 'text/html');
 
    response.write('<h1>Hello from Node.js Server!</h1>');
    response.write('<p>This is a simple web server built using the http module.</p>');
    response.write('<p>Request received at: ' + new Date() + '</p>');
 
    response.end();
});
 
server.listen(PORT, function() {
    console.log('Server is running...');
    console.log('Open your browser and go to: http://localhost:' + PORT);
});
 