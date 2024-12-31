import { RegionType } from "@fishing-town/shared";

export const regionIcon: { [key in RegionType]: string } = {
  Island: "mdi:marble",
  Wind: "material-symbols:air",
  Turtle: "mdi:turtle",
  Leaf: "bxs:leaf",
} as const;
