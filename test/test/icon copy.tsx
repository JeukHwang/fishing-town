// import { Icon } from "@iconify-icon/react";
// import clsx from "clsx";
// import { TownIconType } from "./icon";

// const TownType = ["Island", "Wind", "Turtle", "Leaf"] as const;
// export type TownType = (typeof TownType)[number];

// const TownIconDict: { [key in TownType]: string } = {
//   Island: "mdi:marble",
//   Wind: "material-symbols:air",
//   Turtle: "mdi:turtle",
//   Leaf: "bxs:leaf",
// } as const;

// const ScaleDict: { [key in TownType]: number } = {
//   Island: 0.6,
//   Wind: 0.65,
//   Turtle: 0.65,
//   Leaf: 0.55,
// } as const;

// const ThemeType = ["light", "dark", "color"] as const;
// type ThemeType = (typeof ThemeType)[number];
// const ThemeDict: { [key in ThemeType]: string } = {
//   light: "text-black bg-white",
//   dark: "text-white bg-black",
//   color: "text-white",
// };

// interface Props {
//   type: TownIconType;
//   theme?: ThemeType;
//   size?: number;
// }

// export default function TownCircleIcon({
//   type,
//   theme = "color",
//   size = 24,
// }: Props) {
//   return (
//     <div
//       className={clsx(
//         "flex items-center justify-center rounded-full",
//         ThemeDict[theme],
//         type === "Island" && theme === "color" && "bg-island",
//         type === "Wind" && theme === "color" && "bg-wind",
//         type === "Turtle" && theme === "color" && "bg-turtle",
//         type === "Leaf" && theme === "color" && "bg-leaf"
//       )}
//       style={{
//         width: `${size}px`,
//         height: `${size}px`,
//         minWidth: `${size}px`,
//         minHeight: `${size}px`,
//       }}
//     >
//       <Icon
//         icon={TownIconDict[type]}
//         width={size * ScaleDict[type]}
//         height={size * ScaleDict[type]}
//       />
//     </div>
//   );
// }
