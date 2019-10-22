let gbDefaultLightType: INT8 = PRIMETIME_LIGHT;

let gEditorLightColor: SGPPaletteEntry;

let gfEditorForceShadeTableRebuild: BOOLEAN = FALSE;

function SetupTextInputForMapInfo(): void {
  let str: UINT16[] /* [10] */;

  InitTextInputModeWithScheme(DEFAULT_SCHEME);

  AddUserInputField(NULL); // just so we can use short cut keys while not typing.

  // light rgb fields
  swprintf(str, L"%d", gEditorLightColor.peRed);
  AddTextInputField(10, 394, 25, 18, MSYS_PRIORITY_NORMAL, str, 3, INPUTTYPE_NUMERICSTRICT);
  swprintf(str, L"%d", gEditorLightColor.peGreen);
  AddTextInputField(10, 414, 25, 18, MSYS_PRIORITY_NORMAL, str, 3, INPUTTYPE_NUMERICSTRICT);
  swprintf(str, L"%d", gEditorLightColor.peBlue);
  AddTextInputField(10, 434, 25, 18, MSYS_PRIORITY_NORMAL, str, 3, INPUTTYPE_NUMERICSTRICT);

  swprintf(str, L"%d", gsLightRadius);
  AddTextInputField(120, 394, 25, 18, MSYS_PRIORITY_NORMAL, str, 3, INPUTTYPE_NUMERICSTRICT);
  swprintf(str, L"%d", gusLightLevel);
  AddTextInputField(120, 414, 25, 18, MSYS_PRIORITY_NORMAL, str, 2, INPUTTYPE_NUMERICSTRICT);

  // Scroll restriction ID
  if (!gMapInformation.ubRestrictedScrollID)
    swprintf(str, L"");
  else
    swprintf(str, L"%d", gMapInformation.ubRestrictedScrollID);
  AddTextInputField(210, 420, 30, 20, MSYS_PRIORITY_NORMAL, str, 2, INPUTTYPE_NUMERICSTRICT);

  // exit grid input fields
  swprintf(str, L"%c%d", gExitGrid.ubGotoSectorY + 'A' - 1, gExitGrid.ubGotoSectorX);
  AddTextInputField(338, 363, 30, 18, MSYS_PRIORITY_NORMAL, str, 3, INPUTTYPE_EXCLUSIVE_COORDINATE);
  swprintf(str, L"%d", gExitGrid.ubGotoSectorZ);
  AddTextInputField(338, 383, 30, 18, MSYS_PRIORITY_NORMAL, str, 1, INPUTTYPE_NUMERICSTRICT);
  swprintf(str, L"%d", gExitGrid.usGridNo);
  AddTextInputField(338, 403, 40, 18, MSYS_PRIORITY_NORMAL, str, 5, INPUTTYPE_NUMERICSTRICT);
}

function UpdateMapInfo(): void {
  SetFont(FONT10ARIAL);
  SetFontShadow(FONT_NEARBLACK);

  SetFontForeground(FONT_RED);
  mprintf(38, 399, L"R");
  SetFontForeground(FONT_GREEN);
  mprintf(38, 419, L"G");
  SetFontForeground(FONT_DKBLUE);
  mprintf(38, 439, L"B");

  SetFontForeground(FONT_YELLOW);
  mprintf(65, 369, L"Prime");
  mprintf(65, 382, L"Night");
  mprintf(65, 397, L"24Hrs");

  SetFontForeground(FONT_YELLOW);
  mprintf(148, 399, L"Radius");

  if (!gfBasement && !gfCaves)
    SetFontForeground(FONT_DKYELLOW);
  mprintf(148, 414, L"Underground");
  mprintf(148, 423, L"Light Level");

  SetFontForeground(FONT_YELLOW);
  mprintf(230, 369, L"Outdoors");
  mprintf(230, 384, L"Basement");
  mprintf(230, 399, L"Caves");

  SetFontForeground(FONT_ORANGE);
  mprintf(250, 420, L"Restricted");
  mprintf(250, 430, L"Scroll ID");

  SetFontForeground(FONT_YELLOW);
  mprintf(368, 363, L"Destination");
  mprintf(368, 372, L"Sector");
  mprintf(368, 383, L"Destination");
  mprintf(368, 392, L"Bsmt. Level");
  mprintf(378, 403, L"Dest.");
  mprintf(378, 412, L"GridNo");
  SetFontForeground(FONT_RED);
}

function UpdateMapInfoFields(): void {
  let str: UINT16[] /* [10] */;
  // Update the text fields to reflect the validated values.
  // light rgb fields
  swprintf(str, L"%d", gEditorLightColor.peRed);
  SetInputFieldStringWith16BitString(1, str);
  swprintf(str, L"%d", gEditorLightColor.peGreen);
  SetInputFieldStringWith16BitString(2, str);
  swprintf(str, L"%d", gEditorLightColor.peBlue);
  SetInputFieldStringWith16BitString(3, str);

  swprintf(str, L"%d", gsLightRadius);
  SetInputFieldStringWith16BitString(4, str);
  swprintf(str, L"%d", gusLightLevel);
  SetInputFieldStringWith16BitString(5, str);

  if (!gMapInformation.ubRestrictedScrollID)
    swprintf(str, L"");
  else
    swprintf(str, L"%d", gMapInformation.ubRestrictedScrollID);
  SetInputFieldStringWith16BitString(6, str);

  ApplyNewExitGridValuesToTextFields();
}

function ExtractAndUpdateMapInfo(): void {
  let str: UINT16[] /* [10] */;
  let temp: INT32;
  let fUpdateLight1: BOOLEAN = FALSE;
  // extract light1 colors
  temp = min(GetNumericStrictValueFromField(1), 255);
  if (temp != -1 && temp != gEditorLightColor.peRed) {
    fUpdateLight1 = TRUE;
    gEditorLightColor.peRed = temp;
  }
  temp = min(GetNumericStrictValueFromField(2), 255);
  if (temp != -1 && temp != gEditorLightColor.peGreen) {
    fUpdateLight1 = TRUE;
    gEditorLightColor.peGreen = temp;
  }
  temp = min(GetNumericStrictValueFromField(3), 255);
  if (temp != -1 && temp != gEditorLightColor.peBlue) {
    fUpdateLight1 = TRUE;
    gEditorLightColor.peBlue = temp;
  }
  if (fUpdateLight1) {
    gfEditorForceShadeTableRebuild = TRUE;
    LightSetColors(&gEditorLightColor, 1);
    gfEditorForceShadeTableRebuild = FALSE;
  }

  // extract radius
  temp = max(min(GetNumericStrictValueFromField(4), 8), 1);
  if (temp != -1)
    gsLightRadius = temp;
  temp = max(min(GetNumericStrictValueFromField(5), 15), 1);
  if (temp != -1 && temp != gusLightLevel) {
    gusLightLevel = temp;
    gfRenderWorld = TRUE;
    ubAmbientLightLevel = (EDITOR_LIGHT_MAX - gusLightLevel);
    LightSetBaseLevel(ubAmbientLightLevel);
    LightSpriteRenderAll();
  }

  temp = GetNumericStrictValueFromField(6);
  if (temp == -1)
    gMapInformation.ubRestrictedScrollID = 0;
  else
    gMapInformation.ubRestrictedScrollID = temp;

  // set up fields for exitgrid information
  Get16BitStringFromField(7, str);
  if (str[0] >= 'a' && str[0] <= 'z')
    str[0] -= 32; // uppercase it!
  if (str[0] >= 'A' && str[0] <= 'Z' && str[1] >= '0' && str[1] <= '9') {
    // only update, if coordinate is valid.
    gExitGrid.ubGotoSectorY = (str[0] - 'A' + 1);
    gExitGrid.ubGotoSectorX = (str[1] - '0');
    if (str[2] >= '0' && str[2] <= '9')
      gExitGrid.ubGotoSectorX = (gExitGrid.ubGotoSectorX * 10 + str[2] - '0');
    gExitGrid.ubGotoSectorX = max(min(gExitGrid.ubGotoSectorX, 16), 1);
    gExitGrid.ubGotoSectorY = max(min(gExitGrid.ubGotoSectorY, 16), 1);
  }
  gExitGrid.ubGotoSectorZ = max(min(GetNumericStrictValueFromField(8), 3), 0);
  gExitGrid.usGridNo = max(min(GetNumericStrictValueFromField(9), 25600), 0);

  UpdateMapInfoFields();
}

function ApplyNewExitGridValuesToTextFields(): BOOLEAN {
  let str: UINT16[] /* [10] */;
  // exit grid input fields
  if (iCurrentTaskbar != TASK_MAPINFO)
    return FALSE;
  swprintf(str, L"%c%d", gExitGrid.ubGotoSectorY + 'A' - 1, gExitGrid.ubGotoSectorX);
  SetInputFieldStringWith16BitString(7, str);
  swprintf(str, L"%d", gExitGrid.ubGotoSectorZ);
  SetInputFieldStringWith16BitString(8, str);
  swprintf(str, L"%d", gExitGrid.usGridNo);
  SetInputFieldStringWith16BitString(9, str);
  SetActiveField(0);
  return TRUE;
}

let usCurrentExitGridNo: UINT16 = 0;
function LocateNextExitGrid(): void {
  let ExitGrid: EXITGRID;
  let i: UINT16;
  for (i = usCurrentExitGridNo + 1; i < WORLD_MAX; i++) {
    if (GetExitGrid(i, &ExitGrid)) {
      usCurrentExitGridNo = i;
      CenterScreenAtMapIndex(i);
      return;
    }
  }
  for (i = 0; i < usCurrentExitGridNo; i++) {
    if (GetExitGrid(i, &ExitGrid)) {
      usCurrentExitGridNo = i;
      CenterScreenAtMapIndex(i);
      return;
    }
  }
}

function ChangeLightDefault(bLightType: INT8): void {
  UnclickEditorButton(MAPINFO_PRIMETIME_LIGHT + gbDefaultLightType);
  gbDefaultLightType = bLightType;
  ClickEditorButton(MAPINFO_PRIMETIME_LIGHT + gbDefaultLightType);
}
