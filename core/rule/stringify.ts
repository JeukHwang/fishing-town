import {
  ClubRule,
  FeeCollection,
  FeeUsage,
  MembershipCondition,
  Politics,
  ShipOwnership,
  ShipUsage,
  TownRule,
  townRuleKey,
} from "./type";
import { parseFraction } from "./util";

type Stringify<T> = {
  [K in keyof T]: string;
};

type StringifiedTownRule = {
  [K in keyof TownRule]: Stringify<TownRule[K]>;
};

type StringifiedClubRule = {
  [K in keyof ClubRule]: Stringify<ClubRule[K]>;
};

class RuleEnglishStringify {
  static Politics(politics: Politics): Stringify<Politics> {
    const { voteRatio, approvalRatio } = politics;
    return {
      voteRatio: `All village decisions are only passed if (yes+no)/total ≥ ${voteRatio}.`,
      approvalRatio: `All village decisions are only passed if yes/(yes+no) ≥ ${approvalRatio}.`,
    };
  }

  static ShipOwnership(shipOwnership: ShipOwnership): Stringify<ShipOwnership> {
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

  static ShipUsage(shipUsage: ShipUsage): Stringify<ShipUsage> {
    const {
      maxIndividualShipsPerTurn,
      maxIndividualShipsOnSameTilePerTurn,
      shareRemainingFish,
      shareFishingPlan,
      maxTotalShipsOnSameTilePerTurn,
    } = shipUsage;
    return {
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
      maxTotalShipsOnSameTilePerTurn:
        shareFishingPlan && maxTotalShipsOnSameTilePerTurn !== "Infinity"
          ? `Villagers can deploy a maximum of ${maxTotalShipsOnSameTilePerTurn} boats on the same tile in one turn.`
          : "",
    };
  }

  static FeeCollection(feeCollection: FeeCollection): Stringify<FeeCollection> {
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

  static FeeUsage(feeUsage: FeeUsage): Stringify<FeeUsage> {
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

  static TownRule(townRule: TownRule, simplify: boolean): StringifiedTownRule {
    const object = {
      politics: this.Politics(townRule.politics),
      shipOwnership: this.ShipOwnership(townRule.shipOwnership),
      shipUsage: this.ShipUsage(townRule.shipUsage),
      feeCollection: this.FeeCollection(townRule.feeCollection),
      feeUsage: this.FeeUsage(townRule.feeUsage),
    };
    if (simplify) {
      return Object.fromEntries(
        Object.entries(object)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, categoryValue]) =>
            Object.values(categoryValue).some((v) => v !== "")
          )
          .map(([key, value]) => [
            key,
            Object.fromEntries(
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              Object.entries(value).filter(([_, v]) => v !== "")
            ),
          ])
      ) as StringifiedTownRule;
    } else {
      return object;
    }
  }

  static MembershipCondition(
    membershipCondition: MembershipCondition
  ): Stringify<MembershipCondition> {
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
    simplify: boolean
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

  static Diff(
    from: TownRule,
    to: TownRule,
    simplify: boolean
  ): Record<
    keyof TownRule,
    Record<
      string,
      { type: "added" | "deleted" | "updated" | "unchanged"; value: string }
    >
  > {
    const merge: TownRule = Object.fromEntries(
      townRuleKey.map((key) => [key, { ...from[key], ...to[key] }])
    ) as TownRule;

    const fromRule = RuleEnglishStringify.TownRule(from, true);
    const toRule = RuleEnglishStringify.TownRule(to, true);

    const diffRule = {} as Record<
      keyof TownRule,
      Record<
        string,
        { type: "added" | "deleted" | "updated" | "unchanged"; value: string }
      >
    >;

    for (const [category, categoryValue] of Object.entries(
      RuleEnglishStringify.TownRule(merge, false)
    ) as [keyof TownRule, Record<string, string>][]) {
      const subDiffRule: [
        string,
        { type: "added" | "deleted" | "updated" | "unchanged"; value: string }
      ][] = [];
      for (const key of Object.keys(categoryValue)) {
        const fromValue = (fromRule[category] as Record<string, string>)?.[key];
        const toValue = (toRule[category] as Record<string, string>)?.[key];
        const existFromString = fromValue !== undefined && fromValue !== "";
        const existToString = toValue !== undefined && toValue !== "";

        if (!existFromString && existToString) {
          subDiffRule.push([key, { type: "added", value: toValue }]);
        } else if (existFromString && !existToString) {
          subDiffRule.push([key, { type: "deleted", value: fromValue }]);
        } else if (existFromString && existToString) {
          if (fromValue !== toValue) {
            subDiffRule.push([key, { type: "updated", value: toValue }]);
          } else if (!simplify) {
            subDiffRule.push([key, { type: "unchanged", value: toValue }]);
          }
        }
      }
      if (subDiffRule.length > 0) {
        diffRule[category as keyof TownRule] = Object.fromEntries(subDiffRule);
      }
    }
    return diffRule;
  }
}

export { RuleEnglishStringify };
export type { StringifiedClubRule, StringifiedTownRule };
