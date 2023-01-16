import * as readline from "node:readline";
import { mouse, left, right, up, down } from "@nut-tree/nut-js";

// (async () => {
//   await square();
//   await mouse.move(
//       straightTo(
//           centerOf(
//               new Region(100, 100, 200, 300)
//           )
//       )
//   );
// })();

export const mouseMove = async (options: { action: string; px: number }) => {
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

  //   console.log(process.stdin);

  //   mouse.move(up(y));
  // process.stdin.on("keypress", (ch, key) => {
  //   console.log('got "keypress"', ch, key);
  //   if (key && key.ctrl && key.name == "c") {
  //     console.log("ctrl+c was pressed");
  //     // do something usefull
  //   }
  // });

  // process.stdin.setRawMode(true);
  process.stdin.resume();
};

export const mousePosition = async (data: any) => {
  return await mouse.getPosition();
};
