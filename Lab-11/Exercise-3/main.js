const events = require('events');

const eventEmitter = new events.EventEmitter();

eventEmitter.on('greet', function(name) {
    console.log('Hello, ' + name + '! Welcome to Node.js events.');
});

eventEmitter.on('greet', function(name) {
    console.log('Listener 2: Nice to meet you, ' + name + '!');
});

eventEmitter.on('dataReceived', function(data) {
    console.log('Data received event triggered!');
    console.log('Received data:', data);
});

eventEmitter.on('error', function(message) {
    console.log('Error event triggered:', message);
});

console.log('--- Triggering greet event ---');
eventEmitter.emit('greet', 'John');

console.log('\n--- Triggering dataReceived event ---');
eventEmitter.emit('dataReceived', { id: 1, value: 'Sample Data' });

console.log('\n--- Triggering error event ---');
eventEmitter.emit('error', 'Something went wrong!');

console.log('\n--- Triggering greet event again ---');
eventEmitter.emit('greet', 'Alice');