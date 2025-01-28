import mongoose from 'mongoose';
import { CharacterService } from './CharacterService';

export class DatabaseAdapter {
    private static instance: DatabaseAdapter;
    private characterService: CharacterService;

    private constructor() {
        this.characterService = CharacterService.getInstance();
    }

    static getInstance(): DatabaseAdapter {
        if (!DatabaseAdapter.instance) {
            DatabaseAdapter.instance = new DatabaseAdapter();
        }
        return DatabaseAdapter.instance;
    }

    async initialize(): Promise<void> {
        try {
            console.log("Initializing database...");    
            const uri = process.env.DB_URI;
            if (!uri) {
                throw new Error('DB_URI environment variable is not set');
            }

            await mongoose.connect(uri);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Failed to connect to MongoDB:', error);
            throw error;
        }
    }

    getCharacterService(): CharacterService {
        return this.characterService;
    }
}

export const databaseAdapter = DatabaseAdapter.getInstance();
