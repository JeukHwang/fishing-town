import { isFractionBetween0and1, isZeroOrPositiveInteger, parseFraction, } from "../../util/number";
export class RuleValidator {
    static TownRule(rule) {
        const fractions = [
            rule.politics.voteRatio,
            rule.politics.approvalRatio,
            rule.feeCollection.taxRate,
            rule.feeUsage.distributeRemaining,
        ];
        const isValidFraction = fractions.every((f) => {
            const parsed = parseFraction(f);
            return parsed !== null && isFractionBetween0and1(parsed);
        });
        if (!isValidFraction)
            return false;
        const NOIs = [
            rule.shipOwnership.maxTotalShips,
            rule.shipOwnership.maxIndividualShips,
            rule.shipUsage.maxIndividualShipsPerTurn,
            rule.shipUsage.maxIndividualShipsOnSameTilePerTurn,
            rule.shipUsage.shareFishingPlan
                ? rule.shipUsage.maxTotalShipsOnSameTilePerTurn
                : 0,
            rule.feeUsage.joinCost,
            rule.feeUsage.leaveCost,
        ];
        const isValidNumber = NOIs.every((number) => number === "Infinity" || isZeroOrPositiveInteger(number));
        if (!isValidNumber)
            return false;
        return true;
    }
    static ClubRule(rule) {
        const fractions = [rule.politics.voteRatio, rule.politics.approvalRatio];
        const isValidFraction = fractions.every((f) => {
            const parsed = parseFraction(f);
            return parsed !== null && isFractionBetween0and1(parsed);
        });
        if (!isValidFraction)
            return false;
        const NOIs = [
            rule.shipUsage.maxIndividualShipsPerTurn,
            rule.shipUsage.maxIndividualShipsOnSameTilePerTurn,
            rule.shipUsage.shareFishingPlan
                ? rule.shipUsage.maxTotalShipsOnSameTilePerTurn
                : 0,
            rule.membershipCondition.minIndividualShips,
            rule.membershipCondition.maxIndividualShips,
        ];
        const isValidNumber = NOIs.every((number) => number === "Infinity" || isZeroOrPositiveInteger(number));
        if (!isValidNumber)
            return false;
        return true;
    }
}
