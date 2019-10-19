typedef void (*TILESET_CALLBACK)(void);

typedef struct {
  INT16 zName[32];
  CHAR8 TileSurfaceFilenames[NUMBEROFTILETYPES][32];
  UINT8 ubAmbientID;
  TILESET_CALLBACK MovementCostFnc;
} TILESET;

extern TILESET gTilesets[NUM_TILESETS];

void InitEngineTilesets();

// THESE FUNCTIONS WILL SET TERRAIN VALUES - CALL ONE FOR EACH TILESET
void SetTilesetOneTerrainValues();
void SetTilesetTwoTerrainValues();