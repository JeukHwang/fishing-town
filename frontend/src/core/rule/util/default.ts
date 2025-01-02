import { ClubRule, TownRule } from "../type";
import { RuleValidator } from "./validate";

export class DefaultRule {
  private static BaseTown: TownRule = {
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
      maxTotalShipsOnSameTilePerTurn: "Infinity",
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

  public static WindTown(): TownRule {
    return this.BaseTown;
  }

  public static TurtleTown(villagerNum: number): TownRule {
    return {
      ...this.BaseTown,
      shipOwnership: {
        ...this.BaseTown.shipOwnership,
        maxIndividualShips: 3 * villagerNum,
      },
      shipUsage: {
        ...this.BaseTown.shipUsage,
        maxIndividualShipsPerTurn: 4,
        maxIndividualShipsOnSameTilePerTurn: 2,
      },
      feeCollection: {
        ...this.BaseTown.feeCollection,
        taxRate: "5/100",
      },
      feeUsage: {
        ...this.BaseTown.feeUsage,
        joinCost: 100,
        leaveCost: 100,
      },
    };
  }

  public static LeafTown(): TownRule {
    return {
      ...this.BaseTown,
      shipUsage: {
        ...this.BaseTown.shipUsage,
        shareRemainingFish: true,
        shareFishingPlan: true,
        maxTotalShipsOnSameTilePerTurn: 4,
      },
      feeCollection: {
        ...this.BaseTown.feeCollection,
        taxRate: "1/1",
        collectFromResidents: true,
      },
      feeUsage: {
        ...this.BaseTown.feeUsage,
        survivalGrant: true,
        leaveCost: 200,
        distributeRemaining: "95/100",
      },
    };
  }

  public static Club(): ClubRule {
    return {
      politics: this.BaseTown.politics,
      shipUsage: this.BaseTown.shipUsage,
      membershipCondition: {
        minIndividualShips: 0,
        maxIndividualShips: "Infinity",
      },
    };
  }
}

console.assert(RuleValidator.TownRule(DefaultRule.WindTown()));
console.assert(RuleValidator.TownRule(DefaultRule.TurtleTown(1)));
console.assert(RuleValidator.TownRule(DefaultRule.LeafTown()));
console.assert(RuleValidator.ClubRule(DefaultRule.Club()));
