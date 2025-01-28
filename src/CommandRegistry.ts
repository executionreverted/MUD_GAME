import { handleChat } from "./commands/chat";
import { handleCreatePlayer } from "./commands/createPlayer";
import { handleInventory } from "./commands/inventory";
import { CommandHandler } from "./types/CommandHandler";

type CommandMap = {
  [key: string]: CommandHandler;
};

export class CommandRegistry {
  private commands: CommandMap = {};

  register(command: string, handler: CommandHandler): void {
    this.commands[command] = handler;
  }

  getHandler(command: string): CommandHandler | undefined {
    return this.commands[command];
  }
}

// Initialize commands
export const commandRegistry = new CommandRegistry();
commandRegistry.register("say", handleChat);
commandRegistry.register("inventory", handleInventory);
commandRegistry.register("createplayer", handleCreatePlayer);