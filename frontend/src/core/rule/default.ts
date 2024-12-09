import { ClubRule, TownRule } from "./type";

const defaultTown: TownRule = {
  politics: {
    voteRatio: "2/3",
    approvalRatio: "1/2",
  },
  shipOwnership: {
    maxTotalShips: "Infinity",
    maxIndividualShips: "Infinity",
  },
  shipUsage: {
    maxIndividualShipsPerTurn: "Infinity",
    maxIndividualShipsOnSameTilePerTurn: "Infinity",
    shareRemainingFish: false,
    shareFishingPlan: false,
  },
  feeCollection: {
    taxRate: "0/1",
    collectFromResidents: false,
  },
  feeUsage: {
    survivalGrant: false,
    leaveCost: 0,
    joinCost: 0,
    distributeRemaining: "0/1",
  },
};
const windTown = (): TownRule => defaultTown;
const turtleTown = (villagerNum: number): TownRule => ({
  ...defaultTown,
  shipOwnership: {
    ...defaultTown.shipOwnership,
    maxIndividualShips: 3 * villagerNum,
  },
  shipUsage: {
    ...defaultTown.shipUsage,
    maxIndividualShipsPerTurn: 4,
    maxIndividualShipsOnSameTilePerTurn: 2,
  },
  feeCollection: {
    ...defaultTown.feeCollection,
    taxRate: "5/100",
  },
  feeUsage: {
    ...defaultTown.feeUsage,
    joinCost: 100,
    leaveCost: 100,
  },
});
const leafTown = (): TownRule => ({
  ...defaultTown,
  shipUsage: {
    ...defaultTown.shipUsage,
    shareRemainingFish: true,
    shareFishingPlan: true,
    maxTotalShipsOnSameTilePerTurn: 4,
  },
  feeCollection: {
    ...defaultTown.feeCollection,
    taxRate: "1/1",
    collectFromResidents: true,
  },
  feeUsage: {
    ...defaultTown.feeUsage,
    survivalGrant: true,
    leaveCost: 200,
    distributeRemaining: "95/100",
  },
});

const defaultTownRule = {
  wind: windTown,
  turtle: turtleTown,
  leaf: leafTown,
};

const defaultClubRule: ClubRule = {
  politics: defaultTown.politics,
  shipUsage: defaultTown.shipUsage,
  membershipCondition: {
    minIndividualShips: 0,
    maxIndividualShips: "Infinity",
  },
};

export { defaultClubRule, defaultTownRule };
