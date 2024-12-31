"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleDiff = void 0;
const type_1 = require("../type");
const format_1 = require("./format");
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
class RuleDiff {
    static TownRule(from, to, language, simplify) {
        const reader = new format_1.RuleFormatter(language);
        const fromRule = reader.TownRule(from, true);
        const toRule = reader.TownRule(to, true);
        const merge = Object.fromEntries(type_1.townRuleKey.map((key) => [key, { ...from[key], ...to[key] }]));
        const mergeRule = reader.TownRule(merge, false);
        const diffRule = {};
        for (const [category, categoryValue] of Object.entries(mergeRule)) {
            const subDiffRule = [];
            for (const key of Object.keys(categoryValue)) {
                const fromValue = fromRule[category]
                    ? fromRule[category][key]
                    : "";
                const toValue = toRule[category]
                    ? toRule[category][key]
                    : "";
                const existFromString = fromValue !== undefined && fromValue !== "";
                const existToString = toValue !== undefined && toValue !== "";
                if (!existFromString && existToString) {
                    subDiffRule.push([key, { type: "added", value: toValue }]);
                }
                else if (existFromString && !existToString) {
                    subDiffRule.push([key, { type: "deleted", value: fromValue }]);
                }
                else if (existFromString && existToString) {
                    if (fromValue !== toValue) {
                        subDiffRule.push([key, { type: "updated", value: toValue }]);
                    }
                    else if (!simplify) {
                        subDiffRule.push([key, { type: "unchanged", value: toValue }]);
                    }
                }
            }
            if (subDiffRule.length > 0) {
                diffRule[category] = Object.fromEntries(subDiffRule);
            }
        }
        return diffRule;
    }
    static ClubRule(from, to, language, simplify) {
        const reader = new format_1.RuleFormatter(language);
        const fromRule = reader.ClubRule(from, true);
        const toRule = reader.ClubRule(to, true);
        const merge = Object.fromEntries(type_1.clubRuleKey.map((key) => [key, { ...from[key], ...to[key] }]));
        const mergeRule = reader.ClubRule(merge, false);
        const diffRule = {};
        for (const [category, categoryValue] of Object.entries(mergeRule)) {
            const subDiffRule = [];
            for (const key of Object.keys(categoryValue)) {
                const fromValue = fromRule[category]
                    ? fromRule[category][key]
                    : "";
                const toValue = toRule[category]
                    ? toRule[category][key]
                    : "";
                const existFromString = fromValue !== undefined && fromValue !== "";
                const existToString = toValue !== undefined && toValue !== "";
                if (!existFromString && existToString) {
                    subDiffRule.push([key, { type: "added", value: toValue }]);
                }
                else if (existFromString && !existToString) {
                    subDiffRule.push([key, { type: "deleted", value: fromValue }]);
                }
                else if (existFromString && existToString) {
                    if (fromValue !== toValue) {
                        subDiffRule.push([key, { type: "updated", value: toValue }]);
                    }
                    else if (!simplify) {
                        subDiffRule.push([key, { type: "unchanged", value: toValue }]);
                    }
                }
            }
            if (subDiffRule.length > 0) {
                diffRule[category] = Object.fromEntries(subDiffRule);
            }
        }
        return diffRule;
    }
}
exports.RuleDiff = RuleDiff;
