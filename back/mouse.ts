import * as readline from "node:readline";
import { mouse, left, right, up, down, Point } from "@nut-tree/nut-js";

export const mouseMove = async (options: {
  action: string;
  px: number;
}): Promise<void> => {
  const action = options.action;
  const px = options.px;

  readline.emitKeypressEvents(process.stdin);
  switch (action) {
    case "mouse_up":
      await mouse.move(up(px));
      await mouse.move(right(2));
      break;
    case "mouse_right":
      await mouse.move(right(px));
      await mouse.move(down(2));
      break;
    case "mouse_down":
      await mouse.move(down(px));
      await mouse.move(right(2));
      break;
    case "mouse_left":
      await mouse.move(left(px));
      await mouse.move(down(2));
      break;
    default:
      break;
  }

  process.stdin.resume();
};

export const mousePosition = async (): Promise<Point> => {
  return await mouse.getPosition();
};
