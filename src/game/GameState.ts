import { GameState } from "../types/GameState";
import { Player } from "../types/Player";

export class InMemoryGameState implements GameState {
  players = new Map<string, string>();
  lastRequestTimes = new Map<string, number>();

  addPlayer(socketId: string): string {
    const player = "123456" // Get ID From DB TODO SET FROM DB
    this.players.set(socketId, player);
    return player;
  }

  removePlayer(socketId: string): void {
    this.players.delete(socketId);
  }

  getPlayer(socketId: string): Player | undefined {
    let player: any; // get from db
    return player;
  }

  getLastRequestTime(socketId: string): number {
    return this.lastRequestTimes.get(socketId) || 0;
  }

  setLastRequestTime(socketId: string, time: number): void {
    this.lastRequestTimes.set(socketId, time);
  }

  deleteLastRequestTime(socketId: string): void {
    this.lastRequestTimes.delete(socketId);
  }
}