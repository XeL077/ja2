// GLOBAL HEADER FOR DATA, TYPES FOR TACTICAL ENGINE

const REFINE_AIM_1 = 0;
const REFINE_AIM_MID1 = 1;
const REFINE_AIM_2 = 2;
const REFINE_AIM_MID2 = 3;
const REFINE_AIM_3 = 4;
const REFINE_AIM_MID3 = 5;
const REFINE_AIM_4 = 6;
const REFINE_AIM_MID4 = 7;
const REFINE_AIM_5 = 8;
const REFINE_AIM_BURST = 10;

const AIM_SHOT_RANDOM = 0;
const AIM_SHOT_HEAD = 1;
const AIM_SHOT_TORSO = 2;
const AIM_SHOT_LEGS = 3;
const AIM_SHOT_GLAND = 4;

const MIN_AMB_LEVEL_FOR_MERC_LIGHTS = 9;

const MAXTEAMS = 6;
const MAXMERCS = MAX_NUM_SOLDIERS;

// TACTICAL OVERHEAD STUFF
const NO_SOLDIER = TOTAL_SOLDIERS; // SAME AS NOBODY
const NOBODY = NO_SOLDIER;

// TACTICAL ENGINE STATUS FLAGS
const REALTIME = 0x000000002;
const TURNBASED = 0x000000004;
const IN_ENDGAME_SEQUENCE = 0x000000008;
const SHOW_ALL_ITEMS = 0x000000010;
const SHOW_AP_LEFT = 0x000000020;
const SHOW_ALL_MERCS = 0x000000040;
const TRANSLUCENCY_TYPE = 0x000000080;
const GODMODE = 0x000000100;
const DEMOMODE = 0x000000200;
const PLAYER_TEAM_DEAD = 0x000000400;
const NPC_TEAM_DEAD = 0x000000800;
const DISALLOW_SIGHT = 0x000001000;
const CHECK_SIGHT_AT_END_OF_ATTACK = 0x000002000;
const IN_CREATURE_LAIR = 0x000004000;
const HIDE_TREES = 0x000008000;
const NOHIDE_REDUNDENCY = 0x000010000;
const DEBUGCLIFFS = 0x000020000;
const INCOMBAT = 0x000040000;
const ACTIVE = 0x000100000;
const SHOW_Z_BUFFER = 0x000200000;
const SLOW_ANIMATION = 0x000400000;
const ENGAGED_IN_CONV = 0x000800000;
const LOADING_SAVED_GAME = 0x001000000;
const OUR_MERCS_AUTO_MOVE = 0x002000000;
const SHOW_ALL_ROOFS = 0x004000000;
const NEWLY_ENTERED_SECTOR = 0x008000000;
const RED_ITEM_GLOW_ON = 0x010000000;
const IGNORE_ENGAGED_IN_CONV_UI_UNLOCK = 0x020000000;
const IGNORE_ALL_OBSTACLES = 0x040000000;
const IN_DEIDRANNA_ENDGAME = 0x080000000;
const DONE_DEIDRANNA_ENDGAME = 0x100000000;

const OKBREATH = 10;
const OKLIFE = 15;
const CONSCIOUSNESS = 10;

// VIEWRANGE DEFINES
const NORMAL_VIEW_RANGE = 13;
const MIN_RANGE_FOR_BLOWNAWAY = 40;

// MODIFIERS FOR AP COST FOR MOVEMENT
const RUNDIVISOR = 1.8;
const WALKCOST = -1;
const SWATCOST = 0;
const CRAWLCOST = 1;

// defines
// ######################################################
const MAX_PATH_LIST_SIZE = 30;
const NUM_SOLDIER_SHADES = 48;
const NUM_SOLDIER_EFFECTSHADES = 2;

// TIMER DELAYS
const DAMAGE_DISPLAY_DELAY = 250;
const FADE_DELAY = 150;
const FLASH_SELECTOR_DELAY = 4000;
const BLINK_SELECTOR_DELAY = 250;

const PTR_OURTEAM = () => (pSoldier->bTeam == gbPlayerNum);

const DONTLOOK = 0;
const LOOK = 1;

const NOLOCATE = 0;
const LOCATE = 1;

const DONTSETLOCATOR = 0;
const SETLOCATOR = 1;
const SETANDREMOVEPREVIOUSLOCATOR = 2;
const SETLOCATORFAST = 3;

const NOCENTERING = 0;

const NOUPDATE = 0;
const UPDATE = 1;

// ORDERS
const enum Enum241 {
  STATIONARY = 0, // moves max 1 sq., no matter what's going on
  ONGUARD, // moves max 2 sqs. until alerted by something
  CLOSEPATROL, // patrols within 5 spaces until alerted
  FARPATROL, // patrols within 15 spaces
  POINTPATROL, // patrols using patrolGrids
  ONCALL, // helps buddies anywhere within the sector
  SEEKENEMY, // not tied down to any one particular spot
  RNDPTPATROL, // patrols randomly using patrolGrids
  MAXORDERS,
}

// ATTITUDES
const enum Enum242 {
  DEFENSIVE = 0,
  BRAVESOLO,
  BRAVEAID,
  CUNNINGSOLO,
  CUNNINGAID,
  AGGRESSIVE,
  MAXATTITUDES,
  ATTACKSLAYONLY, // special hyperaggressive vs Slay only value for Carmen the bounty hunter
}

// alert status types
const enum Enum243 {
  STATUS_GREEN = 0, // everything's OK, no suspicion
  STATUS_YELLOW, // he or his friend heard something
  STATUS_RED, // has definite evidence of opponent
  STATUS_BLACK, // currently sees an active opponent
  NUM_STATUS_STATES,
}

const enum Enum244 {
  MORALE_HOPELESS = 0,
  MORALE_WORRIED,
  MORALE_NORMAL,
  MORALE_CONFIDENT,
  MORALE_FEARLESS,
  NUM_MORALE_STATES,
}

// DEFINES FOR WEAPON HIT EVENT SPECIAL PARAM
const FIRE_WEAPON_NO_SPECIAL = 0;
const FIRE_WEAPON_BURST_SPECIAL = 1;
const FIRE_WEAPON_HEAD_EXPLODE_SPECIAL = 2;
const FIRE_WEAPON_CHEST_EXPLODE_SPECIAL = 3;
const FIRE_WEAPON_LEG_FALLDOWN_SPECIAL = 4;
const FIRE_WEAPON_HIT_BY_KNIFE_SPECIAL = 5;
const FIRE_WEAPON_SLEEP_DART_SPECIAL = 6;
const FIRE_WEAPON_BLINDED_BY_SPIT_SPECIAL = 7;
const FIRE_WEAPON_TOSSED_OBJECT_SPECIAL = 8;

const NO_INTERRUPTS = 0;
const ALLOW_INTERRUPTS = 1;

const SIGHT_LOOK = 0x1;
//#define SIGHT_SEND      0x2   // no longer needed using LOCAL OPPLISTs
const SIGHT_RADIO = 0x4;
const SIGHT_INTERRUPT = 0x8;
const SIGHT_ALL = 0xF;

// CHANGE THIS VALUE TO AFFECT TOTAL SIGHT RANGE
const STRAIGHT_RANGE = 13;

// CHANGE THESE VALUES TO ADJUST VARIOUS FOV ANGLES
const STRAIGHT_RATIO = 1;
const ANGLE_RATIO = 0.857;
const SIDE_RATIO = 0.571;
// CJC: Changed SBEHIND_RATIO (side-behind ratio) to be 0 to make stealth attacks easier
// Changed on September 21, 1998
//#define SBEHIND_RATIO		0.142
const SBEHIND_RATIO = 0;
const BEHIND_RATIO = 0;

// looking distance defines
const BEHIND = (INT8)(BEHIND_RATIO * STRAIGHT_RANGE);
const SBEHIND = (INT8)(SBEHIND_RATIO * STRAIGHT_RANGE);
const SIDE = (INT8)(SIDE_RATIO * STRAIGHT_RANGE);
const ANGLE = (INT8)(ANGLE_RATIO * STRAIGHT_RANGE);
const STRAIGHT = (INT8)(STRAIGHT_RATIO * STRAIGHT_RANGE);

// opplist value constants
const HEARD_3_TURNS_AGO = -4;
const HEARD_2_TURNS_AGO = -3;
const HEARD_LAST_TURN = -2;
const HEARD_THIS_TURN = -1;
const NOT_HEARD_OR_SEEN = 0;
const SEEN_CURRENTLY = 1;
const SEEN_THIS_TURN = 2;
const SEEN_LAST_TURN = 3;
const SEEN_2_TURNS_AGO = 4;
const SEEN_3_TURNS_AGO = 5;

const OLDEST_SEEN_VALUE = SEEN_3_TURNS_AGO;
const OLDEST_HEARD_VALUE = HEARD_3_TURNS_AGO;

const UNDER_FIRE = 2;
const UNDER_FIRE_LAST_TURN = 1;

const MAX_DISTANCE_FOR_PROXIMITY_SIGHT = 15;

// DEFINES FOR BODY TYPE SUBSTITUTIONS
const SUB_ANIM_BIGGUYSHOOT2 = 0x00000001;
const SUB_ANIM_BIGGUYTHREATENSTANCE = 0x00000002;

// Enumerate directions
const enum Enum245 {
  NORTH = 0,
  NORTHEAST,
  EAST,
  SOUTHEAST,
  SOUTH,
  SOUTHWEST,
  WEST,
  NORTHWEST,
  NUM_WORLD_DIRECTIONS,
  DIRECTION_IRRELEVANT,
  DIRECTION_EXITGRID = 255,
}

// ENUMERATION OF SOLDIER POSIITONS IN GLOBAL SOLDIER LIST
const MAX_NUM_SOLDIERS = 148;
const NUM_PLANNING_MERCS = 8;
const TOTAL_SOLDIERS = (NUM_PLANNING_MERCS + MAX_NUM_SOLDIERS);

// DEFINE TEAMS
const OUR_TEAM = 0;
const ENEMY_TEAM = 1;
const CREATURE_TEAM = 2;
const MILITIA_TEAM = 3;
const CIV_TEAM = 4;
const LAST_TEAM = CIV_TEAM;
const PLAYER_PLAN = 5;

//-----------------------------------------------
//
// civilian "sub teams":
const enum Enum246 {
  NON_CIV_GROUP = 0,
  REBEL_CIV_GROUP,
  KINGPIN_CIV_GROUP,
  SANMONA_ARMS_GROUP,
  ANGELS_GROUP,
  BEGGARS_CIV_GROUP,
  TOURISTS_CIV_GROUP,
  ALMA_MILITARY_CIV_GROUP,
  DOCTORS_CIV_GROUP,
  COUPLE1_CIV_GROUP,
  HICKS_CIV_GROUP,
  WARDEN_CIV_GROUP,
  JUNKYARD_CIV_GROUP,
  FACTORY_KIDS_GROUP,
  QUEENS_CIV_GROUP,
  UNNAMED_CIV_GROUP_15,
  UNNAMED_CIV_GROUP_16,
  UNNAMED_CIV_GROUP_17,
  UNNAMED_CIV_GROUP_18,
  UNNAMED_CIV_GROUP_19,

  NUM_CIV_GROUPS,
}

const CIV_GROUP_NEUTRAL = 0;
const CIV_GROUP_WILL_EVENTUALLY_BECOME_HOSTILE = 1;
const CIV_GROUP_WILL_BECOME_HOSTILE = 2;
const CIV_GROUP_HOSTILE = 3;

// boxing state
const enum Enum247 {
  NOT_BOXING = 0,
  BOXING_WAITING_FOR_PLAYER,
  PRE_BOXING,
  BOXING,
  DISQUALIFIED,
  WON_ROUND,
  LOST_ROUND,
}

// NOTE:  The editor uses these enumerations, so please update the text as well if you modify or
//			 add new groups.  Try to abbreviate the team name as much as possible.  The text is in
//			 EditorMercs.c
extern UINT16 gszCivGroupNames[NUM_CIV_GROUPS][20];
//
//-----------------------------------------------

// PALETTE SUBSITUTION TYPES
interface PaletteSubRangeType {
  ubStart: UINT8;
  ubEnd: UINT8;
}

type PaletteRepID = CHAR8[] /* [30] */;

interface PaletteReplacementType {
  ubType: UINT8;
  ID: PaletteRepID;
  ubPaletteSize: UINT8;
  r: Pointer<UINT8>;
  g: Pointer<UINT8>;
  b: Pointer<UINT8>;
}

// MACROS
// This will set an animation ID
const SET_PALETTEREP_ID = (a, b) => (strcpy(a, b));
// strcmp returns 0 if true!
const COMPARE_PALETTEREP_ID = (a, b) => (strcmp(a, b) ? FALSE : TRUE);
