import { RegionType } from "@/lib/town";
import { Icon } from "@iconify-icon/react";
import clsx from "clsx";

const iconDict: { [key in RegionType]: string } = {
  Island: "mdi:marble",
  Wind: "material-symbols:air",
  Turtle: "mdi:turtle",
  Leaf: "bxs:leaf",
};

export type RegionIconThemeType = "light" | "dark" | "color";
const themeDict: { [key in RegionIconThemeType]: string } = {
  light: "text-black bg-white",
  dark: "text-white bg-black",
  color: "text-white",
};

export type RegionIconVariantType = "circle" | "square";
const scaleDict: {
  [key in RegionIconVariantType]: { [key in RegionType]: number };
} = {
  circle: {
    Island: 0.6,
    Wind: 0.65,
    Turtle: 0.65,
    Leaf: 0.55,
  },
  square: {
    Island: (0.65 / 0.65) * 0.8,
    Wind: (0.65 / 0.65) * 0.8,
    Turtle: (0.65 / 0.65) * 0.8,
    Leaf: (0.55 / 0.65) * 0.8,
  },
};

interface Props {
  type: RegionType;
  theme: RegionIconThemeType;
  variant: RegionIconVariantType;
  size?: number;
}

export default function RegionIcon({ type, theme, variant, size = 24 }: Props) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        themeDict[theme],
        theme === "color" && type === "Island" && "bg-island",
        theme === "color" && type === "Wind" && "bg-wind",
        theme === "color" && type === "Turtle" && "bg-turtle",
        theme === "color" && type === "Leaf" && "bg-leaf",
        variant === "circle" && "rounded-full"
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
      }}
    >
      <Icon
        icon={iconDict[type]}
        width={size * scaleDict[variant][type]}
        height={size * scaleDict[variant][type]}
      />
    </div>
  );
}
