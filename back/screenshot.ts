import jimp from "jimp";
import { Region, screen } from "@nut-tree/nut-js";
import { mousePosition } from "./mouse";
import { checkPosition, getWindowSize } from "./drawing";

export const takeScreeenshot = async (): Promise<Buffer> => {
  const windowSize = await getWindowSize();
  const mouseCoordinates = await mousePosition();

  const screenshotCoordinates = await checkPosition(
    windowSize,
    mouseCoordinates,
    200
  );

  const region = await screen.grabRegion(
    new Region(screenshotCoordinates.x!, screenshotCoordinates.y!, 200, 200)
  );

  const fixedRGB = await region.toRGB();

  return new jimp(fixedRGB).getBufferAsync(jimp.MIME_PNG);
};

// YOU CAN SAVE IMAGE IN CASE IF YOU WANT, BUT SOLUTION WORKING WITHOUT SAVING - WITH ONLY BUFFER
export const savePngToDisk = async (
  region: Buffer,
  name: string
): Promise<void> => {
  const snap = await new jimp(region).getBufferAsync(jimp.MIME_PNG);
  await jimp.read(snap, (err, res) => {
    res.quality(100).write(`${name}.png`);
  });
};
