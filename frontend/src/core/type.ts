import { ClubRule, TownRule } from "./rule/type";
import { Branded, TownName } from "./util";

type Account = {
  id: Branded<string, "Account">;

  name: string;
  password: string;
  email: string;
  photo: string;
};

type Person = {
  id: Branded<string, "Person">;
  account: Account; // Id

  town: Town; // Id
  clubs: Club[]; // Id

  ships: number;
  money: number;

  deadAt: number;
};

type Rule<T extends "Town" | "Club"> = {
  id: Branded<string, T>;

  town: Town; // Id

  content: T extends "Town" ? TownRule : ClubRule;
};

type Proposal = {};

type Town = {
  id: Branded<string, "Town">;

  //   rule: Rule<"Town">; // Id
  //   residents: Person[]; // Id
  name: TownName;
  money: number;
};

type Club = {
  id: Branded<string, "Club">;

  town: Town; // Id
  //   rule: Rule<"Club">; // Id
  //   members: Person[]; // Id

  name: string;
};

type Game = {
  towns: Town[];
  clubs: Club[];
  persons: Person[];
  day: number;
  maxDay: number;
};

export type { Account, Club, Game, Person, Rule, Town };
