type TIMECOUNTER = INT32;

// typedef void (__stdcall *JA2_TIMERPROC)( UINT32 uiID, UINT32 uiMsg, UINT32 uiUser, UINT32 uiDw1, UINT32 uiDw2 );

type CUSTOMIZABLE_TIMER_CALLBACK = () => void;

// CALLBACK TIMER DEFINES
const enum Enum385 {
  ITEM_LOCATOR_CALLBACK,
  NUM_TIMER_CALLBACKS,
}

// TIMER DEFINES
const enum Enum386 {
  TOVERHEAD = 0, // Overhead time slice
  NEXTSCROLL, // Scroll Speed timer
  STARTSCROLL, // Scroll Start timer
  ANIMATETILES, // Animate tiles timer
  FPSCOUNTER, // FPS value
  PATHFINDCOUNTER, // PATH FIND COUNTER
  CURSORCOUNTER, // ANIMATED CURSOR
  RMOUSECLICK_DELAY_COUNTER, // RIGHT BUTTON CLICK DELAY
  LMOUSECLICK_DELAY_COUNTER, // LEFT	 BUTTON CLICK DELAY
  SLIDETEXT, // DAMAGE DISPLAY
  TARGETREFINE, // TARGET REFINE
  CURSORFLASH, // Cursor/AP flash
  FADE_GUY_OUT, // FADE MERCS OUT
  PANELSLIDE_UNUSED, // PANLE SLIDE
  TCLOCKUPDATE, // CLOCK UPDATE
  PHYSICSUPDATE, // PHYSICS UPDATE.
  GLOW_ENEMYS,
  STRATEGIC_OVERHEAD, // STRATEGIC OVERHEAD
  CYCLERENDERITEMCOLOR, // CYCLE COLORS
  NONGUNTARGETREFINE, // TARGET REFINE
  CURSORFLASHUPDATE, //
  INVALID_AP_HOLD, // TIME TO HOLD INVALID AP
  RADAR_MAP_BLINK, // BLINK DELAY FOR RADAR MAP
  OVERHEAD_MAP_BLINK, // OVERHEADMAP
  MUSICOVERHEAD, // MUSIC TIMER
  RUBBER_BAND_START_DELAY,
  NUMTIMERS,
}

// Base resultion of callback timer
const BASETIMESLICE = 10;

// TIMER INTERVALS
INT32 giTimerIntervals[NUMTIMERS];
// TIMER COUNTERS
INT32 giTimerCounters[NUMTIMERS];

// GLOBAL SYNC TEMP TIME
INT32 giClockTimer;

INT32 giTimerDiag;

INT32 giTimerTeamTurnUpdate;

// Functions
BOOLEAN InitializeJA2Clock(void);
void ShutdownJA2Clock(void);

const GetJA2Clock = () => guiBaseJA2Clock;

UINT32 GetPauseJA2Clock();

UINT32 InitializeJA2TimerID(UINT32 uiDelay, UINT32 uiCallbackID, UINT32 uiUser);
void RemoveJA2TimerCallback(UINT32 uiTimer);

void PauseTime(BOOLEAN fPaused);

void SetCustomizableTimerCallbackAndDelay(INT32 iDelay, CUSTOMIZABLE_TIMER_CALLBACK pCallback, BOOLEAN fReplace);
void CheckCustomizableTimer(void);

// Don't modify this value
extern UINT32 guiBaseJA2Clock;
extern CUSTOMIZABLE_TIMER_CALLBACK gpCustomizableTimerCallback;

// MACROS
//																CHeck if new counter < 0														 | set to 0 |										 Decrement

const UPDATECOUNTER = (c) => ((giTimerCounters[c] - BASETIMESLICE) < 0) ? (giTimerCounters[c] = 0) : (giTimerCounters[c] -= BASETIMESLICE);
const RESETCOUNTER = (c) => (giTimerCounters[c] = giTimerIntervals[c]);
const COUNTERDONE = (c) => (giTimerCounters[c] == 0) ? TRUE : FALSE;

const UPDATETIMECOUNTER = (c) => ((c - BASETIMESLICE) < 0) ? (c = 0) : (c -= BASETIMESLICE);
const RESETTIMECOUNTER = (c, d) => (c = d);

const TIMECOUNTERDONE = (c, d) => (c == 0) ? TRUE : FALSE;

const SYNCTIMECOUNTER = () => {};
const ZEROTIMECOUNTER = (c) => (c = 0);
