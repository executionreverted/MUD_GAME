import { Player } from "./Player";

export interface GameState {
  players: Map<string, string>;
  addPlayer(socketId: string): string;
  removePlayer(socketId: string): void;
  getPlayer(socketId: string): Player | undefined;
}