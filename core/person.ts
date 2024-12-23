import { NOI2number } from "./rule/util";
import { Club, Person, Town } from "./type";

type Return = { value: true } | { value: false; message: string };

export default class PersonJudge {
  private person: Person;

  constructor(person: Person) {
    this.person = person;
  }

  buyShip(price: number): Return {
    if (this.person.money < price) {
      return { value: false, message: "Not enough money" };
    }

    const townRule = this.person.town.rule.content;

    const maxIndividualShips = NOI2number(
      townRule.shipOwnership.maxIndividualShips
    );
    if (maxIndividualShips <= this.person.ships) {
      return {
        value: false,
        message: `Town resident cannot own more than ${maxIndividualShips} ${
          maxIndividualShips === 1 ? "ship" : "ships"
        }`,
      };
    }

    const maxTotalShips = NOI2number(townRule.shipOwnership.maxTotalShips);
    const residentsTotalShips = this.person.town.residents.reduce(
      (v, r) => v + r.ships,
      0
    );
    if (maxTotalShips <= residentsTotalShips) {
      return {
        value: false,
        message: `Town cannot own more than ${maxTotalShips} ${
          maxTotalShips === 1 ? "ship" : "ships"
        }`,
      };
    }

    for (const club of this.person.clubs) {
      const rule = club.rule.content;
      const maxIndividualShips = NOI2number(
        rule.membershipCondition.maxIndividualShips
      );
      if (maxIndividualShips <= this.person.ships) {
        return {
          value: false,
          message: `Club member of ${
            club.name
          } cannot own more than ${maxIndividualShips} ${
            maxIndividualShips === 1 ? "ship" : "ships"
          }`,
        };
      }
    }

    return { value: true };
  }

  sellShip(): Return {
    if (this.person.ships <= 0) {
      return { value: false, message: "No ship to sell" };
    }

    for (const club of this.person.clubs) {
      const rule = club.rule.content;
      const minIndividualShips = NOI2number(
        rule.membershipCondition.minIndividualShips
      );
      if (minIndividualShips >= this.person.ships) {
        return {
          value: false,
          message: `Club member of ${
            club.name
          } cannot own less than ${minIndividualShips} ${
            minIndividualShips === 1 ? "ship" : "ships"
          }`,
        };
      }
    }

    return { value: true };
  }

  useShip(): { min: number; max: number } {
    // town rule
    // club rule
  }

  moveTown(town: Town): boolean {
    const cost =
      this.person.town.rule.content.feeUsage.leaveCost +
      town.rule.content.feeUsage.joinCost;
    return this.person.money >= cost;
  }

  joinClub(club: Club): boolean {
    const { minIndividualShips, maxIndividualShips } =
      club.rule.content.membershipCondition;
    return (
      minIndividualShips <= this.person.ships &&
      this.person.ships <= NOI2number(maxIndividualShips)
    );
  }

  maintainClub(club: Club): boolean {
    return this.joinClub(club);
  }

  leaveClub(): boolean {
    return true;
  }
}
