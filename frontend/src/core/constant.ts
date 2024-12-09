export const constant = {
  initialParticipantBalance: 500, // Initial balance for participants in pearls
  initialParticipantBoats: 2, // Initial number of boats for participants
  survivalCostPerTurn: 100, // Cost per turn for survival in pearls
  initialVillageMaintenanceBalance: 0, // Initial balance for village maintenance in pearls

  boatPrice: {
    purchase: 500, // Boat purchase price in pearls
    sale: 250, // Boat sale price in pearls
  },

  boatMaintenanceCostPerTurn: 50, // Maintenance cost per turn for each boat in pearls
  fishPricePerTurn: 10, // Price per fish per turn in pearls (variable)

  boatCatchRatePerTurn: {
    initialRange: [30, 40], // Initial catch rate per turn (in fish)
    influencedBy: [
      "Number of boats on the tile",
      "Number of fish on the tile",
      "Catch probability",
      "Maximum catch per boat (100 fish)",
    ],
  },

  fishGrowth: {
    determinedBy: "Logistic growth formula", // Growth determined by logistic formula
    influencedBy: ["Maximum capacity per tile"],
  },

  fishMovement: {
    determinedBy: "Molecular diffusion formula", // Movement determined by molecular diffusion formula
    influencedBy: ["Movement probability between tiles"],
  },
} as const;
