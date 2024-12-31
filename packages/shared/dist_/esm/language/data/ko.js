const reader = {
    meta: {
        name: "Korean",
    },
    politics: {
        voteRatio: `마을의 모든 결정은 (찬성+반대)/전체 ≥ $1인 경우에만 가결된다.`,
        approvalRatio: `마을의 모든 결정은 찬성/(찬성+반대) ≥ $1인 경우에만 가결된다.`,
    },
    shipOwnership: {
        maxTotalShips: `주민은 전체 최대 $1개의 배를 소유할 수 있다.`,
        maxIndividualShips: `주민은 각자 최대 $1개의 배를 소유할 수 있다.`,
    },
    shipUsage: {
        maxIndividualShipsPerTurn: `주민은 한 턴의 같은 타일에 최대 $1개의 배를 사용할 수 있다.`,
        maxIndividualShipsOnSameTilePerTurn: `주민은 한 턴에 최대 $1개의 배를 사용할 수 있다.`,
        shareRemainingFish: `전체 주민은 본인이 어획한 타일에 남은 물고기의 수를 공유해야 한다.`,
        shareFishingPlan: `전체 주민은 본인이 어획할 지역을 사전에 공유해야 한다.`,
        maxTotalShipsOnSameTilePerTurn: `전체 주민은 한 턴의 같은 타일에 최대 $1개의 배를 사용할 수 있다.`,
    },
    feeCollection: {
        taxRate: `어획 후 이익의 $1를 마을 유지비로 내야 한다.`,
        collectFromResidents: `부족한 마을 유지비를 (돈이 부족한 마을 주민을 제외한) 모든 마을 주민에게서 나눠 걷는다.`,
    },
    feeUsage: {
        survivalGrant: `자립할 수 없는 마을 주민의 생존 비용을 지원한다.`,
        joinCost: `마을을 나가려면 $1진주를 마을 유지비로 내야 한다. 이를 위해 매 턴 n*(마을 주민의 수)**0.5*진주가 소모된다.`, // TODO: n은 숫자로 변경되어야 합니다
        leaveCost: `마을을 들어오려면 $1진주를 마을 유지비로 내야 한다. 이를 위해 매 턴 n*(마을 주민의 수)**0.5*진주가 소모된다.`, // TODO: n은 숫자로 변경되어야 합니다
        distributeRemaining: `다른 지출 이후 남은 마을 유지비의 $1를 주민들에게 똑같이 분배한다.`,
    },
    membershipCondition: {
        minIndividualShips: `모임에 들어오려면 최소 $1개의 배를 소유해야 한다.`,
        maxIndividualShips: `모임에 들어오려면 최대 $1개의 배를 소유해야 한다.`,
    },
};
export default reader;
