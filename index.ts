import { WebSocketServer, createWebSocketStream } from "ws";
import { httpServer } from "./src/http_server/index";
import { mouseMove, mousePosition } from "./back/mouse.js";
import { sendMessage } from "./back/messages";
import {
  drawCircle,
  goToPageEnd,
  drawRectangle,
  drawSquare,
  buttonClick,
  moveMouseToTarget,
} from "./back/drawing";
import { takeScreeenshot } from "./back/screenshot";

const HTTP_PORT = 8180;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ host: "localhost", port: 8080 });

wss.on("connection", (ws) => {
  const stream = createWebSocketStream(ws, {
    encoding: "utf8",
    decodeStrings: false,
    readableObjectMode: true,
    writableObjectMode: true,
  });

  stream.pipe(process.stdout);
  // process.stdin.pipe(stream);

  console.log("Client connected");

  stream.write([`HOST:${wss.options.host}`].toString());
  stream.write([`PORT:${wss.options.port}`].toString());

  stream.on("data", async (data) => {
    const options = {
      action: data.toString().split(" ")[0],
      px: Number(data.toString().split(" ").at(-1)),
    };

    switch (options.action) {
      case "mouse_up":
        sendMessage(stream, data);
        mouseMove(options);
        break;

      case "mouse_right":
        sendMessage(stream, data);
        mouseMove(options);
        break;

      case "mouse_down":
        sendMessage(stream, data);
        mouseMove(options);
        break;

      case "mouse_left":
        sendMessage(stream, data);
        mouseMove(options);
        break;

      case "mouse_position":
        const x = (await mousePosition(data)).x;
        const y = (await mousePosition(data)).y;
        // sendMessage(stream, { x, y });
        stream.write(JSON.stringify({ x, y }));

        break;

      case "draw_square":
        sendMessage(stream, data);
        await moveMouseToTarget(5, 476);
        await buttonClick();
        await goToPageEnd();
        await moveMouseToTarget(55, 476);
        await drawSquare(options.px);
        break;

      case "draw_rectangle":
        sendMessage(stream, data);
        await moveMouseToTarget(5, 476);
        await buttonClick();
        await goToPageEnd();
        await moveMouseToTarget(355, 476);
        await drawRectangle(
          Number(data.toString().split(" ").at(-1)),
          Number(data.toString().split(" ").at(-2))
        );
        break;

      case "draw_circle":
        sendMessage(stream, data);
        await moveMouseToTarget(5, 476);
        await buttonClick();
        await goToPageEnd();
        await moveMouseToTarget(755, 476);
        await drawCircle();
        break;

      case "prnt_scrn":
        // sendMessage(stream, data);
        const screen = await takeScreeenshot(data);
        const b64 = screen.toString("base64");
        sendMessage(stream, b64);
        break;

      default:
        break;
    }
  });

  stream.on("close", () => {
    console.log("Client disconnected");
  });

  stream.on("error", () => {
    console.log("Some Error occurred");
  });
});

wss.on("close", () => {});
