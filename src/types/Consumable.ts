import { Item } from "./BaseItem";
import { Effect } from "./Effect";
import { Player } from "./Player";

interface Consumable extends Item {
    isConsumable: true;
    effect: Effect;
    onUse: (player: Player) => void;
}

export { Consumable };