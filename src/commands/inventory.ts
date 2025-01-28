import { CommandHandler } from "../types/CommandHandler";
import { CommandResult } from "../types/CommandResult";

export const handleInventory: CommandHandler = async (playerId: string): Promise<CommandResult> => ({
  message: `Inventory from DB will be sent here`,
});