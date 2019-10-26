namespace ja2 {

// An enumeration for dialog quotes
export const enum Enum202 {
  // 0
  QUOTE_SEE_ENEMY = 0,
  QUOTE_SEE_ENEMY_VARIATION,
  QUOTE_IN_TROUBLE_SLASH_IN_BATTLE,
  QUOTE_SEE_CREATURE,
  QUOTE_FIRSTTIME_GAME_SEE_CREATURE,
  QUOTE_TRACES_OF_CREATURE_ATTACK,
  QUOTE_HEARD_SOMETHING,
  QUOTE_SMELLED_CREATURE,
  QUOTE_WEARY_SLASH_SUSPUCIOUS,
  QUOTE_WORRIED_ABOUT_CREATURE_PRESENCE,

  // 10
  QUOTE_ATTACKED_BY_MULTIPLE_CREATURES,
  QUOTE_SPOTTED_SOMETHING_ONE,
  QUOTE_SPOTTED_SOMETHING_TWO,
  QUOTE_OUT_OF_AMMO,
  QUOTE_SERIOUSLY_WOUNDED,
  QUOTE_BUDDY_ONE_KILLED,
  QUOTE_BUDDY_TWO_KILLED,
  QUOTE_LEARNED_TO_LIKE_MERC_KILLED,
  QUOTE_FORGETFULL_SLASH_CONFUSED,
  QUOTE_JAMMED_GUN,

  // 20
  QUOTE_UNDER_HEAVY_FIRE,
  QUOTE_TAKEN_A_BREATING,
  QUOTE_CLOSE_CALL,
  QUOTE_NO_LINE_OF_FIRE,
  QUOTE_STARTING_TO_BLEED,
  QUOTE_NEED_SLEEP,
  QUOTE_OUT_OF_BREATH,
  QUOTE_KILLED_AN_ENEMY,
  QUOTE_KILLED_A_CREATURE,
  QUOTE_HATED_MERC_ONE,

  // 30
  QUOTE_HATED_MERC_TWO,
  QUOTE_LEARNED_TO_HATE_MERC,
  QUOTE_AIM_KILLED_MIKE,
  QUOTE_MERC_QUIT_LEARN_TO_HATE = QUOTE_AIM_KILLED_MIKE,
  QUOTE_HEADSHOT,
  QUOTE_PERSONALITY_TRAIT,
  QUOTE_ASSIGNMENT_COMPLETE,
  QUOTE_REFUSING_ORDER,
  QUOTE_KILLING_DEIDRANNA,
  QUOTE_KILLING_QUEEN,
  QUOTE_ANNOYING_PC,

  // 40
  QUOTE_STARTING_TO_WHINE,
  QUOTE_NEGATIVE_COMPANY,
  QUOTE_AIR_RAID,
  QUOTE_WHINE_EQUIPMENT,
  QUOTE_SOCIAL_TRAIT,
  QUOTE_PASSING_DISLIKE,
  QUOTE_EXPERIENCE_GAIN,
  QUOTE_PRE_NOT_SMART,
  QUOTE_POST_NOT_SMART,
  QUOTE_HATED_1_ARRIVES,
  QUOTE_MERC_QUIT_HATED1 = QUOTE_HATED_1_ARRIVES,

  // 50
  QUOTE_HATED_2_ARRIVES,
  QUOTE_MERC_QUIT_HATED2 = QUOTE_HATED_2_ARRIVES,
  QUOTE_BUDDY_1_GOOD,
  QUOTE_BUDDY_2_GOOD,
  QUOTE_LEARNED_TO_LIKE_WITNESSED,
  QUOTE_DELAY_CONTRACT_RENEWAL,
  QUOTE_NOT_GETTING_PAID = QUOTE_DELAY_CONTRACT_RENEWAL,
  QUOTE_AIM_SEEN_MIKE,
  QUOTE_PC_DROPPED_OMERTA = QUOTE_AIM_SEEN_MIKE,
  QUOTE_BLINDED,
  QUOTE_DEFINITE_CANT_DO,
  QUOTE_LISTEN_LIKABLE_PERSON,
  QUOTE_ENEMY_PRESENCE,

  // 60
  QUOTE_WARNING_OUTSTANDING_ENEMY_AFTER_RT,
  QUOTE_FOUND_SOMETHING_SPECIAL,
  QUOTE_SATISFACTION_WITH_GUN_AFTER_KILL,
  QUOTE_SPOTTED_JOEY,
  QUOTE_RESPONSE_TO_MIGUEL_SLASH_QUOTE_MERC_OR_RPC_LETGO,
  QUOTE_SECTOR_SAFE,
  QUOTE_STUFF_MISSING_DRASSEN,
  QUOTE_KILLED_FACTORY_MANAGER,
  QUOTE_SPOTTED_BLOODCAT,
  QUOTE_END_GAME_COMMENT,

  // 70
  QUOTE_ENEMY_RETREATED,
  QUOTE_GOING_TO_AUTO_SLEEP,
  QUOTE_WORK_UP_AND_RETURNING_TO_ASSIGNMENT, // woke up from auto sleep, going back to wo
  QUOTE_ME_TOO, // me too quote, in agreement with whatever the merc previous said
  QUOTE_USELESS_ITEM,
  QUOTE_BOOBYTRAP_ITEM,
  QUOTE_SUSPICIOUS_GROUND,
  QUOTE_DROWNING,
  QUOTE_MERC_REACHED_DESTINATION,
  QUOTE_SPARE2,

  // 80
  QUOTE_REPUTATION_REFUSAL,
  QUOTE_DEATH_RATE_REFUSAL, //= 99,
  QUOTE_LAME_REFUSAL, //= 82,
  QUOTE_WONT_RENEW_CONTRACT_LAME_REFUSAL, // ARM: now unused
  QUOTE_ANSWERING_MACHINE_MSG,
  QUOTE_DEPARTING_COMMENT_CONTRACT_NOT_RENEWED_OR_48_OR_MORE,
  QUOTE_HATE_MERC_1_ON_TEAM, // = 100,
  QUOTE_HATE_MERC_2_ON_TEAM, // = 101,
  QUOTE_LEARNED_TO_HATE_MERC_ON_TEAM, // = 102,
  QUOTE_CONTRACTS_OVER, // = 89,

  // 90
  QUOTE_ACCEPT_CONTRACT_RENEWAL,
  QUOTE_CONTRACT_ACCEPTANCE,
  QUOTE_JOINING_CAUSE_BUDDY_1_ON_TEAM, // = 103,
  QUOTE_JOINING_CAUSE_BUDDY_2_ON_TEAM, // = 104,
  QUOTE_JOINING_CAUSE_LEARNED_TO_LIKE_BUDDY_ON_TEAM, // = 105,
  QUOTE_REFUSAL_RENEW_DUE_TO_MORALE, // = 95,
  QUOTE_PRECEDENT_TO_REPEATING_ONESELF, // = 106,
  QUOTE_REFUSAL_TO_JOIN_LACK_OF_FUNDS, // = 107,
  QUOTE_DEPART_COMMET_CONTRACT_NOT_RENEWED_OR_TERMINATED_UNDER_48, // = 98,
  QUOTE_DEATH_RATE_RENEWAL,

  // 100
  QUOTE_HATE_MERC_1_ON_TEAM_WONT_RENEW,
  QUOTE_HATE_MERC_2_ON_TEAM_WONT_RENEW,
  QUOTE_LEARNED_TO_HATE_MERC_1_ON_TEAM_WONT_RENEW,
  QUOTE_RENEWING_CAUSE_BUDDY_1_ON_TEAM,
  QUOTE_RENEWING_CAUSE_BUDDY_2_ON_TEAM,
  QUOTE_RENEWING_CAUSE_LEARNED_TO_LIKE_BUDDY_ON_TEAM,
  QUOTE_PRECEDENT_TO_REPEATING_ONESELF_RENEW,
  QUOTE_RENEW_REFUSAL_DUE_TO_LACK_OF_FUNDS,
  QUOTE_GREETING,
  QUOTE_SMALL_TALK,

  // 110
  QUOTE_IMPATIENT_QUOTE,
  QUOTE_LENGTH_OF_CONTRACT,
  QUOTE_COMMENT_BEFORE_HANG_UP,
  QUOTE_PERSONALITY_BIAS_WITH_MERC_1,
  QUOTE_PERSONALITY_BIAS_WITH_MERC_2,
  QUOTE_MERC_LEAVING_ALSUCO_SOON,
  QUOTE_MERC_GONE_UP_IN_PRICE,
}

export const DEFAULT_EXTERN_PANEL_X_POS = 320;
export const DEFAULT_EXTERN_PANEL_Y_POS = 40;

export const DIALOGUE_TACTICAL_UI = 1;
export const DIALOGUE_CONTACTPAGE_UI = 2;
export const DIALOGUE_NPC_UI = 3;
export const DIALOGUE_SPECK_CONTACT_PAGE_UI = 4;
export const DIALOGUE_EXTERNAL_NPC_UI = 5;
export const DIALOGUE_SHOPKEEPER_UI = 6;

export const DIALOGUE_SPECIAL_EVENT_GIVE_ITEM = 0x00000001;
export const DIALOGUE_SPECIAL_EVENT_TRIGGER_NPC = 0x00000002;
export const DIALOGUE_SPECIAL_EVENT_GOTO_GRIDNO = 0x00000004;
export const DIALOGUE_SPECIAL_EVENT_DO_ACTION = 0x00000008;
export const DIALOGUE_SPECIAL_EVENT_CLOSE_PANEL = 0x00000010;
export const DIALOGUE_SPECIAL_EVENT_PCTRIGGERNPC = 0x00000020;
export const DIALOGUE_SPECIAL_EVENT_BEGINPREBATTLEINTERFACE = 0x00000040;
export const DIALOGUE_SPECIAL_EVENT_SKYRIDERMAPSCREENEVENT = 0x00000080;
export const DIALOGUE_SPECIAL_EVENT_SHOW_CONTRACT_MENU = 0x00000100;
export const DIALOGUE_SPECIAL_EVENT_MINESECTOREVENT = 0x00000200;
export const DIALOGUE_SPECIAL_EVENT_SHOW_UPDATE_MENU = 0x00000400;
export const DIALOGUE_SPECIAL_EVENT_ENABLE_AI = 0x00000800;
export const DIALOGUE_SPECIAL_EVENT_USE_ALTERNATE_FILES = 0x00001000;
export const DIALOGUE_SPECIAL_EVENT_CONTINUE_TRAINING_MILITIA = 0x00002000;
export const DIALOGUE_SPECIAL_EVENT_CONTRACT_ENDING = 0x00004000;
export const DIALOGUE_SPECIAL_EVENT_MULTIPURPOSE = 0x00008000;
export const DIALOGUE_SPECIAL_EVENT_SLEEP = 0x00010000;
export const DIALOGUE_SPECIAL_EVENT_DO_BATTLE_SND = 0x00020000;
export const DIALOGUE_SPECIAL_EVENT_SIGNAL_ITEM_LOCATOR_START = 0x00040000;
export const DIALOGUE_SPECIAL_EVENT_SHOPKEEPER = 0x00080000;
export const DIALOGUE_SPECIAL_EVENT_SKIP_A_FRAME = 0x00100000;
export const DIALOGUE_SPECIAL_EVENT_EXIT_MAP_SCREEN = 0x00200000;
export const DIALOGUE_SPECIAL_EVENT_DISPLAY_STAT_CHANGE = 0x00400000;
export const DIALOGUE_SPECIAL_EVENT_UNSET_ARRIVES_FLAG = 0x00800000;
export const DIALOGUE_SPECIAL_EVENT_TRIGGERPREBATTLEINTERFACE = 0x01000000;
export const DIALOGUE_ADD_EVENT_FOR_SOLDIER_UPDATE_BOX = 0x02000000;
export const DIALOGUE_SPECIAL_EVENT_ENTER_MAPSCREEN = 0x04000000;
export const DIALOGUE_SPECIAL_EVENT_LOCK_INTERFACE = 0x08000000;
export const DIALOGUE_SPECIAL_EVENT_REMOVE_EPC = 0x10000000;
export const DIALOGUE_SPECIAL_EVENT_CONTRACT_WANTS_TO_RENEW = 0x20000000;
export const DIALOGUE_SPECIAL_EVENT_CONTRACT_NOGO_TO_RENEW = 0x40000000;
export const DIALOGUE_SPECIAL_EVENT_CONTRACT_ENDING_NO_ASK_EQUIP = 0x80000000;

export const MULTIPURPOSE_SPECIAL_EVENT_DONE_KILLING_DEIDRANNA = 0x00000001;
export const MULTIPURPOSE_SPECIAL_EVENT_TEAM_MEMBERS_DONE_TALKING = 0x00000002;

export const enum Enum203 {
  SKYRIDER_EXTERNAL_FACE = 0,
  MINER_FRED_EXTERNAL_FACE,
  MINER_MATT_EXTERNAL_FACE,
  MINER_OSWALD_EXTERNAL_FACE,
  MINER_CALVIN_EXTERNAL_FACE,
  MINER_CARL_EXTERNAL_FACE,
  NUMBER_OF_EXTERNAL_NPC_FACES,
}

// soldier up-date box reasons
export const enum Enum204 {
  UPDATE_BOX_REASON_ADDSOLDIER = 0,
  UPDATE_BOX_REASON_SET_REASON,
  UPDATE_BOX_REASON_SHOW_BOX,
}

export const NUMBER_VALID_MERC_PRECEDENT_QUOTES = 13;

}
