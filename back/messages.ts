import { Point } from "@nut-tree/nut-js/dist/lib/point.class";
import { RawData, WebSocket } from "ws";

export const sendMessage = async (ws: WebSocket, data: RawData | Point) => {
  ws.send(data.toString());
};
