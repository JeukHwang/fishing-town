import { RegionType } from "@/core";

export const regionIcon: { [key in RegionType]: string } = {
  Island: "mdi:marble",
  Wind: "material-symbols:air",
  Turtle: "mdi:turtle",
  Leaf: "bxs:leaf",
} as const;
