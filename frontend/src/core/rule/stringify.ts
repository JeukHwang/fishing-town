import {
  ClubRule,
  FeeCollection,
  FeeUsage,
  MembershipCondition,
  Politics,
  ShipOwnership,
  ShipUsage,
  TownRule,
} from "./type";
import { parseFraction } from "./util";

type Stringify<T> = {
  [K in keyof T]: string;
};

type StringifiedPolitics = Stringify<Politics>;

type StringifiedShipOwnership = Stringify<ShipOwnership>;

type StringifiedShipUsage<T extends ShipUsage> =
  T["shareFishingPlan"] extends true
    ? {
        maxIndividualShipsPerTurn: string;
        maxIndividualShipsOnSameTilePerTurn: string;
        shareRemainingFish: string;
        shareFishingPlan: string;
      }
    : {
        maxIndividualShipsPerTurn: string;
        maxIndividualShipsOnSameTilePerTurn: string;
        shareRemainingFish: string;
        shareFishingPlan: string;
        maxTotalShipsOnSameTilePerTurn: string;
      };

type StringifiedFeeCollection = Stringify<FeeCollection>;

type StringifiedFeeUsage = Stringify<FeeUsage>;

type StringifiedTownRule = {
  [K in keyof TownRule]: Stringify<TownRule[K]>;
};

type StringifiedMembershipCondition = Stringify<MembershipCondition>;

type StringifiedClubRule = {
  [K in keyof ClubRule]: Stringify<ClubRule[K]>;
};

class RuleEnglishStringify {
  static Politics(politics: Politics): StringifiedPolitics {
    const { voteRatio, approvalRatio } = politics;
    return {
      voteRatio: `All village decisions are only passed if (yes+no)/total ≥ ${voteRatio}.`,
      approvalRatio: `All village decisions are only passed if yes/(yes+no) ≥ ${approvalRatio}.`,
    };
  }

  static ShipOwnership(shipOwnership: ShipOwnership): StringifiedShipOwnership {
    const { maxTotalShips, maxIndividualShips } = shipOwnership;
    return {
      maxTotalShips:
        maxTotalShips !== "Infinity"
          ? `Villagers can own a maximum of ${maxTotalShips} boats in total`
          : "",
      maxIndividualShips:
        maxIndividualShips !== "Infinity"
          ? `Each villager can own a maximum of ${maxIndividualShips} boats.`
          : "",
    };
  }

  static ShipUsage<T extends ShipUsage>(shipUsage: T): StringifiedShipUsage<T> {
    const {
      maxIndividualShipsPerTurn,
      maxIndividualShipsOnSameTilePerTurn,
      shareRemainingFish,
      shareFishingPlan,
    } = shipUsage;
    const common = {
      maxIndividualShipsPerTurn:
        maxIndividualShipsPerTurn !== "Infinity"
          ? `Villagers can deploy a maximum of ${maxIndividualShipsPerTurn} boats on the same tile in one turn.`
          : "",
      maxIndividualShipsOnSameTilePerTurn:
        maxIndividualShipsOnSameTilePerTurn !== "Infinity"
          ? `Villagers can use a maximum of ${maxIndividualShipsOnSameTilePerTurn} boats in one turn.`
          : "",
      shareRemainingFish: shareRemainingFish
        ? `All villagers must share the number of fish remaining in the tiles they fished.`
        : ``,
      shareFishingPlan: shareFishingPlan
        ? `All villagers must share in advance the area they plan to fish.`
        : ``,
    };
    if (shareFishingPlan) {
      return {
        ...common,
        maxTotalShipsOnSameTilePerTurn:
          shipUsage.maxTotalShipsOnSameTilePerTurn !== "Infinity"
            ? `Villagers can deploy a maximum of ${shipUsage.maxTotalShipsOnSameTilePerTurn} boats on the same tile in one turn.`
            : "",
      };
    } else {
      return common;
    }
  }

  static FeeCollection(feeCollection: FeeCollection): StringifiedFeeCollection {
    const { taxRate, collectFromResidents } = feeCollection;
    return {
      taxRate:
        parseFraction(taxRate)!.n !== 0
          ? `After fishing, villagers must pay ${taxRate} of their profits as village maintenance fees.`
          : "",
      collectFromResidents: collectFromResidents
        ? `If the village maintenance fees are insufficient, they are collected from the villagers (except for villagers who don't have enough money).`
        : "",
    };
  }

  static FeeUsage(feeUsage: FeeUsage): StringifiedFeeUsage {
    const { survivalGrant, joinCost, leaveCost, distributeRemaining } =
      feeUsage;
    return {
      survivalGrant: survivalGrant
        ? `Support the survival costs of villagers who cannot sustain themselves.`
        : "",
      joinCost:
        feeUsage.joinCost !== 0
          ? `Villagers must pay ${joinCost} pearls as a village maintenance fee to leave the village (note that 'n*(number of villagers)**0.5 pearls' are consumed each turn).` // TODO: n should be changed to a number
          : "",
      leaveCost:
        feeUsage.leaveCost !== 0
          ? `Villagers must pay ${leaveCost} pearls as a village maintenance fee to enter the village. (note that 'n*(number of villagers)**0.5 pearls' are consumed each turn).` // TODO: n should be changed to a number
          : "",
      distributeRemaining:
        parseFraction(distributeRemaining)!.n !== 0
          ? `After all other expenditures, ${distributeRemaining} of the remaining village maintenance fees are equally distributed among the villagers.`
          : "",
    };
  }

  static TownRule(townRule: TownRule): StringifiedTownRule {
    return {
      politics: this.Politics(townRule.politics),
      shipOwnership: this.ShipOwnership(townRule.shipOwnership),
      shipUsage: this.ShipUsage(townRule.shipUsage),
      feeCollection: this.FeeCollection(townRule.feeCollection),
      feeUsage: this.FeeUsage(townRule.feeUsage),
    };
  }

  static MembershipCondition(
    membershipCondition: MembershipCondition
  ): StringifiedMembershipCondition {
    const { minIndividualShips, maxIndividualShips } = membershipCondition;
    return {
      minIndividualShips:
        minIndividualShips !== 0
          ? `To join the group, members must own at least ${minIndividualShips} boats.`
          : "",
      maxIndividualShips:
        maxIndividualShips !== "Infinity"
          ? `To join the group, members must own no more than ${maxIndividualShips} boats.`
          : "",
    };
  }

  static ClubRule(clubRule: ClubRule): StringifiedClubRule {
    const { politics, shipUsage, membershipCondition } = clubRule;
    return {
      politics: this.Politics(politics),
      shipUsage: this.ShipUsage(shipUsage),
      membershipCondition: this.MembershipCondition(membershipCondition),
    };
  }

  static Combine(
    stringifiedRule: StringifiedTownRule | StringifiedClubRule,
    simplify = false
  ): string {
    let string = "";
    if (simplify) {
      for (const [key, value] of Object.entries(stringifiedRule)) {
        let substring = "";
        for (const [key2, value2] of Object.entries(value)) {
          if (value2 !== "") {
            substring += `    ${key2}:\n`;
            substring += `    ${value2}\n`;
          }
        }
        if (substring !== "") {
          string += `${key}:\n${substring}`;
        }
      }
    } else {
      for (const [key, value] of Object.entries(stringifiedRule)) {
        string += `${key}:\n`;
        for (const [key2, value2] of Object.entries(value)) {
          string += `    ${key2}:\n`;
          if (value2 !== "") {
            string += `    ${value2}\n`;
          }
        }
      }
    }
    return string;
  }
}

export { RuleEnglishStringify };
export type {
  StringifiedClubRule,
  StringifiedFeeCollection,
  StringifiedFeeUsage,
  StringifiedMembershipCondition,
  StringifiedPolitics,
  StringifiedShipOwnership,
  StringifiedShipUsage,
  StringifiedTownRule,
};
