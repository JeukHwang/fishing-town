declare const __brand: unique symbol;
type Brand<B> = { [__brand]: B };
export type Branded<T, B> = T & Brand<B>;

export const townName = ["Wind", "Turtle", "Leaf"] as const;
export type TownName = (typeof townName)[number];

export function goFishing(game: Game): Game {
    
}