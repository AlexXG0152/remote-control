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
import { IMouseCoordinates, IScreenSize } from "./interfaces.interface";

export const drawCircle = async (radius: string): Promise<void> => {
  const circleCoordinates = await createCoordinatesArray(
    Number(radius.split(" ").at(-1))
  );
  const mouseCoordinates = await mousePosition();
  for (let i = 0; i < circleCoordinates[0].length; i++) {
    let elementX = circleCoordinates[0][i];
    let elementY = circleCoordinates[1][i];

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

export const drawRectangle = async (data: string): Promise<void> => {
  mouse.config.mouseSpeed = 200;
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(Number(data.toString().split(" ").at(-1))));
  await mouse.move(down(Number(data.toString().split(" ").at(-2))));
  await mouse.move(left(Number(data.toString().split(" ").at(-1))));
  await mouse.move(up(Number(data.toString().split(" ").at(-2)) - 5));
  await mouse.releaseButton(Button.LEFT);
};

export const drawSquare = async (px: number): Promise<void> => {
  mouse.config.mouseSpeed = 200;
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(px));
  await mouse.move(down(px));
  await mouse.move(left(px));
  await mouse.move(up(px - 5));
  await mouse.releaseButton(Button.LEFT);
};

export const goToPageEnd = async (): Promise<void> => {
  await keyboard.type(Key.End);
};

export const buttonClick = async (): Promise<void> => {
  await mouse.click(Button.LEFT);
};

export const moveMouseToTarget = async (
  x: number,
  y: number
): Promise<void> => {
  const target = new Point(x, y);
  await mouse.move(straightTo(target));
};

export const getWindowSize = async (): Promise<IScreenSize> => {
  const width = await screen.width();
  const height = await screen.height();
  return { width, height };
};

export const createCoordinatesArray = async (
  radius: number
): Promise<[number[], number[]]> => {
  let arrayCoordinatesX = [];
  let arrayCoordinatesY = [];

  for (let i = 0; i <= 360; i++) {
    arrayCoordinatesX.push(
      Math.round(Math.sin((Math.PI * i) / 180) * radius * 2)
    );
    arrayCoordinatesY.push(
      Math.round(Math.cos((Math.PI * i) / 180) * radius * 2)
    );
  }

  return [arrayCoordinatesX, arrayCoordinatesY];
};

export const checkPosition = async (
  windowSize: IScreenSize,
  mouseCoordinates: IMouseCoordinates,
  px: number
): Promise<IMouseCoordinates> => {
  const x =
    mouseCoordinates.x + px > windowSize.width
      ? windowSize.width - px - 1
      : mouseCoordinates.x;
  const y =
    mouseCoordinates.y + px > windowSize.height
      ? windowSize.height - px - 1
      : mouseCoordinates.y;
  return { x, y };
};
