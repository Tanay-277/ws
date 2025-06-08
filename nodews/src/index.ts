import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
	console.log("User Connected");
	ws.on("error", console.error);

	ws.on("message", function message(data) {
		console.log("Received: %s", data);
	});

	ws.on("close", () => {
		console.log("User Disconnected");
	});
	ws.send("Hello From 8080");
});
