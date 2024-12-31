import { ClubRule, TownRule } from "../rule";
export type Proposal<T extends TownRule | ClubRule> = {
    /**
     * @description The name of the proposal
     */
    name: string;
    /**
     * @description The description of the proposal
     */
    description: string;
    /**
     * @description The rule changes of the proposal
     */
    diff: Partial<T>;
};
