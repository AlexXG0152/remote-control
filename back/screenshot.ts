import { Region, screen } from "@nut-tree/nut-js";
import { mousePosition } from "./mouse";
import jimp from "jimp";
import { getWindowSize } from "./drawing";

export const takeScreeenshot = async (data: any) => {
  const windowSize = await getWindowSize();
  const mouseCoordinates = await mousePosition(data);

  const screenshotCoordinates = await checkPosition(
    windowSize,
    mouseCoordinates
  );

  const scr = await screen.grabRegion(
    new Region(screenshotCoordinates.x!, screenshotCoordinates.y!, 200, 200)
  );

  const re = await new jimp(scr).getBufferAsync(jimp.MIME_PNG);
  // await jimp.read(re, (err, res) => {
  //   res.quality(100).write("resized.png");
  // });
  return new jimp(scr).getBufferAsync(jimp.MIME_PNG);
};

export const checkPosition = async (windowSize: any, mouseCoordinates: any) => {
  const x =
    mouseCoordinates.x + 200 > windowSize.width
      ? windowSize.width - 201
      : mouseCoordinates.x;
  const y =
    mouseCoordinates.y + 200 > windowSize.height
      ? windowSize.height - 201
      : mouseCoordinates.y;
  return { x, y };
};
