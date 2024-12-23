export const regionType = ["Island", "Wind", "Turtle", "Leaf"] as const;
export type RegionType = (typeof regionType)[number];

export const regionIcon: { [key in RegionType]: string } = {
  Island: "mdi:marble",
  Wind: "material-symbols:air",
  Turtle: "mdi:turtle",
  Leaf: "bxs:leaf",
} as const;
