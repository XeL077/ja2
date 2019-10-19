typedef struct {
  STR16 *psCityLoc;
  UINT16 usOverNightExpress;
  UINT16 us2DaysService;
  UINT16 usStandardService;
} BobbyROrderLocationStruct;

BobbyROrderLocationStruct BobbyROrderLocations[] = {
  { &pDeliveryLocationStrings[0], 20, 15, 10 },
  { &pDeliveryLocationStrings[1], 295, 150, 85 },
  { &pDeliveryLocationStrings[2], 200, 100, 50 }, // the only one that really matters
  { &pDeliveryLocationStrings[3], 100, 55, 30 },
  { &pDeliveryLocationStrings[4], 95, 65, 40 },
  { &pDeliveryLocationStrings[5], 55, 40, 25 },
  { &pDeliveryLocationStrings[6], 35, 25, 15 },
  { &pDeliveryLocationStrings[7], 200, 100, 50 },
  { &pDeliveryLocationStrings[8], 190, 90, 45 },
  { &pDeliveryLocationStrings[9], 35, 25, 15 },
  { &pDeliveryLocationStrings[10], 100, 55, 30 },
  { &pDeliveryLocationStrings[11], 35, 25, 15 },
  { &pDeliveryLocationStrings[12], 45, 30, 20 },
  { &pDeliveryLocationStrings[13], 55, 40, 25 },
  { &pDeliveryLocationStrings[14], 100, 55, 30 },
  { &pDeliveryLocationStrings[15], 100, 55, 30 },
  { &pDeliveryLocationStrings[16], 45, 30, 20 },
};

// drop down menu
const enum Enum69 {
  BR_DROP_DOWN_NO_ACTION,
  BR_DROP_DOWN_CREATE,
  BR_DROP_DOWN_DESTROY,
  BR_DROP_DOWN_DISPLAY,
}

const BOBBYR_ORDER_NUM_SHIPPING_CITIES = 17;
const BOBBYR_NUM_DISPLAYED_CITIES = 10;

const OVERNIGHT_EXPRESS = 1;
const TWO_BUSINESS_DAYS = 2;
const STANDARD_SERVICE = 3;

const MIN_SHIPPING_WEIGHT = 20;

const BOBBYR_ORDER_TITLE_TEXT_FONT = () => FONT14ARIAL();
const BOBBYR_ORDER_TITLE_TEXT_COLOR = 157;

const BOBBYR_FONT_BLACK = 2;

const BOBBYR_ORDER_STATIC_TEXT_FONT = () => FONT12ARIAL();
const BOBBYR_ORDER_STATIC_TEXT_COLOR = 145;

const BOBBYR_DISCLAIMER_FONT = () => FONT10ARIAL();

const BOBBYR_ORDER_DYNAMIC_TEXT_FONT = () => FONT12ARIAL();
const BOBBYR_ORDER_DYNAMIC_TEXT_COLOR = FONT_MCOLOR_WHITE;

const BOBBYR_ORDER_DROP_DOWN_SELEC_COLOR = FONT_MCOLOR_WHITE;

const BOBBYR_DROPDOWN_FONT = () => FONT12ARIAL();

const BOBBYR_ORDERGRID_X = LAPTOP_SCREEN_UL_X + 2;
const BOBBYR_ORDERGRID_Y = LAPTOP_SCREEN_WEB_UL_Y + 62;

const BOBBYR_BOBBY_RAY_TITLE_X = LAPTOP_SCREEN_UL_X + 171;
const BOBBYR_BOBBY_RAY_TITLE_Y = LAPTOP_SCREEN_WEB_UL_Y + 3;
const BOBBYR_BOBBY_RAY_TITLE_WIDTH = 160;
const BOBBYR_BOBBY_RAY_TITLE_HEIGHT = 35;

const BOBBYR_LOCATION_BOX_X = LAPTOP_SCREEN_UL_X + 276;
const BOBBYR_LOCATION_BOX_Y = LAPTOP_SCREEN_WEB_UL_Y + 62;

const BOBBYR_DELIVERYSPEED_X = LAPTOP_SCREEN_UL_X + 276;
const BOBBYR_DELIVERYSPEED_Y = LAPTOP_SCREEN_WEB_UL_Y + 149;

const BOBBYR_CLEAR_ORDER_X = LAPTOP_SCREEN_UL_X + 309;
const BOBBYR_CLEAR_ORDER_Y = LAPTOP_SCREEN_WEB_UL_Y + 268; // LAPTOP_SCREEN_WEB_UL_Y + 252

const BOBBYR_ACCEPT_ORDER_X = LAPTOP_SCREEN_UL_X + 299;
const BOBBYR_ACCEPT_ORDER_Y = LAPTOP_SCREEN_WEB_UL_Y + 303; // LAPTOP_SCREEN_WEB_UL_Y + 288

const BOBBYR_GRID_ROW_OFFSET = 20;
const BOBBYR_GRID_TITLE_OFFSET = 27;

const BOBBYR_GRID_FIRST_COLUMN_X = 3; // BOBBYR_ORDERGRID_X + 3
const BOBBYR_GRID_FIRST_COLUMN_Y = 37; // BOBBYR_ORDERGRID_Y + 37
const BOBBYR_GRID_FIRST_COLUMN_WIDTH = 23;

const BOBBYR_GRID_SECOND_COLUMN_X = 28; // BOBBYR_ORDERGRID_X + 28
const BOBBYR_GRID_SECOND_COLUMN_Y = BOBBYR_GRID_FIRST_COLUMN_Y;
const BOBBYR_GRID_SECOND_COLUMN_WIDTH = 40;

const BOBBYR_GRID_THIRD_COLUMN_X = 70; // BOBBYR_ORDERGRID_X + 70
const BOBBYR_GRID_THIRD_COLUMN_Y = BOBBYR_GRID_FIRST_COLUMN_Y;
const BOBBYR_GRID_THIRD_COLUMN_WIDTH = 111;

const BOBBYR_GRID_FOURTH_COLUMN_X = 184; // BOBBYR_ORDERGRID_X + 184
const BOBBYR_GRID_FOURTH_COLUMN_Y = BOBBYR_GRID_FIRST_COLUMN_Y;
const BOBBYR_GRID_FOURTH_COLUMN_WIDTH = 40;

const BOBBYR_GRID_FIFTH_COLUMN_X = 224; // BOBBYR_ORDERGRID_X + 224
const BOBBYR_GRID_FIFTH_COLUMN_Y = BOBBYR_GRID_FIRST_COLUMN_Y;
const BOBBYR_GRID_FIFTH_COLUMN_WIDTH = 42;

const BOBBYR_SUBTOTAL_WIDTH = 212;
const BOBBYR_SUBTOTAL_X = BOBBYR_GRID_FIRST_COLUMN_X;
const BOBBYR_SUBTOTAL_Y = BOBBYR_GRID_FIRST_COLUMN_Y + BOBBYR_GRID_ROW_OFFSET * 10 + 3;

const BOBBYR_SHIPPING_N_HANDLE_Y = BOBBYR_SUBTOTAL_Y + 17;
const BOBBYR_GRAND_TOTAL_Y = BOBBYR_SHIPPING_N_HANDLE_Y + 20;

const BOBBYR_SHIPPING_LOCATION_TEXT_X = BOBBYR_LOCATION_BOX_X + 8;
const BOBBYR_SHIPPING_LOCATION_TEXT_Y = BOBBYR_LOCATION_BOX_Y + 8;

const BOBBYR_SHIPPING_SPEED_X = BOBBYR_SHIPPING_LOCATION_TEXT_X;
const BOBBYR_SHIPPING_SPEED_Y = BOBBYR_DELIVERYSPEED_Y + 11;

const BOBBYR_SHIPPING_COST_X = BOBBYR_SHIPPING_SPEED_X + 130;

const BOBBYR_OVERNIGHT_EXPRESS_Y = BOBBYR_DELIVERYSPEED_Y + 42;

const BOBBYR_ORDER_FORM_TITLE_X = BOBBYR_BOBBY_RAY_TITLE_X;
const BOBBYR_ORDER_FORM_TITLE_Y = BOBBYR_BOBBY_RAY_TITLE_Y + 37;
const BOBBYR_ORDER_FORM_TITLE_WIDTH = 159;

const BOBBYR_BACK_BUTTON_X = 130;
const BOBBYR_BACK_BUTTON_Y = 400 + LAPTOP_SCREEN_WEB_DELTA_Y + 4;

const BOBBYR_HOME_BUTTON_X = 515;
const BOBBYR_HOME_BUTTON_Y = BOBBYR_BACK_BUTTON_Y;

const BOBBYR_SHIPMENT_BUTTON_X = (LAPTOP_SCREEN_UL_X + (LAPTOP_SCREEN_LR_X - LAPTOP_SCREEN_UL_X - 75) / 2);
const BOBBYR_SHIPMENT_BUTTON_Y = BOBBYR_BACK_BUTTON_Y;

const SHIPPING_SPEED_LIGHT_WIDTH = 9;
const SHIPPING_SPEED_LIGHT_HEIGHT = 9;

const BOBBYR_CONFIRM_ORDER_X = 220;
const BOBBYR_CONFIRM_ORDER_Y = 170;

const BOBBYR_CITY_START_LOCATION_X = BOBBYR_LOCATION_BOX_X + 6;
const BOBBYR_CITY_START_LOCATION_Y = BOBBYR_LOCATION_BOX_Y + 61;
const BOBBYR_DROP_DOWN_WIDTH = 182; // 203
const BOBBYR_DROP_DOWN_HEIGHT = 19;
const BOBBYR_CITY_NAME_OFFSET = 6;

const BOBBYR_SCROLL_AREA_X = BOBBYR_CITY_START_LOCATION_X + BOBBYR_DROP_DOWN_WIDTH;
const BOBBYR_SCROLL_AREA_Y = BOBBYR_CITY_START_LOCATION_Y;
const BOBBYR_SCROLL_AREA_WIDTH = 22;
const BOBBYR_SCROLL_AREA_HEIGHT = 139;
const BOBBYR_SCROLL_AREA_HEIGHT_MINUS_ARROWS = (BOBBYR_SCROLL_AREA_HEIGHT - (2 * BOBBYR_SCROLL_ARROW_HEIGHT) - 8);

const BOBBYR_SCROLL_UP_ARROW_X = BOBBYR_SCROLL_AREA_X;
const BOBBYR_SCROLL_UP_ARROW_Y = BOBBYR_SCROLL_AREA_Y + 5;
const BOBBYR_SCROLL_DOWN_ARROW_X = BOBBYR_SCROLL_UP_ARROW_X;
const BOBBYR_SCROLL_DOWN_ARROW_Y = BOBBYR_SCROLL_AREA_Y + BOBBYR_SCROLL_AREA_HEIGHT - 24;
const BOBBYR_SCROLL_ARROW_WIDTH = 18;
const BOBBYR_SCROLL_ARROW_HEIGHT = 20;

const BOBBYR_SHIPPING_LOC_AREA_L_X = BOBBYR_LOCATION_BOX_X + 9;
const BOBBYR_SHIPPING_LOC_AREA_T_Y = BOBBYR_LOCATION_BOX_Y + 39;

const BOBBYR_SHIPPING_LOC_AREA_R_X = BOBBYR_LOCATION_BOX_X + 206;
const BOBBYR_SHIPPING_LOC_AREA_B_Y = BOBBYR_LOCATION_BOX_Y + 57;

const BOBBYR_SHIPPING_SPEED_NUMBER_X = BOBBYR_SHIPPING_COST_X;
const BOBBYR_SHIPPING_SPEED_NUMBER_WIDTH = 37;
const BOBBYR_SHIPPING_SPEED_NUMBER_1_Y = BOBBYR_OVERNIGHT_EXPRESS_Y;

const BOBBYR_SHIPPING_SPEED_NUMBER_2_Y = BOBBYR_OVERNIGHT_EXPRESS_Y;
const BOBBYR_SHIPPING_SPEED_NUMBER_3_Y = BOBBYR_OVERNIGHT_EXPRESS_Y;

const BOBBYR_TOTAL_SAVED_AREA_X = BOBBYR_ORDERGRID_X + 221;
const BOBBYR_TOTAL_SAVED_AREA_Y = BOBBYR_ORDERGRID_Y + 237;

const BOBBYR_USED_WARNING_X = 122;
const BOBBYR_USED_WARNING_Y = 382 + LAPTOP_SCREEN_WEB_DELTA_Y;

const BOBBYR_PACKAXGE_WEIGHT_X = BOBBYR_LOCATION_BOX_X;
const BOBBYR_PACKAXGE_WEIGHT_Y = LAPTOP_SCREEN_WEB_UL_Y + 249;
const BOBBYR_PACKAXGE_WEIGHT_WIDTH = 188;

UINT16 gShippingSpeedAreas[] = {
  585, 218 + LAPTOP_SCREEN_WEB_DELTA_Y,
  585, 238 + LAPTOP_SCREEN_WEB_DELTA_Y,
  585, 258 + LAPTOP_SCREEN_WEB_DELTA_Y,
};

// Identifier for the images
UINT32 guiBobbyRayTitle;
UINT32 guiBobbyROrderGrid;
UINT32 guiBobbyRLocationGraphic;
UINT32 guiDeliverySpeedGraphic;
UINT32 guiConfirmGraphic;
UINT32 guiTotalSaveArea; // used as a savebuffer for the subtotal, s&h, and grand total values
UINT32 guiDropDownBorder;
UINT32 guiGoldArrowImages;
UINT32 guiPackageWeightImage;

BOOLEAN gfReDrawBobbyOrder = FALSE;

INT32 giGrandTotal;
UINT32 guiShippingCost;
UINT32 guiSubTotal;

UINT8 gubSelectedLight;

BOOLEAN gfDrawConfirmOrderGrpahic;
BOOLEAN gfDestroyConfirmGrphiArea;

BOOLEAN gfCanAcceptOrder;

UINT8 gubDropDownAction;
INT8 gbSelectedCity = -1; // keeps track of the currently selected city
UINT8 gubCityAtTopOfList;

BOOLEAN gfRemoveItemsFromStock = FALSE;

NewBobbyRayOrderStruct *gpNewBobbyrShipments;
INT32 giNumberOfNewBobbyRShipment;

//
// Buttons
//

// Clear Order Button
void BtnBobbyRClearOrderCallback(GUI_BUTTON *btn, INT32 reason);
UINT32 guiBobbyRClearOrder;
INT32 guiBobbyRClearOrderImage;

// Accept Order Button
void BtnBobbyRAcceptOrderCallback(GUI_BUTTON *btn, INT32 reason);
UINT32 guiBobbyRAcceptOrder;
INT32 guiBobbyRAcceptOrderImage;

// Back Button
void BtnBobbyRBackCallback(GUI_BUTTON *btn, INT32 reason);
UINT32 guiBobbyRBack;
INT32 guiBobbyRBackImage;

// Home Button
void BtnBobbyRHomeCallback(GUI_BUTTON *btn, INT32 reason);
UINT32 guiBobbyRHome;
INT32 guiBobbyRHomeImage;

// Goto Shipment Page Button
void BtnBobbyRGotoShipmentPageCallback(GUI_BUTTON *btn, INT32 reason);
UINT32 guiBobbyRGotoShipmentPage;
INT32 giBobbyRGotoShipmentPageImage;

// mouse region for the shipping speed selection area
MOUSE_REGION gSelectedShippingSpeedRegion[3];
void SelectShippingSpeedRegionCallBack(MOUSE_REGION *pRegion, INT32 iReason);

// mouse region for the confirm area
MOUSE_REGION gSelectedConfirmOrderRegion;
void SelectConfirmOrderRegionCallBack(MOUSE_REGION *pRegion, INT32 iReason);

// mouse region for the drop down city location area
MOUSE_REGION gSelectedDropDownRegion[BOBBYR_ORDER_NUM_SHIPPING_CITIES];
void SelectDropDownRegionCallBack(MOUSE_REGION *pRegion, INT32 iReason);
void SelectDropDownMovementCallBack(MOUSE_REGION *pRegion, INT32 iReason);

// mouse region for scroll area for the drop down city location area
MOUSE_REGION gSelectedScrollAreaDropDownRegion[BOBBYR_ORDER_NUM_SHIPPING_CITIES];
void SelectScrollAreaDropDownRegionCallBack(MOUSE_REGION *pRegion, INT32 iReason);
void SelectScrollAreaDropDownMovementCallBack(MOUSE_REGION *pRegion, INT32 iReason);

// mouse region to activate the shipping location drop down
MOUSE_REGION gSelectedActivateCityDroDownRegion;
void SelectActivateCityDroDownRegionCallBack(MOUSE_REGION *pRegion, INT32 iReason);

// mouse region to close the drop down menu
MOUSE_REGION gSelectedCloseDropDownRegion;
void SelectCloseDroDownRegionCallBack(MOUSE_REGION *pRegion, INT32 iReason);

// mouse region to click on the title to go to the home page
MOUSE_REGION gSelectedTitleLinkRegion;
void SelectTitleLinkRegionCallBack(MOUSE_REGION *pRegion, INT32 iReason);

// mouse region to click on the up or down arrow on the scroll area
MOUSE_REGION gSelectedUpDownArrowOnScrollAreaRegion[2];
void SelectUpDownArrowOnScrollAreaRegionCallBack(MOUSE_REGION *pRegion, INT32 iReason);

BOOLEAN DrawShippingSpeedLights(UINT8 ubSelectedLight);
BOOLEAN CreateDestroyBobbyRDropDown(UINT8 ubDropDownAction);
void DrawSelectedCity(UINT8 ubNumber);
void DisplayShippingLocationCity();
void DisplayShippingCosts(BOOLEAN fCalledFromOrderPage, INT32 iSubTotal, UINT16 usGridX, UINT16 usGridY, INT32 iOrderNum);
void RemovePurchasedItemsFromBobbyRayInventory();
BOOLEAN IsAnythingPurchasedFromBobbyRayPage();
void DrawGoldRectangle(INT8 bCityNum);
UINT32 CalcCostFromWeightOfPackage(UINT8 ubTypeOfService);
void ConfirmBobbyRPurchaseMessageBoxCallBack(UINT8 bExitValue);
void PurchaseBobbyOrder();
UINT32 CalcPackageTotalWeight();
void DisplayPackageWeight();
void ShutDownBobbyRNewMailOrders();
// ppp

void GameInitBobbyRMailOrder() {
  gubSelectedLight = 0;

  gpNewBobbyrShipments = NULL;
  giNumberOfNewBobbyRShipment = 0;
}

BOOLEAN EnterBobbyRMailOrder() {
  VOBJECT_DESC VObjectDesc;
  UINT16 i;

  gfReDrawBobbyOrder = FALSE;
  gfDrawConfirmOrderGrpahic = FALSE;
  gfDestroyConfirmGrphiArea = FALSE;
  gfCanAcceptOrder = TRUE;
  gubDropDownAction = BR_DROP_DOWN_NO_ACTION;

  // load the Order Grid graphic and add it
  VObjectDesc.fCreateFlags = VOBJECT_CREATE_FROMFILE;
  FilenameForBPP("LAPTOP\\BobbyOrderGrid.sti", VObjectDesc.ImageFile);
  CHECKF(AddVideoObject(&VObjectDesc, &guiBobbyROrderGrid));

  // load the Location graphic and add it
  VObjectDesc.fCreateFlags = VOBJECT_CREATE_FROMFILE;
  FilenameForBPP("LAPTOP\\BobbyLocationBox.sti", VObjectDesc.ImageFile);
  CHECKF(AddVideoObject(&VObjectDesc, &guiBobbyRLocationGraphic));

  // load the delivery speed graphic and add it
  VObjectDesc.fCreateFlags = VOBJECT_CREATE_FROMFILE;
  FilenameForBPP("LAPTOP\\BobbyDeliverySpeed.sti", VObjectDesc.ImageFile);
  CHECKF(AddVideoObject(&VObjectDesc, &guiDeliverySpeedGraphic));

  // load the delivery speed graphic and add it
  VObjectDesc.fCreateFlags = VOBJECT_CREATE_FROMFILE;
  GetMLGFilename(VObjectDesc.ImageFile, MLG_CONFIRMORDER);
  CHECKF(AddVideoObject(&VObjectDesc, &guiConfirmGraphic));

  // load the delivery speed graphic and add it
  VObjectDesc.fCreateFlags = VOBJECT_CREATE_FROMFILE;
  FilenameForBPP("LAPTOP\\TotalSaveArea.sti", VObjectDesc.ImageFile);
  CHECKF(AddVideoObject(&VObjectDesc, &guiTotalSaveArea));

  // border
  VObjectDesc.fCreateFlags = VOBJECT_CREATE_FROMFILE;
  FilenameForBPP("INTERFACE\\TactPopUp.sti", VObjectDesc.ImageFile);
  CHECKF(AddVideoObject(&VObjectDesc, &guiDropDownBorder));

  // Gold Arrow for the scroll area
  VObjectDesc.fCreateFlags = VOBJECT_CREATE_FROMFILE;
  FilenameForBPP("LAPTOP\\GoldArrows.sti", VObjectDesc.ImageFile);
  CHECKF(AddVideoObject(&VObjectDesc, &guiGoldArrowImages));

  // Package Weight Graphic
  VObjectDesc.fCreateFlags = VOBJECT_CREATE_FROMFILE;
  FilenameForBPP("LAPTOP\\PackageWeight.sti", VObjectDesc.ImageFile);
  CHECKF(AddVideoObject(&VObjectDesc, &guiPackageWeightImage));

  InitBobbyRWoodBackground();

  //
  // Init the button areas
  //

  // Clear Order button
  guiBobbyRClearOrderImage = LoadButtonImage("LAPTOP\\EraseOrderButton.sti", -1, 0, -1, 1, -1);
  guiBobbyRClearOrder = CreateIconAndTextButton(guiBobbyRClearOrderImage, BobbyROrderFormText[BOBBYR_CLEAR_ORDER], BOBBYR_ORDER_TITLE_TEXT_FONT, BOBBYR_GUNS_TEXT_COLOR_ON, BOBBYR_GUNS_SHADOW_COLOR, BOBBYR_GUNS_TEXT_COLOR_OFF, BOBBYR_GUNS_SHADOW_COLOR, TEXT_CJUSTIFIED, BOBBYR_CLEAR_ORDER_X, BOBBYR_CLEAR_ORDER_Y + 4, BUTTON_TOGGLE, MSYS_PRIORITY_HIGH, DEFAULT_MOVE_CALLBACK, BtnBobbyRClearOrderCallback);
  SetButtonCursor(guiBobbyRClearOrder, CURSOR_LAPTOP_SCREEN);
  SpecifyDisabledButtonStyle(guiBobbyRClearOrder, DISABLED_STYLE_NONE);
  SpecifyButtonTextOffsets(guiBobbyRClearOrder, 39, 10, TRUE);

  // Accept Order button
  guiBobbyRAcceptOrderImage = LoadButtonImage("LAPTOP\\AcceptOrderButton.sti", 2, 0, -1, 1, -1);
  guiBobbyRAcceptOrder = CreateIconAndTextButton(guiBobbyRAcceptOrderImage, BobbyROrderFormText[BOBBYR_ACCEPT_ORDER], BOBBYR_ORDER_TITLE_TEXT_FONT, BOBBYR_GUNS_TEXT_COLOR_ON, BOBBYR_GUNS_SHADOW_COLOR, BOBBYR_GUNS_TEXT_COLOR_OFF, BOBBYR_GUNS_SHADOW_COLOR, TEXT_CJUSTIFIED, BOBBYR_ACCEPT_ORDER_X, BOBBYR_ACCEPT_ORDER_Y + 4, BUTTON_TOGGLE, MSYS_PRIORITY_HIGH, DEFAULT_MOVE_CALLBACK, BtnBobbyRAcceptOrderCallback);
  SetButtonCursor(guiBobbyRAcceptOrder, CURSOR_LAPTOP_SCREEN);
  SpecifyButtonTextOffsets(guiBobbyRAcceptOrder, 43, 24, TRUE);

  SpecifyDisabledButtonStyle(guiBobbyRAcceptOrder, DISABLED_STYLE_SHADED);

  if (gbSelectedCity == -1)
    DisableButton(guiBobbyRAcceptOrder);

  // if there is anything to buy, dont disable the accept button
  //	if( !IsAnythingPurchasedFromBobbyRayPage() )
  {
    //		DisableButton( guiBobbyRAcceptOrder );
  }

  guiBobbyRBackImage = LoadButtonImage("LAPTOP\\CatalogueButton.sti", -1, 0, -1, 1, -1);
  guiBobbyRBack = CreateIconAndTextButton(guiBobbyRBackImage, BobbyROrderFormText[BOBBYR_BACK], BOBBYR_GUNS_BUTTON_FONT, BOBBYR_GUNS_TEXT_COLOR_ON, BOBBYR_GUNS_SHADOW_COLOR, BOBBYR_GUNS_TEXT_COLOR_OFF, BOBBYR_GUNS_SHADOW_COLOR, TEXT_CJUSTIFIED, BOBBYR_BACK_BUTTON_X, BOBBYR_BACK_BUTTON_Y, BUTTON_TOGGLE, MSYS_PRIORITY_HIGH, DEFAULT_MOVE_CALLBACK, BtnBobbyRBackCallback);
  SetButtonCursor(guiBobbyRBack, CURSOR_LAPTOP_SCREEN);

  guiBobbyRHomeImage = UseLoadedButtonImage(guiBobbyRBackImage, -1, 0, -1, 1, -1);
  guiBobbyRHome = CreateIconAndTextButton(guiBobbyRHomeImage, BobbyROrderFormText[BOBBYR_HOME], BOBBYR_GUNS_BUTTON_FONT, BOBBYR_GUNS_TEXT_COLOR_ON, BOBBYR_GUNS_SHADOW_COLOR, BOBBYR_GUNS_TEXT_COLOR_OFF, BOBBYR_GUNS_SHADOW_COLOR, TEXT_CJUSTIFIED, BOBBYR_HOME_BUTTON_X, BOBBYR_HOME_BUTTON_Y, BUTTON_TOGGLE, MSYS_PRIORITY_HIGH, DEFAULT_MOVE_CALLBACK, BtnBobbyRHomeCallback);
  SetButtonCursor(guiBobbyRHome, CURSOR_LAPTOP_SCREEN);

  giBobbyRGotoShipmentPageImage = UseLoadedButtonImage(guiBobbyRBackImage, -1, 0, -1, 1, -1);
  guiBobbyRGotoShipmentPage = CreateIconAndTextButton(giBobbyRGotoShipmentPageImage, BobbyROrderFormText[BOBBYR_GOTOSHIPMENT_PAGE], BOBBYR_GUNS_BUTTON_FONT, BOBBYR_GUNS_TEXT_COLOR_ON, BOBBYR_GUNS_SHADOW_COLOR, BOBBYR_GUNS_TEXT_COLOR_OFF, BOBBYR_GUNS_SHADOW_COLOR, TEXT_CJUSTIFIED, BOBBYR_SHIPMENT_BUTTON_X, BOBBYR_SHIPMENT_BUTTON_Y, BUTTON_TOGGLE, MSYS_PRIORITY_HIGH, DEFAULT_MOVE_CALLBACK, BtnBobbyRGotoShipmentPageCallback);
  SetButtonCursor(guiBobbyRGotoShipmentPage, CURSOR_LAPTOP_SCREEN);

  for (i = 0; i < 3; i++) {
    MSYS_DefineRegion(&gSelectedShippingSpeedRegion[i], gShippingSpeedAreas[i * 2], gShippingSpeedAreas[i * 2 + 1], (UINT16)(gShippingSpeedAreas[i * 2] + SHIPPING_SPEED_LIGHT_WIDTH), (UINT16)(gShippingSpeedAreas[i * 2 + 1] + SHIPPING_SPEED_LIGHT_HEIGHT), MSYS_PRIORITY_HIGH, CURSOR_WWW, MSYS_NO_CALLBACK, SelectShippingSpeedRegionCallBack);
    MSYS_AddRegion(&gSelectedShippingSpeedRegion[i]);
    MSYS_SetRegionUserData(&gSelectedShippingSpeedRegion[i], 0, i);
  }

  // confirmorder mouse region, occupies the entrie screen and is present only when the confirm order graphic
  // s on screen.  When user clicks anywhere the graphic disappears
  MSYS_DefineRegion(&gSelectedConfirmOrderRegion, LAPTOP_SCREEN_UL_X, LAPTOP_SCREEN_WEB_UL_Y, LAPTOP_SCREEN_LR_X, LAPTOP_SCREEN_WEB_LR_Y, MSYS_PRIORITY_HIGH + 1, CURSOR_WWW, MSYS_NO_CALLBACK, SelectConfirmOrderRegionCallBack);
  MSYS_AddRegion(&gSelectedConfirmOrderRegion);
  MSYS_DisableRegion(&gSelectedConfirmOrderRegion);

  // click on the shipping location to activate the drop down menu
  MSYS_DefineRegion(&gSelectedActivateCityDroDownRegion, BOBBYR_SHIPPING_LOC_AREA_L_X, BOBBYR_SHIPPING_LOC_AREA_T_Y, BOBBYR_SHIPPING_LOC_AREA_R_X, BOBBYR_SHIPPING_LOC_AREA_B_Y, MSYS_PRIORITY_HIGH, CURSOR_WWW, MSYS_NO_CALLBACK, SelectActivateCityDroDownRegionCallBack);
  MSYS_AddRegion(&gSelectedActivateCityDroDownRegion);

  // click anywhere on the screen to close the window( only when the drop down window is active)
  MSYS_DefineRegion(&gSelectedCloseDropDownRegion, LAPTOP_SCREEN_UL_X, LAPTOP_SCREEN_WEB_UL_Y, LAPTOP_SCREEN_LR_X, LAPTOP_SCREEN_WEB_LR_Y, MSYS_PRIORITY_HIGH - 1, CURSOR_LAPTOP_SCREEN, MSYS_NO_CALLBACK, SelectCloseDroDownRegionCallBack);
  MSYS_AddRegion(&gSelectedCloseDropDownRegion);
  MSYS_DisableRegion(&gSelectedCloseDropDownRegion);

  CreateBobbyRayOrderTitle();

  guiShippingCost = 0;

  gfRemoveItemsFromStock = FALSE;

  RenderBobbyRMailOrder();
  return TRUE;
}

void ExitBobbyRMailOrder() {
  UINT16 i;

  // if we are to remove the items from stock
  if (gfRemoveItemsFromStock) {
    // Remove the items for Boby Rqys Inventory
    RemovePurchasedItemsFromBobbyRayInventory();
  }

  DestroyBobbyROrderTitle();

  DeleteVideoObjectFromIndex(guiBobbyROrderGrid);
  DeleteVideoObjectFromIndex(guiBobbyRLocationGraphic);
  DeleteVideoObjectFromIndex(guiDeliverySpeedGraphic);
  DeleteVideoObjectFromIndex(guiConfirmGraphic);
  DeleteVideoObjectFromIndex(guiTotalSaveArea);
  DeleteVideoObjectFromIndex(guiDropDownBorder);
  DeleteVideoObjectFromIndex(guiGoldArrowImages);
  DeleteVideoObjectFromIndex(guiPackageWeightImage);

  UnloadButtonImage(guiBobbyRClearOrderImage);
  RemoveButton(guiBobbyRClearOrder);

  UnloadButtonImage(guiBobbyRAcceptOrderImage);
  RemoveButton(guiBobbyRAcceptOrder);

  UnloadButtonImage(guiBobbyRBackImage);
  RemoveButton(guiBobbyRBack);

  UnloadButtonImage(giBobbyRGotoShipmentPageImage);
  RemoveButton(guiBobbyRGotoShipmentPage);

  RemoveButton(guiBobbyRHome);
  UnloadButtonImage(guiBobbyRHomeImage);

  DeleteBobbyRWoodBackground();

  for (i = 0; i < 3; i++) {
    MSYS_RemoveRegion(&gSelectedShippingSpeedRegion[i]);
  }

  MSYS_RemoveRegion(&gSelectedConfirmOrderRegion);
  MSYS_RemoveRegion(&gSelectedActivateCityDroDownRegion);
  MSYS_RemoveRegion(&gSelectedCloseDropDownRegion);

  // if the drop down box is active, destroy it
  gubDropDownAction = BR_DROP_DOWN_DESTROY;
  CreateDestroyBobbyRDropDown(BR_DROP_DOWN_DESTROY);
}

void HandleBobbyRMailOrder() {
  if (gfReDrawBobbyOrder) {
    //		RenderBobbyRMailOrder();
    fPausedReDrawScreenFlag = TRUE;
    gfReDrawBobbyOrder = FALSE;
  }

  if (gfDrawConfirmOrderGrpahic) {
    HVOBJECT hPixHandle;

    // Bobbyray title
    GetVideoObject(&hPixHandle, guiConfirmGraphic);
    BltVideoObjectOutlineShadowFromIndex(FRAME_BUFFER, guiConfirmGraphic, 0, BOBBYR_CONFIRM_ORDER_X + 3, BOBBYR_CONFIRM_ORDER_Y + 3);

    BltVideoObject(FRAME_BUFFER, hPixHandle, 0, BOBBYR_CONFIRM_ORDER_X, BOBBYR_CONFIRM_ORDER_Y, VO_BLT_SRCTRANSPARENCY, NULL);
    InvalidateRegion(LAPTOP_SCREEN_UL_X, LAPTOP_SCREEN_WEB_UL_Y, LAPTOP_SCREEN_LR_X, LAPTOP_SCREEN_WEB_LR_Y);

    gfDrawConfirmOrderGrpahic = FALSE;
  }

  if (gfDestroyConfirmGrphiArea) {
    gfDestroyConfirmGrphiArea = FALSE;
    gfReDrawBobbyOrder = TRUE;
    MSYS_DisableRegion(&gSelectedConfirmOrderRegion);
    gfCanAcceptOrder = TRUE;
  }

  if (gubDropDownAction != BR_DROP_DOWN_NO_ACTION) {
    CreateDestroyBobbyRDropDown(gubDropDownAction);

    if (gubDropDownAction == BR_DROP_DOWN_CREATE)
      gubDropDownAction = BR_DROP_DOWN_DISPLAY;
    else
      gubDropDownAction = BR_DROP_DOWN_NO_ACTION;
  }
}

void RenderBobbyRMailOrder() {
  UINT16 usPosY;
  HVOBJECT hPixHandle;
  UINT16 usHeight; // usWidth,
  CHAR16 sTemp[128];

  DrawBobbyRWoodBackground();

  DrawBobbyROrderTitle();

  // Order Grid
  GetVideoObject(&hPixHandle, guiBobbyROrderGrid);
  BltVideoObject(FRAME_BUFFER, hPixHandle, 0, BOBBYR_ORDERGRID_X, BOBBYR_ORDERGRID_Y, VO_BLT_SRCTRANSPARENCY, NULL);

  // Location graphic
  GetVideoObject(&hPixHandle, guiBobbyRLocationGraphic);
  BltVideoObject(FRAME_BUFFER, hPixHandle, 0, BOBBYR_LOCATION_BOX_X, BOBBYR_LOCATION_BOX_Y, VO_BLT_SRCTRANSPARENCY, NULL);

  // DeliverySpeedGraphic
  GetVideoObject(&hPixHandle, guiDeliverySpeedGraphic);
  BltVideoObject(FRAME_BUFFER, hPixHandle, 0, BOBBYR_DELIVERYSPEED_X, BOBBYR_DELIVERYSPEED_Y, VO_BLT_SRCTRANSPARENCY, NULL);

  // Package Weight
  GetVideoObject(&hPixHandle, guiPackageWeightImage);
  BltVideoObject(FRAME_BUFFER, hPixHandle, 0, BOBBYR_PACKAXGE_WEIGHT_X, BOBBYR_PACKAXGE_WEIGHT_Y, VO_BLT_SRCTRANSPARENCY, NULL);

  //
  // Display the STATIC text
  //

  // Output the title
  DrawTextToScreen(BobbyROrderFormText[BOBBYR_ORDER_FORM], BOBBYR_ORDER_FORM_TITLE_X, BOBBYR_ORDER_FORM_TITLE_Y, BOBBYR_ORDER_FORM_TITLE_WIDTH, BOBBYR_ORDER_TITLE_TEXT_FONT, BOBBYR_ORDER_TITLE_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, CENTER_JUSTIFIED);

  /*
          //Output the qty
          DrawTextToScreen(BobbyROrderFormText[BOBBYR_QTY], BOBBYR_GRID_FIRST_COLUMN_X, BOBBYR_GRID_FIRST_COLUMN_Y-BOBBYR_GRID_TITLE_OFFSET, BOBBYR_GRID_FIRST_COLUMN_WIDTH, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, CENTER_JUSTIFIED);

          //Create a string for the weight ( %s ) ( where %s is the weight string, either kg or lbs )
          swprintf( sTemp, BobbyROrderFormText[BOBBYR_WEIGHT], GetWeightUnitString( ) );

          //Output the Weight
          DisplayWrappedString(BOBBYR_GRID_SECOND_COLUMN_X, BOBBYR_GRID_SECOND_COLUMN_Y-30, BOBBYR_GRID_SECOND_COLUMN_WIDTH, 2, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, sTemp, FONT_MCOLOR_BLACK, FALSE, CENTER_JUSTIFIED );

          //Output the name
          DrawTextToScreen(BobbyROrderFormText[BOBBYR_NAME], BOBBYR_GRID_THIRD_COLUMN_X, BOBBYR_GRID_THIRD_COLUMN_Y-BOBBYR_GRID_TITLE_OFFSET, BOBBYR_GRID_THIRD_COLUMN_WIDTH, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, CENTER_JUSTIFIED);

          //Output the unit price
          DisplayWrappedString(BOBBYR_GRID_FOURTH_COLUMN_X, BOBBYR_GRID_FOURTH_COLUMN_Y-30, BOBBYR_GRID_FOURTH_COLUMN_WIDTH, 2, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, BobbyROrderFormText[BOBBYR_UNIT_PRICE], FONT_MCOLOR_BLACK, FALSE, CENTER_JUSTIFIED);

          //Output the total
          DrawTextToScreen(BobbyROrderFormText[BOBBYR_TOTAL], BOBBYR_GRID_FIFTH_COLUMN_X, BOBBYR_GRID_FIFTH_COLUMN_Y-BOBBYR_GRID_TITLE_OFFSET, BOBBYR_GRID_FIFTH_COLUMN_WIDTH, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, CENTER_JUSTIFIED);

          //Output the sub total, shipping and handling, and the grand total
          DrawTextToScreen(BobbyROrderFormText[BOBBYR_SUB_TOTAL], BOBBYR_SUBTOTAL_X, BOBBYR_SUBTOTAL_Y, BOBBYR_SUBTOTAL_WIDTH, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, RIGHT_JUSTIFIED);
          DrawTextToScreen(BobbyROrderFormText[BOBBYR_S_H], BOBBYR_SUBTOTAL_X, BOBBYR_SHIPPING_N_HANDLE_Y, BOBBYR_SUBTOTAL_WIDTH, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, RIGHT_JUSTIFIED);
          DrawTextToScreen(BobbyROrderFormText[BOBBYR_GRAND_TOTAL], BOBBYR_SUBTOTAL_X, BOBBYR_GRAND_TOTAL_Y, BOBBYR_SUBTOTAL_WIDTH, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, RIGHT_JUSTIFIED);
  */

  // Output the shipping location
  DrawTextToScreen(BobbyROrderFormText[BOBBYR_SHIPPING_LOCATION], BOBBYR_SHIPPING_LOCATION_TEXT_X, BOBBYR_SHIPPING_LOCATION_TEXT_Y, 0, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, LEFT_JUSTIFIED);

  // Output the shiupping speed
  DrawTextToScreen(BobbyROrderFormText[BOBBYR_SHIPPING_SPEED], BOBBYR_SHIPPING_SPEED_X, BOBBYR_SHIPPING_SPEED_Y, 0, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, LEFT_JUSTIFIED);

  // Create a string for the weight ( %s ) ( where %s is the weight string, either kg or lbs )
  swprintf(sTemp, BobbyROrderFormText[BOBBYR_COST], GetWeightUnitString());

  // Output the cost
  DrawTextToScreen(sTemp, BOBBYR_SHIPPING_COST_X, BOBBYR_SHIPPING_SPEED_Y, 0, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, LEFT_JUSTIFIED);

  // Output the overnight, business days, standard service
  usPosY = BOBBYR_OVERNIGHT_EXPRESS_Y;
  DrawTextToScreen(BobbyROrderFormText[BOBBYR_OVERNIGHT_EXPRESS], BOBBYR_SHIPPING_SPEED_X, usPosY, 0, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, LEFT_JUSTIFIED);
  usPosY += BOBBYR_GRID_ROW_OFFSET;
  DrawTextToScreen(BobbyROrderFormText[BOBBYR_BUSINESS_DAYS], BOBBYR_SHIPPING_SPEED_X, usPosY, 0, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, LEFT_JUSTIFIED);
  usPosY += BOBBYR_GRID_ROW_OFFSET;
  DrawTextToScreen(BobbyROrderFormText[BOBBYR_STANDARD_SERVICE], BOBBYR_SHIPPING_SPEED_X, usPosY, 0, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, LEFT_JUSTIFIED);

  //	DisplayPurchasedItems();
  DisplayPurchasedItems(TRUE, BOBBYR_ORDERGRID_X, BOBBYR_ORDERGRID_Y, BobbyRayPurchases, FALSE, -1);

  DrawShippingSpeedLights(gubSelectedLight);

  DisplayShippingLocationCity();

  // Display the 'used' text at the bottom of the screen
  DrawTextToScreen(BobbyROrderFormText[BOBBYR_USED_TEXT], BOBBYR_USED_WARNING_X, BOBBYR_USED_WARNING_Y + 1, 0, BOBBYR_DISCLAIMER_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, LEFT_JUSTIFIED | TEXT_SHADOWED);

  // Display the minimum weight disclaimer at the bottom of the page
  usHeight = GetFontHeight(BOBBYR_DISCLAIMER_FONT) + 2;
  swprintf(sTemp, L"%s %2.1f %s.", BobbyROrderFormText[BOBBYR_MINIMUM_WEIGHT], GetWeightBasedOnMetricOption(MIN_SHIPPING_WEIGHT) / 10.0, GetWeightUnitString());
  DrawTextToScreen(sTemp, BOBBYR_USED_WARNING_X, (UINT16)(BOBBYR_USED_WARNING_Y + usHeight + 1), 0, BOBBYR_DISCLAIMER_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, LEFT_JUSTIFIED | TEXT_SHADOWED);

  // Calculate and display the total package weight
  DisplayPackageWeight();

  MarkButtonsDirty();
  RenderWWWProgramTitleBar();
  InvalidateRegion(LAPTOP_SCREEN_UL_X, LAPTOP_SCREEN_WEB_UL_Y, LAPTOP_SCREEN_LR_X, LAPTOP_SCREEN_WEB_LR_Y);
}

void BtnBobbyRClearOrderCallback(GUI_BUTTON *btn, INT32 reason) {
  if (reason & MSYS_CALLBACK_REASON_LBUTTON_DWN) {
    btn->uiFlags |= BUTTON_CLICKED_ON;
    InvalidateRegion(btn->Area.RegionTopLeftX, btn->Area.RegionTopLeftY, btn->Area.RegionBottomRightX, btn->Area.RegionBottomRightY);
  }
  if (reason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    btn->uiFlags &= (~BUTTON_CLICKED_ON);

    memset(&BobbyRayPurchases, 0, sizeof(BobbyRayPurchaseStruct) * MAX_PURCHASE_AMOUNT);
    gubSelectedLight = 0;
    gfReDrawBobbyOrder = TRUE;
    gbSelectedCity = -1;
    gubCityAtTopOfList = 0;

    // Get rid of the city drop dowm, if it is being displayed
    gubDropDownAction = BR_DROP_DOWN_DESTROY;

    // disable the accept order button
    DisableButton(guiBobbyRAcceptOrder);

    InvalidateRegion(btn->Area.RegionTopLeftX, btn->Area.RegionTopLeftY, btn->Area.RegionBottomRightX, btn->Area.RegionBottomRightY);
  }
  if (reason & MSYS_CALLBACK_REASON_LOST_MOUSE) {
    btn->uiFlags &= (~BUTTON_CLICKED_ON);
    InvalidateRegion(btn->Area.RegionTopLeftX, btn->Area.RegionTopLeftY, btn->Area.RegionBottomRightX, btn->Area.RegionBottomRightY);
  }
}

void BtnBobbyRAcceptOrderCallback(GUI_BUTTON *btn, INT32 reason) {
  if (reason & MSYS_CALLBACK_REASON_LBUTTON_DWN) {
    btn->uiFlags |= BUTTON_CLICKED_ON;
    InvalidateRegion(btn->Area.RegionTopLeftX, btn->Area.RegionTopLeftY, btn->Area.RegionBottomRightX, btn->Area.RegionBottomRightY);
  }
  if (reason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    btn->uiFlags &= (~BUTTON_CLICKED_ON);

    if (guiSubTotal && gfCanAcceptOrder) {
      // if the player doesnt have enough money
      if (LaptopSaveInfo.iCurrentBalance < giGrandTotal) {
        DoLapTopMessageBox(MSG_BOX_LAPTOP_DEFAULT, BobbyROrderFormText[BOBBYR_CANT_AFFORD_PURCHASE], LAPTOP_SCREEN, MSG_BOX_FLAG_OK, NULL);
      } else {
        wchar_t zTemp[128];

        // if the city is Drassen, and the airport sector is player controlled
        if (gbSelectedCity == BR_DRASSEN && !StrategicMap[SECTOR_INFO_TO_STRATEGIC_INDEX(SEC_B13)].fEnemyControlled) {
          // Quick hack to bypass the confirmation box
          ConfirmBobbyRPurchaseMessageBoxCallBack(MSG_BOX_RETURN_YES);
        } else {
          // else pop up a confirmation box
          swprintf(zTemp, BobbyROrderFormText[BOBBYR_CONFIRM_DEST], *BobbyROrderLocations[gbSelectedCity].psCityLoc);
          DoLapTopMessageBox(MSG_BOX_LAPTOP_DEFAULT, zTemp, LAPTOP_SCREEN, MSG_BOX_FLAG_YESNO, ConfirmBobbyRPurchaseMessageBoxCallBack);
        }

        /*				//if the shipment is going to Drassen, add the inventory
                                        if( gbSelectedCity == BR_DRASSEN )
                                        {
        //					BobbyRayOrderStruct *pBobbyRayPurchase;
        //					UINT32	uiResetTimeSec;
                                                UINT8	i, ubCount;
                                                UINT8	cnt;
                                                INT8		bDaysAhead;

                                                //if we need to add more array elements for the Order Array
                                                if( LaptopSaveInfo.usNumberOfBobbyRayOrderItems <= LaptopSaveInfo.usNumberOfBobbyRayOrderUsed )
                                                {
                                                        LaptopSaveInfo.usNumberOfBobbyRayOrderItems++;
                                                        LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray = MemRealloc( LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray, sizeof( BobbyRayOrderStruct ) * LaptopSaveInfo.usNumberOfBobbyRayOrderItems );
                                                        if( LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray == NULL )
                                                                return;

                                                        memset( &LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray[ LaptopSaveInfo.usNumberOfBobbyRayOrderItems - 1 ], 0, sizeof( BobbyRayOrderStruct ) );
                                                }

                                                for( cnt =0; cnt< LaptopSaveInfo.usNumberOfBobbyRayOrderItems; cnt++ )
                                                {
                                                        //get an empty element in the array
                                                        if( !LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray[ cnt ].fActive )
                                                                break;
                                                }

                                                //gets reset when the confirm order graphic disappears
                                                gfCanAcceptOrder = FALSE;

        //					pBobbyRayPurchase = MemAlloc( sizeof( BobbyRayOrderStruct ) );
        //					memset(pBobbyRayPurchase, 0, sizeof( BobbyRayOrderStruct ) );


                                                ubCount = 0;
                                                for(i=0; i<MAX_PURCHASE_AMOUNT; i++)
                                                {
                                                        //if the item was purchased
                                                        if( BobbyRayPurchases[ i ].ubNumberPurchased )
                                                        {
                                                                //copy the purchases into the struct that will be added to the queue
                                                                memcpy(&LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray[ cnt ].BobbyRayPurchase[ ubCount ] , &BobbyRayPurchases[i],  sizeof(BobbyRayPurchaseStruct));
                                                                ubCount ++;
                                                        }
                                                }

                                                LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray[ cnt ].ubNumberPurchases = ubCount;
                                                LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray[ cnt ].fActive = TRUE;
                                                LaptopSaveInfo.usNumberOfBobbyRayOrderUsed++;

                                                //get the length of time to receive the shipment
                                                if( gubSelectedLight == 0 )
                                                {
                                                        bDaysAhead = OVERNIGHT_EXPRESS;
                                                        //uiResetTimeSec = GetMidnightOfFutureDayInMinutes( OVERNIGHT_EXPRESS );
                                                }
                                                else if( gubSelectedLight == 1 )
                                                {
                                                        bDaysAhead = TWO_BUSINESS_DAYS;
                                                        //uiResetTimeSec = GetMidnightOfFutureDayInMinutes( TWO_BUSINESS_DAYS );
                                                }
                                                else if( gubSelectedLight == 2 )
                                                {
                                                        bDaysAhead = STANDARD_SERVICE;
                                                        //uiResetTimeSec = GetMidnightOfFutureDayInMinutes( STANDARD_SERVICE );
                                                }
                                                else
                                                {
                                                        bDaysAhead = 0;
                                                        //uiResetTimeSec = 0;
                                                }

                                                if (gMercProfiles[99].bLife == 0)
                                                {
                                                        // Sal is dead, so Pablo is dead, so the airport is badly run
                                                        bDaysAhead += (UINT8) Random( 5 ) + 1;
                                                }

                                                //add a random amount between so it arrives between 8:00 am and noon
                                                //uiResetTimeSec += (8 + Random(4) ) * 60;

                                                //AddStrategicEvent( EVENT_BOBBYRAY_PURCHASE, uiResetTimeSec, cnt);
                                                AddFutureDayStrategicEvent( EVENT_BOBBYRAY_PURCHASE, (8 + Random(4) ) * 60, cnt, bDaysAhead );

                                        }

                                        //Add the transaction to the finance page
                                        AddTransactionToPlayersBook(BOBBYR_PURCHASE, 0, GetWorldTotalMin(), -giGrandTotal);

                                        //display the confirm order graphic
                                        gfDrawConfirmOrderGrpahic = TRUE;

                                        //Get rid of the city drop dowm, if it is being displayed
                                        gubDropDownAction = BR_DROP_DOWN_DESTROY;

                                        MSYS_EnableRegion(&gSelectedConfirmOrderRegion);
        */
      }
    }

    InvalidateRegion(btn->Area.RegionTopLeftX, btn->Area.RegionTopLeftY, btn->Area.RegionBottomRightX, btn->Area.RegionBottomRightY);
  }
  if (reason & MSYS_CALLBACK_REASON_LOST_MOUSE) {
    btn->uiFlags &= (~BUTTON_CLICKED_ON);
    InvalidateRegion(btn->Area.RegionTopLeftX, btn->Area.RegionTopLeftY, btn->Area.RegionBottomRightX, btn->Area.RegionBottomRightY);
  }
}

void DisplayPurchasedItems(BOOLEAN fCalledFromOrderPage, UINT16 usGridX, UINT16 usGridY, BobbyRayPurchaseStruct *pBobbyRayPurchase, BOOLEAN fJustDisplayTitles, INT32 iOrderNum) {
  UINT16 i, j;
  wchar_t sText[400];
  wchar_t sBack[400];
  wchar_t sTemp[20];
  UINT16 usPosY;
  UINT32 uiStartLoc = 0;
  UINT32 uiTotal;
  UINT16 usStringLength;
  UINT16 usPixLength;
  wchar_t OneChar[2];
  INT32 iGrandTotal;
  INT32 iSubTotal;

  // Output the qty
  DrawTextToScreen(BobbyROrderFormText[BOBBYR_QTY], (UINT16)(usGridX + BOBBYR_GRID_FIRST_COLUMN_X), (UINT16)(usGridY + BOBBYR_GRID_FIRST_COLUMN_Y - BOBBYR_GRID_TITLE_OFFSET), BOBBYR_GRID_FIRST_COLUMN_WIDTH, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, CENTER_JUSTIFIED);

  // Create a string for the weight ( %s ) ( where %s is the weight string, either kg or lbs )
  swprintf(sTemp, BobbyROrderFormText[BOBBYR_WEIGHT], GetWeightUnitString());

  // Output the Weight
  DisplayWrappedString((UINT16)(usGridX + BOBBYR_GRID_SECOND_COLUMN_X), (UINT16)(usGridY + BOBBYR_GRID_SECOND_COLUMN_Y - 30), BOBBYR_GRID_SECOND_COLUMN_WIDTH, 2, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, sTemp, FONT_MCOLOR_BLACK, FALSE, CENTER_JUSTIFIED);

  // Output the name
  DrawTextToScreen(BobbyROrderFormText[BOBBYR_NAME], (UINT16)(usGridX + BOBBYR_GRID_THIRD_COLUMN_X), (UINT16)(usGridY + BOBBYR_GRID_THIRD_COLUMN_Y - BOBBYR_GRID_TITLE_OFFSET), BOBBYR_GRID_THIRD_COLUMN_WIDTH, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, CENTER_JUSTIFIED);

  // Output the unit price
  DisplayWrappedString((UINT16)(usGridX + BOBBYR_GRID_FOURTH_COLUMN_X), (UINT16)(usGridY + BOBBYR_GRID_FOURTH_COLUMN_Y - 30), BOBBYR_GRID_FOURTH_COLUMN_WIDTH, 2, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, BobbyROrderFormText[BOBBYR_UNIT_PRICE], FONT_MCOLOR_BLACK, FALSE, CENTER_JUSTIFIED);

  // Output the total
  DrawTextToScreen(BobbyROrderFormText[BOBBYR_TOTAL], (UINT16)(usGridX + BOBBYR_GRID_FIFTH_COLUMN_X), (UINT16)(usGridY + BOBBYR_GRID_FIFTH_COLUMN_Y - BOBBYR_GRID_TITLE_OFFSET), BOBBYR_GRID_FIFTH_COLUMN_WIDTH, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, CENTER_JUSTIFIED);

  // Output the sub total, shipping and handling, and the grand total
  DrawTextToScreen(BobbyROrderFormText[BOBBYR_SUB_TOTAL], (UINT16)(usGridX + BOBBYR_SUBTOTAL_X), (UINT16)(usGridY + BOBBYR_SUBTOTAL_Y), BOBBYR_SUBTOTAL_WIDTH, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, RIGHT_JUSTIFIED);
  DrawTextToScreen(BobbyROrderFormText[BOBBYR_S_H], (UINT16)(usGridX + BOBBYR_SUBTOTAL_X), (UINT16)(usGridY + BOBBYR_SHIPPING_N_HANDLE_Y), BOBBYR_SUBTOTAL_WIDTH, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, RIGHT_JUSTIFIED);
  DrawTextToScreen(BobbyROrderFormText[BOBBYR_GRAND_TOTAL], (UINT16)(usGridX + BOBBYR_SUBTOTAL_X), (UINT16)(usGridY + BOBBYR_GRAND_TOTAL_Y), BOBBYR_SUBTOTAL_WIDTH, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, RIGHT_JUSTIFIED);

  if (fJustDisplayTitles) {
    return;
  }

  if (fCalledFromOrderPage) {
    guiSubTotal = 0;
    giGrandTotal = 0;
  } else {
    iSubTotal = 0;
    iGrandTotal = 0;
  }

  if (pBobbyRayPurchase == NULL) {
    return;
  }

  // loop through the array of purchases to display only the items that are purchased
  usPosY = usGridY + BOBBYR_GRID_FIRST_COLUMN_Y + 4;
  for (i = 0; i < MAX_PURCHASE_AMOUNT; i++) {
    // if the item was purchased
    //		if( BobbyRayPurchases[ i ].ubNumberPurchased )
    if (pBobbyRayPurchase[i].ubNumberPurchased) {
      uiTotal = 0;

      // Display the qty, order#, item name, unit price and the total

      // qty
      swprintf(sTemp, L"%3d", pBobbyRayPurchase[i].ubNumberPurchased);
      DrawTextToScreen(sTemp, (UINT16)(usGridX + BOBBYR_GRID_FIRST_COLUMN_X - 2), usPosY, BOBBYR_GRID_FIRST_COLUMN_WIDTH, BOBBYR_ORDER_DYNAMIC_TEXT_FONT, BOBBYR_ORDER_DYNAMIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, RIGHT_JUSTIFIED);

      // weight
      swprintf(sTemp, L"%3.1f", GetWeightBasedOnMetricOption(Item[pBobbyRayPurchase[i].usItemIndex].ubWeight) / (FLOAT)(10.0) * pBobbyRayPurchase[i].ubNumberPurchased);
      DrawTextToScreen(sTemp, (UINT16)(usGridX + BOBBYR_GRID_SECOND_COLUMN_X - 2), usPosY, BOBBYR_GRID_SECOND_COLUMN_WIDTH, BOBBYR_ORDER_DYNAMIC_TEXT_FONT, BOBBYR_ORDER_DYNAMIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, RIGHT_JUSTIFIED);

      // Display Items Name
      if (pBobbyRayPurchase[i].fUsed) {
        uiStartLoc = BOBBYR_ITEM_DESC_FILE_SIZE * LaptopSaveInfo.BobbyRayUsedInventory[pBobbyRayPurchase[i].usBobbyItemIndex].usItemIndex;
      } else {
        uiStartLoc = BOBBYR_ITEM_DESC_FILE_SIZE * LaptopSaveInfo.BobbyRayInventory[pBobbyRayPurchase[i].usBobbyItemIndex].usItemIndex;
      }

      if (pBobbyRayPurchase[i].fUsed) {
        LoadEncryptedDataFromFile(BOBBYRDESCFILE, sBack, uiStartLoc, BOBBYR_ITEM_DESC_NAME_SIZE);
        swprintf(sText, L"%s %s", "*", sBack);
      } else
        LoadEncryptedDataFromFile(BOBBYRDESCFILE, sText, uiStartLoc, BOBBYR_ITEM_DESC_NAME_SIZE);

      // if the name is bigger then can fit into the slot, reduce the size
      if (StringPixLength(sText, BOBBYR_ORDER_DYNAMIC_TEXT_FONT) > BOBBYR_GRID_THIRD_COLUMN_WIDTH - 4) {
        usStringLength = wcslen(sText);
        usPixLength = 0;
        OneChar[1] = L'\0';
        for (j = 0; (i < usStringLength) && (usPixLength < BOBBYR_GRID_THIRD_COLUMN_WIDTH - 16); j++) {
          sBack[j] = sText[j];
          OneChar[0] = sBack[j];
          usPixLength += StringPixLength(OneChar, BOBBYR_ORDER_DYNAMIC_TEXT_FONT);
        }
        sBack[j] = 0;
        swprintf(sText, L"%s...", sBack);
      }

      DrawTextToScreen(sText, (UINT16)(usGridX + BOBBYR_GRID_THIRD_COLUMN_X + 2), usPosY, BOBBYR_GRID_THIRD_COLUMN_WIDTH, BOBBYR_ORDER_DYNAMIC_TEXT_FONT, BOBBYR_ORDER_DYNAMIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, LEFT_JUSTIFIED);

      // unit price
      swprintf(sTemp, L"%d", CalcBobbyRayCost(pBobbyRayPurchase[i].usItemIndex, pBobbyRayPurchase[i].usBobbyItemIndex, pBobbyRayPurchase[i].fUsed));
      InsertCommasForDollarFigure(sTemp);
      InsertDollarSignInToString(sTemp);

      DrawTextToScreen(sTemp, (UINT16)(usGridX + BOBBYR_GRID_FOURTH_COLUMN_X - 2), usPosY, BOBBYR_GRID_FOURTH_COLUMN_WIDTH, BOBBYR_ORDER_DYNAMIC_TEXT_FONT, BOBBYR_ORDER_DYNAMIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, RIGHT_JUSTIFIED);

      uiTotal += CalcBobbyRayCost(pBobbyRayPurchase[i].usItemIndex, pBobbyRayPurchase[i].usBobbyItemIndex, pBobbyRayPurchase[i].fUsed) * pBobbyRayPurchase[i].ubNumberPurchased;

      swprintf(sTemp, L"%d", uiTotal);
      InsertCommasForDollarFigure(sTemp);
      InsertDollarSignInToString(sTemp);

      DrawTextToScreen(sTemp, (UINT16)(usGridX + BOBBYR_GRID_FIFTH_COLUMN_X - 2), usPosY, BOBBYR_GRID_FIFTH_COLUMN_WIDTH, BOBBYR_ORDER_DYNAMIC_TEXT_FONT, BOBBYR_ORDER_DYNAMIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, RIGHT_JUSTIFIED);

      // add the current item total to the sub total
      if (fCalledFromOrderPage) {
        guiSubTotal += uiTotal;
      } else {
        iSubTotal += uiTotal;
      }

      usPosY += BOBBYR_GRID_ROW_OFFSET;
    }
  }

  DisplayShippingCosts(fCalledFromOrderPage, iSubTotal, usGridX, usGridY, iOrderNum);
}

void DisplayShippingCosts(BOOLEAN fCalledFromOrderPage, INT32 iSubTotal, UINT16 usGridX, UINT16 usGridY, INT32 iOrderNum) {
  wchar_t sTemp[20];
  HVOBJECT hPixHandle;
  INT32 iShippingCost = 0;
  //	INT32 iTotal;

  if (fCalledFromOrderPage) {
    iSubTotal = guiSubTotal;
    //		iTotal = giGrandTotal;

    if (gubSelectedLight == 0)
      guiShippingCost = CalcCostFromWeightOfPackage(0);
    else if (gubSelectedLight == 1)
      guiShippingCost = CalcCostFromWeightOfPackage(1);
    else if (gubSelectedLight == 2)
      guiShippingCost = CalcCostFromWeightOfPackage(2);

    iShippingCost = guiShippingCost;
  } else {
    UINT16 usStandardCost;

    switch (gpNewBobbyrShipments[iOrderNum].ubDeliveryMethod) {
      case 0:
        usStandardCost = BobbyROrderLocations[gpNewBobbyrShipments[iOrderNum].ubDeliveryLoc].usOverNightExpress;
        break;
      case 1:
        usStandardCost = BobbyROrderLocations[gpNewBobbyrShipments[iOrderNum].ubDeliveryLoc].us2DaysService;
        break;
      case 2:
        usStandardCost = BobbyROrderLocations[gpNewBobbyrShipments[iOrderNum].ubDeliveryLoc].usStandardService;
        break;

      default:
        usStandardCost = 0;
    }

    iShippingCost = (INT32)((gpNewBobbyrShipments[iOrderNum].uiPackageWeight / (FLOAT)10) * usStandardCost + .5);
  }

  // erase the old area
  // bli the total Saved area onto the grid
  if (fCalledFromOrderPage) {
    GetVideoObject(&hPixHandle, guiTotalSaveArea);
    BltVideoObject(FRAME_BUFFER, hPixHandle, 0, BOBBYR_TOTAL_SAVED_AREA_X, BOBBYR_TOTAL_SAVED_AREA_Y, VO_BLT_SRCTRANSPARENCY, NULL);
  }

  // if there is a shipment, display the s&h charge
  if (iSubTotal) {
    // Display the subtotal
    swprintf(sTemp, L"%d", iSubTotal);
    InsertCommasForDollarFigure(sTemp);
    InsertDollarSignInToString(sTemp);

    DrawTextToScreen(sTemp, (UINT16)(usGridX + BOBBYR_GRID_FIFTH_COLUMN_X - 2), (UINT16)(usGridY + BOBBYR_SUBTOTAL_Y), BOBBYR_GRID_FIFTH_COLUMN_WIDTH, BOBBYR_ORDER_DYNAMIC_TEXT_FONT, BOBBYR_ORDER_DYNAMIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, RIGHT_JUSTIFIED);

    // Display the shipping and handling charge
    swprintf(sTemp, L"%d", iShippingCost);
    InsertCommasForDollarFigure(sTemp);
    InsertDollarSignInToString(sTemp);

    DrawTextToScreen(sTemp, (UINT16)(usGridX + BOBBYR_GRID_FIFTH_COLUMN_X - 2), (UINT16)(usGridY + BOBBYR_SHIPPING_N_HANDLE_Y), BOBBYR_GRID_FIFTH_COLUMN_WIDTH, BOBBYR_ORDER_DYNAMIC_TEXT_FONT, BOBBYR_ORDER_DYNAMIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, RIGHT_JUSTIFIED);

    // Display the grand total
    giGrandTotal = iSubTotal + iShippingCost;
    swprintf(sTemp, L"%d", giGrandTotal);
    InsertCommasForDollarFigure(sTemp);
    InsertDollarSignInToString(sTemp);

    DrawTextToScreen(sTemp, (UINT16)(usGridX + BOBBYR_GRID_FIFTH_COLUMN_X - 2), (UINT16)(usGridY + BOBBYR_GRAND_TOTAL_Y), BOBBYR_GRID_FIFTH_COLUMN_WIDTH, BOBBYR_ORDER_DYNAMIC_TEXT_FONT, BOBBYR_ORDER_DYNAMIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, RIGHT_JUSTIFIED);
  }

  InvalidateRegion(333, 326, 374, 400);
}

void BtnBobbyRBackCallback(GUI_BUTTON *btn, INT32 reason) {
  if (reason & MSYS_CALLBACK_REASON_LBUTTON_DWN) {
    btn->uiFlags |= BUTTON_CLICKED_ON;
    InvalidateRegion(btn->Area.RegionTopLeftX, btn->Area.RegionTopLeftY, btn->Area.RegionBottomRightX, btn->Area.RegionBottomRightY);
  }
  if (reason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    btn->uiFlags &= (~BUTTON_CLICKED_ON);
    guiCurrentLaptopMode = guiLastBobbyRayPage;
    InvalidateRegion(btn->Area.RegionTopLeftX, btn->Area.RegionTopLeftY, btn->Area.RegionBottomRightX, btn->Area.RegionBottomRightY);
  }
  if (reason & MSYS_CALLBACK_REASON_LOST_MOUSE) {
    btn->uiFlags &= (~BUTTON_CLICKED_ON);
    InvalidateRegion(btn->Area.RegionTopLeftX, btn->Area.RegionTopLeftY, btn->Area.RegionBottomRightX, btn->Area.RegionBottomRightY);
  }
}

void BtnBobbyRHomeCallback(GUI_BUTTON *btn, INT32 reason) {
  if (reason & MSYS_CALLBACK_REASON_LBUTTON_DWN) {
    btn->uiFlags |= BUTTON_CLICKED_ON;
    InvalidateRegion(btn->Area.RegionTopLeftX, btn->Area.RegionTopLeftY, btn->Area.RegionBottomRightX, btn->Area.RegionBottomRightY);
  }
  if (reason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    btn->uiFlags &= (~BUTTON_CLICKED_ON);
    guiCurrentLaptopMode = LAPTOP_MODE_BOBBY_R;
    InvalidateRegion(btn->Area.RegionTopLeftX, btn->Area.RegionTopLeftY, btn->Area.RegionBottomRightX, btn->Area.RegionBottomRightY);
  }
  if (reason & MSYS_CALLBACK_REASON_LOST_MOUSE) {
    btn->uiFlags &= (~BUTTON_CLICKED_ON);
    InvalidateRegion(btn->Area.RegionTopLeftX, btn->Area.RegionTopLeftY, btn->Area.RegionBottomRightX, btn->Area.RegionBottomRightY);
  }
}

void SelectShippingSpeedRegionCallBack(MOUSE_REGION *pRegion, INT32 iReason) {
  if (iReason & MSYS_CALLBACK_REASON_INIT) {
  } else if (iReason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    gubSelectedLight = (UINT8)MSYS_GetRegionUserData(pRegion, 0);
    DrawShippingSpeedLights(gubSelectedLight);
    DisplayShippingCosts(TRUE, 0, BOBBYR_ORDERGRID_X, BOBBYR_ORDERGRID_Y, -1);
  }
}

BOOLEAN DrawShippingSpeedLights(UINT8 ubSelected) {
  if (ubSelected == 0)
    ColorFillVideoSurfaceArea(FRAME_BUFFER, gShippingSpeedAreas[0], gShippingSpeedAreas[1], gShippingSpeedAreas[0] + SHIPPING_SPEED_LIGHT_WIDTH, gShippingSpeedAreas[1] + SHIPPING_SPEED_LIGHT_HEIGHT, Get16BPPColor(FROMRGB(0, 255, 0)));
  else
    ColorFillVideoSurfaceArea(FRAME_BUFFER, gShippingSpeedAreas[0], gShippingSpeedAreas[1], gShippingSpeedAreas[0] + SHIPPING_SPEED_LIGHT_WIDTH, gShippingSpeedAreas[1] + SHIPPING_SPEED_LIGHT_HEIGHT, Get16BPPColor(FROMRGB(0, 0, 0)));

  if (ubSelected == 1)
    ColorFillVideoSurfaceArea(FRAME_BUFFER, gShippingSpeedAreas[2], gShippingSpeedAreas[3], gShippingSpeedAreas[2] + SHIPPING_SPEED_LIGHT_WIDTH, gShippingSpeedAreas[3] + SHIPPING_SPEED_LIGHT_HEIGHT, Get16BPPColor(FROMRGB(0, 255, 0)));
  else
    ColorFillVideoSurfaceArea(FRAME_BUFFER, gShippingSpeedAreas[2], gShippingSpeedAreas[3], gShippingSpeedAreas[2] + SHIPPING_SPEED_LIGHT_WIDTH, gShippingSpeedAreas[3] + SHIPPING_SPEED_LIGHT_HEIGHT, Get16BPPColor(FROMRGB(0, 0, 0)));

  if (ubSelected == 2)
    ColorFillVideoSurfaceArea(FRAME_BUFFER, gShippingSpeedAreas[4], gShippingSpeedAreas[5], gShippingSpeedAreas[4] + SHIPPING_SPEED_LIGHT_WIDTH, gShippingSpeedAreas[5] + SHIPPING_SPEED_LIGHT_HEIGHT, Get16BPPColor(FROMRGB(0, 255, 0)));
  else
    ColorFillVideoSurfaceArea(FRAME_BUFFER, gShippingSpeedAreas[4], gShippingSpeedAreas[5], gShippingSpeedAreas[4] + SHIPPING_SPEED_LIGHT_WIDTH, gShippingSpeedAreas[5] + SHIPPING_SPEED_LIGHT_HEIGHT, Get16BPPColor(FROMRGB(0, 0, 0)));

  InvalidateRegion(585, 218, 594, 287);
  return TRUE;
}

void SelectConfirmOrderRegionCallBack(MOUSE_REGION *pRegion, INT32 iReason) {
  if (iReason & MSYS_CALLBACK_REASON_INIT) {
  } else if (iReason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    // Remove the items for Boby Rqys Inventory
    RemovePurchasedItemsFromBobbyRayInventory();

    // delete the order
    memset(&BobbyRayPurchases, 0, sizeof(BobbyRayPurchaseStruct) * MAX_PURCHASE_AMOUNT);
    gubSelectedLight = 0;
    gfDestroyConfirmGrphiArea = TRUE;
    gubSelectedLight = 0;

    // Goto The homepage
    guiCurrentLaptopMode = LAPTOP_MODE_BOBBY_R;
  } else if (iReason & MSYS_CALLBACK_REASON_RBUTTON_UP) {
    // Remove the items for Boby Rqys Inventory
    RemovePurchasedItemsFromBobbyRayInventory();

    // delete the order
    memset(&BobbyRayPurchases, 0, sizeof(BobbyRayPurchaseStruct) * MAX_PURCHASE_AMOUNT);
    gubSelectedLight = 0;
    gfDestroyConfirmGrphiArea = TRUE;
    gubSelectedLight = 0;
  }
}

BOOLEAN CreateDestroyBobbyRDropDown(UINT8 ubDropDownAction) {
  static UINT16 usHeight;
  static BOOLEAN fMouseRegionsCreated = FALSE;

  switch (ubDropDownAction) {
    case BR_DROP_DOWN_NO_ACTION: {
    } break;

    case BR_DROP_DOWN_CREATE: {
      UINT8 i;
      UINT16 usPosX, usPosY, usHeight;
      UINT16 usTemp;
      UINT16 usFontHeight = GetFontHeight(BOBBYR_DROPDOWN_FONT);

      if (fMouseRegionsCreated) {
        gubDropDownAction = BR_DROP_DOWN_DESTROY;

        break;
      }
      fMouseRegionsCreated = TRUE;

      usPosX = BOBBYR_CITY_START_LOCATION_X;
      usPosY = BOBBYR_CITY_START_LOCATION_Y;
      for (i = 0; i < BOBBYR_NUM_DISPLAYED_CITIES; i++) {
        MSYS_DefineRegion(&gSelectedDropDownRegion[i], usPosX, (UINT16)(usPosY + 4), (UINT16)(usPosX + BOBBYR_DROP_DOWN_WIDTH - 6), (UINT16)(usPosY + usFontHeight + 7), MSYS_PRIORITY_HIGH, CURSOR_WWW, SelectDropDownMovementCallBack, SelectDropDownRegionCallBack);
        MSYS_AddRegion(&gSelectedDropDownRegion[i]);
        MSYS_SetRegionUserData(&gSelectedDropDownRegion[i], 0, i);

        usPosY += usFontHeight + 2;
      }
      usTemp = BOBBYR_CITY_START_LOCATION_Y;
      usHeight = usPosY - usTemp + 10;

      // create the scroll bars regions
      // up arrow
      usPosX = BOBBYR_SCROLL_UP_ARROW_X;
      usPosY = BOBBYR_SCROLL_UP_ARROW_Y;
      for (i = 0; i < 2; i++) {
        MSYS_DefineRegion(&gSelectedUpDownArrowOnScrollAreaRegion[i], usPosX, usPosY, (UINT16)(usPosX + BOBBYR_SCROLL_ARROW_WIDTH), (UINT16)(usPosY + BOBBYR_SCROLL_ARROW_HEIGHT), MSYS_PRIORITY_HIGH, CURSOR_WWW, MSYS_NO_CALLBACK, SelectUpDownArrowOnScrollAreaRegionCallBack);
        MSYS_AddRegion(&gSelectedUpDownArrowOnScrollAreaRegion[i]);
        MSYS_SetRegionUserData(&gSelectedUpDownArrowOnScrollAreaRegion[i], 0, i);
        usPosX = BOBBYR_SCROLL_DOWN_ARROW_X;
        usPosY = BOBBYR_SCROLL_DOWN_ARROW_Y;
      }

      // the scroll area itself
      usPosX = BOBBYR_SCROLL_AREA_X;
      usPosY = BOBBYR_SCROLL_UP_ARROW_Y + BOBBYR_SCROLL_ARROW_HEIGHT;
      usHeight = BOBBYR_SCROLL_AREA_HEIGHT_MINUS_ARROWS / BOBBYR_ORDER_NUM_SHIPPING_CITIES;
      for (i = 0; i < BOBBYR_ORDER_NUM_SHIPPING_CITIES - 1; i++) {
        MSYS_DefineRegion(&gSelectedScrollAreaDropDownRegion[i], usPosX, usPosY, (UINT16)(usPosX + BOBBYR_SCROLL_ARROW_WIDTH), (UINT16)(usPosY + usHeight), MSYS_PRIORITY_HIGH + 1, CURSOR_LAPTOP_SCREEN, SelectScrollAreaDropDownMovementCallBack, SelectScrollAreaDropDownRegionCallBack);
        MSYS_AddRegion(&gSelectedScrollAreaDropDownRegion[i]);
        MSYS_SetRegionUserData(&gSelectedScrollAreaDropDownRegion[i], 0, i);
        usPosY += usHeight;
      }
      // put the last one down to cover the remaining area
      MSYS_DefineRegion(&gSelectedScrollAreaDropDownRegion[i], usPosX, usPosY, (UINT16)(usPosX + BOBBYR_SCROLL_ARROW_WIDTH), BOBBYR_SCROLL_DOWN_ARROW_Y, MSYS_PRIORITY_HIGH + 1, CURSOR_LAPTOP_SCREEN, SelectScrollAreaDropDownMovementCallBack, SelectScrollAreaDropDownRegionCallBack);
      MSYS_AddRegion(&gSelectedScrollAreaDropDownRegion[i]);
      MSYS_SetRegionUserData(&gSelectedScrollAreaDropDownRegion[i], 0, i);

      MSYS_EnableRegion(&gSelectedCloseDropDownRegion);

      // disable the clear order and accept order buttons, (their rendering interferes with the drop down graphics)
      DisableButton(guiBobbyRClearOrder);

      // FERAL
      //			if( IsAnythingPurchasedFromBobbyRayPage() )
      //			{
      //				SpecifyDisabledButtonStyle( guiBobbyRAcceptOrder, DISABLED_STYLE_NONE );
      //				DisableButton(guiBobbyRAcceptOrder);
      //			}
    } break;

    case BR_DROP_DOWN_DESTROY: {
      UINT8 i;

      if (!fMouseRegionsCreated)
        break;

      for (i = 0; i < BOBBYR_NUM_DISPLAYED_CITIES; i++)
        MSYS_RemoveRegion(&gSelectedDropDownRegion[i]);

      // destroy the scroll bars arrow regions
      for (i = 0; i < 2; i++)
        MSYS_RemoveRegion(&gSelectedUpDownArrowOnScrollAreaRegion[i]);

      // destroy the scroll bars regions
      for (i = 0; i < BOBBYR_ORDER_NUM_SHIPPING_CITIES; i++)
        MSYS_RemoveRegion(&gSelectedScrollAreaDropDownRegion[i]);

      // display the name on the title bar
      ColorFillVideoSurfaceArea(FRAME_BUFFER, BOBBYR_SHIPPING_LOC_AREA_L_X, BOBBYR_SHIPPING_LOC_AREA_T_Y, BOBBYR_SHIPPING_LOC_AREA_L_X + 175, BOBBYR_SHIPPING_LOC_AREA_T_Y + BOBBYR_DROP_DOWN_HEIGHT, Get16BPPColor(FROMRGB(0, 0, 0)));

      if (gbSelectedCity == -1)
        DrawTextToScreen(BobbyROrderFormText[BOBBYR_SELECT_DEST], BOBBYR_CITY_START_LOCATION_X + BOBBYR_CITY_NAME_OFFSET, BOBBYR_SHIPPING_LOC_AREA_T_Y + 3, 0, BOBBYR_DROPDOWN_FONT, BOBBYR_ORDER_DROP_DOWN_SELEC_COLOR, FONT_MCOLOR_BLACK, FALSE, LEFT_JUSTIFIED);
      else
        DrawTextToScreen(*(BobbyROrderLocations[gbSelectedCity].psCityLoc), BOBBYR_CITY_START_LOCATION_X + BOBBYR_CITY_NAME_OFFSET, BOBBYR_SHIPPING_LOC_AREA_T_Y + 3, 0, BOBBYR_DROPDOWN_FONT, BOBBYR_ORDER_DROP_DOWN_SELEC_COLOR, FONT_MCOLOR_BLACK, FALSE, LEFT_JUSTIFIED);

      // disable the r\close regiuon
      MSYS_DisableRegion(&gSelectedCloseDropDownRegion);

      // enable the clear order and accept order buttons, (because their rendering interferes with the drop down graphics)
      EnableButton(guiBobbyRClearOrder);
      // FERAL
      //			if( IsAnythingPurchasedFromBobbyRayPage() )
      //			{
      //				SpecifyDisabledButtonStyle( guiBobbyRAcceptOrder, DISABLED_STYLE_SHADED );
      //			  EnableButton(guiBobbyRAcceptOrder);
      //			}

      gfReDrawBobbyOrder = TRUE;
      fMouseRegionsCreated = FALSE;
      gubDropDownAction = BR_DROP_DOWN_NO_ACTION;
    } break;

    case BR_DROP_DOWN_DISPLAY: {
      UINT8 i;
      UINT16 usPosY, usPosX;
      UINT16 usFontHeight = GetFontHeight(BOBBYR_DROPDOWN_FONT);
      HVOBJECT hImageHandle;
      HVOBJECT hArrowHandle;

      // Display the background for the drop down window
      ColorFillVideoSurfaceArea(FRAME_BUFFER, BOBBYR_CITY_START_LOCATION_X, BOBBYR_CITY_START_LOCATION_Y, BOBBYR_CITY_START_LOCATION_X + BOBBYR_DROP_DOWN_WIDTH, BOBBYR_CITY_START_LOCATION_Y + BOBBYR_SCROLL_AREA_HEIGHT, Get16BPPColor(FROMRGB(0, 0, 0)));

      //
      // Place the border around the background
      //
      usHeight = BOBBYR_SCROLL_AREA_HEIGHT;

      GetVideoObject(&hImageHandle, guiDropDownBorder);

      usPosX = usPosY = 0;
      // blit top & bottom row of images
      for (i = 10; i < BOBBYR_DROP_DOWN_WIDTH - 10; i += 10) {
        // TOP ROW
        BltVideoObject(FRAME_BUFFER, hImageHandle, 1, i + BOBBYR_CITY_START_LOCATION_X, usPosY + BOBBYR_CITY_START_LOCATION_Y, VO_BLT_SRCTRANSPARENCY, NULL);
        // BOTTOM ROW
        BltVideoObject(FRAME_BUFFER, hImageHandle, 6, i + BOBBYR_CITY_START_LOCATION_X, usHeight - 10 + 6 + BOBBYR_CITY_START_LOCATION_Y, VO_BLT_SRCTRANSPARENCY, NULL);
      }

      // blit the left and right row of images
      usPosX = 0;
      for (i = 10; i < usHeight - 10; i += 10) {
        BltVideoObject(FRAME_BUFFER, hImageHandle, 3, usPosX + BOBBYR_CITY_START_LOCATION_X, i + BOBBYR_CITY_START_LOCATION_Y, VO_BLT_SRCTRANSPARENCY, NULL);
        BltVideoObject(FRAME_BUFFER, hImageHandle, 4, usPosX + BOBBYR_DROP_DOWN_WIDTH - 4 + BOBBYR_CITY_START_LOCATION_X, i + BOBBYR_CITY_START_LOCATION_Y, VO_BLT_SRCTRANSPARENCY, NULL);
      }

      // blt the corner images for the row
      // top left
      BltVideoObject(FRAME_BUFFER, hImageHandle, 0, 0 + BOBBYR_CITY_START_LOCATION_X, usPosY + BOBBYR_CITY_START_LOCATION_Y, VO_BLT_SRCTRANSPARENCY, NULL);
      // top right
      BltVideoObject(FRAME_BUFFER, hImageHandle, 2, BOBBYR_DROP_DOWN_WIDTH - 10 + BOBBYR_CITY_START_LOCATION_X, usPosY + BOBBYR_CITY_START_LOCATION_Y, VO_BLT_SRCTRANSPARENCY, NULL);
      // bottom left
      BltVideoObject(FRAME_BUFFER, hImageHandle, 5, 0 + BOBBYR_CITY_START_LOCATION_X, usHeight - 10 + BOBBYR_CITY_START_LOCATION_Y, VO_BLT_SRCTRANSPARENCY, NULL);
      // bottom right
      BltVideoObject(FRAME_BUFFER, hImageHandle, 7, BOBBYR_DROP_DOWN_WIDTH - 10 + BOBBYR_CITY_START_LOCATION_X, usHeight - 10 + BOBBYR_CITY_START_LOCATION_Y, VO_BLT_SRCTRANSPARENCY, NULL);

      DrawSelectedCity(gbSelectedCity);

      // display the scroll bars regions
      ColorFillVideoSurfaceArea(FRAME_BUFFER, BOBBYR_SCROLL_AREA_X, BOBBYR_SCROLL_AREA_Y, BOBBYR_SCROLL_AREA_X + BOBBYR_SCROLL_AREA_WIDTH, BOBBYR_SCROLL_AREA_Y + BOBBYR_SCROLL_AREA_HEIGHT, Get16BPPColor(FROMRGB(0, 0, 0)));

      // blt right bar of scroll area
      usPosX = 0;
      for (i = 10; i < BOBBYR_SCROLL_AREA_HEIGHT - 10; i += 10) {
        BltVideoObject(FRAME_BUFFER, hImageHandle, 3, BOBBYR_SCROLL_AREA_X + BOBBYR_SCROLL_AREA_WIDTH - 4, i + BOBBYR_CITY_START_LOCATION_Y, VO_BLT_SRCTRANSPARENCY, NULL);
      }

      // blit top row of images
      for (i = 0; i < BOBBYR_SCROLL_AREA_WIDTH; i += 10) {
        // TOP ROW
        BltVideoObject(FRAME_BUFFER, hImageHandle, 1, i + BOBBYR_SCROLL_AREA_X - 10, BOBBYR_SCROLL_AREA_Y, VO_BLT_SRCTRANSPARENCY, NULL);
        // BOTTOM ROW
        BltVideoObject(FRAME_BUFFER, hImageHandle, 6, i + BOBBYR_SCROLL_AREA_X - 10, BOBBYR_SCROLL_AREA_Y - 10 + 6 + BOBBYR_SCROLL_AREA_HEIGHT, VO_BLT_SRCTRANSPARENCY, NULL);
      }

      // top right
      BltVideoObject(FRAME_BUFFER, hImageHandle, 2, BOBBYR_SCROLL_AREA_X + BOBBYR_SCROLL_AREA_WIDTH - 10, BOBBYR_SCROLL_AREA_Y, VO_BLT_SRCTRANSPARENCY, NULL);
      // bottom right
      BltVideoObject(FRAME_BUFFER, hImageHandle, 7, BOBBYR_SCROLL_AREA_X + BOBBYR_SCROLL_AREA_WIDTH - 10, BOBBYR_SCROLL_AREA_Y + BOBBYR_SCROLL_AREA_HEIGHT - 10, VO_BLT_SRCTRANSPARENCY, NULL);

      // fix
      BltVideoObject(FRAME_BUFFER, hImageHandle, 4, BOBBYR_DROP_DOWN_WIDTH - 4 + BOBBYR_CITY_START_LOCATION_X, BOBBYR_CITY_START_LOCATION_Y + 2, VO_BLT_SRCTRANSPARENCY, NULL);

      // get and display the up and down arrows
      GetVideoObject(&hArrowHandle, guiGoldArrowImages);
      // top arrow
      BltVideoObject(FRAME_BUFFER, hArrowHandle, 1, BOBBYR_SCROLL_UP_ARROW_X, BOBBYR_SCROLL_UP_ARROW_Y, VO_BLT_SRCTRANSPARENCY, NULL);

      // top arrow
      BltVideoObject(FRAME_BUFFER, hArrowHandle, 0, BOBBYR_SCROLL_DOWN_ARROW_X, BOBBYR_SCROLL_DOWN_ARROW_Y, VO_BLT_SRCTRANSPARENCY, NULL);

      // display the scroll rectangle
      DrawGoldRectangle(gbSelectedCity);

      InvalidateRegion(LAPTOP_SCREEN_UL_X, LAPTOP_SCREEN_WEB_UL_Y, LAPTOP_SCREEN_LR_X, LAPTOP_SCREEN_WEB_LR_Y);
    } break;
  }

  return TRUE;
}

void SelectDropDownRegionCallBack(MOUSE_REGION *pRegion, INT32 iReason) {
  if (iReason & MSYS_CALLBACK_REASON_INIT) {
  } else if (iReason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    UINT8 ubSelected = (UINT8)MSYS_GetRegionUserData(pRegion, 0);
    gbSelectedCity = ubSelected + gubCityAtTopOfList;

    DrawSelectedCity(gbSelectedCity);

    gubDropDownAction = BR_DROP_DOWN_DESTROY;
  }
}

void SelectActivateCityDroDownRegionCallBack(MOUSE_REGION *pRegion, INT32 iReason) {
  if (iReason & MSYS_CALLBACK_REASON_INIT) {
  } else if (iReason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    gubDropDownAction = BR_DROP_DOWN_CREATE;
  }
}

void SelectDropDownMovementCallBack(MOUSE_REGION *pRegion, INT32 reason) {
  if (reason & MSYS_CALLBACK_REASON_LOST_MOUSE) {
    pRegion->uiFlags &= (~BUTTON_CLICKED_ON);
    InvalidateRegion(pRegion->RegionTopLeftX, pRegion->RegionTopLeftY, pRegion->RegionBottomRightX, pRegion->RegionBottomRightY);
  } else if (reason & MSYS_CALLBACK_REASON_GAIN_MOUSE) {
    pRegion->uiFlags |= BUTTON_CLICKED_ON;

    gbSelectedCity = (UINT8)MSYS_GetRegionUserData(pRegion, 0) + gubCityAtTopOfList;

    gubDropDownAction = BR_DROP_DOWN_DISPLAY;

    InvalidateRegion(pRegion->RegionTopLeftX, pRegion->RegionTopLeftY, pRegion->RegionBottomRightX, pRegion->RegionBottomRightY);
  }
}

void DrawSelectedCity(UINT8 ubCityNumber) {
  UINT16 usPosY;
  UINT16 usFontHeight = GetFontHeight(BOBBYR_DROPDOWN_FONT);
  UINT8 i;

  // DEBUG: make sure it wont go over array bounds
  if (gubCityAtTopOfList + BOBBYR_NUM_DISPLAYED_CITIES > BOBBYR_ORDER_NUM_SHIPPING_CITIES)
    gubCityAtTopOfList = BOBBYR_ORDER_NUM_SHIPPING_CITIES - BOBBYR_NUM_DISPLAYED_CITIES - 1;

  // Display the list of cities
  usPosY = BOBBYR_CITY_START_LOCATION_Y + 5;
  for (i = gubCityAtTopOfList; i < gubCityAtTopOfList + BOBBYR_NUM_DISPLAYED_CITIES; i++) {
    DrawTextToScreen(*(BobbyROrderLocations[i].psCityLoc), BOBBYR_CITY_START_LOCATION_X + BOBBYR_CITY_NAME_OFFSET, usPosY, 0, BOBBYR_DROPDOWN_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, LEFT_JUSTIFIED);
    usPosY += usFontHeight + 2;
  }

  if (ubCityNumber != 255)
    usPosY = (usFontHeight + 2) * (ubCityNumber - gubCityAtTopOfList) + BOBBYR_CITY_START_LOCATION_Y;
  else
    usPosY = (usFontHeight + 2) * (gubCityAtTopOfList) + BOBBYR_CITY_START_LOCATION_Y;

  // display the name in the list
  ColorFillVideoSurfaceArea(FRAME_BUFFER, BOBBYR_CITY_START_LOCATION_X + 4, usPosY + 4, BOBBYR_CITY_START_LOCATION_X + BOBBYR_DROP_DOWN_WIDTH - 4, usPosY + usFontHeight + 6, Get16BPPColor(FROMRGB(200, 169, 87)));

  SetFontShadow(NO_SHADOW);
  if (ubCityNumber == 255)
    DrawTextToScreen(*(BobbyROrderLocations[0].psCityLoc), BOBBYR_CITY_START_LOCATION_X + BOBBYR_CITY_NAME_OFFSET, (UINT16)(usPosY + 5), 0, BOBBYR_DROPDOWN_FONT, BOBBYR_FONT_BLACK, FONT_MCOLOR_BLACK, FALSE, LEFT_JUSTIFIED);
  else
    DrawTextToScreen(*(BobbyROrderLocations[ubCityNumber].psCityLoc), BOBBYR_CITY_START_LOCATION_X + BOBBYR_CITY_NAME_OFFSET, (UINT16)(usPosY + 5), 0, BOBBYR_DROPDOWN_FONT, BOBBYR_FONT_BLACK, FONT_MCOLOR_BLACK, FALSE, LEFT_JUSTIFIED);

  SetFontShadow(DEFAULT_SHADOW);

  DisplayShippingLocationCity();

  if (guiBobbyRAcceptOrder != -1) {
    // if there is anything to buy, dont disable the accept button
    if (IsAnythingPurchasedFromBobbyRayPage() && gbSelectedCity != -1)
      EnableButton(guiBobbyRAcceptOrder);
  }
}

void DisplayShippingLocationCity() {
  wchar_t sTemp[40];
  UINT16 usPosY;

  // display the name on the title bar
  ColorFillVideoSurfaceArea(FRAME_BUFFER, BOBBYR_SHIPPING_LOC_AREA_L_X, BOBBYR_SHIPPING_LOC_AREA_T_Y, BOBBYR_SHIPPING_LOC_AREA_L_X + 175, BOBBYR_SHIPPING_LOC_AREA_T_Y + BOBBYR_DROP_DOWN_HEIGHT, Get16BPPColor(FROMRGB(0, 0, 0)));

  // if there is no city selected
  if (gbSelectedCity == -1)
    DrawTextToScreen(BobbyROrderFormText[BOBBYR_SELECT_DEST], BOBBYR_CITY_START_LOCATION_X + BOBBYR_CITY_NAME_OFFSET, BOBBYR_SHIPPING_LOC_AREA_T_Y + 3, 0, BOBBYR_DROPDOWN_FONT, BOBBYR_ORDER_DROP_DOWN_SELEC_COLOR, FONT_MCOLOR_BLACK, FALSE, LEFT_JUSTIFIED);
  else
    DrawTextToScreen(*(BobbyROrderLocations[gbSelectedCity].psCityLoc), BOBBYR_CITY_START_LOCATION_X + BOBBYR_CITY_NAME_OFFSET, BOBBYR_SHIPPING_LOC_AREA_T_Y + 3, 0, BOBBYR_DROPDOWN_FONT, BOBBYR_ORDER_DROP_DOWN_SELEC_COLOR, FONT_MCOLOR_BLACK, FALSE, LEFT_JUSTIFIED);

  DisplayShippingCosts(TRUE, 0, BOBBYR_ORDERGRID_X, BOBBYR_ORDERGRID_Y, -1);

  if (gubDropDownAction == BR_DROP_DOWN_DISPLAY)
    return;

  // Display the shipping cost
  usPosY = BOBBYR_OVERNIGHT_EXPRESS_Y;

  wcscpy(sTemp, L"$0");

  if (gbSelectedCity != -1) {
    swprintf(sTemp, L"%d", (INT32)(BobbyROrderLocations[gbSelectedCity].usOverNightExpress / GetWeightBasedOnMetricOption(1)));
    InsertCommasForDollarFigure(sTemp);
    InsertDollarSignInToString(sTemp);
  }

  DrawTextToScreen(sTemp, BOBBYR_SHIPPING_SPEED_NUMBER_X, usPosY, BOBBYR_SHIPPING_SPEED_NUMBER_WIDTH, BOBBYR_DROPDOWN_FONT, BOBBYR_ORDER_DYNAMIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, RIGHT_JUSTIFIED);
  usPosY += BOBBYR_GRID_ROW_OFFSET;

  if (gbSelectedCity != -1) {
    swprintf(sTemp, L"%d", (INT32)(BobbyROrderLocations[gbSelectedCity].us2DaysService / GetWeightBasedOnMetricOption(1)));
    InsertCommasForDollarFigure(sTemp);
    InsertDollarSignInToString(sTemp);
  }

  DrawTextToScreen(sTemp, BOBBYR_SHIPPING_SPEED_NUMBER_X, usPosY, BOBBYR_SHIPPING_SPEED_NUMBER_WIDTH, BOBBYR_DROPDOWN_FONT, BOBBYR_ORDER_DYNAMIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, RIGHT_JUSTIFIED);
  usPosY += BOBBYR_GRID_ROW_OFFSET;

  if (gbSelectedCity != -1) {
    swprintf(sTemp, L"%d", (INT32)(BobbyROrderLocations[gbSelectedCity].usStandardService / GetWeightBasedOnMetricOption(1)));
    InsertCommasForDollarFigure(sTemp);
    InsertDollarSignInToString(sTemp);
  }

  DrawTextToScreen(sTemp, BOBBYR_SHIPPING_SPEED_NUMBER_X, usPosY, BOBBYR_SHIPPING_SPEED_NUMBER_WIDTH, BOBBYR_DROPDOWN_FONT, BOBBYR_ORDER_DYNAMIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, RIGHT_JUSTIFIED);
}

void SelectCloseDroDownRegionCallBack(MOUSE_REGION *pRegion, INT32 iReason) {
  if (iReason & MSYS_CALLBACK_REASON_INIT) {
  } else if (iReason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    gubDropDownAction = BR_DROP_DOWN_DESTROY;
  }
}

void RemovePurchasedItemsFromBobbyRayInventory() {
  INT16 i;

  for (i = 0; i < MAX_PURCHASE_AMOUNT; i++) {
    // if the item was purchased
    if (BobbyRayPurchases[i].ubNumberPurchased) {
      // if the item is used
      if (BobbyRayPurchases[i].fUsed) {
        // removee it from Bobby Rays Inventory
        if ((LaptopSaveInfo.BobbyRayUsedInventory[BobbyRayPurchases[i].usBobbyItemIndex].ubQtyOnHand - BobbyRayPurchases[i].ubNumberPurchased) > 0)
          LaptopSaveInfo.BobbyRayUsedInventory[BobbyRayPurchases[i].usBobbyItemIndex].ubQtyOnHand -= BobbyRayPurchases[i].ubNumberPurchased;
        else
          LaptopSaveInfo.BobbyRayUsedInventory[BobbyRayPurchases[i].usBobbyItemIndex].ubQtyOnHand = 0;
      }

      // else the purchase is new
      else {
        // removee it from Bobby Rays Inventory
        if ((LaptopSaveInfo.BobbyRayInventory[BobbyRayPurchases[i].usBobbyItemIndex].ubQtyOnHand - BobbyRayPurchases[i].ubNumberPurchased) > 0)
          LaptopSaveInfo.BobbyRayInventory[BobbyRayPurchases[i].usBobbyItemIndex].ubQtyOnHand -= BobbyRayPurchases[i].ubNumberPurchased;
        else
          LaptopSaveInfo.BobbyRayInventory[BobbyRayPurchases[i].usBobbyItemIndex].ubQtyOnHand = 0;
      }
    }
  }
  gfRemoveItemsFromStock = FALSE;
}

BOOLEAN IsAnythingPurchasedFromBobbyRayPage() {
  UINT16 i;
  BOOLEAN fReturnType = FALSE;

  for (i = 0; i < MAX_PURCHASE_AMOUNT; i++) {
    // if the item was purchased
    if (BobbyRayPurchases[i].ubNumberPurchased) {
      fReturnType = TRUE;
    }
  }
  return fReturnType;
}

void SelectTitleLinkRegionCallBack(MOUSE_REGION *pRegion, INT32 iReason) {
  if (iReason & MSYS_CALLBACK_REASON_INIT) {
  } else if (iReason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    guiCurrentLaptopMode = LAPTOP_MODE_BOBBY_R;
  }
}

void SelectScrollAreaDropDownRegionCallBack(MOUSE_REGION *pRegion, INT32 iReason) {
  if (iReason & MSYS_CALLBACK_REASON_INIT) {
  } else if (iReason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    UINT8 ubCityNum = (UINT8)MSYS_GetRegionUserData(pRegion, 0);

    if (ubCityNum < gbSelectedCity) {
      gbSelectedCity--;
      if (gbSelectedCity < gubCityAtTopOfList)
        gubCityAtTopOfList--;
    }

    if (ubCityNum > gbSelectedCity) {
      gbSelectedCity++;
      if ((gbSelectedCity - gubCityAtTopOfList) >= BOBBYR_NUM_DISPLAYED_CITIES)
        gubCityAtTopOfList++;
    }

    gubDropDownAction = BR_DROP_DOWN_DISPLAY;
  } else if (iReason & MSYS_CALLBACK_REASON_LBUTTON_REPEAT) {
    UINT8 ubCityNum = (UINT8)MSYS_GetRegionUserData(pRegion, 0);

    pRegion->uiFlags |= BUTTON_CLICKED_ON;

    if (ubCityNum < gbSelectedCity) {
      gbSelectedCity--;
      if (gbSelectedCity < gubCityAtTopOfList)
        gubCityAtTopOfList--;
    }

    if (ubCityNum > gbSelectedCity) {
      gbSelectedCity++;
      if ((gbSelectedCity - gubCityAtTopOfList) >= BOBBYR_NUM_DISPLAYED_CITIES)
        gubCityAtTopOfList++;
    }

    gubDropDownAction = BR_DROP_DOWN_DISPLAY;

    InvalidateRegion(pRegion->RegionTopLeftX, pRegion->RegionTopLeftY, pRegion->RegionBottomRightX, pRegion->RegionBottomRightY);
  }
}

void SelectScrollAreaDropDownMovementCallBack(MOUSE_REGION *pRegion, INT32 reason) {
  if (reason & MSYS_CALLBACK_REASON_LOST_MOUSE) {
    pRegion->uiFlags &= (~BUTTON_CLICKED_ON);
    InvalidateRegion(pRegion->RegionTopLeftX, pRegion->RegionTopLeftY, pRegion->RegionBottomRightX, pRegion->RegionBottomRightY);
  } else if (reason & MSYS_CALLBACK_REASON_GAIN_MOUSE) {
    if (gfLeftButtonState) {
      UINT8 ubCityNum = (UINT8)MSYS_GetRegionUserData(pRegion, 0);

      pRegion->uiFlags |= BUTTON_CLICKED_ON;

      if (ubCityNum < gbSelectedCity) {
        gbSelectedCity = ubCityNum;
        if (gbSelectedCity < gubCityAtTopOfList)
          gubCityAtTopOfList = gbSelectedCity;
      }

      if (ubCityNum > gbSelectedCity) {
        gbSelectedCity = ubCityNum;
        if ((gbSelectedCity - gubCityAtTopOfList) >= BOBBYR_NUM_DISPLAYED_CITIES)
          gubCityAtTopOfList = gbSelectedCity - BOBBYR_NUM_DISPLAYED_CITIES + 1;
      }

      gubDropDownAction = BR_DROP_DOWN_DISPLAY;

      InvalidateRegion(pRegion->RegionTopLeftX, pRegion->RegionTopLeftY, pRegion->RegionBottomRightX, pRegion->RegionBottomRightY);
    }
  }
}

void SelectUpDownArrowOnScrollAreaRegionCallBack(MOUSE_REGION *pRegion, INT32 iReason) {
  if (iReason & MSYS_CALLBACK_REASON_INIT) {
  } else if (iReason & MSYS_CALLBACK_REASON_LBUTTON_UP || iReason & MSYS_CALLBACK_REASON_LBUTTON_REPEAT) {
    UINT8 ubUpArrow = (UINT8)MSYS_GetRegionUserData(pRegion, 0);

    if (ubUpArrow) {
      if (gbSelectedCity < BOBBYR_ORDER_NUM_SHIPPING_CITIES - 1) {
        gbSelectedCity++;
      }

      if ((gbSelectedCity - gubCityAtTopOfList) >= BOBBYR_NUM_DISPLAYED_CITIES) {
        gubCityAtTopOfList++;
      }
    } else {
      if (gbSelectedCity != -1) {
        if (gbSelectedCity > 0)
          gbSelectedCity--;

        if (gbSelectedCity < gubCityAtTopOfList)
          gubCityAtTopOfList--;
      }
    }

    gubDropDownAction = BR_DROP_DOWN_DISPLAY;
  }
}

void DrawGoldRectangle(INT8 bCityNum) {
  UINT32 uiDestPitchBYTES;
  UINT8 *pDestBuf;
  UINT16 usWidth, usTempHeight, usTempPosY, usHeight;
  UINT16 usPosX, usPosY;

  UINT16 temp;

  if (bCityNum == -1)
    bCityNum = 0;

  usTempPosY = BOBBYR_SCROLL_UP_ARROW_Y;
  usTempPosY += BOBBYR_SCROLL_ARROW_HEIGHT;
  usPosX = BOBBYR_SCROLL_AREA_X;
  usWidth = BOBBYR_SCROLL_AREA_WIDTH - 5;
  usTempHeight = (BOBBYR_SCROLL_AREA_HEIGHT - 2 * BOBBYR_SCROLL_ARROW_HEIGHT) - 8;

  usHeight = usTempHeight / (BOBBYR_ORDER_NUM_SHIPPING_CITIES + 1);

  usPosY = usTempPosY + (UINT16)(((BOBBYR_SCROLL_AREA_HEIGHT - 2 * BOBBYR_SCROLL_ARROW_HEIGHT) / (FLOAT)(BOBBYR_ORDER_NUM_SHIPPING_CITIES + 1)) * bCityNum);

  temp = BOBBYR_SCROLL_AREA_Y + BOBBYR_SCROLL_AREA_HEIGHT - BOBBYR_SCROLL_ARROW_HEIGHT - usHeight - 1;

  if (usPosY >= temp)
    usPosY = BOBBYR_SCROLL_AREA_Y + BOBBYR_SCROLL_AREA_HEIGHT - BOBBYR_SCROLL_ARROW_HEIGHT - usHeight - 5;

  ColorFillVideoSurfaceArea(FRAME_BUFFER, BOBBYR_SCROLL_AREA_X, usPosY, BOBBYR_SCROLL_AREA_X + usWidth, usPosY + usHeight, Get16BPPColor(FROMRGB(186, 165, 68)));

  // display the line
  pDestBuf = LockVideoSurface(FRAME_BUFFER, &uiDestPitchBYTES);
  SetClippingRegionAndImageWidth(uiDestPitchBYTES, 0, 0, 640, 480);

  // draw the gold highlite line on the top and left
  LineDraw(FALSE, usPosX, usPosY, usPosX + usWidth, usPosY, Get16BPPColor(FROMRGB(235, 222, 171)), pDestBuf);
  LineDraw(FALSE, usPosX, usPosY, usPosX, usPosY + usHeight, Get16BPPColor(FROMRGB(235, 222, 171)), pDestBuf);

  // draw the shadow line on the bottom and right
  LineDraw(FALSE, usPosX, usPosY + usHeight, usPosX + usWidth, usPosY + usHeight, Get16BPPColor(FROMRGB(65, 49, 6)), pDestBuf);
  LineDraw(FALSE, usPosX + usWidth, usPosY, usPosX + usWidth, usPosY + usHeight, Get16BPPColor(FROMRGB(65, 49, 6)), pDestBuf);

  // unlock frame buffer
  UnLockVideoSurface(FRAME_BUFFER);
}

UINT32 CalcCostFromWeightOfPackage(UINT8 ubTypeOfService) {
  UINT32 uiTotalWeight = 0;
  UINT16 usStandardCost = 0;
  UINT32 uiTotalCost = 0;

  if (gbSelectedCity == -1) {
    // shipping rates unknown until destination selected
    return 0;
  }

  // Get the package's weight
  uiTotalWeight = CalcPackageTotalWeight();

  /*	for(i=0; i<MAX_PURCHASE_AMOUNT; i++)
          {
                  //if the item was purchased
                  if( BobbyRayPurchases[ i ].ubNumberPurchased )
                  {
                          //add the current weight to the total
                          uiTotalWeight += Item[ BobbyRayPurchases[ i ].usItemIndex ].ubWeight * BobbyRayPurchases[ i ].ubNumberPurchased;
                  }
          }
  */
  Assert(ubTypeOfService < 3);

  switch (ubTypeOfService) {
    case 0:
      usStandardCost = BobbyROrderLocations[gbSelectedCity].usOverNightExpress;
      break;
    case 1:
      usStandardCost = BobbyROrderLocations[gbSelectedCity].us2DaysService;
      break;
    case 2:
      usStandardCost = BobbyROrderLocations[gbSelectedCity].usStandardService;
      break;

    default:
      usStandardCost = 0;
  }

  // Get the actual weight ( either in lbs or metric )
  ///	usStandardCost = (UINT16) GetWeightBasedOnMetricOption( usStandardCost );

  // if the total weight is below a set minimum amount ( 2 kg )
  if (uiTotalWeight < MIN_SHIPPING_WEIGHT) {
    // bring up the base cost
    uiTotalWeight = MIN_SHIPPING_WEIGHT;
  }

  uiTotalCost = (UINT32)((uiTotalWeight / (FLOAT)10) * usStandardCost + .5);

  return uiTotalCost;
}

void BobbyRayMailOrderEndGameShutDown() {
  ShutDownBobbyRNewMailOrders();
  /*
          if( LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray )
          {
                  MemFree( LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray );
                  LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray = NULL;
          }
  */
}

void ShutDownBobbyRNewMailOrders() {
  if (gpNewBobbyrShipments != NULL) {
    MemFree(gpNewBobbyrShipments);
    gpNewBobbyrShipments = NULL;
  }
  giNumberOfNewBobbyRShipment = 0;
}

INT8 CalculateOrderDelay(UINT8 ubSelectedService) {
  INT8 bDaysAhead;

  // get the length of time to receive the shipment
  if (ubSelectedService == 0) {
    bDaysAhead = OVERNIGHT_EXPRESS;
  } else if (ubSelectedService == 1) {
    bDaysAhead = TWO_BUSINESS_DAYS;
  } else if (ubSelectedService == 2) {
    bDaysAhead = STANDARD_SERVICE;
  } else {
    bDaysAhead = 0;
  }

  if (gMercProfiles[SAL].bLife == 0) {
    // Sal is dead, so Pablo is dead, so the airport is badly run
    // CJC comment: this seems really extreme!! maybe delay by 1 day randomly but that's it!
    bDaysAhead += (UINT8)Random(5) + 1;
  }

  return bDaysAhead;
}

void PurchaseBobbyOrder() {
  // if the shipment is going to Drassen, add the inventory
  if (gbSelectedCity == BR_DRASSEN || gbSelectedCity == BR_MEDUNA) {
    //					BobbyRayOrderStruct *pBobbyRayPurchase;
    //					UINT32	uiResetTimeSec;
    //		UINT8	i, ubCount;
    //		UINT8	cnt;
    //		INT8		bDaysAhead;

    /*
                    //if we need to add more array elements for the Order Array
                    if( LaptopSaveInfo.usNumberOfBobbyRayOrderItems <= LaptopSaveInfo.usNumberOfBobbyRayOrderUsed )
                    {
                            LaptopSaveInfo.usNumberOfBobbyRayOrderItems++;
                            LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray = MemRealloc( LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray, sizeof( BobbyRayOrderStruct ) * LaptopSaveInfo.usNumberOfBobbyRayOrderItems );
                            if( LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray == NULL )
                                    return;

                            memset( &LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray[ LaptopSaveInfo.usNumberOfBobbyRayOrderItems - 1 ], 0, sizeof( BobbyRayOrderStruct ) );
                    }

                    for( cnt =0; cnt< LaptopSaveInfo.usNumberOfBobbyRayOrderItems; cnt++ )
                    {
                            //get an empty element in the array
                            if( !LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray[ cnt ].fActive )
                                    break;
                    }
    */

    // gets reset when the confirm order graphic disappears
    gfCanAcceptOrder = FALSE;

    //					pBobbyRayPurchase = MemAlloc( sizeof( BobbyRayOrderStruct ) );
    //					memset(pBobbyRayPurchase, 0, sizeof( BobbyRayOrderStruct ) );

    /*
                    ubCount = 0;
                    for(i=0; i<MAX_PURCHASE_AMOUNT; i++)
                    {
                            //if the item was purchased
                            if( BobbyRayPurchases[ i ].ubNumberPurchased )
                            {
                                    //copy the purchases into the struct that will be added to the queue
                                    memcpy(&LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray[ cnt ].BobbyRayPurchase[ ubCount ] , &BobbyRayPurchases[i],  sizeof(BobbyRayPurchaseStruct));
                                    ubCount ++;
                            }
                    }

                    LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray[ cnt ].ubNumberPurchases = ubCount;
                    LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray[ cnt ].fActive = TRUE;
                    LaptopSaveInfo.usNumberOfBobbyRayOrderUsed++;
    */

    // add the delivery
    AddNewBobbyRShipment(BobbyRayPurchases, gbSelectedCity, gubSelectedLight, TRUE, CalcPackageTotalWeight());

    /*
                    //get the length of time to receive the shipment
                    bDaysAhead = CalculateOrderDelay( gubSelectedLight );

                    //AddStrategicEvent( EVENT_BOBBYRAY_PURCHASE, uiResetTimeSec, cnt);
                    AddFutureDayStrategicEvent( EVENT_BOBBYRAY_PURCHASE, (8 + Random(4) ) * 60, cnt, bDaysAhead );
    */
  }

  // Add the transaction to the finance page
  AddTransactionToPlayersBook(BOBBYR_PURCHASE, 0, GetWorldTotalMin(), -giGrandTotal);

  // display the confirm order graphic
  gfDrawConfirmOrderGrpahic = TRUE;

  // Get rid of the city drop dowm, if it is being displayed
  gubDropDownAction = BR_DROP_DOWN_DESTROY;

  MSYS_EnableRegion(&gSelectedConfirmOrderRegion);
  gfRemoveItemsFromStock = TRUE;

  gbSelectedCity = -1;
}

void AddJohnsGunShipment() {
  BobbyRayPurchaseStruct Temp[MAX_PURCHASE_AMOUNT];
  //	UINT8	cnt;
  INT8 bDaysAhead;

  // clear out the memory
  memset(Temp, 0, sizeof(BobbyRayPurchaseStruct) * MAX_PURCHASE_AMOUNT);

  /*
          //if we need to add more array elements for the Order Array
          if( LaptopSaveInfo.usNumberOfBobbyRayOrderItems <= LaptopSaveInfo.usNumberOfBobbyRayOrderUsed )
          {
                  LaptopSaveInfo.usNumberOfBobbyRayOrderItems++;
                  LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray = MemRealloc( LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray, sizeof( BobbyRayOrderStruct ) * LaptopSaveInfo.usNumberOfBobbyRayOrderItems );
                  if( LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray == NULL )
                          return;

                  memset( &LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray[ LaptopSaveInfo.usNumberOfBobbyRayOrderItems - 1 ], 0, sizeof( BobbyRayOrderStruct ) );
          }

          for( cnt =0; cnt< LaptopSaveInfo.usNumberOfBobbyRayOrderItems; cnt++ )
          {
                  //get an empty element in the array
                  if( !LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray[ cnt ].fActive )
                          break;
          }
  */

  // want to add two guns (Automags, AUTOMAG_III), and four clips of ammo.

  Temp[0].usItemIndex = AUTOMAG_III;
  Temp[0].ubNumberPurchased = 2;
  Temp[0].bItemQuality = 100;
  Temp[0].usBobbyItemIndex = 0; // does this get used anywhere???
  Temp[0].fUsed = FALSE;

  //	memcpy( &(LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray[ cnt ].BobbyRayPurchase[0]), &Temp, sizeof(BobbyRayPurchaseStruct) );

  Temp[1].usItemIndex = CLIP762N_5_AP;
  Temp[1].ubNumberPurchased = 2;
  Temp[1].bItemQuality = 5;
  Temp[1].usBobbyItemIndex = 0; // does this get used anywhere???
  Temp[1].fUsed = FALSE;

  /*
          memcpy( &(LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray[ cnt ].BobbyRayPurchase[1]), &Temp, sizeof(BobbyRayPurchaseStruct) );


          LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray[ cnt ].ubNumberPurchases = 2;
          LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray[ cnt ].fActive = TRUE;
          LaptopSaveInfo.usNumberOfBobbyRayOrderUsed++;
  */
  bDaysAhead = CalculateOrderDelay(2) + 2;

  // add a random amount between so it arrives between 8:00 am and noon
  //	AddFutureDayStrategicEvent( EVENT_BOBBYRAY_PURCHASE, (8 + Random(4) ) * 60, cnt, bDaysAhead );

  // add the delivery	( weight is not needed as it will not be displayed )
  AddNewBobbyRShipment(Temp, BR_DRASSEN, bDaysAhead, FALSE, 0);
}

void ConfirmBobbyRPurchaseMessageBoxCallBack(UINT8 bExitValue) {
  // yes, load the game
  if (bExitValue == MSG_BOX_RETURN_YES) {
    PurchaseBobbyOrder();
  }
}

void EnterInitBobbyRayOrder() {
  memset(&BobbyRayPurchases, 0, sizeof(BobbyRayPurchaseStruct) * MAX_PURCHASE_AMOUNT);
  gubSelectedLight = 0;
  gfReDrawBobbyOrder = TRUE;
  gbSelectedCity = -1;
  gubCityAtTopOfList = 0;

  // Get rid of the city drop dowm, if it is being displayed
  gubDropDownAction = BR_DROP_DOWN_DESTROY;

  // disable the accept order button
  DisableButton(guiBobbyRAcceptOrder);
}

UINT32 CalcPackageTotalWeight() {
  UINT16 i;
  UINT32 uiTotalWeight = 0;

  // loop through all the packages
  for (i = 0; i < MAX_PURCHASE_AMOUNT; i++) {
    // if the item was purchased
    if (BobbyRayPurchases[i].ubNumberPurchased) {
      // add the current weight to the total
      uiTotalWeight += Item[BobbyRayPurchases[i].usItemIndex].ubWeight * BobbyRayPurchases[i].ubNumberPurchased;
    }
  }

  return uiTotalWeight;
}

void DisplayPackageWeight() {
  CHAR16 zTemp[32];
  UINT32 uiTotalWeight = CalcPackageTotalWeight();
  //	FLOAT			fWeight = (FLOAT)(uiTotalWeight / 10.0);

  // Display the 'Package Weight' text
  DrawTextToScreen(BobbyROrderFormText[BOBBYR_PACKAGE_WEIGHT], BOBBYR_PACKAXGE_WEIGHT_X + 8, BOBBYR_PACKAXGE_WEIGHT_Y + 4, BOBBYR_PACKAXGE_WEIGHT_WIDTH, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, LEFT_JUSTIFIED);

  // Display the weight
  //	swprintf( zTemp, L"%3.1f %s", fWeight, pMessageStrings[ MSG_KILOGRAM_ABBREVIATION ] );
  swprintf(zTemp, L"%3.1f %s", (GetWeightBasedOnMetricOption(uiTotalWeight) / 10.0f), GetWeightUnitString());
  DrawTextToScreen(zTemp, BOBBYR_PACKAXGE_WEIGHT_X + 3, BOBBYR_PACKAXGE_WEIGHT_Y + 4, BOBBYR_PACKAXGE_WEIGHT_WIDTH, BOBBYR_ORDER_STATIC_TEXT_FONT, BOBBYR_ORDER_STATIC_TEXT_COLOR, FONT_MCOLOR_BLACK, FALSE, RIGHT_JUSTIFIED);
}

void BtnBobbyRGotoShipmentPageCallback(GUI_BUTTON *btn, INT32 reason) {
  if (reason & MSYS_CALLBACK_REASON_LBUTTON_DWN) {
    btn->uiFlags |= BUTTON_CLICKED_ON;
    InvalidateRegion(btn->Area.RegionTopLeftX, btn->Area.RegionTopLeftY, btn->Area.RegionBottomRightX, btn->Area.RegionBottomRightY);
  }
  if (reason & MSYS_CALLBACK_REASON_LBUTTON_UP) {
    btn->uiFlags &= (~BUTTON_CLICKED_ON);
    guiCurrentLaptopMode = LAPTOP_MODE_BOBBYR_SHIPMENTS;
    InvalidateRegion(btn->Area.RegionTopLeftX, btn->Area.RegionTopLeftY, btn->Area.RegionBottomRightX, btn->Area.RegionBottomRightY);
  }
  if (reason & MSYS_CALLBACK_REASON_LOST_MOUSE) {
    btn->uiFlags &= (~BUTTON_CLICKED_ON);
    InvalidateRegion(btn->Area.RegionTopLeftX, btn->Area.RegionTopLeftY, btn->Area.RegionBottomRightX, btn->Area.RegionBottomRightY);
  }
}

BOOLEAN CreateBobbyRayOrderTitle() {
  VOBJECT_DESC VObjectDesc;

  // load BobbyRayTitle graphic and add it
  VObjectDesc.fCreateFlags = VOBJECT_CREATE_FROMFILE;
  FilenameForBPP("LAPTOP\\BobbyRayTitle.sti", VObjectDesc.ImageFile);
  CHECKF(AddVideoObject(&VObjectDesc, &guiBobbyRayTitle));

  // the link to home page from the title
  MSYS_DefineRegion(&gSelectedTitleLinkRegion, BOBBYR_BOBBY_RAY_TITLE_X, BOBBYR_BOBBY_RAY_TITLE_Y, (BOBBYR_BOBBY_RAY_TITLE_X + BOBBYR_BOBBY_RAY_TITLE_WIDTH), (UINT16)(BOBBYR_BOBBY_RAY_TITLE_Y + BOBBYR_BOBBY_RAY_TITLE_HEIGHT), MSYS_PRIORITY_HIGH, CURSOR_WWW, MSYS_NO_CALLBACK, SelectTitleLinkRegionCallBack);
  MSYS_AddRegion(&gSelectedTitleLinkRegion);

  return TRUE;
}

void DestroyBobbyROrderTitle() {
  MSYS_RemoveRegion(&gSelectedTitleLinkRegion);
  DeleteVideoObjectFromIndex(guiBobbyRayTitle);
}

void DrawBobbyROrderTitle() {
  HVOBJECT hPixHandle;

  // Bobbyray title
  GetVideoObject(&hPixHandle, guiBobbyRayTitle);
  BltVideoObject(FRAME_BUFFER, hPixHandle, 0, BOBBYR_BOBBY_RAY_TITLE_X, BOBBYR_BOBBY_RAY_TITLE_Y, VO_BLT_SRCTRANSPARENCY, NULL);
}

BOOLEAN AddNewBobbyRShipment(BobbyRayPurchaseStruct *pPurchaseStruct, UINT8 ubDeliveryLoc, UINT8 ubDeliveryMethod, BOOLEAN fPruchasedFromBobbyR, UINT32 uiPackageWeight) {
  INT32 iCnt;
  INT32 iFoundSpot = -1;
  UINT8 ubItemCount = 0;
  UINT8 i;
  INT8 bDaysAhead = 0;
  //	UINT32	uiPackageWeight;
  //	gpNewBobbyrShipments = NULL;
  //	giNumberOfNewBobbyRShipment = 0;

  // loop through and see if there is a free spot to insert the new order
  for (iCnt = 0; iCnt < giNumberOfNewBobbyRShipment; iCnt++) {
    if (!gpNewBobbyrShipments->fActive) {
      iFoundSpot = iCnt;
      break;
    }
  }

  if (iFoundSpot == -1) {
    // increment the number of spots used
    giNumberOfNewBobbyRShipment++;

    // allocate some more memory
    gpNewBobbyrShipments = MemRealloc(gpNewBobbyrShipments, sizeof(NewBobbyRayOrderStruct) * giNumberOfNewBobbyRShipment);

    iFoundSpot = giNumberOfNewBobbyRShipment - 1;
  }

  // memset the memory
  memset(&gpNewBobbyrShipments[iFoundSpot], 0, sizeof(NewBobbyRayOrderStruct));

  gpNewBobbyrShipments[iFoundSpot].fActive = TRUE;
  gpNewBobbyrShipments[iFoundSpot].ubDeliveryLoc = ubDeliveryLoc;
  gpNewBobbyrShipments[iFoundSpot].ubDeliveryMethod = ubDeliveryMethod;

  if (fPruchasedFromBobbyR)
    gpNewBobbyrShipments[iFoundSpot].fDisplayedInShipmentPage = TRUE;
  else
    gpNewBobbyrShipments[iFoundSpot].fDisplayedInShipmentPage = FALSE;

  // get the apckage weight, if the weight is "below" the minimum, use the minimum
  if (uiPackageWeight < MIN_SHIPPING_WEIGHT) {
    gpNewBobbyrShipments[iFoundSpot].uiPackageWeight = MIN_SHIPPING_WEIGHT;
  } else {
    gpNewBobbyrShipments[iFoundSpot].uiPackageWeight = uiPackageWeight;
  }

  gpNewBobbyrShipments[iFoundSpot].uiOrderedOnDayNum = GetWorldDay();

  // count the number of purchases
  ubItemCount = 0;
  for (i = 0; i < MAX_PURCHASE_AMOUNT; i++) {
    // if the item was purchased
    if (pPurchaseStruct[i].ubNumberPurchased) {
      // copy the new data into the order struct
      memcpy(&gpNewBobbyrShipments[iFoundSpot].BobbyRayPurchase[ubItemCount], &pPurchaseStruct[i], sizeof(BobbyRayPurchaseStruct));

      // copy the purchases into the struct that will be added to the queue
      //			memcpy(&LaptopSaveInfo.BobbyRayOrdersOnDeliveryArray[ cnt ].BobbyRayPurchase[ ubCount ] , &BobbyRayPurchases[i],  sizeof(BobbyRayPurchaseStruct));
      ubItemCount++;
    }
  }

  gpNewBobbyrShipments[iFoundSpot].ubNumberPurchases = ubItemCount;

  // get the length of time to receive the shipment
  if (fPruchasedFromBobbyR)
    bDaysAhead = CalculateOrderDelay(ubDeliveryMethod);
  else
    bDaysAhead = ubDeliveryMethod;

  // AddStrategicEvent( EVENT_BOBBYRAY_PURCHASE, uiResetTimeSec, cnt);
  AddFutureDayStrategicEvent(EVENT_BOBBYRAY_PURCHASE, (8 + Random(4)) * 60, iFoundSpot, bDaysAhead);

  return TRUE;
}

UINT16 CountNumberOfBobbyPurchasesThatAreInTransit() {
  UINT16 usItemCount = 0;
  INT32 iCnt;

  for (iCnt = 0; iCnt < giNumberOfNewBobbyRShipment; iCnt++) {
    if (gpNewBobbyrShipments[iCnt].fActive) {
      usItemCount++;
    }
  }

  return usItemCount;
}

BOOLEAN NewWayOfSavingBobbyRMailOrdersToSaveGameFile(HWFILE hFile) {
  INT32 iCnt;
  UINT32 uiNumBytesWritten;

  // Write the number of orders
  FileWrite(hFile, &giNumberOfNewBobbyRShipment, sizeof(INT32), &uiNumBytesWritten);
  if (uiNumBytesWritten != sizeof(INT32)) {
    FileClose(hFile);
    return FALSE;
  }

  // loop through and save all the mail order slots
  for (iCnt = 0; iCnt < giNumberOfNewBobbyRShipment; iCnt++) {
    // Write the order
    FileWrite(hFile, &gpNewBobbyrShipments[iCnt], sizeof(NewBobbyRayOrderStruct), &uiNumBytesWritten);
    if (uiNumBytesWritten != sizeof(NewBobbyRayOrderStruct)) {
      FileClose(hFile);
      return FALSE;
    }
  }

  return TRUE;
}

BOOLEAN NewWayOfLoadingBobbyRMailOrdersToSaveGameFile(HWFILE hFile) {
  INT32 iCnt;
  UINT32 uiNumBytesRead;

  // clear out the old list
  ShutDownBobbyRNewMailOrders();

  // Read the number of orders
  FileRead(hFile, &giNumberOfNewBobbyRShipment, sizeof(INT32), &uiNumBytesRead);
  if (uiNumBytesRead != sizeof(INT32)) {
    FileClose(hFile);
    return FALSE;
  }

  if (giNumberOfNewBobbyRShipment == 0) {
    gpNewBobbyrShipments = NULL;
  } else {
    // Allocate memory for the list
    gpNewBobbyrShipments = MemAlloc(sizeof(NewBobbyRayOrderStruct) * giNumberOfNewBobbyRShipment);
    if (gpNewBobbyrShipments == NULL) {
      Assert(0);
      return FALSE;
    }

    // loop through and load all the mail order slots
    for (iCnt = 0; iCnt < giNumberOfNewBobbyRShipment; iCnt++) {
      // Read the order
      FileRead(hFile, &gpNewBobbyrShipments[iCnt], sizeof(NewBobbyRayOrderStruct), &uiNumBytesRead);
      if (uiNumBytesRead != sizeof(NewBobbyRayOrderStruct)) {
        FileClose(hFile);
        return FALSE;
      }
    }
  }

  return TRUE;
}
