import { GameConfig, GameConfigSchema } from "./src/types/GameConfig";

// default config for the game
export const Config = GameConfigSchema.parse({
    PlayerStates: ["Idle", "Combat", "Working", "Dead"],
    PlayerProperties: {
        nickname: "",
        birthdate: new Date(),
        state: "Idle",
        money: 0,
        level: 1,
        experience: 0,
        lastLogin: new Date(),
        isPremium: false,
    },
})