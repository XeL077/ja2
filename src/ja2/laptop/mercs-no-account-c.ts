const MERC_NA_TEXT_FONT = () => FONT12ARIAL();
const MERC_NA_TEXT_COLOR = FONT_MCOLOR_WHITE;

const MERC_NO_ACCOUNT_IMAGE_X = LAPTOP_SCREEN_UL_X + 23;
const MERC_NO_ACCOUNT_IMAGE_Y = LAPTOP_SCREEN_UL_Y + 52;

const MERC_OPEN_BUTTON_X = 130;
const MERC_OPEN_BUTTON_Y = 380;

const MERC_CANCEL_BUTTON_X = 490;
const MERC_CANCEL_BUTTON_Y = MERC_OPEN_BUTTON_Y;

const MERC_NA_SENTENCE_X = MERC_NO_ACCOUNT_IMAGE_X + 10;
const MERC_NA_SENTENCE_Y = MERC_NO_ACCOUNT_IMAGE_Y + 75;
const MERC_NA_SENTENCE_WIDTH = 460 - 20;

let guiNoAccountImage: UINT32;

let guiOpenAccountBoxButton: UINT32;
let guiOpenAccountBoxButtonImage: INT32;

let guiCancelBoxButton: UINT32;

function GameInitMercsNoAccount(): void {
}

function EnterMercsNoAccount(): boolean {
  let VObjectDesc: VOBJECT_DESC;

  InitMercBackGround();

  // load the Account box graphic and add it
  VObjectDesc.fCreateFlags = VOBJECT_CREATE_FROMFILE;
  FilenameForBPP("LAPTOP\\NoAccountBox.sti", VObjectDesc.ImageFile);
  CHECKF(AddVideoObject(addressof(VObjectDesc), addressof(guiNoAccountImage)));

  // Open Accouint button
  guiOpenAccountBoxButtonImage = LoadButtonImage("LAPTOP\\BigButtons.sti", -1, 0, -1, 1, -1);

  guiOpenAccountBoxButton = CreateIconAndTextButton(guiOpenAccountBoxButtonImage, MercNoAccountText[Enum342.MERC_NO_ACC_OPEN_ACCOUNT], FONT12ARIAL(), MERC_BUTTON_UP_COLOR, DEFAULT_SHADOW, MERC_BUTTON_DOWN_COLOR, DEFAULT_SHADOW, TEXT_CJUSTIFIED, MERC_OPEN_BUTTON_X, MERC_OPEN_BUTTON_Y, BUTTON_TOGGLE, MSYS_PRIORITY_HIGH, DEFAULT_MOVE_CALLBACK(), BtnOpenAccountBoxButtonCallback);
  SetButtonCursor(guiOpenAccountBoxButton, Enum317.CURSOR_LAPTOP_SCREEN);
  SpecifyDisabledButtonStyle(guiOpenAccountBoxButton, Enum29.DISABLED_STYLE_SHADED);

  guiCancelBoxButton = CreateIconAndTextButton(guiOpenAccountBoxButtonImage, MercNoAccountText[Enum342.MERC_NO_ACC_CANCEL], FONT12ARIAL(), MERC_BUTTON_UP_COLOR, DEFAULT_SHADOW, MERC_BUTTON_DOWN_COLOR, DEFAULT_SHADOW, TEXT_CJUSTIFIED, MERC_CANCEL_BUTTON_X, MERC_CANCEL_BUTTON_Y, BUTTON_TOGGLE, MSYS_PRIORITY_HIGH, DEFAULT_MOVE_CALLBACK(), BtnCancelBoxButtonCallback);
  SetButtonCursor(guiCancelBoxButton, Enum317.CURSOR_LAPTOP_SCREEN);
  SpecifyDisabledButtonStyle(guiCancelBoxButton, Enum29.DISABLED_STYLE_SHADED);

  RenderMercsNoAccount();

  return true;
}

function ExitMercsNoAccount(): void {
  DeleteVideoObjectFromIndex(guiNoAccountImage);

  UnloadButtonImage(guiOpenAccountBoxButtonImage);
  RemoveButton(guiOpenAccountBoxButton);
  RemoveButton(guiCancelBoxButton);

  RemoveMercBackGround();
}

function HandleMercsNoAccount(): void {
}

function RenderMercsNoAccount(): void {
  let hPixHandle: HVOBJECT;

  DrawMecBackGround();

  // Title
  GetVideoObject(addressof(hPixHandle), guiNoAccountImage);
  BltVideoObject(FRAME_BUFFER, hPixHandle, 0, MERC_NO_ACCOUNT_IMAGE_X, MERC_NO_ACCOUNT_IMAGE_Y, VO_BLT_SRCTRANSPARENCY, null);

  // Display the sentence
  DisplayWrappedString(MERC_NA_SENTENCE_X, MERC_NA_SENTENCE_Y, MERC_NA_SENTENCE_WIDTH, 2, MERC_NA_TEXT_FONT(), MERC_NA_TEXT_COLOR, MercNoAccountText[Enum342.MERC_NO_ACC_NO_ACCOUNT_OPEN_ONE], FONT_MCOLOR_BLACK, false, CENTER_JUSTIFIED);

  MarkButtonsDirty();
  RenderWWWProgramTitleBar();
  InvalidateRegion(LAPTOP_SCREEN_UL_X, LAPTOP_SCREEN_UL_Y, LAPTOP_SCREEN_LR_X, LAPTOP_SCREEN_WEB_LR_Y);
}

function BtnOpenAccountBoxButtonCallback(btn: Pointer<GUI_BUTTON>, reason: INT32): void {
  if (reason & MSYS_CALLBACK_REASON_LBUTTON_DWN) {
    btn.value.uiFlags |= BUTTON_CLICKED_ON;
    InvalidateRegion(btn.value.Area.RegionTopLeftX, btn.value.Area.RegionTopLeftY, btn.value.Area.RegionBottomRightX, btn.value.Area.RegionBottomRightY);
  }

  if (reason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    if (btn.value.uiFlags & BUTTON_CLICKED_ON) {
      btn.value.uiFlags &= (~BUTTON_CLICKED_ON);

      // open an account
      LaptopSaveInfo.gubPlayersMercAccountStatus = Enum104.MERC_ACCOUNT_VALID;

      // Get an account number
      LaptopSaveInfo.guiPlayersMercAccountNumber = Random(99999);

      gusMercVideoSpeckSpeech = Enum111.SPECK_QUOTE_THANK_PLAYER_FOR_OPENING_ACCOUNT;

      guiCurrentLaptopMode = Enum95.LAPTOP_MODE_MERC;
      gubArrivedFromMercSubSite = Enum105.MERC_CAME_FROM_ACCOUNTS_PAGE;

      InvalidateRegion(btn.value.Area.RegionTopLeftX, btn.value.Area.RegionTopLeftY, btn.value.Area.RegionBottomRightX, btn.value.Area.RegionBottomRightY);
    }
  }
  if (reason & MSYS_CALLBACK_REASON_LOST_MOUSE) {
    btn.value.uiFlags &= (~BUTTON_CLICKED_ON);
    InvalidateRegion(btn.value.Area.RegionTopLeftX, btn.value.Area.RegionTopLeftY, btn.value.Area.RegionBottomRightX, btn.value.Area.RegionBottomRightY);
  }
}

function BtnCancelBoxButtonCallback(btn: Pointer<GUI_BUTTON>, reason: INT32): void {
  if (reason & MSYS_CALLBACK_REASON_LBUTTON_DWN) {
    btn.value.uiFlags |= BUTTON_CLICKED_ON;
    InvalidateRegion(btn.value.Area.RegionTopLeftX, btn.value.Area.RegionTopLeftY, btn.value.Area.RegionBottomRightX, btn.value.Area.RegionBottomRightY);
  }
  if (reason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    if (btn.value.uiFlags & BUTTON_CLICKED_ON) {
      btn.value.uiFlags &= (~BUTTON_CLICKED_ON);

      guiCurrentLaptopMode = Enum95.LAPTOP_MODE_MERC;
      gubArrivedFromMercSubSite = Enum105.MERC_CAME_FROM_ACCOUNTS_PAGE;

      InvalidateRegion(btn.value.Area.RegionTopLeftX, btn.value.Area.RegionTopLeftY, btn.value.Area.RegionBottomRightX, btn.value.Area.RegionBottomRightY);
    }
  }
  if (reason & MSYS_CALLBACK_REASON_LOST_MOUSE) {
    btn.value.uiFlags &= (~BUTTON_CLICKED_ON);
    InvalidateRegion(btn.value.Area.RegionTopLeftX, btn.value.Area.RegionTopLeftY, btn.value.Area.RegionBottomRightX, btn.value.Area.RegionBottomRightY);
  }
}
