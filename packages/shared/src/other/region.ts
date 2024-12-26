export const townType = ["Wind", "Turtle", "Leaf"] as const;
export type TownType = (typeof townType)[number];

export const regionType = ["Island", ...townType] as const;
export type RegionType = (typeof regionType)[number];
