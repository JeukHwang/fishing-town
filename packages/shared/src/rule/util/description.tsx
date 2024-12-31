import {
  FeeCollection,
  FeeUsage,
  MembershipCondition,
  Politics,
  ShipOwnership,
  ShipUsage,
} from "../type";

export type RuleDescription = {
  inputType: "Fraction" | "NumberOrInfinity" | "Number" | "Boolean";
  content: React.ReactNode;
};

export type DescriptionWrapper<T> = { [K in keyof T]: RuleDescription };

export type TownRuleDescription = {
  politics: DescriptionWrapper<Politics>;
  shipOwnership: DescriptionWrapper<ShipOwnership>;
  shipUsage: DescriptionWrapper<ShipUsage>;
  feeCollection: DescriptionWrapper<FeeCollection>;
  feeUsage: DescriptionWrapper<FeeUsage>;
};

export type ClubRuleDescription = {
  politics: DescriptionWrapper<Politics>;
  shipUsage: DescriptionWrapper<ShipUsage>;
  membershipCondition: DescriptionWrapper<MembershipCondition>;
};

export class RuleEnglishDescription {
  private static Politics(): DescriptionWrapper<Politics> {
    return {
      voteRatio: {
        inputType: "Fraction",
        content: (
          <>
            Minimum vote ratio required to approve the proposal
            <br />
            Vote ratio is <strong>{"(yes + no) / total"}</strong>
          </>
        ),
      },
      approvalRatio: {
        inputType: "Fraction",
        content: (
          <>
            Minimum approval ratio required to approve the proposal
            <br />
            Approval ratio is <strong>{"yes / (yes + no)"}</strong>
          </>
        ),
      },
    };
  }

  private static ShipOwnership(): DescriptionWrapper<ShipOwnership> {
    return {
      maxTotalShips: {
        inputType: "NumberOrInfinity",
        content: "Maximum ships the entire town can own",
      },
      maxIndividualShips: {
        inputType: "NumberOrInfinity",
        content: "Maximum ships a resident can own",
      },
    };
  }

  private static ShipUsage(): DescriptionWrapper<ShipUsage> {
    return {
      maxIndividualShipsPerTurn: {
        inputType: "NumberOrInfinity",
        content: "Maximum ships usable per turn by a resident",
      },
      maxIndividualShipsOnSameTilePerTurn: {
        inputType: "NumberOrInfinity",
        content: "Maximum ships usable on the same tile per turn by a resident",
      },
      shareRemainingFish: {
        inputType: "Boolean",
        content:
          "Indicates if residents must share information about fish left on tiles they fished",
      },
      shareFishingPlan: {
        inputType: "Boolean",
        content:
          "Indicates if residents must share the area they will fish in advance",
      },
      maxTotalShipsOnSameTilePerTurn: {
        inputType: "NumberOrInfinity",
        content: (
          <>
            Maximum ships usable on the same tile per turn for the entire town
            <br />
            Only applicable when <strong>Share Fishing Plan</strong> is true
          </>
        ),
      },
    };
  }

  private static FeeCollection(): DescriptionWrapper<FeeCollection> {
    return {
      taxRate: {
        inputType: "Fraction",
        content: "Rate of profit to collect as maintenance fee",
      },
      collectFromResidents: {
        inputType: "Boolean",
        content:
          "Indicates if the deficit in maintenance fee should be divided among residents",
      },
    };
  }

  private static FeeUsage(): DescriptionWrapper<FeeUsage> {
    return {
      survivalGrant: {
        inputType: "Boolean",
        content: "Support for residents who can't support themselves",
      },
      joinCost: {
        inputType: "Number",
        content: "Set cost to join the town",
      },
      leaveCost: {
        inputType: "Number",
        content: "Set cost to leave the town",
      },
      distributeRemaining: {
        inputType: "Fraction",
        content: "Distribute remaining maintenance fee to residents",
      },
    };
  }

  private static MembershipCondition(): DescriptionWrapper<MembershipCondition> {
    return {
      minIndividualShips: {
        inputType: "Number",
        content: "Minimum number of ships required to join the club",
      },
      maxIndividualShips: {
        inputType: "NumberOrInfinity",
        content: "Maximum number of ships allowed to join the club",
      },
    };
  }

  public static TownRule(): TownRuleDescription {
    return {
      politics: this.Politics(),
      shipOwnership: this.ShipOwnership(),
      shipUsage: this.ShipUsage(),
      feeCollection: this.FeeCollection(),
      feeUsage: this.FeeUsage(),
    };
  }

  public static ClubRule(): ClubRuleDescription {
    return {
      politics: this.Politics(),
      shipUsage: this.ShipUsage(),
      membershipCondition: this.MembershipCondition(),
    };
  }
}
