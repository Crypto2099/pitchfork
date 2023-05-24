const { CardanoRSS } = require('./rss.js');
const { Pool } = require('./pools.js');
const constants = require('./constants.js')

try {
    invalid_K = new CardanoRSS(-1, 0.3, 340000000);
    console.error('Test failed: invalid_K')
} catch (error) {
    console.log('Test passed:', error.message);
}

try {
    a0_too_small = new CardanoRSS(500, -1, 340000000);
    console.error('Test failed: a0_too_small')
} catch (error) {
    console.log('Test passed:', error.message);
}

try {
    a0_too_big = new CardanoRSS(500, 11, 340000000);
    console.error('Test failed: a0_too_big')
} catch (error) {
    console.log('Test passed:', error.message);
}

try {
    invalid_minPoolCost = new CardanoRSS(500, 2, -1);
    console.error('Test failed: invalid_minPoolCost')
} catch (error) {
    console.log('Test passed:', error.message);
}

try {
    invalid_pool_stake = new Pool(-1, 0, 0);
    console.error('Test failed: invalid_pool_stake')
} catch (error) {
    console.log('Test passed:', error.message);
}

try {
    console.log('Test passed: constants.TAU=', constants.TAU)
} catch (error) {
    console.error('Test failed:', error.message);
}
