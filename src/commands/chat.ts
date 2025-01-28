import { z } from "zod";
import { CommandHandler } from "../types/CommandHandler";
import { CommandResult } from "../types/CommandResult";

const ChatArgs = z.object({
  message: z.string().min(1)
})
type ChatArgs = z.infer<typeof ChatArgs>;

export const handleChat: CommandHandler = async (playerId, args: ChatArgs): Promise<CommandResult> => {
  ChatArgs.parse(args);
  return {
    broadcast: true,
    message: `${playerId}: ${args.message}`,
  };
};