import { ClubRule, TownRule } from "../type";
export declare class DefaultRule {
    private static BaseTown;
    static WindTown(): TownRule;
    static TurtleTown(villagerNum: number): TownRule;
    static LeafTown(): TownRule;
    static Club(): ClubRule;
}
