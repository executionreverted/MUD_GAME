import { z } from "zod";
import { CharacterService } from "../db/CharacterService";
import { CommandHandler } from "../types/CommandHandler";
import { CommandResult } from "../types/CommandResult";
import { PlayerSchema } from "../types/Player";

export const handleCreatePlayer: CommandHandler = async (playerId): Promise<CommandResult> => {
  PlayerSchema.shape.nickname.parse(playerId.trim())
  const { player, state } = await CharacterService.getInstance().createPlayer(playerId.trim())
  return {
    message: `${playerId}`,
    payload: {
      player,
      state
    },
  };
};