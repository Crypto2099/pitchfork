class Pool {
    constructor(totalStake, pledge, numDelegators) {
        if (totalStake < 0)
            throw new Error('Total stake cannot be negative');
        this.totalStake = totalStake;
        this.pledge = pledge;
        this.numDelegators = numDelegators
    }
}

module.exports = { Pool }