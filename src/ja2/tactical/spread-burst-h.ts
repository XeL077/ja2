void ResetBurstLocations();
void AccumulateBurstLocation(INT16 sGridNo);
void PickBurstLocations(SOLDIERTYPE *pSoldier);
void AIPickBurstLocations(SOLDIERTYPE *pSoldier, INT8 bTargets, SOLDIERTYPE *pTargets[5]);

void RenderAccumulatedBurstLocations();