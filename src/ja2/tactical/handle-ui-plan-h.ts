const UIPLAN_ACTION_MOVETO = 1;
const UIPLAN_ACTION_FIRE = 2;

BOOLEAN BeginUIPlan(SOLDIERTYPE *pSoldier);
BOOLEAN AddUIPlan(UINT16 sGridNo, UINT8 ubPlanID);
void EndUIPlan();
BOOLEAN InUIPlanMode();