const constants = require('./constants.js');

class Pool {
    /**
     * @param {number} totalActiveStake - The total stake of the pool in lovelaces.
     * @param {number} pledge - The amount of ADA pledged by the pool in lovelaces.
     * @param {number} margin - The margin percentage set by the pool.
     * @param {number} flatFee - The flat fee set by the pool in lovelaces(defaults to minPoolCost).
     * @param {number} numDelegators - The number of delegators in the pool.
     * @throws {Error} If any of the parameters are invalid.
     */
    constructor(totalActiveStake, pledge, numDelegators, margin, flatFee) {  // TODO: Set flatFee default to minPoolCost
        if (totalActiveStake < 0)
            throw new Error('Total stake cannot be negative');
        if (pledge < 0)
            throw new Error('Pledge cannot be negative');
        if (numDelegators < 0)
            throw new Error('Number of delegators cannot be negative');
        if (margin < 0)
            throw new Error('Margin cannot be negative');
        if (flatFee < 0)                                               
            throw new Error('Flat fee cannot be negative');
        this.totalActiveStake = totalActiveStake;
        this.pledge = pledge;
        this.numDelegators = numDelegators;
        this.margin = margin;
        this.flatFee = flatFee;                                         // TODO: Maybe set minPoolCost here like "if (flatFee < minPoolCost) { flatFee = minPoolCost }"?
    }

    /**
     * Calculates the saturation percentage of the pool.
     * @param {number} k - The desired number of pools set by the k parameter.
     * @returns {number} The saturation percentage of the pool.
     */
    getPoolSaturation(k) {
        const saturationLevel = constants.ADA_CIRCULATING_SUPPLY/k;
        const poolSaturation  = (this.totalActiveStake/1000000)/saturationLevel;
        return poolSaturation;
    }

    /**
     * Calculates the total reward earned by the pool.
     * @param {number} k - The desired number of pools set by the k parameter.
     * @param {number} a0 - The pledge influence factor set by the a0 parameter.
     * @returns {number} The total reward earned by the pool in lovelaces.
     */
    getTotalReward(k, a0) {
        // TODO: Needs to be verified
        // PRETTY SURE THIS IS VERY WRONG.  NUMBERS ARE OUT OF WHACK.
        const emissionPerEpoch = constants.RHO*constants.ADA_TOTAL_SUPPLY
        const allPoolsReward = emissionPerEpoch-(emissionPerEpoch*constants.TAU)
        
        const poolStakeEquity = this.totalActiveStake/constants.ADA_TOTAL_ACTIVE_STAKE
        const poolRewardEquity = poolStakeEquity*allPoolsReward

        const globalSaturationThreshold = poolRewardEquity/k;
        const totalReward = (poolRewardEquity / (1 + a0)) *
            (this.totalActiveStake + (this.pledge * a0 * ((this.totalActiveStake - this.pledge * (1 - this.totalActiveStake / globalSaturationThreshold))
                / globalSaturationThreshold)));
        return totalReward;
    }

    /**
     * Calculates the SPO's cut of the total pool reward.
     * @param {number} totalReward - The total reward earned by the pool in lovelaces.
     * @returns {number} The SPO's cut of the total pool reward in lovelaces.
     */
    getPoolReward(totalReward) {
        // TODO: Needs to be verified
        const poolReward = (this.margin*totalReward) + this.flatFee;
        return poolReward;
    }

    /**
     * Calculates the cut of the total pool reward owed to ALL delegators.
     * @param {number} totalReward - The total reward earned by the pool in lovelaces.
     * @param {number} poolReward -  The SPO's cut of the total pool reward in lovelaces.
     * @returns {number} The cut of the total pool reward owed to ALL delegators in lovelaces.
     */
    getAllDelegatorReward(totalReward, poolReward) {
        // TODO: Needs to be verified
        const allDelegatorReward = totalReward-poolReward;
        return allDelegatorReward;
    }

    /**
     * Calculates the cut of the delegator rewards owed to an individual delegator.
     * @param {number} individualDelegatorStake - The total amount of ADA an individual has staked to the pool in lovelaces.
     * @param {number} allDelegatorReward -  The cut of the total pool reward owed to ALL delegators in lovelaces.
     * @returns {number} The cut of the delegator rewards owed to an individual delegator in lovelaces.
     */
    getIndividualDelegatorReward(individualDelegatorStake, allDelegatorReward) {
        // TODO: Needs to be verified
        if (individualDelegatorStake > this.totalActiveStake)
            throw new Error('Delegator stake cannot be greater than total pool stake');
        const individualDelegatorEquity = individualDelegatorStake/this.totalActiveStake;
        const individualDelegatorReward = individualDelegatorEquity*allDelegatorReward  ;    // TODO: I believe margin and flatFee are taken out before this calculation, but I could be wrong
        return individualDelegatorReward;
    }
}
module.exports = { Pool }