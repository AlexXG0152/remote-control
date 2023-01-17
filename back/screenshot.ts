import { Region, screen } from "@nut-tree/nut-js";
import { mousePosition } from "./mouse";
import jimp from "jimp";

export const takeScreeenshot = async (data: any) => {
  const x = (await mousePosition(data)).x;
  const y = (await mousePosition(data)).y;

  const scr = await screen.grabRegion(new Region(x, y, 200, 200));

  const re = await new jimp(scr).getBufferAsync(jimp.MIME_PNG);
  // await jimp.read(re, (err, res) => {
  //   res.quality(100).write("resized.png");
  // });
  return new jimp(scr).getBufferAsync(jimp.MIME_PNG);
};
