import { z } from "zod";
import { GameConfigSchema } from "./GameConfig";

// Base player schema with core properties

// The schema creation function remains the same
export const createPlayerSchema = () => {
    return GameConfigSchema.shape.PlayerProperties;
};

export const PlayerSchema = createPlayerSchema()
export type Player = z.infer<typeof PlayerSchema>;