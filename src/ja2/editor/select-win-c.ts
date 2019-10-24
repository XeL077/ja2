let gfRenderSquareArea: boolean = false;
let iStartClickX: INT16;
let iStartClickY: INT16;
let iEndClickX: INT16;
let iEndClickY: INT16;

let iButtonIcons: INT32[] /* [4] */;
let iSelectWin: INT32;
let iCancelWin: INT32;
let iScrollUp: INT32;
let iScrollDown: INT32;
let iOkWin: INT32;

let fAllDone: boolean = false;
let fButtonsPresent: boolean = false;

let SelWinSpacing: SGPPoint;
let SelWinStartPoint: SGPPoint;
let SelWinEndPoint: SGPPoint;

// These definitions help define the start and end of the various wall indices.
// This needs to be maintained if the walls change.
const WALL_LAST_WALL_OFFSET = 30;
const WALL_FIRST_AFRAME_OFFSET = 31;
const WALL_LAST_AFRAME_OFFSET = 34;
const WALL_FIRST_WINDOW_OFFSET = 35;
const WALL_LAST_WINDOW_OFFSET = 46;
const WALL_FIRST_BROKEN_WALL_OFFSET = 47;
const WALL_LAST_BROKEN_WALL_OFFSET = 54;
const WALL_FIRST_APPENDED_WALL_OFFSET = 55;
const WALL_LAST_APPENDED_WALL_OFFSET = 56;
const WALL_FIRST_WEATHERED_WALL_OFFSET = 57;
const WALL_LAST_WEATHERED_WALL_OFFSET = 64;

// I've added these definitions to add readability, and minimize conversion time for changes
// incase there are new values, etc.
const OSTRUCTS_NUMELEMENTS = (LASTOSTRUCT - Enum313.FIRSTFULLSTRUCT + 22);
const OSTRUCTS1_NUMELEMENTS = 5;
const OSTRUCTS2_NUMELEMENTS = 12;
const BANKSLIST_NUMELEMENTS = 5;
const ROADSLIST_NUMELEMENTS = 1;
const DEBRISLIST_NUMELEMENTS = (LASTDEBRIS - Enum313.DEBRISROCKS + 2 + 1); //+1 for ANOTHERDEBRIS

const SINGLEWALL_NUMELEMENTS = ((LASTWALL - Enum313.FIRSTWALL + 1) * 2);
const SINGLEDOOR_NUMELEMENTS = ((LASTDOOR - Enum313.FIRSTDOOR + 1) * 5);
const SINGLEWINDOW_NUMELEMENTS = (LASTWALL - Enum313.FIRSTWALL + 1);
const SINGLEROOF_NUMELEMENTS = ((LASTROOF - Enum313.FIRSTROOF + 1) + (LASTSLANTROOF - Enum313.FIRSTSLANTROOF + 1) + (LASTWALL - Enum313.FIRSTWALL + 1) + (Enum313.SECONDONROOF - Enum313.FIRSTONROOF + 1));
const SINGLENEWROOF_NUMELEMENTS = (LASTROOF - Enum313.FIRSTROOF + 1);
const SINGLEBROKENWALL_NUMELEMENTS = ((LASTDECORATIONS - Enum313.FIRSTDECORATIONS + 1) + (LASTWALL - Enum313.FIRSTWALL + 1) * 2);
const SINGLEDECOR_NUMELEMENTS = (LASTISTRUCT - Enum313.FIRSTISTRUCT + 1);
const SINGLEDECAL_NUMELEMENTS = (LASTWALLDECAL - Enum313.FIRSTWALLDECAL + Enum313.EIGTHWALLDECAL - Enum313.FIFTHWALLDECAL + 3);
const SINGLEFLOOR_NUMELEMENTS = (LASTFLOOR - Enum313.FIRSTFLOOR + 1);
const SINGLETOILET_NUMELEMENTS = (Enum313.EIGHTISTRUCT - Enum313.FIFTHISTRUCT + 1);
//#define ROOM_NUMELEMENTS							( (LASTWALL-FIRSTWALL+1) + (LASTFLOOR-FIRSTFLOOR+1) + \
//																				(LASTROOF-FIRSTROOF+1) + (LASTSLANTROOF-FIRSTSLANTROOF+1) )
const ROOM_NUMELEMENTS = ((LASTWALL - Enum313.FIRSTWALL + 1) + (LASTFLOOR - Enum313.FIRSTFLOOR + 1) + (LASTROOF - Enum313.FIRSTROOF + 1) + (2));

// This is a special case for trees which may have varying numbers.  There was a problem
// in which we loaded a new tileset which had one less tree in it.  When we called BuildSelectionWindow(),
// it would crash because it thought there was an extra tree which was now invalid.
let gusNumOStructs: UINT16 = 0;

// List of objects to display in the selection window
let OStructs: DisplaySpec[] /* [OSTRUCTS_NUMELEMENTS] */;
let OStructs1: DisplaySpec[] /* [OSTRUCTS1_NUMELEMENTS] */;
let OStructs2: DisplaySpec[] /* [OSTRUCTS2_NUMELEMENTS] */;
let BanksList: DisplaySpec[] /* [BANKSLIST_NUMELEMENTS] */;
let RoadsList: DisplaySpec[] /* [ROADSLIST_NUMELEMENTS] */;
let DebrisList: DisplaySpec[] /* [DEBRISLIST_NUMELEMENTS] */;
let SingleWall: DisplaySpec[] /* [SINGLEWALL_NUMELEMENTS] */;
let SingleDoor: DisplaySpec[] /* [SINGLEDOOR_NUMELEMENTS] */;
let SingleWindow: DisplaySpec[] /* [SINGLEWINDOW_NUMELEMENTS] */;
let SingleRoof: DisplaySpec[] /* [SINGLEROOF_NUMELEMENTS] */;
let SingleNewRoof: DisplaySpec[] /* [SINGLENEWROOF_NUMELEMENTS] */;
let SingleBrokenWall: DisplaySpec[] /* [SINGLEBROKENWALL_NUMELEMENTS] */;
let SingleDecor: DisplaySpec[] /* [SINGLEDECOR_NUMELEMENTS] */;
let SingleDecal: DisplaySpec[] /* [SINGLEDECAL_NUMELEMENTS] */;
let SingleFloor: DisplaySpec[] /* [SINGLEFLOOR_NUMELEMENTS] */;
let SingleToilet: DisplaySpec[] /* [SINGLETOILET_NUMELEMENTS] */;
let Room: DisplaySpec[] /* [ROOM_NUMELEMENTS] */;

// These are all of the different selection lists.  Changing the max_selections will
// change the number of selections values you can have at a time.  This is Bret's gay code,
// though I've cleaned it up a lot.
let SelOStructs: Selections[] /* [MAX_SELECTIONS] */ = [ [ Enum313.FIRSTFULLSTRUCT, 0, 1 ] ]; // Default selections
let SelOStructs1: Selections[] /* [MAX_SELECTIONS] */ = [ [ Enum313.FOURTHOSTRUCT, 0, 1 ] ]; // Default selections
let SelOStructs2: Selections[] /* [MAX_SELECTIONS] */ = [ [ Enum313.THIRDOSTRUCT, 0, 1 ] ]; // Default selections
let SelBanks: Selections[] /* [MAX_SELECTIONS] */ = [ [ Enum313.FIRSTCLIFF, 0, 1 ] ];
let SelRoads: Selections[] /* [MAX_SELECTIONS] */ = [ [ Enum313.FIRSTROAD, 0, 1 ] ];
let SelDebris: Selections[] /* [MAX_SELECTIONS] */ = [ [ Enum313.DEBRISROCKS, 0, 1 ] ];
let SelSingleWall: Selections[] /* [MAX_SELECTIONS] */ = [ [ Enum313.FIRSTWALL, 0, 1 ] ];
let SelSingleDoor: Selections[] /* [MAX_SELECTIONS] */ = [ [ Enum313.FIRSTDOOR, 0, 1 ] ];
let SelSingleWindow: Selections[] /* [MAX_SELECTIONS] */ = [ [ Enum313.FIRSTWALL, 44, 1 ] ];
let SelSingleRoof: Selections[] /* [MAX_SELECTIONS] */ = [ [ Enum313.FIRSTROOF, 0, 1 ] ];
let SelSingleNewRoof: Selections[] /* [MAX_SELECTIONS] */ = [ [ Enum313.FIRSTROOF, 0, 1 ] ];
let SelSingleBrokenWall: Selections[] /* [MAX_SELECTIONS] */ = [ [ Enum313.FIRSTDECORATIONS, 0, 1 ] ];
let SelSingleDecor: Selections[] /* [MAX_SELECTIONS] */ = [ [ Enum313.FIRSTISTRUCT, 0, 1 ] ];
let SelSingleDecal: Selections[] /* [MAX_SELECTIONS] */ = [ [ Enum313.FIRSTWALLDECAL, 0, 1 ] ];
let SelSingleFloor: Selections[] /* [MAX_SELECTIONS] */ = [ [ Enum313.FIRSTFLOOR, 0, 1 ] ];
let SelSingleToilet: Selections[] /* [MAX_SELECTIONS] */ = [ [ Enum313.FIFTHISTRUCT, 0, 1 ] ];
let SelRoom: Selections[] /* [MAX_SELECTIONS] */ = [ [ Enum313.FIRSTWALL, 0, 1 ] ];

// Number of objects currently in the selection list
let iNumOStructsSelected: INT32 = 1;
let iNumOStructs1Selected: INT32 = 1;
let iNumOStructs2Selected: INT32 = 1;
let iNumBanksSelected: INT32 = 1;
let iNumRoadsSelected: INT32 = 1;
let iNumDebrisSelected: INT32 = 1;

let iNumWallsSelected: INT32 = 1;
let iNumDoorsSelected: INT32 = 1;
let iNumWindowsSelected: INT32 = 1;
let iNumDecorSelected: INT32 = 1;
let iNumDecalsSelected: INT32 = 1;
let iNumBrokenWallsSelected: INT32 = 1;
let iNumFloorsSelected: INT32 = 1;
let iNumToiletsSelected: INT32 = 1;
let iNumRoofsSelected: INT32 = 1;
let iNumNewRoofsSelected: INT32 = 1;
let iNumRoomsSelected: INT32 = 1;

// Holds the previous selection list when a selection window is up. Used for canceling the selection window
let OldSelList: Selections[] /* [MAX_SELECTIONS] */;
let iOldNumSelList: INT32;

// Global pointers for selection list
let pSelList: Pointer<Selections>;
let pNumSelList: Pointer<INT32>;

// Global used to indicate which selection to use (changes with the PGUP/PGDWN keys in editor)
let iCurBank: INT32 = 0;

let pDispList: Pointer<DisplayList>;
let iTopWinCutOff: INT16;
let iBotWinCutOff: INT16;
let Selection: DisplayList;

let SelWinFillColor: UINT16 = 0x0000; // Black
let SelWinHilightFillColor: UINT16 = 0x000d; // a kind of medium dark blue

//----------------------------------------------------------------------------------------------
//	CreateJA2SelectionWindow
//
//	Creates a selection window of the given type.
//
function CreateJA2SelectionWindow(sWhat: INT16): void {
  let pDSpec: Pointer<DisplaySpec>;
  let usNSpecs: UINT16;

  fAllDone = false;

  DisableEditorTaskbar();

  // Load up the button images
  iButtonIcons[CANCEL_ICON] = LoadGenericButtonIcon("EDITOR//bigX.sti");
  iButtonIcons[UP_ICON] = LoadGenericButtonIcon("EDITOR//lgUpArrow.sti");
  iButtonIcons[DOWN_ICON] = LoadGenericButtonIcon("EDITOR//lgDownArrow.sti");
  iButtonIcons[OK_ICON] = LoadGenericButtonIcon("EDITOR//checkmark.sti");

  iSelectWin = CreateHotSpot(0, 0, 600, 360, MSYS_PRIORITY_HIGH, DEFAULT_MOVE_CALLBACK(), SelWinClkCallback);

  iCancelWin = CreateIconButton(iButtonIcons[CANCEL_ICON], 0, BUTTON_USE_DEFAULT, 600, 40, 40, 40, BUTTON_TOGGLE, MSYS_PRIORITY_HIGH, DEFAULT_MOVE_CALLBACK(), CnclClkCallback);
  SetButtonFastHelpText(iCancelWin, "Cancel selections");

  iOkWin = CreateIconButton(iButtonIcons[OK_ICON], 0, BUTTON_USE_DEFAULT, 600, 0, 40, 40, BUTTON_TOGGLE, MSYS_PRIORITY_HIGH, DEFAULT_MOVE_CALLBACK(), OkClkCallback);
  SetButtonFastHelpText(iOkWin, "Accept selections");

  iScrollUp = CreateIconButton(iButtonIcons[UP_ICON], 0, BUTTON_USE_DEFAULT, 600, 80, 40, 160, BUTTON_NO_TOGGLE, MSYS_PRIORITY_HIGH, DEFAULT_MOVE_CALLBACK(), UpClkCallback);
  SetButtonFastHelpText(iScrollUp, "Scroll window up");

  iScrollDown = CreateIconButton(iButtonIcons[DOWN_ICON], 0, BUTTON_USE_DEFAULT, 600, 240, 40, 160, BUTTON_NO_TOGGLE, MSYS_PRIORITY_HIGH, DEFAULT_MOVE_CALLBACK(), DwnClkCallback);
  SetButtonFastHelpText(iScrollDown, "Scroll window down");

  fButtonsPresent = true;

  SelWinSpacing.iX = 2;
  SelWinSpacing.iY = 2;

  SelWinStartPoint.iX = 1;
  SelWinStartPoint.iY = 15;

  iTopWinCutOff = 15;

  SelWinEndPoint.iX = 599;
  SelWinEndPoint.iY = 359;

  iBotWinCutOff = 359;

  switch (sWhat) {
    case Enum59.SELWIN_OSTRUCTS:
      pDSpec = OStructs;
      usNSpecs = gusNumOStructs; // OSTRUCTS_NUMELEMENTS;
      pSelList = SelOStructs;
      pNumSelList = addressof(iNumOStructsSelected);
      break;

    case Enum59.SELWIN_OSTRUCTS1:
      pDSpec = OStructs1;
      usNSpecs = OSTRUCTS1_NUMELEMENTS;
      pSelList = SelOStructs1;
      pNumSelList = addressof(iNumOStructs1Selected);
      break;

    case Enum59.SELWIN_OSTRUCTS2:
      pDSpec = OStructs2;
      usNSpecs = OSTRUCTS2_NUMELEMENTS;
      pSelList = SelOStructs2;
      pNumSelList = addressof(iNumOStructs2Selected);
      break;

    case Enum59.SELWIN_BANKS:
      pDSpec = BanksList;
      usNSpecs = BANKSLIST_NUMELEMENTS;
      pSelList = SelBanks;
      pNumSelList = addressof(iNumBanksSelected);
      break;

    case Enum59.SELWIN_ROADS:
      pDSpec = RoadsList;
      usNSpecs = ROADSLIST_NUMELEMENTS;
      pSelList = SelRoads;
      pNumSelList = addressof(iNumRoadsSelected);
      break;

    case Enum59.SELWIN_DEBRIS:
      pDSpec = DebrisList;
      usNSpecs = DEBRISLIST_NUMELEMENTS;
      pSelList = SelDebris;
      pNumSelList = addressof(iNumDebrisSelected);
      break;

    case Enum59.SELWIN_SINGLEWALL:
      pDSpec = SingleWall;
      usNSpecs = SINGLEWALL_NUMELEMENTS;
      pSelList = SelSingleWall;
      pNumSelList = addressof(iNumWallsSelected);
      break;
    case Enum59.SELWIN_SINGLEDOOR:
      pDSpec = SingleDoor;
      usNSpecs = SINGLEDOOR_NUMELEMENTS;
      pSelList = SelSingleDoor;
      pNumSelList = addressof(iNumDoorsSelected);
      break;
    case Enum59.SELWIN_SINGLEWINDOW:
      pDSpec = SingleWindow;
      usNSpecs = SINGLEWINDOW_NUMELEMENTS;
      pSelList = SelSingleWindow;
      pNumSelList = addressof(iNumWindowsSelected);
      break;
    case Enum59.SELWIN_SINGLEROOF:
      pDSpec = SingleRoof;
      usNSpecs = SINGLEROOF_NUMELEMENTS;
      pSelList = SelSingleRoof;
      pNumSelList = addressof(iNumRoofsSelected);
      break;
    case Enum59.SELWIN_SINGLENEWROOF:
      pDSpec = SingleNewRoof;
      usNSpecs = SINGLENEWROOF_NUMELEMENTS;
      pSelList = SelSingleNewRoof;
      pNumSelList = addressof(iNumNewRoofsSelected);
      break;
    case Enum59.SELWIN_SINGLEBROKENWALL:
      pDSpec = SingleBrokenWall;
      usNSpecs = SINGLEBROKENWALL_NUMELEMENTS;
      pSelList = SelSingleBrokenWall;
      pNumSelList = addressof(iNumBrokenWallsSelected);
      break;
    case Enum59.SELWIN_SINGLEDECOR:
      pDSpec = SingleDecor;
      usNSpecs = SINGLEDECOR_NUMELEMENTS;
      pSelList = SelSingleDecor;
      pNumSelList = addressof(iNumDecorSelected);
      break;
    case Enum59.SELWIN_SINGLEDECAL:
      pDSpec = SingleDecal;
      usNSpecs = SINGLEDECAL_NUMELEMENTS;
      pSelList = SelSingleDecal;
      pNumSelList = addressof(iNumDecalsSelected);
      break;
    case Enum59.SELWIN_SINGLEFLOOR:
      pDSpec = SingleFloor;
      usNSpecs = SINGLEFLOOR_NUMELEMENTS;
      pSelList = SelSingleFloor;
      pNumSelList = addressof(iNumFloorsSelected);
      break;
    case Enum59.SELWIN_SINGLETOILET:
      pDSpec = SingleToilet;
      usNSpecs = SINGLETOILET_NUMELEMENTS;
      pSelList = SelSingleToilet;
      pNumSelList = addressof(iNumToiletsSelected);
      break;
    case Enum59.SELWIN_ROOM:
      pDSpec = Room;
      usNSpecs = ROOM_NUMELEMENTS;
      pSelList = SelRoom;
      pNumSelList = addressof(iNumRoomsSelected);
      break;
  }

  BuildDisplayWindow(pDSpec, usNSpecs, addressof(pDispList), addressof(SelWinStartPoint), addressof(SelWinEndPoint), addressof(SelWinSpacing), CLEAR_BACKGROUND);
}

// The selection window method is initialized here.  This is where all the graphics for all
// the categories are organized and loaded.  If you wish to move things around, then this is
// where the initialization part is done.  I have also changed this from previously being loaded
// every single time you go into a selection window which was redundant and CPU consuming.
function InitJA2SelectionWindow(): void {
  let iCount: INT32;
  let iCount2: INT32;
  let iCount3: INT32;

  let usETRLEObjects: UINT16;
  let hVObject: HVOBJECT;

  pDispList = null;

  // Init the display spec lists for the types of selection windows

  // Trees & bushes (The tree button in the "terrain" toolbar)
  for (iCount3 = 0, iCount = 0; iCount < (LASTOSTRUCT - Enum313.FIRSTFULLSTRUCT + 1); iCount++) {
    hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTFULLSTRUCT + iCount]].hTileSurface;
    usETRLEObjects = hVObject.value.usNumberOfObjects;

    for (iCount2 = 0; iCount2 < usETRLEObjects; iCount2 += 3, iCount3++) {
      OStructs[iCount3].ubType = DISPLAY_GRAPHIC;
      OStructs[iCount3].hVObject = hVObject;
      OStructs[iCount3].usStart = iCount2;
      OStructs[iCount3].usEnd = iCount2;
      OStructs[iCount3].uiObjIndx = (Enum313.FIRSTFULLSTRUCT + iCount);
    }
  }

  OStructs[iCount3].ubType = DISPLAY_GRAPHIC;
  OStructs[iCount3].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.SIXTHOSTRUCT]].hTileSurface;
  OStructs[iCount3].usStart = DISPLAY_ALL_OBJECTS;
  OStructs[iCount3].usEnd = 0;
  OStructs[iCount3].uiObjIndx = Enum313.SIXTHOSTRUCT;

  gusNumOStructs = iCount3 + 1;

  // Rocks & barrels! (the "1" button in the "terrain" toolbar)
  OStructs1[0].ubType = DISPLAY_GRAPHIC;
  OStructs1[0].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FOURTHOSTRUCT]].hTileSurface;
  OStructs1[0].usStart = DISPLAY_ALL_OBJECTS;
  OStructs1[0].usEnd = 0;
  OStructs1[0].uiObjIndx = Enum313.FOURTHOSTRUCT;

  for (iCount = 0; iCount < (Enum313.THIRDOSTRUCT - Enum313.FIRSTOSTRUCT); iCount++) {
    OStructs1[iCount + 1].ubType = DISPLAY_GRAPHIC;
    OStructs1[iCount + 1].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTOSTRUCT + iCount]].hTileSurface;
    OStructs1[iCount + 1].usStart = DISPLAY_ALL_OBJECTS;
    OStructs1[iCount + 1].usEnd = 0;
    OStructs1[iCount + 1].uiObjIndx = Enum313.FIRSTOSTRUCT + iCount;
  }

  // Other junk! (the "2" button in the "terrain" toolbar)
  OStructs2[0].ubType = DISPLAY_GRAPHIC;
  OStructs2[0].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.THIRDOSTRUCT]].hTileSurface;
  OStructs2[0].usStart = DISPLAY_ALL_OBJECTS;
  OStructs2[0].usEnd = 0;
  OStructs2[0].uiObjIndx = Enum313.THIRDOSTRUCT;

  OStructs2[1].ubType = DISPLAY_GRAPHIC;
  OStructs2[1].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIFTHOSTRUCT]].hTileSurface;
  OStructs2[1].usStart = DISPLAY_ALL_OBJECTS;
  OStructs2[1].usEnd = 0;
  OStructs2[1].uiObjIndx = Enum313.FIFTHOSTRUCT;

  OStructs2[2].ubType = DISPLAY_GRAPHIC;
  OStructs2[2].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.SEVENTHOSTRUCT]].hTileSurface;
  OStructs2[2].usStart = DISPLAY_ALL_OBJECTS;
  OStructs2[2].usEnd = 0;
  OStructs2[2].uiObjIndx = Enum313.SEVENTHOSTRUCT;

  OStructs2[3].ubType = DISPLAY_GRAPHIC;
  OStructs2[3].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.EIGHTOSTRUCT]].hTileSurface;
  OStructs2[3].usStart = DISPLAY_ALL_OBJECTS;
  OStructs2[3].usEnd = 0;
  OStructs2[3].uiObjIndx = Enum313.EIGHTOSTRUCT;

  OStructs2[4].ubType = DISPLAY_GRAPHIC;
  OStructs2[4].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTVEHICLE]].hTileSurface;
  OStructs2[4].usStart = DISPLAY_ALL_OBJECTS;
  OStructs2[4].usEnd = 0;
  OStructs2[4].uiObjIndx = Enum313.FIRSTVEHICLE;

  OStructs2[5].ubType = DISPLAY_GRAPHIC;
  OStructs2[5].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.SECONDVEHICLE]].hTileSurface;
  OStructs2[5].usStart = DISPLAY_ALL_OBJECTS;
  OStructs2[5].usEnd = 0;
  OStructs2[5].uiObjIndx = Enum313.SECONDVEHICLE;

  OStructs2[6].ubType = DISPLAY_GRAPHIC;
  OStructs2[6].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTDEBRISSTRUCT]].hTileSurface;
  OStructs2[6].usStart = DISPLAY_ALL_OBJECTS;
  OStructs2[6].usEnd = 0;
  OStructs2[6].uiObjIndx = Enum313.FIRSTDEBRISSTRUCT;

  OStructs2[7].ubType = DISPLAY_GRAPHIC;
  OStructs2[7].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.SECONDDEBRISSTRUCT]].hTileSurface;
  OStructs2[7].usStart = DISPLAY_ALL_OBJECTS;
  OStructs2[7].usEnd = 0;
  OStructs2[7].uiObjIndx = Enum313.SECONDDEBRISSTRUCT;

  OStructs2[8].ubType = DISPLAY_GRAPHIC;
  OStructs2[8].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTLARGEEXPDEBRIS]].hTileSurface;
  OStructs2[8].usStart = DISPLAY_ALL_OBJECTS;
  OStructs2[8].usEnd = 0;
  OStructs2[8].uiObjIndx = Enum313.FIRSTLARGEEXPDEBRIS;

  OStructs2[9].ubType = DISPLAY_GRAPHIC;
  OStructs2[9].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.SECONDLARGEEXPDEBRIS]].hTileSurface;
  OStructs2[9].usStart = DISPLAY_ALL_OBJECTS;
  OStructs2[9].usEnd = 0;
  OStructs2[9].uiObjIndx = Enum313.SECONDLARGEEXPDEBRIS;

  OStructs2[10].ubType = DISPLAY_GRAPHIC;
  OStructs2[10].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.NINTHOSTRUCT]].hTileSurface;
  OStructs2[10].usStart = DISPLAY_ALL_OBJECTS;
  OStructs2[10].usEnd = 0;
  OStructs2[10].uiObjIndx = Enum313.NINTHOSTRUCT;

  OStructs2[11].ubType = DISPLAY_GRAPHIC;
  OStructs2[11].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.TENTHOSTRUCT]].hTileSurface;
  OStructs2[11].usStart = DISPLAY_ALL_OBJECTS;
  OStructs2[11].usEnd = 0;
  OStructs2[11].uiObjIndx = Enum313.TENTHOSTRUCT;

  // River banks and cliffs (the "river" button on the "terrain" toolbar)
  BanksList[0].ubType = DISPLAY_GRAPHIC;
  BanksList[0].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.ANIOSTRUCT]].hTileSurface;
  BanksList[0].usStart = DISPLAY_ALL_OBJECTS;
  BanksList[0].usEnd = 0;
  BanksList[0].uiObjIndx = Enum313.ANIOSTRUCT;

  BanksList[1].ubType = DISPLAY_GRAPHIC;
  BanksList[1].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTCLIFF]].hTileSurface;
  BanksList[1].usStart = DISPLAY_ALL_OBJECTS;
  BanksList[1].usEnd = 0;
  BanksList[1].uiObjIndx = Enum313.FIRSTCLIFF;

  BanksList[2].ubType = DISPLAY_GRAPHIC;
  BanksList[2].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTCLIFFHANG]].hTileSurface;
  BanksList[2].usStart = DISPLAY_ALL_OBJECTS;
  BanksList[2].usEnd = 0;
  BanksList[2].uiObjIndx = Enum313.FIRSTCLIFFHANG;

  BanksList[3].ubType = DISPLAY_GRAPHIC;
  BanksList[3].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTROAD]].hTileSurface;
  BanksList[3].usStart = DISPLAY_ALL_OBJECTS;
  BanksList[3].usEnd = 0;
  BanksList[3].uiObjIndx = Enum313.FIRSTROAD;

  BanksList[4].ubType = DISPLAY_GRAPHIC;
  BanksList[4].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FENCESTRUCT]].hTileSurface;
  BanksList[4].usStart = DISPLAY_ALL_OBJECTS;
  BanksList[4].usEnd = 0;
  BanksList[4].uiObjIndx = Enum313.FENCESTRUCT;

  RoadsList[0].ubType = DISPLAY_GRAPHIC;
  RoadsList[0].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTROAD]].hTileSurface;
  RoadsList[0].usStart = DISPLAY_ALL_OBJECTS;
  RoadsList[0].usEnd = 0;
  RoadsList[0].uiObjIndx = Enum313.FIRSTROAD;

  // Debris (the "bent can" button on the "terrain", and "buildings" toolbars)
  for (iCount = 0; iCount < (LASTDEBRIS - Enum313.DEBRISROCKS + 1); iCount++) {
    DebrisList[iCount].ubType = DISPLAY_GRAPHIC;
    DebrisList[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.DEBRISROCKS + iCount]].hTileSurface;
    DebrisList[iCount].usStart = DISPLAY_ALL_OBJECTS;
    DebrisList[iCount].usEnd = 0;
    DebrisList[iCount].uiObjIndx = Enum313.DEBRISROCKS + iCount;
  }
  // Add one more for new misc debris
  DebrisList[iCount].ubType = DISPLAY_GRAPHIC;
  DebrisList[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.DEBRIS2MISC]].hTileSurface;
  DebrisList[iCount].usStart = DISPLAY_ALL_OBJECTS;
  DebrisList[iCount].usEnd = 0;
  DebrisList[iCount].uiObjIndx = Enum313.DEBRIS2MISC;
  // Add yet another one...
  iCount++;
  DebrisList[iCount].ubType = DISPLAY_GRAPHIC;
  DebrisList[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.ANOTHERDEBRIS]].hTileSurface;
  DebrisList[iCount].usStart = DISPLAY_ALL_OBJECTS;
  DebrisList[iCount].usEnd = 0;
  DebrisList[iCount].uiObjIndx = Enum313.ANOTHERDEBRIS;

  // Rooms
  for (iCount = 0; iCount < (LASTWALL - Enum313.FIRSTWALL + 1); iCount++) {
    Room[iCount].ubType = DISPLAY_GRAPHIC;
    Room[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTWALL + iCount]].hTileSurface;
    Room[iCount].usStart = 0;
    Room[iCount].usEnd = 0;
    Room[iCount].uiObjIndx = Enum313.FIRSTWALL + iCount;
  }
  for (iCount2 = 0; iCount2 < (LASTFLOOR - Enum313.FIRSTFLOOR + 1); iCount2++, iCount++) {
    Room[iCount].ubType = DISPLAY_GRAPHIC;
    Room[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTFLOOR + iCount2]].hTileSurface;
    Room[iCount].usStart = 0;
    Room[iCount].usEnd = 0;
    Room[iCount].uiObjIndx = Enum313.FIRSTFLOOR + iCount2;
  }
  for (iCount2 = 0; iCount2 < (LASTROOF - Enum313.FIRSTROOF + 1); iCount2++, iCount++) {
    Room[iCount].ubType = DISPLAY_GRAPHIC;
    Room[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTROOF + iCount2]].hTileSurface;
    Room[iCount].usStart = 0;
    Room[iCount].usEnd = 0;
    Room[iCount].uiObjIndx = Enum313.FIRSTROOF + iCount2;
  }
  for (iCount2 = 0; iCount2 < 2 /*(LASTSLANTROOF - FIRSTSLANTROOF + 1)*/; iCount2++, iCount++) {
    Room[iCount].ubType = DISPLAY_GRAPHIC;
    Room[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTSLANTROOF + iCount2]].hTileSurface;
    Room[iCount].usStart = 0;
    Room[iCount].usEnd = 0;
    Room[iCount].uiObjIndx = Enum313.FIRSTSLANTROOF + iCount2;
  }

  // Walls
  for (iCount = 0, iCount2 = 0; iCount < (LASTWALL - Enum313.FIRSTWALL + 1); iCount++, iCount2 += 2) {
    SingleWall[iCount2].ubType = DISPLAY_GRAPHIC;
    SingleWall[iCount2].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTWALL + iCount]].hTileSurface;
    SingleWall[iCount2].usStart = 0;
    SingleWall[iCount2].usEnd = WALL_LAST_WALL_OFFSET;
    SingleWall[iCount2].uiObjIndx = Enum313.FIRSTWALL + iCount;
    // New appended walls
    SingleWall[iCount2 + 1].ubType = DISPLAY_GRAPHIC;
    SingleWall[iCount2 + 1].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTWALL + iCount]].hTileSurface;
    SingleWall[iCount2 + 1].usStart = WALL_FIRST_APPENDED_WALL_OFFSET;
    SingleWall[iCount2 + 1].usEnd = WALL_LAST_APPENDED_WALL_OFFSET;
    SingleWall[iCount2 + 1].uiObjIndx = Enum313.FIRSTWALL + iCount;
  }

  // Doors
  for (iCount = 0, iCount2 = 0; iCount < (LASTDOOR - Enum313.FIRSTDOOR + 1); iCount++, iCount2 += 5) {
    // closed
    SingleDoor[iCount2].ubType = DISPLAY_GRAPHIC;
    SingleDoor[iCount2].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTDOOR + iCount]].hTileSurface;
    SingleDoor[iCount2].usStart = 0;
    SingleDoor[iCount2].usEnd = 0;
    SingleDoor[iCount2].uiObjIndx = Enum313.FIRSTDOOR + iCount;
    // open, closed
    SingleDoor[iCount2 + 1].ubType = DISPLAY_GRAPHIC;
    SingleDoor[iCount2 + 1].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTDOOR + iCount]].hTileSurface;
    SingleDoor[iCount2 + 1].usStart = 4;
    SingleDoor[iCount2 + 1].usEnd = 5;
    SingleDoor[iCount2 + 1].uiObjIndx = Enum313.FIRSTDOOR + iCount;
    // open, closed
    SingleDoor[iCount2 + 2].ubType = DISPLAY_GRAPHIC;
    SingleDoor[iCount2 + 2].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTDOOR + iCount]].hTileSurface;
    SingleDoor[iCount2 + 2].usStart = 9;
    SingleDoor[iCount2 + 2].usEnd = 10;
    SingleDoor[iCount2 + 2].uiObjIndx = Enum313.FIRSTDOOR + iCount;
    // open, closed
    SingleDoor[iCount2 + 3].ubType = DISPLAY_GRAPHIC;
    SingleDoor[iCount2 + 3].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTDOOR + iCount]].hTileSurface;
    SingleDoor[iCount2 + 3].usStart = 14;
    SingleDoor[iCount2 + 3].usEnd = 15;
    SingleDoor[iCount2 + 3].uiObjIndx = Enum313.FIRSTDOOR + iCount;
    // open
    SingleDoor[iCount2 + 4].ubType = DISPLAY_GRAPHIC;
    SingleDoor[iCount2 + 4].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTDOOR + iCount]].hTileSurface;
    SingleDoor[iCount2 + 4].usStart = 19;
    SingleDoor[iCount2 + 4].usEnd = 19;
    SingleDoor[iCount2 + 4].uiObjIndx = Enum313.FIRSTDOOR + iCount;
  }
  // Windows
  for (iCount = 0; iCount < (LASTWALL - Enum313.FIRSTWALL + 1); iCount++) {
    SingleWindow[iCount].ubType = DISPLAY_GRAPHIC;
    SingleWindow[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTWALL + iCount]].hTileSurface;
    SingleWindow[iCount].usStart = WALL_FIRST_WINDOW_OFFSET;
    SingleWindow[iCount].usEnd = WALL_LAST_WINDOW_OFFSET;
    SingleWindow[iCount].uiObjIndx = Enum313.FIRSTWALL + iCount;
  }
  // Roofs and slant roofs
  for (iCount = 0; iCount < (LASTROOF - Enum313.FIRSTROOF + 1); iCount++) {
    // Flat roofs
    SingleRoof[iCount].ubType = DISPLAY_GRAPHIC;
    SingleRoof[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTROOF + iCount]].hTileSurface;
    SingleRoof[iCount].usStart = DISPLAY_ALL_OBJECTS;
    SingleRoof[iCount].usEnd = 0;
    SingleRoof[iCount].uiObjIndx = Enum313.FIRSTROOF + iCount;
  }
  for (iCount2 = 0; iCount2 < (LASTSLANTROOF - Enum313.FIRSTSLANTROOF + 1); iCount2++, iCount++) {
    // Slanted roofs
    SingleRoof[iCount].ubType = DISPLAY_GRAPHIC;
    SingleRoof[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTSLANTROOF + iCount2]].hTileSurface;
    SingleRoof[iCount].usStart = DISPLAY_ALL_OBJECTS;
    SingleRoof[iCount].usEnd = 0;
    SingleRoof[iCount].uiObjIndx = Enum313.FIRSTSLANTROOF + iCount2;
  }
  for (iCount2 = 0; iCount2 < (LASTWALL - Enum313.FIRSTWALL + 1); iCount2++, iCount++) {
    // A-Frames
    SingleRoof[iCount].ubType = DISPLAY_GRAPHIC;
    SingleRoof[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTWALL + iCount2]].hTileSurface;
    SingleRoof[iCount].usStart = WALL_FIRST_AFRAME_OFFSET;
    SingleRoof[iCount].usEnd = WALL_LAST_AFRAME_OFFSET;
    SingleRoof[iCount].uiObjIndx = Enum313.FIRSTWALL + iCount2;
  }
  for (iCount2 = 0; iCount2 < (Enum313.SECONDONROOF - Enum313.FIRSTONROOF + 1); iCount2++, iCount++) {
    // On roofs
    SingleRoof[iCount].ubType = DISPLAY_GRAPHIC;
    SingleRoof[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTONROOF + iCount2]].hTileSurface;
    SingleRoof[iCount].usStart = DISPLAY_ALL_OBJECTS;
    SingleRoof[iCount].usEnd = 0;
    SingleRoof[iCount].uiObjIndx = Enum313.FIRSTONROOF + iCount2;
  }

  // New replacement roofs
  for (iCount = 0; iCount < (LASTROOF - Enum313.FIRSTROOF + 1); iCount++) {
    // Flat roofs
    SingleNewRoof[iCount].ubType = DISPLAY_GRAPHIC;
    SingleNewRoof[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTROOF + iCount]].hTileSurface;
    SingleNewRoof[iCount].usStart = 9;
    SingleNewRoof[iCount].usEnd = 9;
    SingleNewRoof[iCount].uiObjIndx = Enum313.FIRSTROOF + iCount;
  }

  // Broken walls
  for (iCount = 0; iCount < (LASTDECORATIONS - Enum313.FIRSTDECORATIONS + 1); iCount++) {
    // Old obsolete wall decals, but should be replaced with multitiled decals such as banners, etc.
    SingleBrokenWall[iCount].ubType = DISPLAY_GRAPHIC;
    SingleBrokenWall[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTDECORATIONS + iCount]].hTileSurface;
    SingleBrokenWall[iCount].usStart = DISPLAY_ALL_OBJECTS;
    SingleBrokenWall[iCount].usEnd = 0;
    SingleBrokenWall[iCount].uiObjIndx = Enum313.FIRSTDECORATIONS + iCount;
  }
  for (iCount2 = 0; iCount2 < (LASTWALL - Enum313.FIRSTWALL + 1); iCount2++, iCount++) {
    // Broken walls
    SingleBrokenWall[iCount].ubType = DISPLAY_GRAPHIC;
    SingleBrokenWall[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTWALL + iCount2]].hTileSurface;
    SingleBrokenWall[iCount].usStart = WALL_FIRST_BROKEN_WALL_OFFSET;
    SingleBrokenWall[iCount].usEnd = WALL_LAST_BROKEN_WALL_OFFSET;
    SingleBrokenWall[iCount].uiObjIndx = Enum313.FIRSTWALL + iCount2;
  }
  for (iCount2 = 0; iCount2 < (LASTWALL - Enum313.FIRSTWALL + 1); iCount2++, iCount++) {
    // Cracked and smudged walls
    SingleBrokenWall[iCount].ubType = DISPLAY_GRAPHIC;
    SingleBrokenWall[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTWALL + iCount2]].hTileSurface;
    SingleBrokenWall[iCount].usStart = WALL_FIRST_WEATHERED_WALL_OFFSET;
    SingleBrokenWall[iCount].usEnd = WALL_LAST_WEATHERED_WALL_OFFSET;
    SingleBrokenWall[iCount].uiObjIndx = Enum313.FIRSTWALL + iCount2;
  }

  // Decorations
  for (iCount = 0; iCount < (LASTISTRUCT - Enum313.FIRSTISTRUCT + 1); iCount++) {
    SingleDecor[iCount].ubType = DISPLAY_GRAPHIC;
    SingleDecor[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTISTRUCT + iCount]].hTileSurface;
    SingleDecor[iCount].usStart = DISPLAY_ALL_OBJECTS;
    SingleDecor[iCount].usEnd = 0;
    SingleDecor[iCount].uiObjIndx = Enum313.FIRSTISTRUCT + iCount;
  }

  // Wall decals
  for (iCount = 0; iCount < (LASTWALLDECAL - Enum313.FIRSTWALLDECAL + 1); iCount++) {
    SingleDecal[iCount].ubType = DISPLAY_GRAPHIC;
    SingleDecal[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTWALLDECAL + iCount]].hTileSurface;
    SingleDecal[iCount].usStart = DISPLAY_ALL_OBJECTS;
    SingleDecal[iCount].usEnd = 0;
    SingleDecal[iCount].uiObjIndx = Enum313.FIRSTWALLDECAL + iCount;
  }
  for (iCount2 = 0; iCount2 < (Enum313.EIGTHWALLDECAL - Enum313.FIFTHWALLDECAL + 1); iCount++, iCount2++) {
    SingleDecal[iCount].ubType = DISPLAY_GRAPHIC;
    SingleDecal[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIFTHWALLDECAL + iCount2]].hTileSurface;
    SingleDecal[iCount].usStart = DISPLAY_ALL_OBJECTS;
    SingleDecal[iCount].usEnd = 0;
    SingleDecal[iCount].uiObjIndx = Enum313.FIFTHWALLDECAL + iCount2;
  }
  SingleDecal[iCount].ubType = DISPLAY_GRAPHIC;
  SingleDecal[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTSWITCHES]].hTileSurface;
  SingleDecal[iCount].usStart = DISPLAY_ALL_OBJECTS;
  SingleDecal[iCount].usEnd = 0;
  SingleDecal[iCount].uiObjIndx = Enum313.FIRSTSWITCHES;

  // Floors
  for (iCount = 0; iCount < (LASTFLOOR - Enum313.FIRSTFLOOR + 1); iCount++) {
    SingleFloor[iCount].ubType = DISPLAY_GRAPHIC;
    SingleFloor[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIRSTFLOOR + iCount]].hTileSurface;
    SingleFloor[iCount].usStart = 0;
    SingleFloor[iCount].usEnd = 7;
    SingleFloor[iCount].uiObjIndx = Enum313.FIRSTFLOOR + iCount;
  }

  // Toilets
  for (iCount = 0; iCount < (Enum313.EIGHTISTRUCT - Enum313.FIFTHISTRUCT + 1); iCount++) {
    SingleToilet[iCount].ubType = DISPLAY_GRAPHIC;
    SingleToilet[iCount].hVObject = gTileDatabase[gTileTypeStartIndex[Enum313.FIFTHISTRUCT + iCount]].hTileSurface;
    SingleToilet[iCount].usStart = DISPLAY_ALL_OBJECTS;
    SingleToilet[iCount].usEnd = 0;
    SingleToilet[iCount].uiObjIndx = Enum313.FIFTHISTRUCT + iCount;
  }
}

//----------------------------------------------------------------------------------------------
//	ShutdownJA2SelectionWindow
//
//	Unloads selection window button images and makes sure any display list that may remain in memory
//	is removed.
//
function ShutdownJA2SelectionWindow(): void {
  let x: INT16;

  for (x = 0; x < 4; x++)
    UnloadGenericButtonIcon(iButtonIcons[x]);

  if (pDispList != null) {
    pDispList = TrashList(pDispList);
  }
  gfRenderWorld = true;
}

//----------------------------------------------------------------------------------------------
//	RemoveJA2SelectionWindow
//
//	Removes the selection window from the screen.
//
function RemoveJA2SelectionWindow(): void {
  RemoveButton(iSelectWin);
  RemoveButton(iCancelWin);
  RemoveButton(iScrollUp);
  RemoveButton(iScrollDown);
  RemoveButton(iOkWin);

  gfRenderSquareArea = false;

  if (pDispList != null) {
    pDispList = TrashList(pDispList);
  }
  gfRenderTaskbar = true;

  gfOverheadMapDirty = true;
  EnableEditorTaskbar();
}

//----------------------------------------------------------------------------------------------
//	TrashList
//
//	Free the current display list for the selection window.
//
function TrashList(pNode: Pointer<DisplayList>): Pointer<DisplayList> {
  if (pNode == null)
    return null;

  if (pNode.value.pNext != null)
    pNode.value.pNext = TrashList(pNode.value.pNext);

  if (pNode.value.pNext == null)
    MemFree(pNode);

  return null;
}

//----------------------------------------------------------------------------------------------
//	RenderSelectionWindow
//
//	Displays the current selection window
//
function RenderSelectionWindow(): void {
  let button: Pointer<GUI_BUTTON>;
  let iSX: INT32;
  let iSY: INT32;
  let iEX: INT32;
  let iEY: INT32;
  let usFillColor: UINT16;
  /* static */ let usFillGreen: UINT8 = 0;
  /* static */ let usDir: UINT8 = 5;

  if (!fButtonsPresent)
    return;

  ColorFillVideoSurfaceArea(FRAME_BUFFER, 0, 0, 600, 400, GenericButtonFillColors[0]);
  DrawSelections();
  MarkButtonsDirty();
  RenderButtons();

  if (gfRenderSquareArea) {
    button = ButtonList[iSelectWin];
    if (button == null)
      return;

    if ((abs(iStartClickX - button.value.Area.MouseXPos) > 9) || (abs(iStartClickY - (button.value.Area.MouseYPos + iTopWinCutOff - SelWinStartPoint.iY)) > 9)) {
      //			iSX = (INT32)iStartClickX;
      //			iEX = (INT32)button->Area.MouseXPos;
      //			iSY = (INT32)iStartClickY;
      //			iEY = (INT32)(button->Area.MouseYPos + iTopWinCutOff - (INT16)SelWinStartPoint.iY);

      iSX = iStartClickX;
      iSY = iStartClickY - iTopWinCutOff + SelWinStartPoint.iY;
      iEX = gusMouseXPos;
      iEY = gusMouseYPos;

      if (iEX < iSX) {
        iEX ^= iSX;
        iSX ^= iEX;
        iEX ^= iSX;
      }

      if (iEY < iSY) {
        iEY ^= iSY;
        iSY ^= iEY;
        iEY ^= iSY;
      }

      iEX = min(iEX, 600);
      iSY = max(SelWinStartPoint.iY, iSY);
      iEY = min(359, iEY);
      iEY = max(SelWinStartPoint.iY, iEY);

      usFillColor = Get16BPPColor(FROMRGB(255, usFillGreen, 0));
      usFillGreen += usDir;
      if (usFillGreen > 250)
        usDir = 251;
      else if (usFillGreen < 5)
        usDir = 5;

      ColorFillVideoSurfaceArea(FRAME_BUFFER, iSX, iSY, iEX, iSY + 1, usFillColor);
      ColorFillVideoSurfaceArea(FRAME_BUFFER, iSX, iEY, iEX, iEY + 1, usFillColor);
      ColorFillVideoSurfaceArea(FRAME_BUFFER, iSX, iSY, iSX + 1, iEY, usFillColor);
      ColorFillVideoSurfaceArea(FRAME_BUFFER, iEX, iSY, iEX + 1, iEY, usFillColor);
    }
  }
}

//----------------------------------------------------------------------------------------------
//	SelWinClkCallback
//
//	Button callback function for the main selection window. Checks if user clicked on an image,
//	if so selects or de-selects that object. Also handles the multi-object selection (left-click
//	and drag to get the selection rectangle)
//
function SelWinClkCallback(button: Pointer<GUI_BUTTON>, reason: INT32): void {
  let pNode: Pointer<DisplayList>;
  let fDone: boolean;
  let iClickX: INT16;
  let iClickY: INT16;
  let iYInc: INT16;
  let iXInc: INT16;

  if (!(button.value.uiFlags & BUTTON_ENABLED))
    return;

  iClickX = button.value.Area.MouseXPos;
  iClickY = button.value.Area.MouseYPos + iTopWinCutOff - SelWinStartPoint.iY;

  if (reason & MSYS_CALLBACK_REASON_LBUTTON_DWN) {
    button.value.uiFlags |= BUTTON_CLICKED_ON;
    iStartClickX = iClickX;
    iStartClickY = iClickY;
    gfRenderSquareArea = true;
  } else if (reason & MSYS_CALLBACK_REASON_RBUTTON_DWN) {
    button.value.uiFlags |= BUTTON_CLICKED_ON;

    if (gfRenderSquareArea) {
      gfRenderSquareArea = false;
      return;
    }

    // Code to figure out what image user wants goes here
    pNode = pDispList;

    fDone = false;
    while ((pNode != null) && !fDone) {
      if ((iClickX >= pNode.value.iX) && (iClickX < (pNode.value.iX + pNode.value.iWidth)) && (iClickY >= pNode.value.iY) && (iClickY < (pNode.value.iY + pNode.value.iHeight))) {
        fDone = true;
        if (RemoveFromSelectionList(pNode))
          pNode.value.fChosen = false;
      } else
        pNode = pNode.value.pNext;
    }
  } else if (reason & MSYS_CALLBACK_REASON_RBUTTON_UP) {
    button.value.uiFlags &= (~BUTTON_CLICKED_ON);
  } else if (reason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    button.value.uiFlags &= (~BUTTON_CLICKED_ON);

    if (!gfRenderSquareArea)
      return;

    iEndClickX = iClickX;
    iEndClickY = iClickY;

    gfRenderSquareArea = false;

    if (iEndClickX < iStartClickX) {
      iStartClickX ^= iEndClickX;
      iEndClickX ^= iStartClickX;
      iStartClickX ^= iEndClickX;
    }

    if (iEndClickY < iStartClickY) {
      iStartClickY ^= iEndClickY;
      iEndClickY ^= iStartClickY;
      iStartClickY ^= iEndClickY;
    }

    iXInc = iYInc = 1;
    for (iClickY = iStartClickY; iClickY <= iEndClickY; iClickY += iYInc) {
      iYInc = 1;
      for (iClickX = iStartClickX; iClickX <= iEndClickX; iClickX += iXInc) {
        iXInc = 1;
        // Code to figure out what image user wants goes here
        pNode = pDispList;

        fDone = false;
        while ((pNode != null) && !fDone) {
          if ((iClickX >= pNode.value.iX) && (iClickX < (pNode.value.iX + pNode.value.iWidth)) && (iClickY >= pNode.value.iY) && (iClickY < (pNode.value.iY + pNode.value.iHeight))) {
            fDone = true;
            AddToSelectionList(pNode);
            pNode.value.fChosen = true;
            iXInc = (pNode.value.iX + pNode.value.iWidth) - iClickX;
            if (iYInc < ((pNode.value.iY + pNode.value.iHeight) - iClickY))
              iYInc = (pNode.value.iY + pNode.value.iHeight) - iClickY;
          } else
            pNode = pNode.value.pNext;
        }
      }
    }
  }
}

// When a selection window is up, the file information of the picture will display
// at the top of the screen.
function DisplaySelectionWindowGraphicalInformation(): void {
  let pNode: Pointer<DisplayList>;
  let fDone: boolean;
  // UINT16 usObjIndex, usIndex;
  let y: UINT16;
  // Determine if there is a valid picture at cursor position.
  // iRelX = gusMouseXPos;
  // iRelY = gusMouseYPos + iTopWinCutOff - (INT16)SelWinStartPoint.iY;

  y = gusMouseYPos + iTopWinCutOff - SelWinStartPoint.iY;
  pNode = pDispList;
  fDone = false;
  while ((pNode != null) && !fDone) {
    if ((gusMouseXPos >= pNode.value.iX) && (gusMouseXPos < (pNode.value.iX + pNode.value.iWidth)) && (y >= pNode.value.iY) && (y < (pNode.value.iY + pNode.value.iHeight))) {
      fDone = true;
      // pNode->fChosen = TRUE;
      // iXInc = (pNode->iX + pNode->iWidth) - iClickX;
      // if ( iYInc < ((pNode->iY + pNode->iHeight) - iClickY) )
      //	iYInc = (pNode->iY + pNode->iHeight) - iClickY;
    } else
      pNode = pNode.value.pNext;
  }
  SetFont(FONT12POINT1());
  SetFontForeground(FONT_WHITE);
  if (pNode) {
    // usObjIndex = (UINT16)pNode->uiObjIndx;
    // usIndex = pNode->uiIndex;
    if (!gTilesets[giCurrentTilesetID].TileSurfaceFilenames[pNode.value.uiObjIndx][0]) {
      mprintf(2, 2, "%S[%d] is from default tileset %s (%S)", gTilesets[0].TileSurfaceFilenames[pNode.value.uiObjIndx], pNode.value.uiIndex, gTilesets[0].zName, gTileSurfaceName[pNode.value.uiObjIndx]);
    } else {
      mprintf(2, 2, "File:  %S, subindex:  %d (%S)", gTilesets[giCurrentTilesetID].TileSurfaceFilenames[pNode.value.uiObjIndx], pNode.value.uiIndex, gTileSurfaceName[pNode.value.uiObjIndx]);
    }
  }
  mprintf(350, 2, "Current Tileset:  %s", gTilesets[giCurrentTilesetID].zName);
}

//----------------------------------------------------------------------------------------------
//	AddToSelectionList
//
//	Add an object in the display list to the selection list. If the object already exists in the
//	selection list, then it's count is incremented.
//
function AddToSelectionList(pNode: Pointer<DisplayList>): void {
  let iIndex: INT32;
  let iUseIndex: INT32;
  let fDone: boolean;

  fDone = false;
  for (iIndex = 0; iIndex < (pNumSelList.value) && !fDone; iIndex++) {
    if (pNode.value.uiObjIndx == pSelList[iIndex].uiObject && pNode.value.uiIndex == pSelList[iIndex].usIndex) {
      fDone = true;
      iUseIndex = iIndex;
    }
  }

  if (fDone) {
    // Was already in the list, so bump up the count
    pSelList[iUseIndex].sCount++;
  } else {
    // Wasn't in the list, so add to end (if space available)
    if ((pNumSelList.value) < MAX_SELECTIONS) {
      pSelList[(pNumSelList.value)].uiObject = pNode.value.uiObjIndx;
      pSelList[(pNumSelList.value)].usIndex = pNode.value.uiIndex;
      pSelList[(pNumSelList.value)].sCount = 1;

      (pNumSelList.value)++;
    }
  }
}

//----------------------------------------------------------------------------------------------
//	ClearSelectionList
//
//	Removes everything from the current selection list
//
function ClearSelectionList(): boolean {
  let iIndex: INT32;
  let pNode: Pointer<DisplayList>;

  if (pNumSelList == null)
    return false;

  pNode = pDispList;
  while (pNode != null) {
    pNode.value.fChosen = false;
    pNode = pNode.value.pNext;
  }

  for (iIndex = 0; iIndex < (pNumSelList.value); iIndex++)
    pSelList[iIndex].sCount = 0;

  (pNumSelList.value) = 0;
  return true;
}

//----------------------------------------------------------------------------------------------
//	RemoveFromSelectionList
//
//	Removes the object given n a display list from the selection list. If the objects count is
//	greater than one, then the count is decremented and the object remains in the list.
//
function RemoveFromSelectionList(pNode: Pointer<DisplayList>): boolean {
  let iIndex: INT32;
  let iUseIndex: INT32;
  let fDone: boolean;
  let fRemoved: boolean;

  // Abort if no entries in list (pretend we removed a node)
  if ((pNumSelList.value) <= 0)
    return true;

  fRemoved = false;
  fDone = false;
  for (iIndex = 0; iIndex < (pNumSelList.value) && !fDone; iIndex++) {
    if (pNode.value.uiObjIndx == pSelList[iIndex].uiObject && pNode.value.uiIndex == pSelList[iIndex].usIndex) {
      fDone = true;
      iUseIndex = iIndex;
    }
  }

  if (fDone) {
    // Was already in the list, so bump up the count
    pSelList[iUseIndex].sCount--;

    if (pSelList[iUseIndex].sCount <= 0) {
      // Squash the list to remove old entry
      for (iIndex = iUseIndex; iIndex < ((pNumSelList.value) - 1); iIndex++)
        pSelList[iIndex] = pSelList[iIndex + 1];

      (pNumSelList.value)--;
      fRemoved = true;
    }
  }

  return fRemoved;
}

//----------------------------------------------------------------------------------------------
//	GetRandomSelection
//
//	Randomly selects an item in the selection list. The object counts are taken into account so
//	that objects with higher counts will be chosen more often.
//
function GetRandomSelection(): INT32 {
  let iRandNum: INT32;
  let iTotalCounts: INT32;
  let iIndex: INT32;
  let iSelectedIndex: INT32;
  let iNextCount: INT32;

  if (fDontUseRandom) {
    fDontUseRandom = false;
    return iCurBank;
  }

  iTotalCounts = 0;
  for (iIndex = 0; iIndex < (pNumSelList.value); iIndex++)
    iTotalCounts += pSelList[iIndex].sCount;

  iRandNum = Random(iTotalCounts);

  iSelectedIndex = -1;
  iNextCount = 0;
  for (iIndex = 0; iIndex < (pNumSelList.value) && iSelectedIndex == -1; iIndex++) {
    iNextCount += pSelList[iIndex].sCount;
    if (iRandNum < iNextCount)
      iSelectedIndex = iIndex;
  }

  return iSelectedIndex;
}

//----------------------------------------------------------------------------------------------
//	IsInSelectionList
//
//	Verifies if a particular display list object exists in the current selection list.
//
function IsInSelectionList(pNode: Pointer<DisplayList>): boolean {
  let iIndex: INT32;
  let fFound: boolean;

  fFound = false;
  for (iIndex = 0; iIndex < (pNumSelList.value) && !fFound; iIndex++) {
    if (pNode.value.uiObjIndx == pSelList[iIndex].uiObject && pNode.value.uiIndex == pSelList[iIndex].usIndex) {
      fFound = true;
    }
  }

  return fFound;
}

//----------------------------------------------------------------------------------------------
//	FindInSelectionList
//
//	Finds an occurance of a particular display list object in the current selection list.
//	if found, returns the selection list's index where it can be found. otherwise it
//	returns -1
//
function FindInSelectionList(pNode: Pointer<DisplayList>): INT32 {
  let iIndex: INT32;
  let iUseIndex: INT32;
  let fFound: boolean;

  fFound = false;
  iUseIndex = -1;
  for (iIndex = 0; iIndex < (pNumSelList.value) && !fFound; iIndex++) {
    if (pNode.value.uiObjIndx == pSelList[iIndex].uiObject && pNode.value.uiIndex == pSelList[iIndex].usIndex) {
      fFound = true;
      iUseIndex = iIndex;
    }
  }

  return iUseIndex;
}

//----------------------------------------------------------------------------------------------
//	SaveSelectionList
//
//	Copies the current selection list to a save buffer. Used in case we want to cancel a
//	selection window.
//
function SaveSelectionList(): void {
  let iIndex: INT32;

  for (iIndex = 0; iIndex < MAX_SELECTIONS; iIndex++)
    OldSelList[iIndex] = pSelList[iIndex];

  iOldNumSelList = (pNumSelList.value);
}

//----------------------------------------------------------------------------------------------
//	RestoreSelectionList
//
//	Copies the selection list in the save buffer back to the current selection list.
//
function RestoreSelectionList(): void {
  let iIndex: INT32;

  for (iIndex = 0; iIndex < MAX_SELECTIONS; iIndex++)
    pSelList[iIndex] = OldSelList[iIndex];

  (pNumSelList.value) = iOldNumSelList;
}

//----------------------------------------------------------------------------------------------
//	OkClkCallback
//
//	Button callback function for the selection window's OK button
function OkClkCallback(button: Pointer<GUI_BUTTON>, reason: INT32): void {
  if (reason & MSYS_CALLBACK_REASON_LBUTTON_DWN) {
    button.value.uiFlags |= BUTTON_CLICKED_ON;
  } else if (reason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    button.value.uiFlags &= (~BUTTON_CLICKED_ON);
    fAllDone = true;
  }
}

//----------------------------------------------------------------------------------------------
//	CnclClkCallback
//
//	Button callback function for the selection window's CANCEL button
//
function CnclClkCallback(button: Pointer<GUI_BUTTON>, reason: INT32): void {
  if (reason & MSYS_CALLBACK_REASON_LBUTTON_DWN) {
    button.value.uiFlags |= BUTTON_CLICKED_ON;
  } else if (reason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    button.value.uiFlags &= (~BUTTON_CLICKED_ON);
    fAllDone = true;
    RestoreSelectionList();
  }
}

//----------------------------------------------------------------------------------------------
//	UpClkCallback
//
//	Button callback function for scrolling the selection window up
//
function UpClkCallback(button: Pointer<GUI_BUTTON>, reason: INT32): void {
  if (reason & MSYS_CALLBACK_REASON_LBUTTON_DWN) {
    button.value.uiFlags |= BUTTON_CLICKED_ON;
  } else if (reason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    button.value.uiFlags &= (~BUTTON_CLICKED_ON);
    ScrollSelWinUp();
  }
}

//----------------------------------------------------------------------------------------------
//	ScrollSelWinUp
//
//	Performs the calculations required to actually scroll a selection window up by one line.
//
function ScrollSelWinUp(): void {
  let pNode: Pointer<DisplayList>;
  let iCutOff: INT16;
  let iBotCutOff: INT16;
  let fDone: boolean;

  // Code to scroll window up!
  pNode = pDispList;
  iCutOff = iTopWinCutOff;

  fDone = false;
  while ((pNode != null) && !fDone) {
    if (pNode.value.iY >= iTopWinCutOff) {
      iCutOff = pNode.value.iY;
      pNode = pNode.value.pNext;
    } else {
      iCutOff = pNode.value.iY;
      fDone = true;
    }
  }

  iBotCutOff = iBotWinCutOff - iTopWinCutOff + iCutOff;
  iTopWinCutOff = iCutOff;
}

//----------------------------------------------------------------------------------------------
//	ScrollSelWinDown
//
//	Performs the actual calculations for scrolling a selection window down.
//
function ScrollSelWinDown(): void {
  let pNode: Pointer<DisplayList>;
  let iCutOff: INT16;
  let iBotCutOff: INT16;
  let fDone: boolean;

  pNode = pDispList;
  iCutOff = iTopWinCutOff;

  fDone = false;
  while ((pNode != null) && !fDone) {
    if (pNode.value.iY > iTopWinCutOff) {
      iCutOff = pNode.value.iY;
      pNode = pNode.value.pNext;
    } else
      fDone = true;
  }

  iBotCutOff = iBotWinCutOff - iTopWinCutOff + iCutOff;
  iTopWinCutOff = iCutOff;
}

//----------------------------------------------------------------------------------------------
//	DwnClkCallback
//
//	Button callback function to scroll the selection window down.
//
function DwnClkCallback(button: Pointer<GUI_BUTTON>, reason: INT32): void {
  if (reason & MSYS_CALLBACK_REASON_LBUTTON_DWN) {
    button.value.uiFlags |= BUTTON_CLICKED_ON;
  } else if (reason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    button.value.uiFlags &= (~BUTTON_CLICKED_ON);
    ScrollSelWinDown();
  }
}

//----------------------------------------------------------------------------------------------
//	DrawSelections
//
//	Displays the objects in the display list to the selection window.
//
function DrawSelections(): void {
  let ClipRect: SGPRect;
  let NewRect: SGPRect;

  NewRect.iLeft = SelWinStartPoint.iX;
  NewRect.iTop = SelWinStartPoint.iY;
  NewRect.iRight = SelWinEndPoint.iX;
  NewRect.iBottom = SelWinEndPoint.iY;

  GetClippingRect(addressof(ClipRect));
  SetClippingRect(addressof(NewRect));

  //	SetFont( gpSmallFont );
  SetFont(gpLargeFontType1);
  SetObjectShade(gvoLargeFontType1, 0);
  //	SetObjectShade( gvoLargeFont, 0 );

  DisplayWindowFunc(pDispList, iTopWinCutOff, iBotWinCutOff, addressof(SelWinStartPoint), CLEAR_BACKGROUND);

  SetObjectShade(gvoLargeFontType1, 4);

  SetClippingRect(addressof(ClipRect));
}

//----------------------------------------------------------------------------------------------
//	BuildDisplayWindow
//
//	Creates a display list from a display specification list. It also sets variables up for
//	properly scrolling the window etc.
//
function BuildDisplayWindow(pDisplaySpecs: Pointer<DisplaySpec>, usNumSpecs: UINT16, pDisplayList: Pointer<Pointer<DisplayList>>, pUpperLeft: Pointer<SGPPoint>, pBottomRight: Pointer<SGPPoint>, pSpacing: Pointer<SGPPoint>, fFlags: UINT16): boolean {
  let iCurrX: INT32 = pUpperLeft.value.iX;
  let iCurrY: INT32 = pUpperLeft.value.iY;
  let usGreatestHeightInRow: UINT16 = 0;
  let usSpecLoop: UINT16;
  let usETRLELoop: UINT16;
  let usETRLEStart: UINT16;
  let usETRLEEnd: UINT16;
  let pDisplaySpec: Pointer<DisplaySpec>;
  let pETRLEObject: Pointer<ETRLEObject>;
  let pCurNode: Pointer<DisplayList>;

  SaveSelectionList();

  for (usSpecLoop = 0; usSpecLoop < usNumSpecs; usSpecLoop++) {
    pDisplaySpec = addressof(pDisplaySpecs[usSpecLoop]);
    if (pDisplaySpec.value.ubType == DISPLAY_GRAPHIC) {
      if (!pDisplaySpec.value.hVObject)
        return false;
      usETRLEStart = pDisplaySpec.value.usStart;
      usETRLEEnd = pDisplaySpec.value.usEnd;

      if (usETRLEStart == DISPLAY_ALL_OBJECTS) {
        usETRLEStart = 0;
        usETRLEEnd = pDisplaySpec.value.hVObject.value.usNumberOfObjects - 1;
      }

      if (usETRLEStart > usETRLEEnd)
        return false;
      if (usETRLEEnd >= pDisplaySpec.value.hVObject.value.usNumberOfObjects)
        return false;

      for (usETRLELoop = usETRLEStart; usETRLELoop <= usETRLEEnd; usETRLELoop++) {
        pETRLEObject = addressof(pDisplaySpec.value.hVObject.value.pETRLEObject[usETRLELoop]);

        if ((iCurrX + pETRLEObject.value.usWidth > pBottomRight.value.iX) || (fFlags & ONE_COLUMN)) {
          if (fFlags & ONE_ROW) {
            break;
          }
          iCurrX = pUpperLeft.value.iX;
          iCurrY += usGreatestHeightInRow + pSpacing.value.iY;
          usGreatestHeightInRow = 0;
        }

        if ((pCurNode = MemAlloc(sizeof(DisplayList))) != false) {
          pCurNode.value.hObj = pDisplaySpec.value.hVObject;
          pCurNode.value.uiIndex = usETRLELoop;
          pCurNode.value.iX = iCurrX;
          pCurNode.value.iY = iCurrY;
          pCurNode.value.iWidth = pETRLEObject.value.usWidth;
          pCurNode.value.iHeight = pETRLEObject.value.usHeight;
          pCurNode.value.pNext = pDisplayList.value;
          pCurNode.value.uiObjIndx = pDisplaySpec.value.uiObjIndx;

          if (IsInSelectionList(pCurNode))
            pCurNode.value.fChosen = true;
          else
            pCurNode.value.fChosen = false;

          pDisplayList.value = pCurNode;
        } else
          return false;

        if (pETRLEObject.value.usHeight > usGreatestHeightInRow) {
          usGreatestHeightInRow = pETRLEObject.value.usHeight;
        }

        iCurrX += pETRLEObject.value.usWidth + pSpacing.value.iX;
      }
    }
  }

  return true;
}

//----------------------------------------------------------------------------------------------
//	DisplayWindowFunc
//
//	Blits the actual object images in the display list on the selection window. The objects that
//	have been selected (in the selection list) are highlighted and the count placed in the upper
//	left corner of the image.
//
function DisplayWindowFunc(pNode: Pointer<DisplayList>, iTopCutOff: INT16, iBottomCutOff: INT16, pUpperLeft: Pointer<SGPPoint>, fFlags: UINT16): boolean {
  let iCurrY: INT16;
  let sTempOffsetX: INT16;
  let sTempOffsetY: INT16;
  let fReturnVal: boolean;
  let pETRLEObject: Pointer<ETRLEObject>;
  let usFillColor: UINT16;
  let sCount: INT16;

  if (pNode == null)
    return true;

  if (pNode.value.iY < iTopCutOff)
    return true;

  fReturnVal = false;
  if (DisplayWindowFunc(pNode.value.pNext, iTopCutOff, iBottomCutOff, pUpperLeft, fFlags)) {
    iCurrY = pUpperLeft.value.iY + pNode.value.iY - iTopCutOff;

    if (iCurrY > iBottomCutOff)
      return true;

    pETRLEObject = addressof(pNode.value.hObj.value.pETRLEObject[pNode.value.uiIndex]);

    // We have to store the offset data in temp variables before zeroing them and blitting
    sTempOffsetX = pETRLEObject.value.sOffsetX;
    sTempOffsetY = pETRLEObject.value.sOffsetY;

    // Set the offsets used for blitting to 0
    pETRLEObject.value.sOffsetX = 0;
    pETRLEObject.value.sOffsetY = 0;

    if (fFlags & CLEAR_BACKGROUND) {
      usFillColor = SelWinFillColor;
      if (pNode.value.fChosen)
        usFillColor = SelWinHilightFillColor;

      ColorFillVideoSurfaceArea(FRAME_BUFFER, pNode.value.iX, iCurrY, pNode.value.iX + pNode.value.iWidth, iCurrY + pNode.value.iHeight, usFillColor);
    }

    sCount = 0;
    if (pNode.value.fChosen)
      sCount = pSelList[FindInSelectionList(pNode)].sCount;

    SetObjectShade(pNode.value.hObj, DEFAULT_SHADE_LEVEL);
    fReturnVal = BltVideoObject(FRAME_BUFFER, pNode.value.hObj, pNode.value.uiIndex, pNode.value.iX, iCurrY, VO_BLT_SRCTRANSPARENCY, null);

    if (sCount != 0) {
      gprintf(pNode.value.iX, iCurrY, "%d", sCount);
    }

    pETRLEObject.value.sOffsetX = sTempOffsetX;
    pETRLEObject.value.sOffsetY = sTempOffsetY;
  }

  return fReturnVal;
}
