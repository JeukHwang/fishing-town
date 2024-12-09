import { Politics } from "./rule/type";
import { compareFraction, parseFraction } from "./rule/util";

export type Vote = {
  yes: number;
  no: number;
  total: number;
};

export type VoteResult = "Approve" | "Pending" | "Reject";

export function isValidVote(vote: Vote): boolean {
  const isValidYes = Number.isInteger(vote.yes) && vote.yes >= 0;
  const isValidNo = Number.isInteger(vote.no) && vote.no >= 0;
  const isValidTotal =
    Number.isInteger(vote.total) &&
    vote.total >= 0 &&
    vote.yes + vote.no <= vote.total;
  return isValidYes && isValidNo && isValidTotal;
}

export function processVote(
  { yes, no, total }: Vote,
  { voteRatio, approvalRatio }: Politics
): VoteResult {
  const pV = parseFraction(voteRatio)!; // TODO : use parsedFraction for rule
  const voteRatioComparison = compareFraction({ n: yes + no, d: total }, pV);
  if (voteRatioComparison === "<") return "Pending";

  const pA = parseFraction(approvalRatio)!; // TODO : use parsedFraction for rule
  const assumeWorst = compareFraction({ n: yes, d: total }, pA);
  if (assumeWorst === ">" || assumeWorst === "=") return "Approve";
  const assumeBest = compareFraction({ n: total - no, d: total }, pA);
  if (assumeBest === "<") return "Reject";

  return "Pending";
}
