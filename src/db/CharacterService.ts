import { Player } from "../types/Player";
import { generatePlayer } from "../utils/generators/generatePlayer";
import { PlayerModel } from "./models/PlayerModel";

export class CharacterService {
    private static instance: CharacterService;
    private constructor() { }

    static getInstance(): CharacterService {
        if (!CharacterService.instance) {
            CharacterService.instance = new CharacterService();
        }
        return CharacterService.instance;
    }

    async createPlayer(player: string): Promise<{ player: Player | any, state: string }> {
        const found = await PlayerModel.findOne({
            nickname: {
                $regex: new RegExp(player, 'i')
            }
        })
        console.log(found)
        if (found) {
            console.log("Player already exists")
            return {
                player: found,
                state: "player_already_exists"
            }
        }
        const generatedPlayer = generatePlayer(player)
        const newPlayer = new PlayerModel(generatedPlayer);
        const savedPlayer = await newPlayer.save() as any;
        return {
            player: savedPlayer,
            state: "player_created"
        }
    }

    async getPlayer(nickname: string): Promise<Player | null> {
        return await PlayerModel.findOne({ nickname });
    }

    async updatePlayer(nickname: string, updates: Partial<Player>): Promise<Player | null> {
        return await PlayerModel.findOneAndUpdate(
            { nickname },
            updates,
            { new: true }
        );
    }

    async deletePlayer(nickname: string): Promise<boolean> {
        const result = await PlayerModel.deleteOne({ nickname });
        return result.deletedCount > 0;
    }

    async getAllPlayers(): Promise<Player[]> {
        return await PlayerModel.find();
    }
}   