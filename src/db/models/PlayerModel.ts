import mongoose from 'mongoose';
import { PlayerSchema } from '../../types/Player';
import { z } from 'zod';
const { Schema } = mongoose;

// export const PlayerSchema = new Schema({
//     nickname: { type: String, required: true },
//     state: { type: String, required: true },
//     money: { type: Number, default: 0 },
//     level: { type: Number, default: 1 },
//     experience: { type: Number, default: 0 },
//     lastLogin: { type: Date, default: Date.now },
//     isPremium: { type: Boolean, default: false }
// });

export const PlayerDBSchema = new Schema();
const PlayerProps = PlayerSchema.keyof()
// Map Zod schema to Mongoose schema types
for (const [key, value] of Object.entries(PlayerSchema.shape)) {
    console.log(key, )
    PlayerDBSchema.add({
        [key]: {
            type: value instanceof z.ZodNumber ? Number :
                  value instanceof z.ZodString ? String :
                  value instanceof z.ZodBoolean ? Boolean :
                  value instanceof z.ZodDate ? Date : String,
            required: !value.isNullable()
        }
    });
}
// console.log(PlayerDBSchema)
export const PlayerModel = mongoose.model('Player', PlayerDBSchema);