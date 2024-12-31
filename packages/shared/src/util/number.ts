/**
 * @range Integer for numerator, positive integer for denominator
 */
export type Fraction = `${number}/${number}`;
const fractionPattern = /^(\d+)\/(\d+)$/;
export type ParsedFraction = { n: number; d: number };

/** @description If fraction is invalid, return null */
export function parseFraction(fraction: Fraction): ParsedFraction | null {
  const match = fractionPattern.exec(fraction);
  if (match === null) return null;
  const numerator = Number(match[1]);
  const denominator = Number(match[2]);
  const isValid =
    Number.isInteger(numerator) &&
    Number.isInteger(denominator) &&
    denominator > 0 &&
    `${numerator}/${denominator}` === fraction;
  if (!isValid) return null;
  return { n: numerator, d: denominator };
}

export function isFractionBetween0and1({ n, d }: ParsedFraction): boolean {
  return 0 <= n && n <= d;
}

export function compareFraction(
  a: ParsedFraction,
  b: ParsedFraction
): "<" | "=" | ">" {
  const diff = a.n * b.d - b.n * a.d;
  return diff === 0 ? "=" : diff > 0 ? ">" : "<";
}

export type NumberOrInfinity = number | "Infinity";

export function NOI2number(value: NumberOrInfinity): number {
  return value === "Infinity" ? Infinity : value;
}

export function isZeroOrPositiveInteger(value: number): boolean {
  return Number.isInteger(value) && value >= 0;
}
