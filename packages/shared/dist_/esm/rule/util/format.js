import { loadLanguage } from "../../language";
import { parseFraction } from "../../util/number";
export class RuleFormatter {
    constructor(language) {
        this.language = language;
        this.pack = loadLanguage(language);
    }
    apply(template, ...args) {
        return template.replace(/\$\d/g, (match) => {
            const index = parseInt(match.replace("$", ""));
            return args[index - 1].toString();
        });
    }
    Politics(politics) {
        const pack = this.pack.politics;
        const { voteRatio, approvalRatio } = politics;
        return {
            voteRatio: this.apply(pack.voteRatio, voteRatio),
            approvalRatio: this.apply(pack.approvalRatio, approvalRatio),
        };
    }
    ShipOwnership(shipOwnership) {
        const pack = this.pack.shipOwnership;
        const { maxTotalShips, maxIndividualShips } = shipOwnership;
        return {
            maxTotalShips: maxTotalShips !== "Infinity"
                ? this.apply(pack.maxTotalShips, maxTotalShips)
                : "",
            maxIndividualShips: maxIndividualShips !== "Infinity"
                ? this.apply(pack.maxIndividualShips, maxIndividualShips)
                : "",
        };
    }
    ShipUsage(shipUsage) {
        const pack = this.pack.shipUsage;
        const { maxIndividualShipsPerTurn, maxIndividualShipsOnSameTilePerTurn, shareRemainingFish, shareFishingPlan, maxTotalShipsOnSameTilePerTurn, } = shipUsage;
        return {
            maxIndividualShipsPerTurn: maxIndividualShipsPerTurn !== "Infinity"
                ? this.apply(pack.maxIndividualShipsPerTurn, maxIndividualShipsPerTurn)
                : "",
            maxIndividualShipsOnSameTilePerTurn: maxIndividualShipsOnSameTilePerTurn !== "Infinity"
                ? this.apply(pack.maxIndividualShipsOnSameTilePerTurn, maxIndividualShipsOnSameTilePerTurn)
                : "",
            shareRemainingFish: shareRemainingFish
                ? this.apply(pack.shareRemainingFish)
                : ``,
            shareFishingPlan: shareFishingPlan
                ? this.apply(pack.shareFishingPlan)
                : ``,
            maxTotalShipsOnSameTilePerTurn: shareFishingPlan && maxTotalShipsOnSameTilePerTurn !== "Infinity"
                ? this.apply(pack.maxTotalShipsOnSameTilePerTurn, maxTotalShipsOnSameTilePerTurn)
                : "",
        };
    }
    FeeCollection(feeCollection) {
        const pack = this.pack.feeCollection;
        const { taxRate, collectFromResidents } = feeCollection;
        return {
            taxRate: parseFraction(taxRate).n !== 0
                ? this.apply(pack.taxRate, taxRate)
                : "",
            collectFromResidents: collectFromResidents
                ? this.apply(pack.collectFromResidents)
                : "",
        };
    }
    FeeUsage(feeUsage) {
        const pack = this.pack.feeUsage;
        const { survivalGrant, joinCost, leaveCost, distributeRemaining } = feeUsage;
        return {
            survivalGrant: survivalGrant ? this.apply(pack.survivalGrant) : "",
            joinCost: feeUsage.joinCost !== 0 ? this.apply(pack.joinCost, joinCost) : "",
            leaveCost: feeUsage.leaveCost !== 0 ? this.apply(pack.leaveCost, leaveCost) : "",
            distributeRemaining: parseFraction(distributeRemaining).n !== 0
                ? this.apply(pack.distributeRemaining, distributeRemaining)
                : "",
        };
    }
    TownRule(townRule, simplify) {
        const object = {
            politics: this.Politics(townRule.politics),
            shipOwnership: this.ShipOwnership(townRule.shipOwnership),
            shipUsage: this.ShipUsage(townRule.shipUsage),
            feeCollection: this.FeeCollection(townRule.feeCollection),
            feeUsage: this.FeeUsage(townRule.feeUsage),
        };
        if (simplify) {
            return Object.fromEntries(Object.entries(object)
                .filter(([_, categoryValue]) => Object.values(categoryValue).some((v) => v !== ""))
                .map(([key, value]) => [
                key,
                Object.fromEntries(Object.entries(value).filter(([_, v]) => v !== "")),
            ]));
        }
        else {
            return object;
        }
    }
    MembershipCondition(membershipCondition) {
        const pack = this.pack.membershipCondition;
        const { minIndividualShips, maxIndividualShips } = membershipCondition;
        return {
            minIndividualShips: minIndividualShips !== 0
                ? this.apply(pack.minIndividualShips, minIndividualShips)
                : "",
            maxIndividualShips: maxIndividualShips !== "Infinity"
                ? this.apply(pack.maxIndividualShips, maxIndividualShips)
                : "",
        };
    }
    ClubRule(clubRule, simplify) {
        const object = {
            politics: this.Politics(clubRule.politics),
            shipUsage: this.ShipUsage(clubRule.shipUsage),
            membershipCondition: this.MembershipCondition(clubRule.membershipCondition),
        };
        if (simplify) {
            return Object.fromEntries(Object.entries(object)
                .filter(([_, categoryValue]) => Object.values(categoryValue).some((v) => v !== ""))
                .map(([key, value]) => [
                key,
                Object.fromEntries(Object.entries(value).filter(([_, v]) => v !== "")),
            ]));
        }
        else {
            return object;
        }
    }
}
