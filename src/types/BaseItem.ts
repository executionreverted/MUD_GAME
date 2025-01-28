export interface BaseItem {
    id: string;
    image: string;
    name: string;
    description: string;
    weight: number;
    stackable: boolean;
    stackSize: number;
    type: string;
    rarity: string;
    sellValue: number;
    buyValue: number;
    isStackable: boolean;
    isSellable: boolean;
}