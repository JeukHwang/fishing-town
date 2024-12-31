const reader = {
    meta: {
        name: "English",
    },
    politics: {
        voteRatio: `All village decisions are only passed if (yes+no)/total ≥ $1.`,
        approvalRatio: `All village decisions are only passed if yes/(yes+no) ≥ $1.`,
    },
    shipOwnership: {
        maxTotalShips: `Villagers can own a maximum of $1 boats in total.`,
        maxIndividualShips: `Each villager can own a maximum of $1 boats.`,
    },
    shipUsage: {
        maxIndividualShipsPerTurn: `Villagers can deploy a maximum of $1 boats on the same tile in one turn.`,
        maxIndividualShipsOnSameTilePerTurn: `Villagers can use a maximum of $1 boats in one turn.`,
        shareRemainingFish: `All villagers must share the number of fish remaining in the tiles they fished.`,
        shareFishingPlan: `All villagers must share in advance the area they plan to fish.`,
        maxTotalShipsOnSameTilePerTurn: `Villagers can deploy a maximum of $1 boats on the same tile in one turn.`,
    },
    feeCollection: {
        taxRate: `After fishing, villagers must pay $1 of their profits as village maintenance fees.`,
        collectFromResidents: `If the village maintenance fees are insufficient, they are collected from the villagers (except for villagers who don't have enough money).`,
    },
    feeUsage: {
        survivalGrant: `Support the survival costs of villagers who cannot sustain themselves.`,
        joinCost: `Villagers must pay $1 pearls as a village maintenance fee to leave the village. Note that 'n*(number of villagers)**0.5 pearls' are consumed each turn.`, // TODO: n should be changed to a number
        leaveCost: `Villagers must pay $1 pearls as a village maintenance fee to enter the village. Note that 'n*(number of villagers)**0.5 pearls' are consumed each turn.`, // TODO: n should be changed to a number
        distributeRemaining: `After all other expenditures, $1 of the remaining village maintenance fees are equally distributed among the villagers.`,
    },
    membershipCondition: {
        minIndividualShips: `To join the group, members must own at least $1 boats.`,
        maxIndividualShips: `To join the group, members must own no more than $1 boats.`,
    },
};
export default reader;
