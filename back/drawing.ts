import {
  Key,
  keyboard,
  left,
  right,
  up,
  down,
  straightTo,
  Button,
  Point,
  screen,
  mouse,
} from "@nut-tree/nut-js";
import { mousePosition } from "./mouse";

export const drawCircle = async (data: any) => {
  const circlec = await createC(data.toString().split(" ").at(-1));
  const mouseCoordinates = await mousePosition(data);
  for (let i = 0; i < circlec[0].length; i++) {
    let elementX = circlec[0][i];
    let elementY = circlec[1][i];
    mouse.config.mouseSpeed = 100000;

    let x = mouseCoordinates.x - elementX;
    let y = mouseCoordinates.y - elementY;

    if (i === 0) {
      moveMouseToTarget(x, y);
    }
    await mouse.pressButton(Button.LEFT);
    moveMouseToTarget(x, y);
    await mouse.releaseButton(Button.LEFT);
  }
};

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

export const createC = async (r: number) => {
  let cooX = [];
  let cooY = [];

  for (let i = 0; i <= 360; i++) {
    cooX.push(Math.round(Math.sin((Math.PI * i) / 180) * r * 2));
    cooY.push(Math.round(Math.cos((Math.PI * i) / 180) * r * 2));
  }

  return [cooX, cooY];
};
