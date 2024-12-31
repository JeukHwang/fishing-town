const fractionPattern = /^(\d+)\/(\d+)$/;
/** @description If fraction is invalid, return null */
export function parseFraction(fraction) {
    const match = fractionPattern.exec(fraction);
    if (match === null)
        return null;
    const numerator = Number(match[1]);
    const denominator = Number(match[2]);
    const isValid = Number.isInteger(numerator) &&
        Number.isInteger(denominator) &&
        denominator > 0;
    if (!isValid)
        return null;
    return { n: numerator, d: denominator };
}
export function isFractionBetween0and1({ n, d }) {
    return 0 <= n && n <= d;
}
export function compareFraction(a, b) {
    const diff = a.n * b.d - b.n * a.d;
    return diff === 0 ? "=" : diff > 0 ? ">" : "<";
}
export function NOI2number(value) {
    return value === "Infinity" ? Infinity : value;
}
export function isZeroOrPositiveInteger(value) {
    return Number.isInteger(value) && value >= 0;
}
