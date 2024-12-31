import { Politics } from "../rule";
export type Vote = {
    yes: number;
    no: number;
    total: number;
};
export type VoteStatus = "approve" | "pending" | "reject";
export declare class VoteHandler {
    static isValid(vote: Vote): boolean;
    static process(vote: Vote, politics: Politics): VoteStatus;
}
