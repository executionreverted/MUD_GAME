import { Player } from "./Player";

export interface CommandResult {
    message: string;
    payload?: any,
    broadcast?: boolean;
    stateUpdates?: Partial<Player>;
  }