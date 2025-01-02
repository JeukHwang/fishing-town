import { LanguageType } from "../../language";
import { ClubRule, clubRuleKey, TownRule, townRuleKey } from "../type";
import { RuleFormatter } from "./format";

export type PatchType = "added" | "deleted" | "updated" | "unchanged";
export type PatchValue = { type: PatchType; value: string };
export type RulePatch<T extends TownRule | ClubRule> = Record<
  keyof T,
  Record<string, PatchValue>
>;

// export function stringify(
//   readableRule: ReadableTownRule | ReadableClubRule,
//   simplify: boolean
// ): string {
//   let string = "";
//   if (simplify) {
//     for (const [key, value] of Object.entries(readableRule)) {
//       let substring = "";
//       for (const [key2, value2] of Object.entries(value)) {
//         if (value2 !== "") {
//           substring += `    ${key2}:\n`;
//           substring += `    ${value2}\n`;
//         }
//       }
//       if (substring !== "") {
//         string += `${key}:\n${substring}`;
//       }
//     }
//   } else {
//     for (const [key, value] of Object.entries(readableRule)) {
//       string += `${key}:\n`;
//       for (const [key2, value2] of Object.entries(value)) {
//         string += `    ${key2}:\n`;
//         if (value2 !== "") {
//           string += `    ${value2}\n`;
//         }
//       }
//     }
//   }
//   return string;
// }

export class RuleDiff {
  public static TownRule(
    from: TownRule,
    to: TownRule,
    language: LanguageType,
    mode: "all" | "to" | "diff"
  ): RulePatch<TownRule> {
    const reader = new RuleFormatter(language);

    const fromRule = reader.TownRule(from, true);
    const toRule = reader.TownRule(to, true);

    const merge = Object.fromEntries(
      townRuleKey.map((key) => [key, { ...from[key], ...to[key] }])
    ) as TownRule;
    const mergeRule = reader.TownRule(merge, false);

    const diffRule = {} as RulePatch<TownRule>;

    for (const [category, categoryValue] of Object.entries(mergeRule) as [
      keyof TownRule,
      Record<string, string>
    ][]) {
      const subDiffRule: [string, PatchValue][] = [];
      for (const key of Object.keys(categoryValue)) {
        const fromValue = fromRule[category]
          ? (fromRule[category] as Record<string, string>)[key]
          : "";
        const toValue = toRule[category]
          ? (toRule[category] as Record<string, string>)[key]
          : "";
        const existFromString = fromValue !== undefined && fromValue !== "";
        const existToString = toValue !== undefined && toValue !== "";

        if (!existFromString && existToString) {
          subDiffRule.push([key, { type: "added", value: toValue }]);
        } else if (existFromString && !existToString) {
          subDiffRule.push([key, { type: "deleted", value: fromValue }]);
        } else if (existFromString && existToString) {
          if (fromValue !== toValue) {
            subDiffRule.push([key, { type: "updated", value: toValue }]);
          } else if (mode !== "diff") {
            subDiffRule.push([key, { type: "unchanged", value: toValue }]);
          }
        } else {
          if (mode === "all") {
            subDiffRule.push([key, { type: "unchanged", value: "" }]);
          }
        }
      }
      if (subDiffRule.length > 0) {
        diffRule[category as keyof TownRule] = Object.fromEntries(subDiffRule);
      }
    }
    return diffRule;
  }

  public static ClubRule(
    from: ClubRule,
    to: ClubRule,
    language: LanguageType,
    simplify: boolean
  ): RulePatch<ClubRule> {
    const reader = new RuleFormatter(language);

    const fromRule = reader.ClubRule(from, true);
    const toRule = reader.ClubRule(to, true);

    const merge = Object.fromEntries(
      clubRuleKey.map((key) => [key, { ...from[key], ...to[key] }])
    ) as ClubRule;
    const mergeRule = reader.ClubRule(merge, false);

    const diffRule = {} as RulePatch<ClubRule>;

    for (const [category, categoryValue] of Object.entries(mergeRule) as [
      keyof ClubRule,
      Record<string, string>
    ][]) {
      const subDiffRule: [string, PatchValue][] = [];
      for (const key of Object.keys(categoryValue)) {
        const fromValue = fromRule[category]
          ? (fromRule[category] as Record<string, string>)[key]
          : "";
        const toValue = toRule[category]
          ? (toRule[category] as Record<string, string>)[key]
          : "";
        const existFromString = fromValue !== undefined && fromValue !== "";
        const existToString = toValue !== undefined && toValue !== "";

        if (!existFromString && existToString) {
          subDiffRule.push([key, { type: "added", value: toValue }]);
        } else if (existFromString && !existToString) {
          subDiffRule.push([key, { type: "deleted", value: fromValue }]);
        } else if (existFromString && existToString) {
          if (fromValue !== toValue) {
            subDiffRule.push([key, { type: "updated", value: toValue }]);
          } else if (!simplify) {
            subDiffRule.push([key, { type: "unchanged", value: toValue }]);
          }
        }
      }
      if (subDiffRule.length > 0) {
        diffRule[category as keyof ClubRule] = Object.fromEntries(subDiffRule);
      }
    }
    return diffRule;
  }
}
