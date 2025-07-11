import http from 'http';
import {WebSocketServer} from "ws";

const messages = [];

const server = http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Server is running')
})

const wss = new WebSocketServer({server});

wss.on('connection', (ws) => {
	console.log("The new client has connected");
	messages.forEach(message => {
		ws.send(message.toString());
	})
	ws.on('message', message => {
		console.log('Received:', message);
		messages.push(message);
		wss.clients.forEach(client => {
			if (client !== ws && client.readyState === ws.OPEN) {
				client.send(message.toString());
			}
		})
	})
	ws.on('close', () => {
		console.log('Client disconnected');
	})
	ws.on('error', () => {
		console.log('Client error');
	})
});

const PORT = 3001;
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
})