export interface DatabaseAdapter<Player> {
    loadPlayer(id: string): Promise<Player | null>;
    savePlayer(player: Player): Promise<void>;
  }