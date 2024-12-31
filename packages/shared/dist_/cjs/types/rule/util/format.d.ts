import { LanguageType } from "../../language";
import { ClubRule, TownRule } from "../type";
export type Readable<T> = {
    [K in keyof T]: string;
};
export type ReadableTownRule = {
    [K in keyof TownRule]: Readable<TownRule[K]>;
};
export type ReadableClubRule = {
    [K in keyof ClubRule]: Readable<ClubRule[K]>;
};
export declare class RuleFormatter {
    readonly language: LanguageType;
    private readonly pack;
    constructor(language: LanguageType);
    private apply;
    private Politics;
    private ShipOwnership;
    private ShipUsage;
    private FeeCollection;
    private FeeUsage;
    TownRule(townRule: TownRule, simplify: boolean): ReadableTownRule;
    private MembershipCondition;
    ClubRule(clubRule: ClubRule, simplify: boolean): ReadableClubRule;
}
