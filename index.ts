import { httpServer } from "./src/http_server/index";
import { WebSocketServer } from "ws";


const HTTP_PORT = 8180;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

console.log("STARTUEM");

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("message", async (data) => {
    const options = {
      action: data.toString().split(" ")[0],
      px: Number(data.toString().split(" ").at(-1)),
    };

    console.log("received: %s", data);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
  ws.onerror = function () {
    console.log("Some Error occurred");
  };

  ws.send("something1");
});

wss.on("close", () => {});
