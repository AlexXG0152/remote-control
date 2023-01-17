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
  screen,
} from "@nut-tree/nut-js";

export const drawCircle = async () => {};

export const goToPageEnd = async () => {
  await keyboard.type(Key.End);
};

export const buttonClick = async () => {
  await mouse.click(Button.LEFT);
};

export const drawRectangle = async (data: any) => {
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(Number(data.toString().split(" ").at(-1))));
  await mouse.move(down(Number(data.toString().split(" ").at(-2))));
  await mouse.move(left(Number(data.toString().split(" ").at(-1))));
  await mouse.move(up(Number(data.toString().split(" ").at(-2)) - 5));
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

export const getWindowSize = async () => {
  const width = await screen.width();
  const height = await screen.height();
  return { width, height };
};
