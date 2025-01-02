import { clsx, type ClassValue } from "clsx";
import { LucideProps } from "lucide-react";
import { twMerge } from "tailwind-merge";

/* Settings for shadcn/ui */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const domain = "https://api.fishing-town.jeuk.io";

export const defaultHeader = {
  headers: { "Content-Type": "application/json" },
  credentials: "include",
} as const;

export function camelToTitleCase(camelCase: string): string {
  return camelCase
    .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
}

export type LucideIcon = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;
