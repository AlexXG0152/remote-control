import { httpServer } from "./src/http_server/index";
import { WebSocketServer } from "ws";
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

    switch (options.action) {
      case "mouse_up":
        sendMessage(ws, data);
        mouseMove(options);
        break;

      case "mouse_right":
        sendMessage(ws, data);
        mouseMove(options);
        break;

      case "mouse_down":
        sendMessage(ws, data);
        mouseMove(options);
        break;

      case "mouse_left":
        sendMessage(ws, data);
        mouseMove(options);
        break;

      case "mouse_position":
        const x = (await mousePosition(data)).x;
        const y = (await mousePosition(data)).y;
        console.log(x, y);
        ws.send(JSON.stringify({ x, y }));
        break;

      case "draw_circle":
        await moveMouseToTarget(5, 476);
        await buttonClick();
        await goToPageEnd();
        await moveMouseToTarget(755, 476);
        await drawCircle();
        break;

      case "draw_square":
        await moveMouseToTarget(5, 476);
        await buttonClick();
        await goToPageEnd();
        await moveMouseToTarget(55, 476);
        await drawSquare(options.px);
        break;

      case "draw_rectangle":
        await moveMouseToTarget(5, 476);
        await buttonClick();
        await goToPageEnd();
        await moveMouseToTarget(355, 476);
        await drawRectangle(
          Number(data.toString().split(" ").at(-1)),
          Number(data.toString().split(" ").at(-2))
        );
        break;

      default:
        break;
    }

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
