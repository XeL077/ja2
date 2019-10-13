#ifndef __WORLDDEF_H
#define __WORLDDEF_H

#include "vobject.h"
#include "tiledef.h"
#include "Soldier Control.h"
#include "structure.h"
#include "Handle Items.h"

#define WORLD_TILE_X 40
#define WORLD_TILE_Y 20
#define WORLD_COLS 160
#define WORLD_ROWS 160
#define WORLD_COORD_COLS 1600
#define WORLD_COORD_ROWS 1600
#define WORLD_MAX 25600
#define CELL_X_SIZE 10
#define CELL_Y_SIZE 10

#define WORLD_BASE_HEIGHT 0
#define WORLD_CLIFF_HEIGHT 80

// A macro that actually memcpy's over data and increments the pointer automatically
// based on the size.  Works like a FileRead except with a buffer instead of a file pointer.
// Used by LoadWorld() and child functions.
#include <memory.h>
#define LOADDATA(dst, src, size) \
  memcpy(dst, src, size); \
  src += size

#define LANDHEAD 0
#define MAXDIR 8

// Defines for shade levels
#define DEFAULT_SHADE_LEVEL 4
#define MIN_SHADE_LEVEL 4
#define MAX_SHADE_LEVEL 15

// DEFINES FOR LEVELNODE FLAGS
#define LEVELNODE_SOLDIER 0x00000001
#define LEVELNODE_UNUSED2 0x00000002
#define LEVELNODE_MERCPLACEHOLDER 0x00000004
#define LEVELNODE_SHOW_THROUGH 0x00000008
#define LEVELNODE_NOZBLITTER 0x00000010
#define LEVELNODE_CACHEDANITILE 0x00000020
#define LEVELNODE_ROTTINGCORPSE 0x00000040
#define LEVELNODE_BUDDYSHADOW 0x00000080
#define LEVELNODE_HIDDEN 0x00000100
#define LEVELNODE_USERELPOS 0x00000200
#define LEVELNODE_DISPLAY_AP 0x00000400
#define LEVELNODE_ANIMATION 0x00000800
#define LEVELNODE_USEABSOLUTEPOS 0x00001000
#define LEVELNODE_REVEAL 0x00002000
#define LEVELNODE_REVEALTREES 0x00004000
#define LEVELNODE_USEBESTTRANSTYPE 0x00008000
#define LEVELNODE_USEZ 0x00010000
#define LEVELNODE_DYNAMICZ 0x00020000
#define LEVELNODE_UPDATESAVEBUFFERONCE 0x00040000
#define LEVELNODE_ERASEZ 0x00080000
#define LEVELNODE_WIREFRAME 0x00100000
#define LEVELNODE_ITEM 0x00200000
#define LEVELNODE_IGNOREHEIGHT 0x00400000
#define LEVELNODE_DYNAMIC 0x02000000
#define LEVELNODE_LASTDYNAMIC 0x04000000
#define LEVELNODE_PHYSICSOBJECT 0x08000000
#define LEVELNODE_NOWRITEZ 0x10000000
#define LEVELNODE_MULTITILESOLDIER 0x20000000
#define LEVELNODE_EXITGRID 0x40000000
#define LEVELNODE_CAVE 0x80000000

// THE FIRST FEW ( 4 ) bits are flags which are saved in the world
#define MAPELEMENT_REDUNDENT 0x0001
#define MAPELEMENT_REEVALUATE_REDUNDENCY 0x0002
#define MAPELEMENT_ENEMY_MINE_PRESENT 0x0004
#define MAPELEMENT_PLAYER_MINE_PRESENT 0x0008
#define MAPELEMENT_STRUCTURE_DAMAGED 0x0010
#define MAPELEMENT_REEVALUATEBLOOD 0x0020
#define MAPELEMENT_INTERACTIVETILE 0x0040
#define MAPELEMENT_RAISE_LAND_START 0x0080
#define MAPELEMENT_REVEALED 0x0100
#define MAPELEMENT_RAISE_LAND_END 0x0200
#define MAPELEMENT_REDRAW 0x0400
#define MAPELEMENT_REVEALED_ROOF 0x0800
#define MAPELEMENT_MOVEMENT_RESERVED 0x1000
#define MAPELEMENT_RECALCULATE_WIREFRAMES 0x2000
#define MAPELEMENT_ITEMPOOL_PRESENT 0x4000
#define MAPELEMENT_REACHABLE 0x8000

#define MAPELEMENT_EXT_SMOKE 0x01
#define MAPELEMENT_EXT_TEARGAS 0x02
#define MAPELEMENT_EXT_MUSTARDGAS 0x04
#define MAPELEMENT_EXT_DOOR_STATUS_PRESENT 0x08
#define MAPELEMENT_EXT_RECALCULATE_MOVEMENT 0x10
#define MAPELEMENT_EXT_NOBURN_STRUCT 0x20
#define MAPELEMENT_EXT_ROOFCODE_VISITED 0x40
#define MAPELEMENT_EXT_CREATUREGAS 0x80

#define FIRST_LEVEL 0
#define SECOND_LEVEL 1

#define ANY_SMOKE_EFFECT (MAPELEMENT_EXT_CREATUREGAS | MAPELEMENT_EXT_SMOKE | MAPELEMENT_EXT_TEARGAS | MAPELEMENT_EXT_MUSTARDGAS)

typedef struct TAG_level_node {
  struct TAG_level_node *pNext;
  UINT32 uiFlags; // flags struct

  UINT8 ubSumLights; // LIGHTING INFO
  UINT8 ubMaxLights; // MAX LIGHTING INFO

  union {
    struct TAG_level_node *pPrevNode; // FOR LAND, GOING BACKWARDS POINTER
    STRUCTURE *pStructureData; // STRUCTURE DATA
    INT32 iPhysicsObjectID; // ID FOR PHYSICS ITEM
    INT32 uiAPCost; // FOR AP DISPLAY
    INT32 iExitGridInfo;
  }; // ( 4 byte union )

  union {
    struct {
      UINT16 usIndex; // TILE DATABASE INDEX
      INT16 sCurrentFrame; // Stuff for animated tiles for a given tile location ( doors, etc )
    };

    SOLDIERTYPE *pSoldier; // POINTER TO SOLDIER
  }; // ( 4 byte union )

  union {
    // Some levelnodes can specify relative X and Y values!
    struct {
      INT16 sRelativeX; // Relative position values
      INT16 sRelativeY; // Relative position values
    };

    // Some can contains index values into dead corpses
    struct {
      INT32 iCorpseID; // Index into corpse ID
    };

    struct {
      UINT32 uiAnimHitLocationFlags; // Animation profile flags for soldier placeholders ( prone merc hit location values )
    };

    // Some can contains index values into animated tile data
    struct {
      struct TAG_anitile *pAniTile;
    };

    // Can be an item pool as well...
    struct {
      ITEM_POOL *pItemPool; // ITEM POOLS
    };
  };

  INT16 sRelativeZ; // Relative position values
  UINT8 ubShadeLevel; // LIGHTING INFO
  UINT8 ubNaturalShadeLevel; // LIGHTING INFO
  UINT8 ubFakeShadeLevel; // LIGHTING INFO
} LEVELNODE;

#define LAND_START_INDEX 1
#define OBJECT_START_INDEX 2
#define STRUCT_START_INDEX 3
#define SHADOW_START_INDEX 4
#define MERC_START_INDEX 5
#define ROOF_START_INDEX 6
#define ONROOF_START_INDEX 7
#define TOPMOST_START_INDEX 8

typedef struct {
  union {
    struct {
      LEVELNODE *pLandHead; // 0
      LEVELNODE *pLandStart; // 1

      LEVELNODE *pObjectHead; // 2

      LEVELNODE *pStructHead; // 3

      LEVELNODE *pShadowHead; // 4

      LEVELNODE *pMercHead; // 5

      LEVELNODE *pRoofHead; // 6

      LEVELNODE *pOnRoofHead; // 7

      LEVELNODE *pTopmostHead; // 8
    };

    LEVELNODE *pLevelNodes[9];
  };

  STRUCTURE *pStructureHead;
  STRUCTURE *pStructureTail;

  UINT16 uiFlags;
  UINT8 ubExtFlags[2];
  UINT16 sSumRealLights[1];
  UINT8 sHeight;
  UINT8 ubAdjacentSoldierCnt;
  UINT8 ubTerrainID;

  UINT8 ubReservedSoldierID;
  UINT8 ubBloodInfo;
  UINT8 ubSmellInfo;
} MAP_ELEMENT;

// World Data
MAP_ELEMENT *gpWorldLevelData;

// World Movement Costs
UINT8 gubWorldMovementCosts[WORLD_MAX][MAXDIR][2];

UINT8 gubCurrentLevel;
INT32 giCurrentTilesetID;

HVOBJECT hRenderVObject;
UINT32 gSurfaceMemUsage;

CHAR8 gzLastLoadedFile[260];

extern INT16 gsRecompileAreaTop;
extern INT16 gsRecompileAreaLeft;
extern INT16 gsRecompileAreaRight;
extern INT16 gsRecompileAreaBottom;

// Functions
BOOLEAN InitializeWorld();
void DeinitializeWorld();

void BuildTileShadeTables();
void DestroyTileShadeTables();

void TrashWorld(void);
void TrashMapTile(INT16 MapTile);
BOOLEAN NewWorld(void);
BOOLEAN SaveWorld(UINT8 *puiFilename);
BOOLEAN LoadWorld(UINT8 *puiFilename);
void CompileWorldMovementCosts();
void RecompileLocalMovementCosts(INT16 sCentreGridNo);
void RecompileLocalMovementCostsFromRadius(INT16 sCentreGridNo, INT8 bRadius);

BOOLEAN LoadMapTileset(INT32 iTilesetID);
BOOLEAN SaveMapTileset(INT32 iTilesetID);

void SetLoadOverrideParams(BOOLEAN fForceLoad, BOOLEAN fForceFile, CHAR8 *zLoadName);

void CalculateWorldWireFrameTiles(BOOLEAN fForce);
void RemoveWorldWireFrameTiles();
void RemoveWireFrameTiles(INT16 sGridNo);

LEVELNODE *GetAnimProfileFlags(UINT16 sGridNo, UINT16 *usFlags, SOLDIERTYPE **ppTargSoldier, LEVELNODE *pGivenNode);

void ReloadTileset(UINT8 ubID);

BOOLEAN FloorAtGridNo(UINT32 iMapIndex);
BOOLEAN DoorAtGridNo(UINT32 iMapIndex);
BOOLEAN GridNoIndoors(UINT32 iMapIndex);

BOOLEAN OpenableAtGridNo(UINT32 iMapIndex);

void RecompileLocalMovementCostsInAreaWithFlags(void);
void AddTileToRecompileArea(INT16 sGridNo);

#endif
