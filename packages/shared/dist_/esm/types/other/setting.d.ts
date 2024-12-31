export declare const setting: {
    readonly initialParticipantBalance: 500;
    readonly initialParticipantBoats: 2;
    readonly survivalCostPerTurn: 100;
    readonly initialVillageMaintenanceBalance: 0;
    readonly boatPrice: {
        readonly purchase: 500;
        readonly sale: 250;
    };
    readonly boatMaintenanceCostPerTurn: 50;
    readonly fishPricePerTurn: 10;
    readonly boatCatchRatePerTurn: {
        readonly initialRange: readonly [30, 40];
        readonly influencedBy: readonly ["Number of boats on the tile", "Number of fish on the tile", "Catch probability", "Maximum catch per boat (100 fish)"];
    };
    readonly fishGrowth: {
        readonly determinedBy: "Logistic growth formula";
        readonly influencedBy: readonly ["Maximum capacity per tile"];
    };
    readonly fishMovement: {
        readonly determinedBy: "Molecular diffusion formula";
        readonly influencedBy: readonly ["Movement probability between tiles"];
    };
};
