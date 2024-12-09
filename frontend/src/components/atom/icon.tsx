import { Icon } from "@iconify-icon/react";

const TownIconDict = {
  Island: "mdi:marble",
  Wind: "material-symbols:air",
  Turtle: "mdi:turtle",
  Leaf: "bxs:leaf",
} as const;

export type TownIconType = keyof typeof TownIconDict;

interface Props {
  type: TownIconType;
  size?: number;
}

export default function TownIcon({ type, size }: Props) {
  const iconSize = size ?? 16;
  return (
    <Icon
      icon={TownIconDict[type]}
      width={iconSize}
      height={iconSize}
      color="white"
    />
  );
}
