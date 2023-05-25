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
        this.minPoolCost = minPoolCost;
    }
}

module.exports = { CardanoRSS }