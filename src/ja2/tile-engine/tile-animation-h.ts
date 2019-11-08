namespace ja2 {

export const ANITILE_DOOR = 0x00000001;
export const ANITILE_BACKWARD = 0x00000020;
export const ANITILE_FORWARD = 0x00000040;
export const ANITILE_PAUSED = 0x00000200;
export const ANITILE_EXISTINGTILE = 0x00000400;
export const ANITILE_USEABSOLUTEPOS = 0x00004000;
export const ANITILE_CACHEDTILE = 0x00008000;
export const ANITILE_LOOPING = 0x00020000;
export const ANITILE_NOZBLITTER = 0x00040000;
export const ANITILE_REVERSE_LOOPING = 0x00080000;
export const ANITILE_ALWAYS_TRANSLUCENT = 0x00100000;
export const ANITILE_USEBEST_TRANSLUCENT = 0x00200000;
export const ANITILE_OPTIMIZEFORSLOWMOVING = 0x00400000;
export const ANITILE_ANIMATE_Z = 0x00800000;
export const ANITILE_USE_DIRECTION_FOR_START_FRAME = 0x01000000;
export const ANITILE_PAUSE_AFTER_LOOP = 0x02000000;
export const ANITILE_ERASEITEMFROMSAVEBUFFFER = 0x04000000;
export const ANITILE_OPTIMIZEFORSMOKEEFFECT = 0x08000000;
export const ANITILE_SMOKE_EFFECT = 0x10000000;
export const ANITILE_EXPLOSION = 0x20000000;
export const ANITILE_RELEASE_ATTACKER_WHEN_DONE = 0x40000000;
export const ANITILE_USE_4DIRECTION_FOR_START_FRAME = 0x02000000;

const ANI_LAND_LEVEL = 1;
export const ANI_SHADOW_LEVEL = 2;
export const ANI_OBJECT_LEVEL = 3;
export const ANI_STRUCT_LEVEL = 4;
export const ANI_ROOF_LEVEL = 5;
export const ANI_ONROOF_LEVEL = 6;
export const ANI_TOPMOST_LEVEL = 7;

export interface ANITILE {
  pNext: Pointer<ANITILE>;
  uiFlags: UINT32; // flags struct
  uiTimeLastUpdate: UINT32; // Stuff for animated tiles

  pLevelNode: Pointer<LEVELNODE>;
  ubLevelID: UINT8;
  sCurrentFrame: INT16;
  sStartFrame: INT16;
  sDelay: INT16;
  usTileType: UINT16;
  usNumFrames: UINT16;

  usMissAnimationPlayed: UINT16;
  ubAttackerMissed: UINT16;
  sRelativeX: INT16;
  sRelativeY: INT16;
  sRelativeZ: INT16;
  sGridNo: INT16;
  usTileIndex: UINT16;

  usCachedTileSubIndex: UINT16; // sub Index
  sCachedTileID: INT16; // Index into cached tile ID

  ubOwner: UINT8;
  ubKeyFrame1: UINT8;
  uiKeyFrame1Code: UINT32;
  ubKeyFrame2: UINT8;
  uiKeyFrame2Code: UINT32;

  uiUserData: UINT32;
  ubUserData2: UINT8;
  uiUserData3: UINT32;

  bFrameCountAfterStart: INT8;
}

export interface ANITILE_PARAMS {
  uiFlags: UINT32; // flags struct
  ubLevelID: UINT8; // Level ID for rendering layer
  sStartFrame: INT16; // Start frame
  sDelay: INT16; // Delay time
  usTileType: UINT16; // Tile databse type ( optional )
  usTileIndex: UINT16; // Tile database index ( optional )
  sX: INT16; // World X ( optional )
  sY: INT16; // World Y ( optional )
  sZ: INT16; // World Z ( optional )
  sGridNo: INT16; // World GridNo

  pGivenLevelNode: Pointer<LEVELNODE>; // Levelnode for existing tile ( optional )
  zCachedFile: string /* CHAR8[100] */; // Filename for cached tile name ( optional )

  ubOwner: UINT8; // UBID for the owner
  ubKeyFrame1: UINT8; // Key frame 1
  uiKeyFrame1Code: UINT32; // Key frame code
  ubKeyFrame2: UINT8; // Key frame 2
  uiKeyFrame2Code: UINT32; // Key frame code

  uiUserData: UINT32;
  ubUserData2: UINT8;
  uiUserData3: UINT32;
}

export function createAnimatedTileParams(): ANITILE_PARAMS {
  return {
    uiFlags: 0,
    ubLevelID: 0,
    sStartFrame: 0,
    sDelay: 0,
    usTileType: 0,
    usTileIndex: 0,
    sX: 0,
    sY: 0,
    sZ: 0,
    sGridNo: 0,

    pGivenLevelNode: null,
    zCachedFile: "",

    ubOwner: 0,
    ubKeyFrame1: 0,
    uiKeyFrame1Code: 0,
    ubKeyFrame2: 0,
    uiKeyFrame2Code: 0,

    uiUserData: 0,
    ubUserData2: 0,
    uiUserData3: 0,
  };
}

export const enum Enum311 {
  ANI_KEYFRAME_NO_CODE,
  ANI_KEYFRAME_BEGIN_TRANSLUCENCY,
  ANI_KEYFRAME_BEGIN_DAMAGE,
  ANI_KEYFRAME_CHAIN_WATER_EXPLOSION,
  ANI_KEYFRAME_DO_SOUND,
}

}
