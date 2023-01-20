import stream from "stream";
import { Point } from "@nut-tree/nut-js";
import { drawSquare, drawRectangle, drawCircle } from "./drawing";
import { IOptions } from "./interfaces.interface";
import { sendMessage } from "./messages";
import { mouseMove, mousePosition } from "./mouse";
import { takeScreeenshot } from "./screenshot";

export const dispatcher = async (
  stream: stream.Duplex,
  streamForScreenshots: stream.Duplex,
  data: string | ArrayBuffer | Buffer[] | Point,
  options: IOptions
): Promise<void> => {
  switch (options.action) {
    case "mouse_up":
      sendMessage(stream, `${options.action}_${options.px}`);
      mouseMove(options);
      break;

    case "mouse_right":
      sendMessage(stream, `${options.action}_${options.px}`);
      mouseMove(options);
      break;

    case "mouse_down":
      sendMessage(stream, `${options.action}_${options.px}`);
      mouseMove(options);
      break;

    case "mouse_left":
      sendMessage(stream, `${options.action}_${options.px}`);
      mouseMove(options);
      break;

    case "mouse_position":
      const x = (await mousePosition()).x;
      const y = (await mousePosition()).y;
      sendMessage(stream, `mouse_position ${x},${y}`);
      break;

    case "draw_square":
      sendMessage(stream, `${options.action}_${options.px}`);
      await drawSquare(options.px);
      break;

    case "draw_rectangle":
      sendMessage(stream, `${options.action}_${options.px}`);
      await drawRectangle(data as string);
      break;

    case "draw_circle":
      sendMessage(stream, `${options.action}_${options.px}`);
      await drawCircle(data as string);
      break;

    case "prnt_scrn":
      const screen = await takeScreeenshot();
      const b64 = screen.toString("base64");
      sendMessage(streamForScreenshots, `prnt_scrn ${b64}`);
      break;

    default:
      break;
  }
};
