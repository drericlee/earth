const http = require('http');
const server = http.createServer();
server.listen(3000);
server.on('connection', (socket) => {
console.log('New Connection...');
});
server.listen(3000);

