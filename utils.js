export function getRandomNumber(minInclusive, maxExclusive) {
    return Math.floor(Math.random() * (maxExclusive - minInclusive) + minInclusive);
}

export function getRandomFloat(minInclusive, maxExclusive){
    return Math.random() * (maxExclusive - minInclusive) + minInclusive;
}

export function formatNumber(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}