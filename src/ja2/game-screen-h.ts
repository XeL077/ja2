const ARE_IN_FADE_IN = () => (gfFadeIn || gfFadeInitialized);

void FadeInGameScreen();
void FadeOutGameScreen();

typedef void (*MODAL_HOOK)(void);

BOOLEAN gfGameScreenLocateToSoldier;
BOOLEAN gfEnteringMapScreen;
UINT8 gubPreferredInitialSelectedGuy;

void EnterMapScreen();

void UpdateTeamPanelAssignments();

const TACTICAL_MODAL_NOMOUSE = 1;
const TACTICAL_MODAL_WITHMOUSE = 2;

extern MODAL_HOOK gModalDoneCallback;

void EnterModalTactical(INT8 bMode);
void EndModalTactical();

// handle the entrance of the mercs at the beginning of the game
void InitHelicopterEntranceByMercs(void);

void InternalLeaveTacticalScreen(UINT32 uiNewScreen);