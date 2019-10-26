export const enum Enum95 {
  LAPTOP_MODE_NONE = 0,
  LAPTOP_MODE_FINANCES,
  LAPTOP_MODE_PERSONNEL,
  LAPTOP_MODE_HISTORY,
  LAPTOP_MODE_FILES,
  LAPTOP_MODE_FILES_ENRICO,
  LAPTOP_MODE_FILES_PLANS,
  LAPTOP_MODE_EMAIL,
  LAPTOP_MODE_EMAIL_NEW,
  LAPTOP_MODE_EMAIL_VIEW,
  LAPTOP_MODE_WWW,
  LAPTOP_MODE_AIM,
  LAPTOP_MODE_AIM_MEMBERS,
  LAPTOP_MODE_AIM_MEMBERS_FACIAL_INDEX,
  LAPTOP_MODE_AIM_MEMBERS_SORTED_FILES,
  LAPTOP_MODE_AIM_MEMBERS_SORTED_FILES_VIDEO,
  LAPTOP_MODE_AIM_MEMBERS_ARCHIVES,
  LAPTOP_MODE_AIM_POLICIES,
  LAPTOP_MODE_AIM_HISTORY,
  LAPTOP_MODE_AIM_LINKS,
  LAPTOP_MODE_MERC,
  LAPTOP_MODE_MERC_ACCOUNT,
  LAPTOP_MODE_MERC_NO_ACCOUNT,
  LAPTOP_MODE_MERC_FILES,
  LAPTOP_MODE_BOBBY_R,
  LAPTOP_MODE_BOBBY_R_GUNS,
  LAPTOP_MODE_BOBBY_R_AMMO,
  LAPTOP_MODE_BOBBY_R_ARMOR,
  LAPTOP_MODE_BOBBY_R_MISC,
  LAPTOP_MODE_BOBBY_R_USED,
  LAPTOP_MODE_BOBBY_R_MAILORDER,
  LAPTOP_MODE_CHAR_PROFILE,
  LAPTOP_MODE_CHAR_PROFILE_QUESTIONAIRE,
  LAPTOP_MODE_FLORIST,
  LAPTOP_MODE_FLORIST_FLOWER_GALLERY,
  LAPTOP_MODE_FLORIST_ORDERFORM,
  LAPTOP_MODE_FLORIST_CARD_GALLERY,
  LAPTOP_MODE_INSURANCE,
  LAPTOP_MODE_INSURANCE_INFO,
  LAPTOP_MODE_INSURANCE_CONTRACT,
  LAPTOP_MODE_INSURANCE_COMMENTS,
  LAPTOP_MODE_FUNERAL,
  LAPTOP_MODE_SIRTECH,
  LAPTOP_MODE_BROKEN_LINK,
  LAPTOP_MODE_BOBBYR_SHIPMENTS,
}

// bookamrks for WWW bookmark list

export const enum Enum96 {
  FIRST_SIDE_PANEL = 1,
  SECOND_SIDE_PANEL,
}
export const enum Enum97 {
  LAPTOP_NO_CURSOR = 0,
  LAPTOP_PANEL_CURSOR,
  LAPTOP_SCREEN_CURSOR,
  LAPTOP_WWW_CURSOR,
}

const LAPTOP_SIDE_PANEL_X = 0;
const LAPTOP_SIDE_PANEL_Y = 0;
const LAPTOP_SIDE_PANEL_WIDTH = 640;
const LAPTOP_SIDE_PANEL_HEIGHT = 480;
export const LAPTOP_X = 0;
export const LAPTOP_Y = 0;

export const LAPTOP_SCREEN_UL_X = 111;
export const LAPTOP_SCREEN_UL_Y = 27;
export const LAPTOP_SCREEN_LR_X = 613;
export const LAPTOP_SCREEN_LR_Y = 427;
export const LAPTOP_UL_X = 24;
export const LAPTOP_UL_Y = 27;
export const LAPTOP_SCREEN_WIDTH = LAPTOP_SCREEN_LR_X - LAPTOP_SCREEN_UL_X;
export const LAPTOP_SCREEN_HEIGHT = LAPTOP_SCREEN_LR_Y - LAPTOP_SCREEN_UL_Y;

// new positions for web browser
export const LAPTOP_SCREEN_WEB_UL_Y = LAPTOP_SCREEN_UL_Y + 19;
export const LAPTOP_SCREEN_WEB_LR_Y = LAPTOP_SCREEN_WEB_UL_Y + LAPTOP_SCREEN_HEIGHT;
export const LAPTOP_SCREEN_WEB_DELTA_Y = LAPTOP_SCREEN_WEB_UL_Y - LAPTOP_SCREEN_UL_Y;

// the laptop on/off button
const ON_X = 113;
const ON_Y = 445;

// the bookmark values, move cancel down as bookmarks added

export const enum Enum98 {
  AIM_BOOKMARK = 0,
  BOBBYR_BOOKMARK,
  IMP_BOOKMARK,
  MERC_BOOKMARK,
  FUNERAL_BOOKMARK,
  FLORIST_BOOKMARK,
  INSURANCE_BOOKMARK,
  CANCEL_STRING,
}

export const DEAD_MERC_COLOR_RED = 255;
export const DEAD_MERC_COLOR_GREEN = 55;
export const DEAD_MERC_COLOR_BLUE = 55;
