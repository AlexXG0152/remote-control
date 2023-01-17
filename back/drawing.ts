import {
  Key,
  keyboard,
  mouse,
  left,
  right,
  up,
  down,
  straightTo,
  Button,
  Point,
} from "@nut-tree/nut-js";

export const drawCircle = async () => {};

export const goToPageEnd = async () => {
  await keyboard.type(Key.End);
};

export const buttonClick = async () => {
  await mouse.click(Button.LEFT);
};

export const drawRectangle = async (w: number, h: number) => {
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(w));
  await mouse.move(down(h));
  await mouse.move(left(w));
  await mouse.move(up(h - 5));
  await mouse.releaseButton(Button.LEFT);
};

export const drawSquare = async (px: number) => {
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(px));
  await mouse.move(down(px));
  await mouse.move(left(px));
  await mouse.move(up(px - 5));
  await mouse.releaseButton(Button.LEFT);
};

export const moveMouseToTarget = async (x: number, y: number) => {
  const target = new Point(x, y);
  await mouse.move(straightTo(target));
};
