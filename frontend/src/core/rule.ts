import {
  defaultClub,
  defaultTown,
  leafTown,
  turtleTown,
  windTown,
} from "./rule/default";
import { ClubRule, TownRule } from "./rule/type";
import {
  isFractionBetween0and1,
  isZeroOrPositiveInteger,
  parseFraction,
} from "./rule/util";

export function isValidTownRule(rule: TownRule): boolean {
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
  if (!isValidFraction) return false;

  const numbers = [
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
  const isValidNumber = numbers.every(
    (number) => number === "Infinity" || isZeroOrPositiveInteger(number)
  );
  if (!isValidNumber) return false;

  return true;
}

export function isValidClubRule(rule: ClubRule): boolean {
  const fractions = [rule.politics.voteRatio, rule.politics.approvalRatio];
  const isValidFraction = fractions.every((f) => {
    const parsed = parseFraction(f);
    return parsed !== null && isFractionBetween0and1(parsed);
  });
  if (!isValidFraction) return false;

  const numbers = [
    rule.shipUsage.maxIndividualShipsPerTurn,
    rule.shipUsage.maxIndividualShipsOnSameTilePerTurn,
    rule.shipUsage.shareFishingPlan
      ? rule.shipUsage.maxTotalShipsOnSameTilePerTurn
      : 0,
    rule.membershipCondition.minIndividualShips,
    rule.membershipCondition.maxIndividualShips,
  ];
  const isValidNumber = numbers.every(
    (number) => number === "Infinity" || isZeroOrPositiveInteger(number)
  );
  if (!isValidNumber) return false;

  return true;
}

console.assert(isValidTownRule(defaultTown));
console.assert(isValidTownRule(windTown()));
console.assert(isValidTownRule(turtleTown(1)));
console.assert(isValidTownRule(leafTown()));
console.assert(isValidClubRule(defaultClub));
