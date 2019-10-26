namespace ja2 {

const FIND_SOLDIER_FULL = 0x000000002;
export const FIND_SOLDIER_GRIDNO = 0x000000004;
export const FIND_SOLDIER_SAMELEVEL = 0x000000008;
export const FIND_SOLDIER_SELECTIVE = 0x000000020;
export const FIND_SOLDIER_BEGINSTACK = 0x000000040;

// RETURN FLAGS FOR FINDSOLDIER
export const SELECTED_MERC = 0x000000002;
export const OWNED_MERC = 0x000000004;
export const ENEMY_MERC = 0x000000008;
export const UNCONSCIOUS_MERC = 0x000000020;
export const DEAD_MERC = 0x000000040;
export const VISIBLE_MERC = 0x000000080;
export const ONDUTY_MERC = 0x000000100;
export const NOINTERRUPT_MERC = 0x000000200;
export const NEUTRAL_MERC = 0x000000400;

export const FINDSOLDIERSAMELEVEL = (l) => (((FIND_SOLDIER_FULL | FIND_SOLDIER_SAMELEVEL) | (l << 16)));

export const FINDSOLDIERSELECTIVESAMELEVEL = (l) => (((FIND_SOLDIER_SELECTIVE | FIND_SOLDIER_SAMELEVEL) | (l << 16)));

}
