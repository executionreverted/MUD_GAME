import { Player } from "../../types/Player"

export const generatePlayer = (name: string): Player => {
    return {
        nickname: name,
        birthdate: new Date(),
        state: 'Idle',
        money: 0,
        level: 1,
        experience: 0,
        lastLogin: new Date(),
        isPremium: false
    }
}