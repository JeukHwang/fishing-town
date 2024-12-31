"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteHandler = void 0;
const number_1 = require("../util/number");
class VoteHandler {
    static isValid(vote) {
        for (const value of Object.values(vote)) {
            if (Number.isInteger(value) && value >= 0)
                continue;
            return false;
        }
        return vote.yes + vote.no <= vote.total;
    }
    static process(vote, politics) {
        if (!VoteHandler.isValid(vote))
            throw new Error("Invalid vote");
        const { yes, no, total } = vote;
        const { voteRatio, approvalRatio } = politics;
        const pV = (0, number_1.parseFraction)(voteRatio);
        const voteRatioComparison = (0, number_1.compareFraction)({ n: yes + no, d: total }, pV);
        if (voteRatioComparison === "<") {
            const pA = (0, number_1.parseFraction)(approvalRatio);
            const assumeBest = (0, number_1.compareFraction)({ n: total - no, d: total }, pA);
            if (assumeBest === "<")
                return "reject";
            return "pending";
        }
        const pA = (0, number_1.parseFraction)(approvalRatio);
        const assumeWorst = (0, number_1.compareFraction)({ n: yes, d: total }, pA);
        if (assumeWorst === ">" || assumeWorst === "=")
            return "approve";
        const assumeBest = (0, number_1.compareFraction)({ n: total - no, d: total }, pA);
        if (assumeBest === "<")
            return "reject";
        return "pending";
    }
}
exports.VoteHandler = VoteHandler;
console.assert(VoteHandler.isValid({ yes: 1, no: 1, total: 2 }) === true);
console.assert(VoteHandler.isValid({ yes: 1, no: 1, total: 1 }) === false);
console.assert(VoteHandler.isValid({ yes: 1, no: 1, total: 0 }) === false);
console.assert(VoteHandler.isValid({ yes: 1, no: 1, total: -1 }) === false);
console.assert(VoteHandler.isValid({ yes: 1, no: 1, total: 2.5 }) === false);
console.assert(VoteHandler.isValid({ yes: 1, no: 1.5, total: 3 }) === false);
console.assert(VoteHandler.isValid({ yes: 1.5, no: 1, total: 3 }) === false);
console.assert(VoteHandler.isValid({ yes: 1, no: 1, total: 2 }) === true);
console.assert(VoteHandler.process({ yes: 1, no: 1, total: 2 }, { voteRatio: "1/2", approvalRatio: "1/2" }) === "approve");
console.assert(VoteHandler.process({ yes: 20, no: 20, total: 40 }, { voteRatio: "1/2", approvalRatio: "1/2" }) === "approve");
console.assert(VoteHandler.process({ yes: 19, no: 1, total: 40 }, { voteRatio: "1/2", approvalRatio: "1/2" }) === "pending");
console.assert(VoteHandler.process({ yes: 20, no: 19, total: 40 }, { voteRatio: "1/2", approvalRatio: "1/2" }) === "approve");
console.assert(VoteHandler.process({ yes: 20, no: 0, total: 60 }, { voteRatio: "1/3", approvalRatio: "1/2" }) === "pending");
console.assert(VoteHandler.process({ yes: 19, no: 0, total: 60 }, { voteRatio: "1/3", approvalRatio: "1/100" }) === "pending");
console.assert(VoteHandler.process({ yes: 0, no: 10, total: 60 }, { voteRatio: "1/3", approvalRatio: "99/100" }) === "reject");
