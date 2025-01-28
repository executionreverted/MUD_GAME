import { z } from "zod";

export const GameConfigSchema = z.object({
    PlayerStates: z.array(z.string()),
    PlayerProperties: z.object({
        nickname: z.string(),
        birthdate: z.date(),
        state: z.string(),
        money: z.number().default(0),
        level: z.number().default(1),
        experience: z.number().default(0),
        lastLogin: z.date().default(new Date()),
        isPremium: z.boolean().default(false),
    }).required()
})

export type GameConfig = z.infer<typeof GameConfigSchema>;