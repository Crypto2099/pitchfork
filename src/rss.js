class CardanoRSS {
    constructor(k, a0, minPoolCost) {
        if (k < 1)
            throw new Error('k cannot be less than 1');
        if ((a0 < 0) || (a0 > 10))
            throw new Error('a0 needs to be greater than 0, but less than 10')
        if (minPoolCost < 0)
            throw new Error('minPoolCost cannot be negative');
        this.k = k;
        this.a0 = a0;
        this.minPoolCost = minPoolCost
        this.globalSaturationThreshold = 1 / k;
    }

    calculatePoolReward(poolPledge, poolStake) {
        const TOTAL_EPOCH_REWARDS_R = 1;
        const pledge_ = Math.min(poolPledge, this.globalSaturationThreshold);
        const stake_ = Math.min(poolStake, this.globalSaturationThreshold);
        const r = (TOTAL_EPOCH_REWARDS_R / (1 + this.a0)) *
            (stake_ + (pledge_ * this.a0 * ((stake_ - pledge_ * (1 - stake_ / this.globalSaturationThreshold))
                / this.globalSaturationThreshold)));
        return r;
    }
}

module.exports = { CardanoRSS }