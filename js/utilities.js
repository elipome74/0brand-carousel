/* This function returns a random value among 'VIDEO', 'PLAYLIST', 'NEWS', 'OTHER' */
let randType = () => {
    let types = ['VIDEO', 'PLAYLIST', 'NEWS', 'OTHER'];
    return types[getRndInteger(0,3)];
}

/* This function returns a random integer between 1 and 10800 (1s - 3 h) */
let randTime = () => {
    return getRndInteger(1,10800);
}

/* This function returns a random value between 'single' and 'collection' */
let randCardinality = () => {
    let cardinality = ['single','collection'];
    return cardinality[Math.random() > 0.5 ? 0 : 1];
}

/* This function returns a random integer between min and max values */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}