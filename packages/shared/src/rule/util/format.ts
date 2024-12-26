import { LanguageType, loadLanguage } from "../../language";
import { LanguagePack } from "../../language/type";
import { parseFraction } from "../../util/number";
import {
  ClubRule,
  FeeCollection,
  FeeUsage,
  MembershipCondition,
  Politics,
  ShipOwnership,
  ShipUsage,
  TownRule,
} from "../type";

export type Readable<T> = { [K in keyof T]: string };
export type ReadableTownRule = { [K in keyof TownRule]: Readable<TownRule[K]> };
export type ReadableClubRule = { [K in keyof ClubRule]: Readable<ClubRule[K]> };

export class RuleFormatter {
  public readonly language: LanguageType;
  private readonly pack: LanguagePack;

  public constructor(language: LanguageType) {
    this.language = language;
    this.pack = loadLanguage(language);
  }

  private apply(template: string, ...args: any[]): string {
    return template.replace(/\$\d/g, (match) => {
      const index = parseInt(match[1]);
      return args[index - 1].toString();
    });
  }

  private Politics(politics: Politics): Readable<Politics> {
    const pack = this.pack.politics;
    const { voteRatio, approvalRatio } = politics;
    return {
      voteRatio: this.apply(pack.voteRatio, voteRatio),
      approvalRatio: this.apply(pack.approvalRatio, approvalRatio),
    };
  }

  private ShipOwnership(shipOwnership: ShipOwnership): Readable<ShipOwnership> {
    const pack = this.pack.shipOwnership;
    const { maxTotalShips, maxIndividualShips } = shipOwnership;
    return {
      maxTotalShips:
        maxTotalShips !== "Infinity"
          ? this.apply(pack.maxTotalShips, maxTotalShips)
          : "",
      maxIndividualShips:
        maxIndividualShips !== "Infinity"
          ? this.apply(pack.maxIndividualShips, maxIndividualShips)
          : "",
    };
  }

  private ShipUsage(shipUsage: ShipUsage): Readable<ShipUsage> {
    const pack = this.pack.shipUsage;
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
          ? this.apply(
              pack.maxIndividualShipsPerTurn,
              maxIndividualShipsPerTurn
            )
          : "",
      maxIndividualShipsOnSameTilePerTurn:
        maxIndividualShipsOnSameTilePerTurn !== "Infinity"
          ? this.apply(
              pack.maxIndividualShipsOnSameTilePerTurn,
              maxIndividualShipsOnSameTilePerTurn
            )
          : "",
      shareRemainingFish: shareRemainingFish
        ? this.apply(pack.shareRemainingFish)
        : ``,
      shareFishingPlan: shareFishingPlan
        ? this.apply(pack.shareFishingPlan)
        : ``,
      maxTotalShipsOnSameTilePerTurn:
        shareFishingPlan && maxTotalShipsOnSameTilePerTurn !== "Infinity"
          ? this.apply(
              pack.maxTotalShipsOnSameTilePerTurn,
              maxTotalShipsOnSameTilePerTurn
            )
          : "",
    };
  }

  private FeeCollection(feeCollection: FeeCollection): Readable<FeeCollection> {
    const pack = this.pack.feeCollection;
    const { taxRate, collectFromResidents } = feeCollection;
    return {
      taxRate:
        parseFraction(taxRate)!.n !== 0
          ? this.apply(pack.taxRate, taxRate)
          : "",
      collectFromResidents: collectFromResidents
        ? this.apply(pack.collectFromResidents)
        : "",
    };
  }

  private FeeUsage(feeUsage: FeeUsage): Readable<FeeUsage> {
    const pack = this.pack.feeUsage;
    const { survivalGrant, joinCost, leaveCost, distributeRemaining } =
      feeUsage;
    return {
      survivalGrant: survivalGrant ? this.apply(pack.survivalGrant) : "",
      joinCost:
        feeUsage.joinCost !== 0 ? this.apply(pack.joinCost, joinCost) : "",
      leaveCost:
        feeUsage.leaveCost !== 0 ? this.apply(pack.leaveCost, leaveCost) : "",
      distributeRemaining:
        parseFraction(distributeRemaining)!.n !== 0
          ? this.apply(pack.distributeRemaining, distributeRemaining)
          : "",
    };
  }

  public TownRule(townRule: TownRule, simplify: boolean): ReadableTownRule {
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
          .filter(([_, categoryValue]) =>
            Object.values(categoryValue).some((v) => v !== "")
          )
          .map(([key, value]) => [
            key,
            Object.fromEntries(
              Object.entries(value).filter(([_, v]) => v !== "")
            ),
          ])
      ) as ReadableTownRule;
    } else {
      return object;
    }
  }

  private MembershipCondition(
    membershipCondition: MembershipCondition
  ): Readable<MembershipCondition> {
    const pack = this.pack.membershipCondition;
    const { minIndividualShips, maxIndividualShips } = membershipCondition;
    return {
      minIndividualShips:
        minIndividualShips !== 0
          ? this.apply(pack.minIndividualShips, minIndividualShips)
          : "",
      maxIndividualShips:
        maxIndividualShips !== "Infinity"
          ? this.apply(pack.maxIndividualShips, maxIndividualShips)
          : "",
    };
  }

  public ClubRule(clubRule: ClubRule, simplify: boolean): ReadableClubRule {
    const object = {
      politics: this.Politics(clubRule.politics),
      shipUsage: this.ShipUsage(clubRule.shipUsage),
      membershipCondition: this.MembershipCondition(
        clubRule.membershipCondition
      ),
    };
    if (simplify) {
      return Object.fromEntries(
        Object.entries(object)
          .filter(([_, categoryValue]) =>
            Object.values(categoryValue).some((v) => v !== "")
          )
          .map(([key, value]) => [
            key,
            Object.fromEntries(
              Object.entries(value).filter(([_, v]) => v !== "")
            ),
          ])
      ) as ReadableClubRule;
    } else {
      return object;
    }
  }
}
