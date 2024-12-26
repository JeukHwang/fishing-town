import { Fraction, NumberOrInfinity } from "../util/number";

export type Politics = {
  /**
   * @description (yes + no) / total ≥ `voteRatio` then the proposal is approved
   * @range 0 ≤ `voteRatio` ≤ 1
   */
  voteRatio: Fraction;

  /**
   * @description yes / (yes + no) ≥ `approvalRatio` then the proposal is approved
   * @range 0 ≤ `approvalRatio` ≤ 1
   */
  approvalRatio: Fraction;
};

export type ShipOwnership = {
  /**
   * @description Maximum ships the entire town can own
   * @range Zero, positive integer, infinity
   */
  maxTotalShips: NumberOrInfinity;

  /**
   * @description Maximum ships a resident can own
   * @range Zero, positive integer, infinity
   */
  maxIndividualShips: NumberOrInfinity;
};

export type ShipUsage = {
  /**
   * @description Maximum ships usable per turn by a resident
   * @range Zero, positive integer, infinity
   */
  maxIndividualShipsPerTurn: NumberOrInfinity;

  /**
   * @description Maximum ships usable on the same tile per turn by a resident
   * @range Zero, positive integer, infinity
   */
  maxIndividualShipsOnSameTilePerTurn: NumberOrInfinity;

  /**
   * @description Indicates if residents must share information about fish left on tiles they fished
   */
  shareRemainingFish: boolean;

  /**
   * @description Indicates if residents must share the area they will fish in advance
   */
  shareFishingPlan: boolean;

  /**
   * @description Only applicable when `shareFishingPlan` is true
   * @description Maximum ships usable on the same tile per turn for the entire town
   * @range Zero, positive integer, infinity
   */
  maxTotalShipsOnSameTilePerTurn: NumberOrInfinity;
};

export type FeeCollection = {
  /**
   * @description Rate of profit to collect as maintenance fee
   * @range 0 ≤ `taxRate` ≤ 1
   */
  taxRate: Fraction;

  /**
   * @description Indicates if the deficit in maintenance fee should be divided among residents
   */
  collectFromResidents: boolean;
};

export type FeeUsage = {
  /**
   * @description Support for residents who can't support themselves
   */
  survivalGrant: boolean;

  /**
   * @description Set cost to join the town
   * @range Zero, positive integer
   */
  joinCost: number;

  /**
   * @description Set cost to leave the town
   * @range Zero, positive integer
   */
  leaveCost: number;

  /**
   * @description Distribute remaining maintenance fee to residents
   * @range 0 ≤ `distributeRemaining` ≤ 1
   */
  distributeRemaining: Fraction;
};

export type TownRule = {
  politics: Politics;
  shipOwnership: ShipOwnership;
  shipUsage: ShipUsage;
  feeCollection: FeeCollection;
  feeUsage: FeeUsage;
};

export type MembershipCondition = {
  /**
   * @description Minimum number of ships required to join the club
   * @range Zero, positive integer
   */
  minIndividualShips: number;

  /**
   * @description Maximum number of ships allowed to join the club
   * @range Zero, positive integer, infinity
   */
  maxIndividualShips: NumberOrInfinity;
};

export type ClubRule = {
  politics: Politics;
  shipUsage: ShipUsage;
  membershipCondition: MembershipCondition;
};

export type TownRuleKey = keyof TownRule;

export const townRuleKey: TownRuleKey[] = [
  "politics",
  "shipOwnership",
  "shipUsage",
  "feeCollection",
  "feeUsage",
] as const;

export type ClubRuleKey = keyof ClubRule;

export const clubRuleKey: ClubRuleKey[] = [
  "politics",
  "shipUsage",
  "membershipCondition",
] as const;
