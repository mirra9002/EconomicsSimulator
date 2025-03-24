export function getRandomNumber(minInclusive, maxExclusive) {
    return Math.floor(Math.random() * (maxExclusive - minInclusive) + minInclusive);
}