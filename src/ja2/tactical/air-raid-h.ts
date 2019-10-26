namespace ja2 {

export const AIR_RAID_BEGINNING_GAME = 0x00000001;
export const AIR_RAID_CAN_RANDOMIZE_TEASE_DIVES = 0x00000002;

export interface AIR_RAID_DEFINITION {
  sSectorX: INT16;
  sSectorY: INT16;
  sSectorZ: INT16;
  bIntensity: INT8;
  uiFlags: UINT32;
  ubNumMinsFromCurrentTime: UINT8;
  ubFiller: UINT8[] /* [8] */;
}

export const enum Enum192 {
  AIR_RAID_TRYING_TO_START,
  AIR_RAID_START,
  AIR_RAID_LOOK_FOR_DIVE,
  AIR_RAID_BEGIN_DIVE,
  AIR_RAID_DIVING,
  AIR_RAID_END_DIVE,
  AIR_RAID_BEGIN_BOMBING,
  AIR_RAID_BOMBING,
  AIR_RAID_END_BOMBING,
  AIR_RAID_START_END,
  AIR_RAID_END,
}

}
