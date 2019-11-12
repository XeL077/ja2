namespace ja2 {

const MAINMENU_TEXT_FILE = "LoadScreens\\MainMenu.edt";
const MAINMENU_RECORD_SIZE = 80 * 2;

//#define TESTFOREIGNFONTS

// MENU ITEMS
const enum Enum23 {
  //	TITLE,
  NEW_GAME,
  LOAD_GAME,
  PREFERENCES,
  CREDITS,
  QUIT,
  NUM_MENU_ITEMS,
}

const MAINMENU_X = ((640 - 214) / 2);
const MAINMENU_TITLE_Y = 75;
const MAINMENU_Y = 277; // 200
const MAINMENU_Y_SPACE = 37;

let iMenuImages: INT32[] /* [NUM_MENU_ITEMS] */;
let iMenuButtons: INT32[] /* [NUM_MENU_ITEMS] */;

let gusMainMenuButtonWidths: UINT16[] /* [NUM_MENU_ITEMS] */;

let guiMainMenuBackGroundImage: UINT32;
let guiJa2LogoImage: UINT32;

let gBackRegion: MOUSE_REGION = createMouseRegion();
let gbHandledMainMenu: INT8 = 0;
let fInitialRender: boolean = false;
// BOOLEAN						gfDoHelpScreen = 0;

let gfMainMenuScreenEntry: boolean = false;
let gfMainMenuScreenExit: boolean = false;

let guiMainMenuExitScreen: UINT32 = Enum26.MAINMENU_SCREEN;

export function MainMenuScreenInit(): boolean {
  DebugMsg(TOPIC_JA2, DBG_LEVEL_3, String("Version Label: %S", zVersionLabel));
  DebugMsg(TOPIC_JA2, DBG_LEVEL_3, String("Version #:     %s", czVersionNumber));
  DebugMsg(TOPIC_JA2, DBG_LEVEL_3, String("Tracking #:    %S", zTrackingNumber));

  return true;
}

export function MainMenuScreenHandle(): UINT32 {
  let cnt: UINT32;
  let uiTime: UINT32;

  if (guiSplashStartTime + 4000 > GetJA2Clock()) {
    SetCurrentCursorFromDatabase(VIDEO_NO_CURSOR);
    SetMusicMode(Enum328.MUSIC_NONE);
    return Enum26.MAINMENU_SCREEN; // The splash screen hasn't been up long enough yet.
  }
  if (guiSplashFrameFade) {
    // Fade the splash screen.
    uiTime = GetJA2Clock();
    if (guiSplashFrameFade > 2)
      ShadowVideoSurfaceRectUsingLowPercentTable(FRAME_BUFFER, 0, 0, 640, 480);
    else if (guiSplashFrameFade > 1)
      ColorFillVideoSurfaceArea(FRAME_BUFFER, 0, 0, 640, 480, 0);
    else {
      uiTime = GetJA2Clock();
      // while( GetJA2Clock() < uiTime + 375 );
      SetMusicMode(Enum328.MUSIC_MAIN_MENU);
    }

    // while( uiTime + 100 > GetJA2Clock() );

    guiSplashFrameFade--;

    InvalidateScreen();
    EndFrameBufferRender();

    SetCurrentCursorFromDatabase(VIDEO_NO_CURSOR);

    return Enum26.MAINMENU_SCREEN;
  }

  SetCurrentCursorFromDatabase(Enum317.CURSOR_NORMAL);

  if (gfMainMenuScreenEntry) {
    InitMainMenu();
    gfMainMenuScreenEntry = false;
    gfMainMenuScreenExit = false;
    guiMainMenuExitScreen = Enum26.MAINMENU_SCREEN;
    SetMusicMode(Enum328.MUSIC_MAIN_MENU);
  }

  if (fInitialRender) {
    ClearMainMenu();
    RenderMainMenu();

    fInitialRender = false;
  }

  RestoreButtonBackGrounds();

  // Render buttons
  for (cnt = 0; cnt < Enum23.NUM_MENU_ITEMS; cnt++) {
    MarkAButtonDirty(iMenuButtons[cnt]);
  }

  RenderButtons();

  EndFrameBufferRender();

  //	if ( gfDoHelpScreen )
  //		HandleHelpScreenInput();
  //	else
  HandleMainMenuInput();

  HandleMainMenuScreen();

  if (gfMainMenuScreenExit) {
    ExitMainMenu();
    gfMainMenuScreenExit = false;
    gfMainMenuScreenEntry = true;
  }

  if (guiMainMenuExitScreen != Enum26.MAINMENU_SCREEN)
    gfMainMenuScreenEntry = true;

  return guiMainMenuExitScreen;
}

export function MainMenuScreenShutdown(): boolean {
  return false;
}

function HandleMainMenuScreen(): void {
  if (gbHandledMainMenu != 0) {
    // Exit according to handled value!
    switch (gbHandledMainMenu) {
      case Enum23.QUIT:
        gfMainMenuScreenExit = true;

        gfProgramIsRunning = false;
        break;

      case Enum23.NEW_GAME:

        //					gfDoHelpScreen = 1;
        //				gfMainMenuScreenExit = TRUE;
        //				if( !gfDoHelpScreen )
        //					SetMainMenuExitScreen( INIT_SCREEN );
        break;

      case Enum23.LOAD_GAME:
        // Select the game which is to be restored
        guiPreviousOptionScreen = guiCurrentScreen;
        guiMainMenuExitScreen = Enum26.SAVE_LOAD_SCREEN;
        gbHandledMainMenu = 0;
        gfSaveGame = false;
        gfMainMenuScreenExit = true;

        break;

      case Enum23.PREFERENCES:
        guiPreviousOptionScreen = guiCurrentScreen;
        guiMainMenuExitScreen = Enum26.OPTIONS_SCREEN;
        gbHandledMainMenu = 0;
        gfMainMenuScreenExit = true;
        break;

      case Enum23.CREDITS:
        guiMainMenuExitScreen = Enum26.CREDIT_SCREEN;
        gbHandledMainMenu = 0;
        gfMainMenuScreenExit = true;
        break;
    }
  }
}

export function InitMainMenu(): boolean {
  let VObjectDesc: VOBJECT_DESC = createVObjectDesc();

  //	gfDoHelpScreen = 0;

  // Check to see whatr saved game files exist
  InitSaveGameArray();

  // Create the background mouse mask
  CreateDestroyBackGroundMouseMask(true);

  CreateDestroyMainMenuButtons(true);

  // load background graphic and add it
  VObjectDesc.fCreateFlags = VOBJECT_CREATE_FROMFILE;
  VObjectDesc.ImageFile = FilenameForBPP("LOADSCREENS\\MainMenuBackGround.sti");
  if (!AddVideoObject(addressof(VObjectDesc), addressof(guiMainMenuBackGroundImage))) {
    return false;
  }

  // load ja2 logo graphic and add it
  VObjectDesc.fCreateFlags = VOBJECT_CREATE_FROMFILE;
  //	FilenameForBPP("INTERFACE\\Ja2_2.sti", VObjectDesc.ImageFile);
  VObjectDesc.ImageFile = FilenameForBPP("LOADSCREENS\\Ja2Logo.sti");
  if (!AddVideoObject(addressof(VObjectDesc), addressof(guiJa2LogoImage))) {
    return false;
  }

  /*
          // Gray out some buttons based on status of game!
          if( gGameSettings.bLastSavedGameSlot < 0 || gGameSettings.bLastSavedGameSlot >= NUM_SAVE_GAMES )
          {
                  DisableButton( iMenuButtons[ LOAD_GAME ] );
          }
          //The ini file said we have a saved game, but there is no saved game
          else if( gbSaveGameArray[ gGameSettings.bLastSavedGameSlot ] == FALSE )
                  DisableButton( iMenuButtons[ LOAD_GAME ] );
  */

  // if there are no saved games, disable the button
  if (!IsThereAnySavedGameFiles())
    DisableButton(iMenuButtons[Enum23.LOAD_GAME]);

  //	DisableButton( iMenuButtons[ CREDITS ] );
  //	DisableButton( iMenuButtons[ TITLE ] );

  gbHandledMainMenu = 0;
  fInitialRender = true;

  SetPendingNewScreen(Enum26.MAINMENU_SCREEN);
  guiMainMenuExitScreen = Enum26.MAINMENU_SCREEN;

  InitGameOptions();

  DequeueAllKeyBoardEvents();

  return true;
}

function ExitMainMenu(): void {
  //	UINT32										 uiDestPitchBYTES;
  //	UINT8											 *pDestBuf;

  //	if( !gfDoHelpScreen )
  { CreateDestroyBackGroundMouseMask(false); }

  CreateDestroyMainMenuButtons(false);

  DeleteVideoObjectFromIndex(guiMainMenuBackGroundImage);
  DeleteVideoObjectFromIndex(guiJa2LogoImage);

  gMsgBox.uiExitScreen = Enum26.MAINMENU_SCREEN;
  /*
          // CLEAR THE FRAME BUFFER
          pDestBuf = LockVideoSurface( FRAME_BUFFER, &uiDestPitchBYTES );
          memset(pDestBuf, 0, SCREEN_HEIGHT * uiDestPitchBYTES );
          UnLockVideoSurface( FRAME_BUFFER );
          InvalidateScreen( );
  */
}

function MenuButtonCallback(btn: GUI_BUTTON, reason: INT32): void {
  let bID: INT8;

  bID = btn.UserData[0];

  if (!(btn.uiFlags & BUTTON_ENABLED))
    return;

  if (reason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    // handle menu
    gbHandledMainMenu = bID;
    RenderMainMenu();

    if (gbHandledMainMenu == Enum23.NEW_GAME) {
      SetMainMenuExitScreen(Enum26.GAME_INIT_OPTIONS_SCREEN);
    } else if (gbHandledMainMenu == Enum23.LOAD_GAME) {
      if (gfKeyState[ALT])
        gfLoadGameUponEntry = true;
    }

    btn.uiFlags &= (~BUTTON_CLICKED_ON);
  }
  if (reason & MSYS_CALLBACK_REASON_LBUTTON_DWN) {
    RenderMainMenu();
    btn.uiFlags |= BUTTON_CLICKED_ON;
  }
}

function MenuButtonMoveCallback(btn: GUI_BUTTON, reason: INT32): void {
  if (reason & MSYS_CALLBACK_REASON_LOST_MOUSE) {
    //		btn->uiFlags &= (~BUTTON_CLICKED_ON );
    RenderMainMenu();
    InvalidateRegion(btn.Area.RegionTopLeftX, btn.Area.RegionTopLeftY, btn.Area.RegionBottomRightX, btn.Area.RegionBottomRightY);
  }
  if (reason & MSYS_CALLBACK_REASON_GAIN_MOUSE) {
    //		btn->uiFlags &= (~BUTTON_CLICKED_ON );
    RenderMainMenu();
    InvalidateRegion(btn.Area.RegionTopLeftX, btn.Area.RegionTopLeftY, btn.Area.RegionBottomRightX, btn.Area.RegionBottomRightY);
  }
}

function HandleMainMenuInput(): void {
  let InputEvent: InputAtom = createInputAtom();

  // Check for esc
  while (DequeueEvent(addressof(InputEvent)) == true) {
    if (InputEvent.usEvent == KEY_UP) {
      switch (InputEvent.usParam) {
        /*
                                        case ESC:
                                                gbHandledMainMenu = QUIT;
                                                break;
        */

        case 'c':
          gbHandledMainMenu = Enum23.LOAD_GAME;

          if (gfKeyState[ALT])
            gfLoadGameUponEntry = true;

          break;

        case 'o':
          gbHandledMainMenu = Enum23.PREFERENCES;
          break;

        case 's':
          gbHandledMainMenu = Enum23.CREDITS;
          break;
      }
    }
  }
}

function HandleHelpScreenInput(): void {
  let InputEvent: InputAtom = createInputAtom();

  // Check for key
  while (DequeueEvent(addressof(InputEvent)) == true) {
    switch (InputEvent.usEvent) {
      case KEY_UP:
        SetMainMenuExitScreen(Enum26.INIT_SCREEN);
        break;
    }
  }
}

export function ClearMainMenu(): void {
  let uiDestPitchBYTES: UINT32;
  let pDestBuf: Pointer<UINT8>;

  // CLEAR THE FRAME BUFFER
  pDestBuf = LockVideoSurface(FRAME_BUFFER, addressof(uiDestPitchBYTES));
  memset(pDestBuf, 0, SCREEN_HEIGHT * uiDestPitchBYTES);
  UnLockVideoSurface(FRAME_BUFFER);
  InvalidateScreen();
}

function SelectMainMenuBackGroundRegionCallBack(pRegion: MOUSE_REGION, iReason: INT32): void {
  if (iReason & MSYS_CALLBACK_REASON_INIT) {
  } else if (iReason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    //		if( gfDoHelpScreen )
    //		{
    //			SetMainMenuExitScreen( INIT_SCREEN );
    //			gfDoHelpScreen = FALSE;
    //		}
  } else if (iReason & MSYS_CALLBACK_REASON_RBUTTON_UP) {
    /*
                    if( gfDoHelpScreen )
                    {
                            SetMainMenuExitScreen( INIT_SCREEN );
                            gfDoHelpScreen = FALSE;
                    }
    */
  }
}

function SetMainMenuExitScreen(uiNewScreen: UINT32): void {
  guiMainMenuExitScreen = uiNewScreen;

  // REmove the background region
  CreateDestroyBackGroundMouseMask(false);

  gfMainMenuScreenExit = true;
}

function CreateDestroyBackGroundMouseMask(fCreate: boolean): void {
  /* static */ let fRegionCreated: boolean = false;

  if (fCreate) {
    if (fRegionCreated)
      return;

    // Make a mouse region
    MSYS_DefineRegion(gBackRegion, 0, 0, 640, 480, MSYS_PRIORITY_HIGHEST, Enum317.CURSOR_NORMAL, MSYS_NO_CALLBACK, SelectMainMenuBackGroundRegionCallBack);
    // Add region
    MSYS_AddRegion(gBackRegion);

    fRegionCreated = true;
  } else {
    if (!fRegionCreated)
      return;

    MSYS_RemoveRegion(gBackRegion);
    fRegionCreated = false;
  }
}

function CreateDestroyMainMenuButtons(fCreate: boolean): boolean {
  /* static */ let fButtonsCreated: boolean = false;
  let cnt: INT32;
  let filename: string /* SGPFILENAME */;
  let sSlot: INT16;
  let iStartLoc: INT32 = 0;
  let zText: string /* CHAR16[512] */;

  if (fCreate) {
    if (fButtonsCreated)
      return true;

    // reset the variable that allows the user to ALT click on the continue save btn to load the save instantly
    gfLoadGameUponEntry = false;

    // Load button images
    filename = GetMLGFilename(Enum326.MLG_TITLETEXT);

    iMenuImages[Enum23.NEW_GAME] = LoadButtonImage(filename, 0, 0, 1, 2, -1);
    sSlot = 0;
    iMenuImages[Enum23.LOAD_GAME] = UseLoadedButtonImage(iMenuImages[Enum23.NEW_GAME], 6, 3, 4, 5, -1);
    iMenuImages[Enum23.PREFERENCES] = UseLoadedButtonImage(iMenuImages[Enum23.NEW_GAME], 7, 7, 8, 9, -1);
    iMenuImages[Enum23.CREDITS] = UseLoadedButtonImage(iMenuImages[Enum23.NEW_GAME], 13, 10, 11, 12, -1);
    iMenuImages[Enum23.QUIT] = UseLoadedButtonImage(iMenuImages[Enum23.NEW_GAME], 14, 14, 15, 16, -1);

    for (cnt = 0; cnt < Enum23.NUM_MENU_ITEMS; cnt++) {
      switch (cnt) {
        case Enum23.NEW_GAME:
          gusMainMenuButtonWidths[cnt] = GetWidthOfButtonPic(iMenuImages[cnt], sSlot);
          break;
        case Enum23.LOAD_GAME:
          gusMainMenuButtonWidths[cnt] = GetWidthOfButtonPic(iMenuImages[cnt], 3);
          break;
        case Enum23.PREFERENCES:
          gusMainMenuButtonWidths[cnt] = GetWidthOfButtonPic(iMenuImages[cnt], 7);
          break;
        case Enum23.CREDITS:
          gusMainMenuButtonWidths[cnt] = GetWidthOfButtonPic(iMenuImages[cnt], 10);
          break;
        case Enum23.QUIT:
          gusMainMenuButtonWidths[cnt] = GetWidthOfButtonPic(iMenuImages[cnt], 15);
          break;
      }
      iMenuButtons[cnt] = QuickCreateButton(iMenuImages[cnt], (320 - gusMainMenuButtonWidths[cnt] / 2), (MAINMENU_Y + (cnt * MAINMENU_Y_SPACE)), BUTTON_TOGGLE, MSYS_PRIORITY_HIGHEST, DEFAULT_MOVE_CALLBACK(), MenuButtonCallback);
      if (iMenuButtons[cnt] == -1) {
        return false;
      }
      ButtonList[iMenuButtons[cnt]].UserData[0] = cnt;

      // load up some info from the 'mainmenu.edt' file.  This makes sure the file is present.  The file is
      // 'marked' with a code that identifies the testers
      iStartLoc = MAINMENU_RECORD_SIZE * cnt;
      if (!LoadEncryptedDataFromFile(MAINMENU_TEXT_FILE, zText, iStartLoc, MAINMENU_RECORD_SIZE)) {
        // the file was not able to be loaded properly
        let pSoldier: Pointer<SOLDIERTYPE> = null;

        if (pSoldier.value.bActive != true) {
          // something is very wrong
          pSoldier.value.bActive = pSoldier.value.bLife;
        }
      }
    }

    fButtonsCreated = true;
  } else {
    if (!fButtonsCreated)
      return true;

    // Delete images/buttons
    for (cnt = 0; cnt < Enum23.NUM_MENU_ITEMS; cnt++) {
      RemoveButton(iMenuButtons[cnt]);
      UnloadButtonImage(iMenuImages[cnt]);
    }
    fButtonsCreated = false;
  }

  return true;
}

function RenderMainMenu(): void {
  let hPixHandle: HVOBJECT;

  // Get and display the background image
  GetVideoObject(addressof(hPixHandle), guiMainMenuBackGroundImage);
  BltVideoObject(guiSAVEBUFFER, hPixHandle, 0, 0, 0, VO_BLT_SRCTRANSPARENCY, null);
  BltVideoObject(FRAME_BUFFER, hPixHandle, 0, 0, 0, VO_BLT_SRCTRANSPARENCY, null);

  GetVideoObject(addressof(hPixHandle), guiJa2LogoImage);
  BltVideoObject(FRAME_BUFFER, hPixHandle, 0, 188, 15, VO_BLT_SRCTRANSPARENCY, null);
  BltVideoObject(guiSAVEBUFFER, hPixHandle, 0, 188, 15, VO_BLT_SRCTRANSPARENCY, null);

  DrawTextToScreen(gzCopyrightText[0], 0, 465, 640, FONT10ARIAL(), FONT_MCOLOR_WHITE, FONT_MCOLOR_BLACK, false, CENTER_JUSTIFIED);

  InvalidateRegion(0, 0, 640, 480);
}

function RestoreButtonBackGrounds(): void {
  let cnt: UINT8;

  //	RestoreExternBackgroundRect( (UINT16)(320 - gusMainMenuButtonWidths[TITLE]/2), MAINMENU_TITLE_Y, gusMainMenuButtonWidths[TITLE], 23 );

  for (cnt = 0; cnt < Enum23.NUM_MENU_ITEMS; cnt++) {
    RestoreExternBackgroundRect((320 - gusMainMenuButtonWidths[cnt] / 2), (MAINMENU_Y + (cnt * MAINMENU_Y_SPACE) - 1), (gusMainMenuButtonWidths[cnt] + 1), 23);
  }
}

}
