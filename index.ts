import internal from "node:stream";
import { WebSocketServer, createWebSocketStream } from "ws";
import { httpServer } from "./src/http_server/index";
import { dispatcher } from "./back/dispatcher";
import { IOptions } from "./back/interfaces.interface";

const HTTP_PORT = 8180;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ host: "localhost", port: 8080 });

wss.on("connection", (ws) => {
  const options: internal.DuplexOptions | undefined = {
    encoding: "utf8",
    decodeStrings: false,
    readableObjectMode: true,
    writableObjectMode: true,
  };
  const stream = createWebSocketStream(ws, options);
  const streamForScreenshots = createWebSocketStream(ws, options);

  stream.pipe(process.stdout);
  streamForScreenshots.pipe(process.stdout);
  process.stdin.pipe(stream);

  console.log("Client connected");

  stream.write([`HOST:${wss.options.host}`].toString());
  stream.write([`PORT:${wss.options.port}`].toString());

  stream.on("data", async (data): Promise<void> => {
    const options: IOptions = {
      action: data.toString().split(" ")[0],
      px: Number(data.toString().split(" ").at(-1)),
    };

    await dispatcher(stream, streamForScreenshots, data, options);
  });

  stream.on("close", () => {
    console.log("Client disconnected");
    process.exit();
  });

  stream.on("error", () => {
    console.log("Some Error occurred"); 
  });
});

wss.on("close", () => {});
