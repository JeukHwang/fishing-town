import { ClubRule, TownRule } from "./type";

type TownProposal = {
  /**
   * @description The name of the proposal
   */
  name: string;

  /**
   * @description The description of the proposal
   */
  description: string;

  /**
   * @description The rule changes of the proposal
   */
  diff: Partial<TownRule>;
};

type ClubProposal = {
  /**
   * @description The name of the proposal
   */
  name: string;

  /**
   * @description The description of the proposal
   */
  description: string;

  /**
   * @description The rule changes of the proposal
   */
  diff: Partial<ClubRule>;
};

export type { ClubProposal, TownProposal };
