/* Returns a random value among 'VIDEO', 'PLAYLIST', 'NEWS', 'OTHER' */
let randType = () => {
    let types = ['VIDEO', 'PLAYLIST', 'NEWS', 'OTHER'];
    return types[getRndInteger(0,3)];
}

/* Returns a random integer between 1 and 10800 (1s - 3 h) */
let randTime = () => {
    return getRndInteger(1,10800);
}

/* Returns a random value between 'single' and 'collection' */
let randCardinality = () => {
    let cardinality = ['single','collection'];
    return cardinality[Math.random() > 0.5 ? 0 : 1];
}

/* Returns a random integer between min and max values */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

/* Coverts seconds in human readable date time format */
function timeConvert(totalSeconds) { 
    let hours = Math.floor(totalSeconds / 3600) === 0 ? '' : Math.floor(totalSeconds / 3600) + ' h';
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60) === 0 ? '' : ' ' + Math.floor(totalSeconds / 60) + ' m';
    let seconds = totalSeconds % 60 === 0 ? '' : ' ' + totalSeconds % 60 + ' s';     
    return hours + minutes + seconds;   
}

/* Wait ms milliseconds */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}