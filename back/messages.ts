import { Duplex } from "node:stream";
import { RawData } from "ws";
import { Point } from "@nut-tree/nut-js/dist/lib/point.class";

export const sendMessage = async (
  stream: Duplex,
  data: RawData | Point | string | Object 
) => {
  stream.write(data);
};
