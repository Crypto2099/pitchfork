const { CardanoRSS } = require('./rss.js');
const { Pool } = require('./pools.js');
const constants = require('./constants.js');

// Test if pool methods are working correctly.
try {
    testPool = new Pool(60000000000000, 10000000000, 100, 0.01, 340000000);          // TODO: Test with verfiable parameters.
    poolSaturation = testPool.getPoolSaturation(500);
    totalReward = testPool.getTotalReward(500, 0.3, 5000);
    poolReward = testPool.getPoolReward(totalReward);
    allDelegatorReward = testPool.getAllDelegatorReward(totalReward, poolReward);
    individualDelegatorReward = testPool.getIndividualDelegatorReward(2500000000, allDelegatorReward);

    console.log("Pool saturation: ", poolSaturation);
    console.log("Total reward: ", totalReward/1000000);
    console.log("Pool reward: ", poolReward/1000000);
    console.log("All delegator reward: ", allDelegatorReward/1000000);
    console.log("Individual delegator reward: ", individualDelegatorReward/1000000);
    console.log("PASSED: All test pool tests.\n");
} catch (error) {
    console.error("FAILED: ", error, "\n");
}
  
// Read in pools with JSON if we want to.
try {
    // TODO: Function to read JSON data into pool objects.
} catch (error) {
    console.error("FAILED: ", error);
}
