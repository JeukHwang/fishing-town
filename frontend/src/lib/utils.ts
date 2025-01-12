import { clsx, type ClassValue } from "clsx";
import { LucideProps } from "lucide-react";
import { twMerge } from "tailwind-merge";

/* Settings for shadcn/ui */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isDev = import.meta.env.DEV;

export const domain = isDev
  ? "http://localhost:3000"
  : "https://api.fishing-town.jeuk.io";

const defaultHeader = {
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

export function redirectUrl(target: string, redirect: string) {
  return `${target}?redirect=${redirect}`;
}

export function redirectAfterLogin(redirect: string) {
  return redirectUrl("/login", redirect);
}

export function hashToColor(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to an RGB hex color string
  const r = (hash >> 16) & 0xff;
  const g = (hash >> 8) & 0xff;
  const b = hash & 0xff;

  // Return as a CSS-usable hex color string
  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

export async function rawApi(
  url: string,
  init: RequestInit
): Promise<Response> {
  return await fetch(`${domain}/${url}`, {
    ...init,
    ...defaultHeader,
  });
}

export async function api<T>(url: string, init: RequestInit): Promise<T> {
  return (await (await rawApi(url, init)).json()) as T;
}
