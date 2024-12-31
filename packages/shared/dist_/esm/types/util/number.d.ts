/**
 * @range Integer for numerator, positive integer for denominator
 */
export type Fraction = `${number}/${number}`;
export type ParsedFraction = {
    n: number;
    d: number;
};
/** @description If fraction is invalid, return null */
export declare function parseFraction(fraction: Fraction): ParsedFraction | null;
export declare function isFractionBetween0and1({ n, d }: ParsedFraction): boolean;
export declare function compareFraction(a: ParsedFraction, b: ParsedFraction): "<" | "=" | ">";
export type NumberOrInfinity = number | "Infinity";
export declare function NOI2number(value: NumberOrInfinity): number;
export declare function isZeroOrPositiveInteger(value: number): boolean;
