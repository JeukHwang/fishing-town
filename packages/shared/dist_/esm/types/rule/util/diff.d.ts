import { LanguageType } from "../../language";
import { ClubRule, TownRule } from "../type";
export type PatchType = "added" | "deleted" | "updated" | "unchanged";
export type PatchValue = {
    type: PatchType;
    value: string;
};
export type RulePatch<T extends TownRule | ClubRule> = Record<keyof T, Record<string, PatchValue>>;
export declare class RuleDiff {
    static TownRule(from: TownRule, to: TownRule, language: LanguageType, simplify: boolean): RulePatch<TownRule>;
    static ClubRule(from: ClubRule, to: ClubRule, language: LanguageType, simplify: boolean): RulePatch<ClubRule>;
}
