// local Defines
const enum Enum1 {
  CRDT_RENDER_NONE,
  CRDT_RENDER_ALL,
}

// nnn
interface CRDT_NODE {
  uiType: UINT32; // the type of node

  pString: Pointer<CHAR16>; // string for the node if the node contains a string

  uiFlags: UINT32; // various flags

  sPosX: INT16; // position of the node on the screen if the node is displaying stuff
  sPosY: INT16;

  sOldPosX: INT16; // position of the node on the screen if the node is displaying stuff
  sOldPosY: INT16;

  sHeightOfString: INT16; // The height of the displayed string

  fDelete: BOOLEAN; // Delete this loop

  uiLastTime: UINT32; // The last time the node was udated

  uiVideoSurfaceImage: UINT32;

  pPrev: Pointer<CRDT_NODE>;
  pNext: Pointer<CRDT_NODE>;
}

// type of credits
const enum Enum2 {
  CRDT_NODE_NONE,
  CRDT_NODE_DEFAULT, // scrolls up and off the screen
}

// flags for the credits
// Flags:
const CRDT_FLAG__TITLE = 0x00000001;
const CRDT_FLAG__START_SECTION = 0x00000002;
const CRDT_FLAG__END_SECTION = 0x00000004;

//#define		CRDT_NAME_OF_CREDIT_FILE				"BINARYDATA\\Credits.txt"
const CRDT_NAME_OF_CREDIT_FILE = "BINARYDATA\\Credits.edt";

const CREDITS_LINESIZE = 80 * 2;

//
// Code tokens
//
// new codes:
const CRDT_START_CODE = '@';
const CRDT_SEPARATION_CODE = L",";
const CRDT_END_CODE = L";";

const CRDT_DELAY_BN_STRINGS_CODE = 'D';
const CRDT_DELAY_BN_SECTIONS_CODE = 'B';
const CRDT_SCROLL_SPEED = 'S';
const CRDT_FONT_JUSTIFICATION = 'J';
const CRDT_TITLE_FONT_COLOR = 'C';
const CRDT_ACTIVE_FONT_COLOR = 'R';

// Flags:
const CRDT_TITLE = 'T';
const CRDT_START_OF_SECTION = '{';
const CRDT_END_OF_SECTION = '}';

const CRDT_NAME_LOC_X = 375;
const CRDT_NAME_LOC_Y = 420;
const CRDT_NAME_TITLE_LOC_Y = 435;
const CRDT_NAME_FUNNY_LOC_Y = 450;
const CRDT_NAME_LOC_WIDTH = 260;
const CRDT_NAME_LOC_HEIGHT = () => (CRDT_NAME_FUNNY_LOC_Y - CRDT_NAME_LOC_Y + GetFontHeight(CRDT_NAME_FONT()));

const CRDT_NAME_FONT = () => FONT12ARIAL();

const CRDT_LINE_NODE_DISAPPEARS_AT = 0; // 20

/*
//new codes:
enum
{
        CRDT_ERROR,
        CRDT_CODE_DELAY_BN_STRINGS,
        CRDT_CODE_SCROLL_SPEED,
        CRDT_CODE_FONT_JUSIFICATION,
        CRDT_CODE_FONT_COLOR,

        CRDT_NUM_CODES,
};
*/

const CRDT_WIDTH_OF_TEXT_AREA = 210;
const CRDT_TEXT_START_LOC = 10;

const CRDT_SCROLL_PIXEL_AMOUNT = 1;
const CRDT_NODE_DELAY_AMOUNT = 25;
const CRDT_DELAY_BN_NODES = 750;
const CRDT_DELAY_BN_SECTIONS = 2500;

const CRDT_SPACE_BN_SECTIONS = 50;
const CRDT_SPACE_BN_NODES = 12;

const CRDT_START_POS_Y = 479;

const CRDT_EYE_WIDTH = 30;
const CRDT_EYE_HEIGHT = 12;

const CRDT_EYES_CLOSED_TIME = 150;
// ddd

interface CDRT_FACE {
  sX: INT16;
  sY: INT16;
  sWidth: INT16;
  sHeight: INT16;

  sEyeX: INT16;
  sEyeY: INT16;

  sMouthX: INT16;
  sMouthY: INT16;

  sBlinkFreq: INT16;
  uiLastBlinkTime: UINT32;
  uiEyesClosedTime: UINT32;
}

let gCreditFaces: CDRT_FACE[] /* [] */ = {
  //  x		y				w		h
  { 298, 137, 37, 49, 310, 157, 304, 170, 2500, 0, 0 }, // Camfield
  { 348, 137, 43, 47, 354, 153, 354, 153, 3700, 0, 0 }, // Shawn
  { 407, 132, 30, 50, 408, 151, 410, 164, 3000, 0, 0 }, // Kris
  { 443, 131, 30, 50, 447, 151, 446, 161, 4000, 0, 0 }, // Ian
  { 487, 136, 43, 50, 493, 155, 493, 155, 3500, 0, 0 }, // Linda
  { 529, 145, 43, 50, 536, 164, 536, 164, 4000, 0, 0 }, // Eric
  { 581, 132, 43, 48, 584, 150, 583, 161, 3500, 0, 0 }, // Lynn
  { 278, 211, 36, 51, 283, 232, 283, 241, 3700, 0, 0 }, // Norm
  { 319, 210, 34, 49, 323, 227, 320, 339, 4000, 0, 0 }, // George
  { 358, 211, 38, 49, 364, 226, 361, 239, 3600, 0, 0 }, // Andrew Stacey
  { 396, 200, 42, 50, 406, 220, 403, 230, 4600, 0, 0 }, // Scott
  { 444, 202, 43, 51, 452, 220, 452, 231, 2800, 0, 0 }, // Emmons
  { 493, 188, 36, 51, 501, 207, 499, 217, 4500, 0, 0 }, // Dave
  { 531, 199, 47, 56, 541, 221, 540, 232, 4000, 0, 0 }, // Alex
  { 585, 196, 39, 49, 593, 218, 593, 228, 3500, 0, 0 }, // Joey
};

/*
enum
{
        CRDT_CAMFIELD,
        CRDT_SHAWN,
        CRDT_KRIS,
        CRDT_IAN,
        CRDT_LINDA,
        CRDT_ERIC,
        CRDT_LYNN,
        CRDT_NORM,
        CRDT_GEORGE,
        CRDT_STACEY,
        CRDT_SCOTT,
        CRDT_EMMONS,
        CRDT_DAVE,
        CRDT_ALEX,
        CRDT_JOEY,

        NUM_PEOPLE_IN_CREDITS,
};

STR16	gzCreditNames[]=
{
        L"Chris Camfield",
        L"Shaun Lyng",
        L"Kris Märnes",
        L"Ian Currie",
        L"Linda Currie",
        L"Eric \"WTF\" Cheng",
        L"Lynn Holowka",
        L"Norman \"NRG\" Olsen",
        L"George Brooks",
        L"Andrew Stacey",
        L"Scot Loving",
        L"Andrew \"Big Cheese\" Emmons",
        L"Dave \"The Feral\" French",
        L"Alex Meduna",
        L"Joey \"Joeker\" Whelan",
};


STR16	gzCreditNameTitle[]=
{
        L"Game Internals Programmer", 			// Chris Camfield
        L"Co-designer/Writer",							// Shaun Lyng
        L"Strategic Systems & Editor Programmer",					//Kris \"The Cow Rape Man\" Marnes
        L"Producer/Co-designer",						// Ian Currie
        L"Co-designer/Map Designer",				// Linda Currie
        L"Artist",													// Eric \"WTF\" Cheng
        L"Beta Coordinator, Support",				// Lynn Holowka
        L"Artist Extraordinaire",						// Norman \"NRG\" Olsen
        L"Sound Guru",											// George Brooks
        L"Screen Designer/Artist",					// Andrew Stacey
        L"Lead Artist/Animator",						// Scot Loving
        L"Lead Programmer",									// Andrew \"Big Cheese Doddle\" Emmons
        L"Programmer",											// Dave French
        L"Strategic Systems & Game Balance Programmer",					// Alex Meduna
        L"Portraits Artist",								// Joey \"Joeker\" Whelan",
};

STR16	gzCreditNameFunny[]=
{
        L"", 																			// Chris Camfield
        L"(still learning punctuation)",					// Shaun Lyng
        L"(\"It's done. I'm just fixing it\")",	//Kris \"The Cow Rape Man\" Marnes
        L"(getting much too old for this)",				// Ian Currie
        L"(and working on Wizardry 8)",						// Linda Currie
        L"(forced at gunpoint to also do QA)",			// Eric \"WTF\" Cheng
        L"(Left us for the CFSA - go figure...)",	// Lynn Holowka
        L"",																			// Norman \"NRG\" Olsen
        L"",																			// George Brooks
        L"(Dead Head and jazz lover)",						// Andrew Stacey
        L"(his real name is Robert)",							// Scot Loving
        L"(the only responsible person)",					// Andrew \"Big Cheese Doddle\" Emmons
        L"(can now get back to motocrossing)",	// Dave French
        L"(stolen from Wizardry 8)",							// Alex Meduna
        L"(did items and loading screens too!)",	// Joey \"Joeker\" Whelan",
};

*/

// Global Variables

let gCrdtMouseRegions: MOUSE_REGION[] /* [NUM_PEOPLE_IN_CREDITS] */;

let guiCreditBackGroundImage: UINT32;
let guiCreditFaces: UINT32;
let gfCreditsScreenEntry: BOOLEAN = TRUE;
let gfCreditsScreenExit: BOOLEAN = FALSE;
let guiCreditsExitScreen: UINT32;

let gubCreditScreenRenderFlags: UINT8 = CRDT_RENDER_ALL;

let gCrdtRootNode: Pointer<CRDT_NODE> = NULL;
let gCrdtLastAddedNode: Pointer<CRDT_NODE> = NULL;

let gfCrdtHaveRenderedFirstFrameToSaveBuffer: BOOLEAN; // need to render background image to save buffer once

let giCurrentlySelectedFace: INT32 = -1;

//
// VAriables needed for processing of the nodes:
//

let guiCreditScreenActiveFont: UINT32; // the font that is used
let guiCreditScreenTitleFont: UINT32; // the font that is used
let gubCreditScreenActiveColor: UINT8; // color of the font
let gubCreditScreenTitleColor: UINT8; // color of a Title node
// UINT32		guiCreditScreenActiveDisplayFlags;	//

let guiCrdtNodeScrollSpeed: UINT32 = CRDT_NODE_DELAY_AMOUNT; // speed credits go up at
// UINT32		guiCrdtTimeTillReadNextCredit = CRDT_DELAY_BN_SECTIONS;		//the delay before reading the next credit ( normall = guiCrdtDelayBetweenCreditSection or guiCrdtDelayBetweenNodes )
// UINT32		guiCrdtDelayBetweenCreditSection = CRDT_DELAY_BN_SECTIONS;		//delay between major credits sections ( programming and art ) appearing on the screen
// UINT32		guiCrdtDelayBetweenNodes = CRDT_DELAY_BN_NODES;		//delay between credits appearing on the screen
let guiCrdtLastTimeUpdatingNode: UINT32 = 0; // the last time a node was read from the file
let gubCrdtJustification: UINT8 = CENTER_JUSTIFIED; // the current justification

let guiGapBetweenCreditSections: UINT32 = CRDT_SPACE_BN_SECTIONS;
let guiGapBetweenCreditNodes: UINT32 = CRDT_SPACE_BN_NODES;
let guiGapTillReadNextCredit: UINT32 = CRDT_SPACE_BN_NODES;

let guiCurrentCreditRecord: UINT32 = 0;
let gfPauseCreditScreen: BOOLEAN = FALSE;

let ghFile: HWFILE;

// ggg

// Function Prototypes

// ppp

//	VSURFACE_DESC		vs_desc;
//	HVSURFACE hVSurface;

function CreditScreenInit(): UINT32 {
  gfCreditsScreenEntry = TRUE;
  return 1;
}

function CreditScreenHandle(): UINT32 {
  StartFrameBufferRender();

  if (gfCreditsScreenEntry) {
    if (!EnterCreditsScreen()) {
      gfCreditsScreenEntry = FALSE;
      gfCreditsScreenExit = TRUE;
    } else {
      gfCreditsScreenEntry = FALSE;
      gfCreditsScreenExit = FALSE;
    }
    gubCreditScreenRenderFlags = CRDT_RENDER_ALL;
  }

  GetCreditScreenUserInput();

  HandleCreditScreen();

  // render buttons marked dirty
  //	MarkButtonsDirty( );
  //	RenderButtons( );

  // render help
  //	RenderFastHelp( );
  //	RenderButtonsFastHelp( );

  ExecuteBaseDirtyRectQueue();
  EndFrameBufferRender();

  if (gfCreditsScreenExit) {
    ExitCreditScreen();
    gfCreditsScreenEntry = TRUE;
    gfCreditsScreenExit = FALSE;
  }

  return guiCreditsExitScreen;
}

function CreditScreenShutdown(): UINT32 {
  return 1;
}

// eee
function EnterCreditsScreen(): BOOLEAN {
  let uiCnt: UINT32;
  let VObjectDesc: VOBJECT_DESC;
  /*

          VSURFACE_DESC		vs_desc;

          vs_desc.fCreateFlags = VSURFACE_CREATE_FROMFILE | VSURFACE_SYSTEM_MEM_USAGE;

          strcpy(vs_desc.ImageFile, "INTERFACE\\Credits.sti");

          if( !AddVideoSurface( &vs_desc, &guiCreditBackGroundImage ) )
          {
                  return( FALSE );
          }
  */

  VObjectDesc.fCreateFlags = VOBJECT_CREATE_FROMFILE;
  FilenameForBPP("INTERFACE\\Credits.sti", VObjectDesc.ImageFile);
  CHECKF(AddVideoObject(&VObjectDesc, &guiCreditBackGroundImage));

  VObjectDesc.fCreateFlags = VOBJECT_CREATE_FROMFILE;
  FilenameForBPP("INTERFACE\\Credit Faces.sti", VObjectDesc.ImageFile);
  CHECKF(AddVideoObject(&VObjectDesc, &guiCreditFaces));

  // Initialize the root credit node
  InitCreditNode();

  guiCreditsExitScreen = CREDIT_SCREEN;
  gfCrdtHaveRenderedFirstFrameToSaveBuffer = FALSE;

  guiCreditScreenActiveFont = FONT12ARIAL;
  gubCreditScreenActiveColor = FONT_MCOLOR_DKWHITE;
  guiCreditScreenTitleFont = FONT14ARIAL;
  gubCreditScreenTitleColor = FONT_MCOLOR_RED;
  //	guiCreditScreenActiveDisplayFlags = LEFT_JUSTIFIED;
  guiCrdtNodeScrollSpeed = CRDT_NODE_DELAY_AMOUNT;
  gubCrdtJustification = CENTER_JUSTIFIED;
  guiCurrentCreditRecord = 0;

  //	guiCrdtTimeTillReadNextCredit = CRDT_DELAY_BN_SECTIONS;
  //	guiCrdtDelayBetweenCreditSection = CRDT_DELAY_BN_SECTIONS;
  //	guiCrdtDelayBetweenNodes = CRDT_DELAY_BN_NODES;

  guiCrdtLastTimeUpdatingNode = GetJA2Clock();

  guiGapBetweenCreditSections = CRDT_SPACE_BN_SECTIONS;
  guiGapBetweenCreditNodes = CRDT_SPACE_BN_NODES;
  guiGapTillReadNextCredit = CRDT_SPACE_BN_NODES;

  for (uiCnt = 0; uiCnt < NUM_PEOPLE_IN_CREDITS; uiCnt++) {
    // Make a mouse region
    MSYS_DefineRegion(&gCrdtMouseRegions[uiCnt], gCreditFaces[uiCnt].sX, gCreditFaces[uiCnt].sY, (INT16)(gCreditFaces[uiCnt].sX + gCreditFaces[uiCnt].sWidth), (INT16)(gCreditFaces[uiCnt].sY + gCreditFaces[uiCnt].sHeight), MSYS_PRIORITY_NORMAL, CURSOR_WWW, SelectCreditFaceMovementRegionCallBack, SelectCreditFaceRegionCallBack);

    // Add region
    MSYS_AddRegion(&gCrdtMouseRegions[uiCnt]);

    MSYS_SetRegionUserData(&gCrdtMouseRegions[uiCnt], 0, uiCnt);
  }

  // Test Node
  {
    //		AddCreditNode( CRDT_NODE_DEFAULT, L"This is a test" );
  }

  /*
          //open the credit text file
          ghFile = FileOpen( CRDT_NAME_OF_CREDIT_FILE, FILE_ACCESS_READ | FILE_OPEN_EXISTING, FALSE );
          if( !ghFile )
          {
                  return( FALSE );
          }
  */

  giCurrentlySelectedFace = -1;
  gfPauseCreditScreen = FALSE;

  InitCreditEyeBlinking();

  return TRUE;
}

function ExitCreditScreen(): BOOLEAN {
  let uiCnt: UINT32;

  // Blit the background image
  //	DeleteVideoSurfaceFromIndex( guiCreditBackGroundImage );
  DeleteVideoObjectFromIndex(guiCreditBackGroundImage);

  DeleteVideoObjectFromIndex(guiCreditFaces);

  // ShutDown Credit link list
  ShutDownCreditList();

  for (uiCnt = 0; uiCnt < NUM_PEOPLE_IN_CREDITS; uiCnt++) {
    MSYS_RemoveRegion(&gCrdtMouseRegions[uiCnt]);
  }

  /*
          //close the text file
          FileClose( ghFile );
          ghFile = 0;
  */

  return TRUE;
}

// hhh
function HandleCreditScreen(): void {
  //	UINT32	uiTime = GetJA2Clock();

  if (gubCreditScreenRenderFlags == CRDT_RENDER_ALL) {
    RenderCreditScreen();
    gubCreditScreenRenderFlags = CRDT_RENDER_NONE;
  }

  // Handle the Credit linked list
  HandleCreditNodes();

  // Handle the blinkng eyes
  HandleCreditEyeBlinking();

  // is it time to get a new node
  if (gCrdtLastAddedNode == NULL || (CRDT_START_POS_Y - (gCrdtLastAddedNode->sPosY + gCrdtLastAddedNode->sHeightOfString - 16)) >= (INT16)guiGapTillReadNextCredit) {
    // if there are no more credits in the file
    if (!GetNextCreditFromTextFile() && gCrdtLastAddedNode == NULL) {
      SetCreditsExitScreen(MAINMENU_SCREEN);
    }
  }

  RestoreExternBackgroundRect(CRDT_NAME_LOC_X, CRDT_NAME_LOC_Y, CRDT_NAME_LOC_WIDTH, (INT16)CRDT_NAME_LOC_HEIGHT);

  if (giCurrentlySelectedFace != -1) {
    DrawTextToScreen(gzCreditNames[giCurrentlySelectedFace], CRDT_NAME_LOC_X, CRDT_NAME_LOC_Y, CRDT_NAME_LOC_WIDTH, CRDT_NAME_FONT, FONT_MCOLOR_WHITE, 0, FALSE, INVALIDATE_TEXT | CENTER_JUSTIFIED);
    DrawTextToScreen(gzCreditNameTitle[giCurrentlySelectedFace], CRDT_NAME_LOC_X, CRDT_NAME_TITLE_LOC_Y, CRDT_NAME_LOC_WIDTH, CRDT_NAME_FONT, FONT_MCOLOR_WHITE, 0, FALSE, INVALIDATE_TEXT | CENTER_JUSTIFIED);
    DrawTextToScreen(gzCreditNameFunny[giCurrentlySelectedFace], CRDT_NAME_LOC_X, CRDT_NAME_FUNNY_LOC_Y, CRDT_NAME_LOC_WIDTH, CRDT_NAME_FONT, FONT_MCOLOR_WHITE, 0, FALSE, INVALIDATE_TEXT | CENTER_JUSTIFIED);
  }
}

// rrr
function RenderCreditScreen(): BOOLEAN {
  let hPixHandle: HVOBJECT;

  GetVideoObject(&hPixHandle, guiCreditBackGroundImage);
  BltVideoObject(FRAME_BUFFER, hPixHandle, 0, 0, 0, VO_BLT_SRCTRANSPARENCY, NULL);
  /*
          HVSURFACE hVSurface;

          GetVideoSurface( &hVSurface, guiCreditBackGroundImage );
          BltVideoSurfaceToVideoSurface( ghFrameBuffer, hVSurface, 0, 0, 0, 0, NULL );
  */
  if (!gfCrdtHaveRenderedFirstFrameToSaveBuffer) {
    gfCrdtHaveRenderedFirstFrameToSaveBuffer = TRUE;

    // blit everything to the save buffer ( cause the save buffer can bleed through )
    BlitBufferToBuffer(guiRENDERBUFFER, guiSAVEBUFFER, 0, 0, 640, 480);

    UnmarkButtonsDirty();
  }

  InvalidateScreen();
  return TRUE;
}

function GetCreditScreenUserInput(): void {
  let Event: InputAtom;

  while (DequeueEvent(&Event)) {
    if (Event.usEvent == KEY_DOWN) {
      switch (Event.usParam) {
        case ESC:
          // Exit out of the screen
          SetCreditsExitScreen(MAINMENU_SCREEN);
          break;
      }
    }
  }
}

function SetCreditsExitScreen(uiScreenToGoTo: UINT32): void {
  gfCreditsScreenExit = TRUE;

  guiCreditsExitScreen = uiScreenToGoTo;
}

function InitCreditNode(): BOOLEAN {
  if (gCrdtRootNode != NULL)
    Assert(0);

  gCrdtRootNode = NULL;

  return TRUE;
}

function ShutDownCreditList(): BOOLEAN {
  let pNodeToDelete: Pointer<CRDT_NODE> = NULL;
  let pTemp: Pointer<CRDT_NODE> = NULL;

  pNodeToDelete = gCrdtRootNode;

  while (pNodeToDelete != NULL) {
    pTemp = pNodeToDelete;

    pNodeToDelete = pNodeToDelete->pNext;

    // Delete the current node
    DeleteNode(pTemp);
  }

  return TRUE;
}

function DeleteNode(pNodeToDelete: Pointer<CRDT_NODE>): BOOLEAN {
  let pTempNode: Pointer<CRDT_NODE>;

  pTempNode = pNodeToDelete;

  if (gCrdtLastAddedNode == pNodeToDelete) {
    gCrdtLastAddedNode = NULL;
  }

  // if its Not the first node
  if (pNodeToDelete->pPrev != NULL)
    pNodeToDelete->pPrev = pNodeToDelete->pNext;
  else {
    if (gCrdtRootNode->pNext != NULL) {
      gCrdtRootNode = gCrdtRootNode->pNext;
      gCrdtRootNode->pPrev = NULL;
    }
  }

  // if its the last node in the list
  if (pNodeToDelete->pNext == NULL && pNodeToDelete->pPrev != NULL)
    pNodeToDelete->pPrev->pNext = NULL;

  // iof the node that is being deleted is the first node
  if (pTempNode == gCrdtRootNode)
    gCrdtRootNode = NULL;

  // Free the string
  if (pTempNode->pString != NULL) {
    MemFree(pTempNode->pString);
    pTempNode->pString = NULL;
  }

  // if the node had something to display, delete a surface for it
  if (pTempNode->uiType == CRDT_NODE_DEFAULT) {
    DeleteVideoSurfaceFromIndex(pTempNode->uiVideoSurfaceImage);
    pTempNode->uiVideoSurfaceImage = 0;
  }

  // Free the node
  MemFree(pTempNode);
  pTempNode = NULL;

  return TRUE;
}

// aaa
function AddCreditNode(uiType: UINT32, uiFlags: UINT32, pString: STR16): BOOLEAN {
  let pNodeToAdd: Pointer<CRDT_NODE> = NULL;
  let pTemp: Pointer<CRDT_NODE> = NULL;
  let uiSizeOfString: UINT32 = (wcslen(pString) + 2) * 2;
  let uiFontToUse: UINT32;
  let uiColorToUse: UINT8;

  // if
  if (uiType == CRDT_NODE_NONE) {
    // Assert( 0 );
    return TRUE;
  }

  pNodeToAdd = MemAlloc(sizeof(CRDT_NODE));
  if (pNodeToAdd == NULL) {
    return FALSE;
  }
  memset(pNodeToAdd, 0, sizeof(CRDT_NODE));

  // Determine the font and the color to use
  if (uiFlags & CRDT_FLAG__TITLE) {
    uiFontToUse = guiCreditScreenTitleFont;
    uiColorToUse = gubCreditScreenTitleColor;
  }
  /*
          else if ( uiFlags & CRDT_FLAG__START_SECTION )
          {
                  uiFontToUse = ;
                  uiColorToUse = ;
          }
          else if ( uiFlags & CRDT_FLAG__END_SECTION )
          {
                  uiFontToUse = ;
                  uiColorToUse = ;
          }
  */
  else {
    uiFontToUse = guiCreditScreenActiveFont;
    uiColorToUse = gubCreditScreenActiveColor;
  }

  //
  // Set some default data
  //

  // the type of the node
  pNodeToAdd->uiType = uiType;

  // any flags that are added
  pNodeToAdd->uiFlags = uiFlags;

  // the starting left position for the it
  pNodeToAdd->sPosX = CRDT_TEXT_START_LOC;

  // Allocate memory for the string
  pNodeToAdd->pString = MemAlloc(uiSizeOfString);
  if (pNodeToAdd->pString == NULL)
    return FALSE;

  // copy the string into the node
  wcscpy(pNodeToAdd->pString, pString);

  // Calculate the height of the string
  pNodeToAdd->sHeightOfString = DisplayWrappedString(0, 0, CRDT_WIDTH_OF_TEXT_AREA, 2, uiFontToUse, uiColorToUse, pNodeToAdd->pString, 0, FALSE, DONT_DISPLAY_TEXT) + 1;

  // starting y position on the screen
  pNodeToAdd->sPosY = CRDT_START_POS_Y;

  //	pNodeToAdd->uiLastTime = GetJA2Clock();

  // if the node can have something to display, Create a surface for it
  if (pNodeToAdd->uiType == CRDT_NODE_DEFAULT) {
    let vs_desc: VSURFACE_DESC;

    // Create a background video surface to blt the face onto
    vs_desc.fCreateFlags = VSURFACE_CREATE_DEFAULT | VSURFACE_SYSTEM_MEM_USAGE;
    vs_desc.usWidth = CRDT_WIDTH_OF_TEXT_AREA;
    vs_desc.usHeight = pNodeToAdd->sHeightOfString;
    vs_desc.ubBitDepth = 16;

    if (AddVideoSurface(&vs_desc, &pNodeToAdd->uiVideoSurfaceImage) == 0) {
      return FALSE;
    }

    // Set transparency
    SetVideoSurfaceTransparency(pNodeToAdd->uiVideoSurfaceImage, 0);

    // fill the surface with a transparent color
    ColorFillVideoSurfaceArea(pNodeToAdd->uiVideoSurfaceImage, 0, 0, CRDT_WIDTH_OF_TEXT_AREA, pNodeToAdd->sHeightOfString, 0);

    // set the font dest buffer to be the surface
    SetFontDestBuffer(pNodeToAdd->uiVideoSurfaceImage, 0, 0, CRDT_WIDTH_OF_TEXT_AREA, pNodeToAdd->sHeightOfString, FALSE);

    // write the string onto the surface
    DisplayWrappedString(0, 1, CRDT_WIDTH_OF_TEXT_AREA, 2, uiFontToUse, uiColorToUse, pNodeToAdd->pString, 0, FALSE, gubCrdtJustification);

    // reset the font dest buffer
    SetFontDestBuffer(FRAME_BUFFER, 0, 0, 640, 480, FALSE);
  }

  //
  // Insert the node into the list
  //

  // if its the first node to add
  if (gCrdtRootNode == NULL) {
    // make the new node the root node
    gCrdtRootNode = pNodeToAdd;

    gCrdtRootNode->pNext = NULL;
    gCrdtRootNode->pPrev = NULL;
  } else {
    pTemp = gCrdtRootNode;

    while (pTemp->pNext != NULL) {
      pTemp = pTemp->pNext;
    }

    // Add the new node to the list
    pTemp->pNext = pNodeToAdd;

    // Assign the prev node
    pNodeToAdd->pPrev = pTemp;
  }

  gCrdtLastAddedNode = pNodeToAdd;

  return TRUE;
}

function HandleCreditNodes(): void {
  let uiCurrentTime: UINT32 = GetJA2Clock();
  let pCurrent: Pointer<CRDT_NODE> = NULL;
  let pTemp: Pointer<CRDT_NODE> = NULL;

  if (gCrdtRootNode == NULL)
    return;

  // if the screen is paused, exit
  if (gfPauseCreditScreen)
    return;

  pCurrent = gCrdtRootNode;

  if (!(GetJA2Clock() - guiCrdtLastTimeUpdatingNode > guiCrdtNodeScrollSpeed))
    return;

  // loop through all the nodes
  while (pCurrent != NULL) {
    pTemp = pCurrent;

    pCurrent = pCurrent->pNext;

    // Handle the current node
    HandleCurrentCreditNode(pTemp);

    // if the node is to be deleted
    if (pTemp->fDelete) {
      // delete the node
      DeleteNode(pTemp);
    }
  }

  //	RestoreExternBackgroundRect( CRDT_TEXT_START_LOC, 0, CRDT_WIDTH_OF_TEXT_AREA, CRDT_LINE_NODE_DISAPPEARS_AT );

  guiCrdtLastTimeUpdatingNode = GetJA2Clock();
}

function HandleCurrentCreditNode(pCurrent: Pointer<CRDT_NODE>): void {
  // switch on the type of node
  switch (pCurrent->uiType) {
      // new codes:
    case CRDT_NODE_DEFAULT:
      HandleNode_Default(pCurrent);
      break;

    default:
      Assert(0);
      break;
  }
}

function HandleNode_Default(pCurrent: Pointer<CRDT_NODE>): void {
  let uiCurrentTime: UINT32 = GetJA2Clock();

  // if it is time to update the current node
  //	if( ( uiCurrentTime - pCurrent->uiLastTime ) > guiCrdtNodeScrollSpeed )
  {
    // Display the Current Node
    DisplayCreditNode(pCurrent);

    // Save the old position
    pCurrent->sOldPosX = pCurrent->sPosX;
    pCurrent->sOldPosY = pCurrent->sPosY;

    // Move the current node up
    pCurrent->sPosY -= CRDT_SCROLL_PIXEL_AMOUNT;

    // if the node is entirely off the screen
    if ((pCurrent->sPosY + pCurrent->sHeightOfString) < CRDT_LINE_NODE_DISAPPEARS_AT) {
      // mark the node to be deleted this frame
      pCurrent->fDelete = TRUE;
    }

    // Update the last time to be the current time
    //		pCurrent->uiLastTime = uiCurrentTime + ( uiCurrentTime - ( pCurrent->uiLastTime + guiCrdtNodeScrollSpeed ) );

    //		pCurrent->uiLastTime = ( uiCurrentTime - ( uiCurrentTime - pCurrent->uiLastTime - guiCrdtNodeScrollSpeed) );

    pCurrent->uiLastTime = GetJA2Clock();
  }
}

function DisplayCreditNode(pCurrent: Pointer<CRDT_NODE>): BOOLEAN {
  let hVSurface: HVSURFACE;

  // Currently, we have no need to display a node that doesnt have a string
  if (pCurrent->pString == NULL)
    return FALSE;

  // if the node is new and we havent displayed it yet
  if (pCurrent->uiLastTime == 0) {
  }

  // else we have to restore were the string was
  else {
    //
    // Restore the background before blitting the text back on
    //

    // if the surface is at the bottom of the screen
    if (pCurrent->sOldPosY + pCurrent->sHeightOfString > CRDT_START_POS_Y) {
      let sHeight: INT16 = 480 - pCurrent->sOldPosY;
      RestoreExternBackgroundRect(pCurrent->sOldPosX, pCurrent->sOldPosY, CRDT_WIDTH_OF_TEXT_AREA, sHeight);
    } else if (pCurrent->sOldPosY > CRDT_LINE_NODE_DISAPPEARS_AT) {
      RestoreExternBackgroundRect(pCurrent->sOldPosX, pCurrent->sOldPosY, CRDT_WIDTH_OF_TEXT_AREA, pCurrent->sHeightOfString);
    }

    // if the surface is at the top of the screen
    else {
      let sHeight: INT16 = pCurrent->sOldPosY + pCurrent->sHeightOfString;

      RestoreExternBackgroundRect(pCurrent->sOldPosX, CRDT_LINE_NODE_DISAPPEARS_AT, CRDT_WIDTH_OF_TEXT_AREA, sHeight);
    }
  }

  GetVideoSurface(&hVSurface, pCurrent->uiVideoSurfaceImage);

  BltVideoSurfaceToVideoSurface(ghFrameBuffer, hVSurface, 0, pCurrent->sPosX, pCurrent->sPosY, VS_BLT_CLIPPED | VS_BLT_USECOLORKEY, NULL);

  return TRUE;
}

// return false from this function when there are no more items in the text file
function GetNextCreditFromTextFile(): BOOLEAN {
  let fDone: BOOLEAN = FALSE;
  let uiStringWidth: UINT32 = 20;
  let zOriginalString: CHAR16[] /* [512] */;
  let zString: CHAR16[] /* [512] */;
  let zCodes: CHAR16[] /* [512] */;
  let pzNewCode: STR16 = NULL;
  let uiCodeType: UINT32 = 0;
  let uiNodeType: UINT32 = 0;
  let uiStartLoc: UINT32 = 0;
  let uiFlags: UINT32 = 0;

  // Get the current Credit record
  uiStartLoc = CREDITS_LINESIZE * guiCurrentCreditRecord;
  if (!LoadEncryptedDataFromFile(CRDT_NAME_OF_CREDIT_FILE, zOriginalString, uiStartLoc, CREDITS_LINESIZE)) {
    // there are no more credits
    return FALSE;
  }

  // Increment to the next crdit record
  guiCurrentCreditRecord++;

  // if there are no codes in the string
  if (zOriginalString[0] != CRDT_START_CODE) {
    // copy the string
    wcscpy(zString, zOriginalString);
    uiNodeType = CRDT_NODE_DEFAULT;
  } else {
    let uiSizeOfCodes: UINT32 = 0;
    let uiSizeOfSubCode: UINT32 = 0;
    let pzEndCode: STR16 = NULL;
    let uiDistanceIntoCodes: UINT32 = 0;

    // Retrive all the codes from the string
    pzEndCode = wcsstr(zOriginalString, CRDT_END_CODE);

    // Make a string for the codes
    wcscpy(zCodes, zOriginalString);

    // end the setence after the codes
    zCodes[pzEndCode - zOriginalString + 1] = '\0';

    // Get the size of the codes
    uiSizeOfCodes = pzEndCode - zOriginalString + 1;

    //
    // check to see if there is a string, or just codes
    //

    // if the string is the same size as the codes
    if (wcslen(zOriginalString) == uiSizeOfCodes) {
      // there is no string, just codes
      uiNodeType = CRDT_NODE_NONE;
    }

    // else there is a string aswell
    else {
      // copy the main string
      wcscpy(zString, &zOriginalString[uiSizeOfCodes]);

      uiNodeType = CRDT_NODE_DEFAULT;
    }

    // get rid of the start code delimeter
    uiDistanceIntoCodes = 1;

    uiFlags = 0;

    // loop through the string of codes to get all the control codes out
    while (uiDistanceIntoCodes < uiSizeOfCodes) {
      // Determine what kind of code it is, and handle it
      uiFlags |= GetAndHandleCreditCodeFromCodeString(&zCodes[uiDistanceIntoCodes]);

      // get the next code from the string of codes, returns NULL when done
      pzNewCode = GetNextCreditCode(&zCodes[uiDistanceIntoCodes], &uiSizeOfSubCode);

      // if we are done getting the sub codes
      if (pzNewCode == NULL) {
        uiDistanceIntoCodes = uiSizeOfCodes;
      } else {
        // else increment by the size of the code
        uiDistanceIntoCodes += uiSizeOfSubCode;
      }
    }
  }

  if (uiNodeType != CRDT_NODE_NONE) {
    // add the node to the list
    AddCreditNode(uiNodeType, uiFlags, zString);
  }

  // if any processing of the flags need to be done
  HandleCreditFlags(uiFlags);

  return TRUE;
}

// return any flags that need to be set in the node
function GetAndHandleCreditCodeFromCodeString(pzCode: STR16): UINT32 {
  // new codes:

  // if the code is to change the delay between strings
  if (pzCode[0] == CRDT_DELAY_BN_STRINGS_CODE) {
    let uiNewDelay: UINT32 = 0;

    // Get the delay from the string
    swscanf(&pzCode[1], L"%d%*s", &uiNewDelay);

    //		guiCrdtDelayBetweenNodes = uiNewDelay;
    guiGapBetweenCreditNodes = uiNewDelay;

    return CRDT_NODE_NONE;
  }

  // if the code is to change the delay between sections strings
  else if (pzCode[0] == CRDT_DELAY_BN_SECTIONS_CODE) {
    let uiNewDelay: UINT32 = 0;

    // Get the delay from the string
    swscanf(&pzCode[1], L"%d%*s", &uiNewDelay);

    //		guiCrdtDelayBetweenCreditSection = uiNewDelay;
    guiGapBetweenCreditSections = uiNewDelay;

    return CRDT_NODE_NONE;
  }

  else if (pzCode[0] == CRDT_SCROLL_SPEED) {
    let uiScrollSpeed: UINT32 = 0;

    // Get the delay from the string
    swscanf(&pzCode[1], L"%d%*s", &uiScrollSpeed);

    guiCrdtNodeScrollSpeed = uiScrollSpeed;

    return CRDT_NODE_NONE;
  }

  else if (pzCode[0] == CRDT_FONT_JUSTIFICATION) {
    let uiJustification: UINT32 = 0;

    // Get the delay from the string
    swscanf(&pzCode[1], L"%d%*s", &uiJustification);

    // get the justification
    switch (uiJustification) {
      case 0:
        gubCrdtJustification = LEFT_JUSTIFIED;
        break;
      case 1:
        gubCrdtJustification = CENTER_JUSTIFIED;
        break;
      case 2:
        gubCrdtJustification = RIGHT_JUSTIFIED;
        break;
      default:
        Assert(0);
    }

    return CRDT_NODE_NONE;
  }

  else if (pzCode[0] == CRDT_TITLE_FONT_COLOR) {
    // Get the new color for the title
    swscanf(&pzCode[1], L"%d%*s", &gubCreditScreenTitleColor);

    return CRDT_NODE_NONE;
  }

  else if (pzCode[0] == CRDT_ACTIVE_FONT_COLOR) {
    // Get the new color for the active text
    swscanf(&pzCode[1], L"%d%*s", &gubCreditScreenActiveColor);

    return CRDT_NODE_NONE;
  }

  // else its the title code
  else if (pzCode[0] == CRDT_TITLE) {
    return CRDT_FLAG__TITLE;
  }

  // else its the title code
  else if (pzCode[0] == CRDT_START_OF_SECTION) {
    return CRDT_FLAG__START_SECTION;
  }

  // else its the title code
  else if (pzCode[0] == CRDT_END_OF_SECTION) {
    return CRDT_FLAG__END_SECTION;
  }

  // else its an error
  else {
    Assert(0);
  }

  return CRDT_NODE_NONE;
}

function CountNumberOfCreditNodes(): UINT32 {
  let uiNumNodes: UINT32 = 0;
  let pTempNode: Pointer<CRDT_NODE> = gCrdtRootNode;

  while (pTempNode) {
    uiNumNodes++;

    pTempNode = pTempNode->pNext;
  }

  return uiNumNodes;
}

function GetNextCreditCode(pString: STR16, pSizeOfCode: Pointer<UINT32>): STR16 {
  let pzNewCode: STR16 = NULL;
  let uiSizeOfCode: UINT32 = 0;

  // get the new subcode out
  pzNewCode = wcsstr(pString, CRDT_SEPARATION_CODE);

  // if there is no separation code, then there must be an end code
  if (pzNewCode == NULL) {
    // pzNewCode = wcsstr( pString, CRDT_END_CODE );

    // we are done
    pzNewCode = NULL;
  } else {
    // get rid of separeation code
    pzNewCode++;

    // calc size of sub string
    uiSizeOfCode = pzNewCode - pString;
  }

  *pSizeOfCode = uiSizeOfCode;
  return pzNewCode;
}

// Flags:
function HandleCreditFlags(uiFlags: UINT32): void {
  if (uiFlags & CRDT_FLAG__TITLE) {
  }

  if (uiFlags & CRDT_FLAG__START_SECTION) {
    //		guiCrdtTimeTillReadNextCredit = guiCrdtDelayBetweenNodes;
    guiGapTillReadNextCredit = guiGapBetweenCreditNodes;
  }

  if (uiFlags & CRDT_FLAG__END_SECTION) {
    //		guiCrdtTimeTillReadNextCredit = guiCrdtDelayBetweenCreditSection;
    guiGapTillReadNextCredit = guiGapBetweenCreditSections;
  }
}

function SelectCreditFaceRegionCallBack(pRegion: Pointer<MOUSE_REGION>, iReason: INT32): void {
  if (iReason & MSYS_CALLBACK_REASON_INIT) {
  } else if (iReason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
  } else if (iReason & MSYS_CALLBACK_REASON_RBUTTON_UP) {
  }
}

function SelectCreditFaceMovementRegionCallBack(pRegion: Pointer<MOUSE_REGION>, iReason: INT32): void {
  if (iReason & MSYS_CALLBACK_REASON_LOST_MOUSE) {
    giCurrentlySelectedFace = -1;
  } else if (iReason & MSYS_CALLBACK_REASON_GAIN_MOUSE) {
    giCurrentlySelectedFace = MSYS_GetRegionUserData(pRegion, 0);
  } else if (iReason & MSYS_CALLBACK_REASON_MOVE) {
  }
}

function InitCreditEyeBlinking(): void {
  let ubCnt: UINT8;

  for (ubCnt = 0; ubCnt < NUM_PEOPLE_IN_CREDITS; ubCnt++) {
    gCreditFaces[ubCnt].uiLastBlinkTime = GetJA2Clock() + Random(gCreditFaces[ubCnt].sBlinkFreq * 2);
  }
}

function HandleCreditEyeBlinking(): void {
  let hPixHandle: HVOBJECT;
  let ubCnt: UINT8;

  GetVideoObject(&hPixHandle, guiCreditFaces);

  for (ubCnt = 0; ubCnt < NUM_PEOPLE_IN_CREDITS; ubCnt++) {
    if ((GetJA2Clock() - gCreditFaces[ubCnt].uiLastBlinkTime) > (UINT32)gCreditFaces[ubCnt].sBlinkFreq) {
      BltVideoObject(FRAME_BUFFER, hPixHandle, (UINT8)(ubCnt * 3), gCreditFaces[ubCnt].sEyeX, gCreditFaces[ubCnt].sEyeY, VO_BLT_SRCTRANSPARENCY, NULL);
      InvalidateRegion(gCreditFaces[ubCnt].sEyeX, gCreditFaces[ubCnt].sEyeY, gCreditFaces[ubCnt].sEyeX + CRDT_EYE_WIDTH, gCreditFaces[ubCnt].sEyeY + CRDT_EYE_HEIGHT);

      gCreditFaces[ubCnt].uiLastBlinkTime = GetJA2Clock();

      gCreditFaces[ubCnt].uiEyesClosedTime = GetJA2Clock() + CRDT_EYES_CLOSED_TIME + Random(CRDT_EYES_CLOSED_TIME);
    } else if (GetJA2Clock() > gCreditFaces[ubCnt].uiEyesClosedTime) {
      gCreditFaces[ubCnt].uiEyesClosedTime = 0;

      RestoreExternBackgroundRect(gCreditFaces[ubCnt].sEyeX, gCreditFaces[ubCnt].sEyeY, CRDT_EYE_WIDTH, CRDT_EYE_HEIGHT);
    }
  }
}
