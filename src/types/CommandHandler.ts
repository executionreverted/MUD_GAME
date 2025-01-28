import { CommandResult } from "./CommandResult";

export type CommandHandler = (
    playerId: string,
    args: any
  ) => Promise<CommandResult>;