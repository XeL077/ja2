extern UINT32 GetCursorHandle(UINT32 uiCursorIndex);
extern void UnloadCursorData(UINT32 uiCursorIndex);
extern BOOLEAN LoadCursorData(UINT32 uiCursorIndex);
extern void CursorDatabaseClear(void);
extern UINT16 GetCursorSubIndex(UINT32 uiCursorIndex);
extern BOOLEAN SetCurrentCursorFromDatabase(UINT32 uiCursorIndex);

const ANIMATED_CURSOR = 0x02;
const USE_EXTERN_VO_CURSOR = 0x04;
const USE_OUTLINE_BLITTER = 0x08;

const EXTERN_CURSOR = 0xFFF0;
const EXTERN2_CURSOR = 0xFFE0;
const MAX_COMPOSITES = 5;
const CENTER_SUBCURSOR = 31000;
const HIDE_SUBCURSOR = 32000;

const CENTER_CURSOR = 32000;
const RIGHT_CURSOR = 32001;
const LEFT_CURSOR = 32002;
const TOP_CURSOR = 32003;
const BOTTOM_CURSOR = 32004;

const CURSOR_TO_FLASH = 0x01;
const CURSOR_TO_FLASH2 = 0x02;
const CURSOR_TO_SUB_CONDITIONALLY = 0x04;
const DELAY_START_CURSOR = 0x08;
const CURSOR_TO_PLAY_SOUND = 0x10;

///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Cursor Database
//
///////////////////////////////////////////////////////////////////////////////////////////////////

typedef struct {
  UINT8 ubFilename[MAX_FILENAME_LEN];
  BOOLEAN fLoaded;
  UINT32 uiIndex;
  UINT8 ubFlags;
  UINT8 ubNumberOfFrames;
  HVOBJECT hVObject;
} CursorFileData;

typedef struct {
  UINT32 uiFileIndex;
  UINT16 uiSubIndex;
  UINT32 uiCurrentFrame;
  INT16 usPosX;
  INT16 usPosY;
} CursorImage;

typedef struct {
  CursorImage Composites[MAX_COMPOSITES];
  UINT16 usNumComposites;
  INT16 sOffsetX;
  INT16 sOffsetY;
  UINT16 usHeight;
  UINT16 usWidth;
  UINT8 bFlags;
  UINT8 bFlashIndex;
} CursorData;

extern INT16 gsGlobalCursorYOffset;

// Globals for cursor database offset values
extern INT16 gsCurMouseOffsetX;
extern INT16 gsCurMouseOffsetY;
extern UINT16 gsCurMouseHeight;
extern UINT16 gsCurMouseWidth;

extern UINT32 guiExternVo;
extern UINT16 gusExternVoSubIndex;
extern UINT32 guiExtern2Vo;
extern UINT16 gusExtern2VoSubIndex;
extern BOOLEAN gfExternUse2nd;

typedef void (*MOUSEBLT_HOOK)(void);

void InitCursorDatabase(CursorFileData *pCursorFileData, CursorData *pCursorData, UINT16 suNumDataFiles);
void SetMouseBltHook(MOUSEBLT_HOOK pMouseBltOverride);

void SetExternVOData(UINT32 uiCursorIndex, HVOBJECT hVObject, UINT16 usSubIndex);
void RemoveExternVOData(UINT32 uiCursorIndex);