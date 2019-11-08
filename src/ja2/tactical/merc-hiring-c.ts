namespace ja2 {

const MIN_FLIGHT_PREP_TIME = 6;

// ATE: Globals that dictate where the mercs will land once being hired
// Default to Omerta
// Saved in general saved game structure
export let gsMercArriveSectorX: INT16 = 9;
export let gsMercArriveSectorY: INT16 = 1;

export function HireMerc(pHireMerc: Pointer<MERC_HIRE_STRUCT>): INT8 {
  let pSoldier: Pointer<SOLDIERTYPE>;
  let iNewIndex: UINT8;
  let ubCount: UINT8 = 0;
  let ubCurrentSoldier: UINT8 = pHireMerc.value.ubProfileID;
  let pMerc: Pointer<MERCPROFILESTRUCT>;
  let MercCreateStruct: SOLDIERCREATE_STRUCT;
  let fReturn: boolean = false;
  pMerc = addressof(gMercProfiles[ubCurrentSoldier]);

// If we are to disregard the ststus of the merc
    // If the merc is away, Dont hire him, or if the merc is only slightly annoyed at the player
    if ((pMerc.value.bMercStatus != 0) && (pMerc.value.bMercStatus != MERC_ANNOYED_BUT_CAN_STILL_CONTACT) && (pMerc.value.bMercStatus != MERC_HIRED_BUT_NOT_ARRIVED_YET))
      return MERC_HIRE_FAILED;

  if (NumberOfMercsOnPlayerTeam() >= 18)
    return MERC_HIRE_OVER_20_MERCS_HIRED;

  // ATE: if we are to use landing zone, update to latest value
  // they will be updated again just before arrival...
  if (pHireMerc.value.fUseLandingZoneForArrival) {
    pHireMerc.value.sSectorX = gsMercArriveSectorX;
    pHireMerc.value.sSectorY = gsMercArriveSectorY;
    pHireMerc.value.bSectorZ = 0;
  }

  // BUILD STRUCTURES
  memset(addressof(MercCreateStruct), 0, sizeof(MercCreateStruct));
  MercCreateStruct.ubProfile = ubCurrentSoldier;
  MercCreateStruct.fPlayerMerc = true;
  MercCreateStruct.sSectorX = pHireMerc.value.sSectorX;
  MercCreateStruct.sSectorY = pHireMerc.value.sSectorY;
  MercCreateStruct.bSectorZ = pHireMerc.value.bSectorZ;
  MercCreateStruct.bTeam = SOLDIER_CREATE_AUTO_TEAM;
  MercCreateStruct.fCopyProfileItemsOver = pHireMerc.value.fCopyProfileItemsOver;

  if (!TacticalCreateSoldier(addressof(MercCreateStruct), addressof(iNewIndex))) {
    DebugMsg(TOPIC_JA2, DBG_LEVEL_3, "TacticalCreateSoldier in HireMerc():  Failed to Add Merc");
    return MERC_HIRE_FAILED;
  }

  if (DidGameJustStart()) {
// OK, CHECK FOR FIRST GUY, GIVE HIM SPECIAL ITEM!
    if (iNewIndex == 0) {
      // OK, give this item to our merc!
      let Object: OBJECTTYPE = createObjectType();

      // make an objecttype
      memset(addressof(Object), 0, sizeof(OBJECTTYPE));
      Object.usItem = Enum225.LETTER;
      Object.ubNumberOfObjects = 1;
      Object.bStatus[0] = 100;
      // Give it
      fReturn = AutoPlaceObject(MercPtrs[iNewIndex], addressof(Object), false);
      Assert(fReturn);
    }

    // Set insertion for first time in chopper

    // ATE: Insert for demo , not using the heli sequence....
    pHireMerc.value.ubInsertionCode = Enum175.INSERTION_CODE_CHOPPER;
  }

  // record how long the merc will be gone for
  pMerc.value.bMercStatus = pHireMerc.value.iTotalContractLength;

  pSoldier = addressof(Menptr[iNewIndex]);

  // Copy over insertion data....
  pSoldier.value.ubStrategicInsertionCode = pHireMerc.value.ubInsertionCode;
  pSoldier.value.usStrategicInsertionData = pHireMerc.value.usInsertionData;
  // ATE: Copy over value for using alnding zone to soldier type
  pSoldier.value.fUseLandingZoneForArrival = pHireMerc.value.fUseLandingZoneForArrival;

  // Set assignment
  // ATE: If first time, make ON_DUTY, otherwise GUARD
  if ((pSoldier.value.bAssignment != Enum117.IN_TRANSIT)) {
    SetTimeOfAssignmentChangeForMerc(pSoldier);
  }
  ChangeSoldiersAssignment(pSoldier, Enum117.IN_TRANSIT);

  // set the contract length
  pSoldier.value.iTotalContractLength = pHireMerc.value.iTotalContractLength;

  // reset the insurance values
  pSoldier.value.iStartOfInsuranceContract = 0;
  pSoldier.value.iTotalLengthOfInsuranceContract = 0;

  // Init the contract charge
  //	pSoldier->iTotalContractCharge = 0;

  // store arrival time in soldier structure so map screen can display it
  pSoldier.value.uiTimeSoldierWillArrive = pHireMerc.value.uiTimeTillMercArrives;

  // Set the type of merc

  if (DidGameJustStart()) {
    // Set time of initial merc arrival in minutes
    pHireMerc.value.uiTimeTillMercArrives = (STARTING_TIME + FIRST_ARRIVAL_DELAY) / NUM_SEC_IN_MIN;

// ATE: Insert for demo , not using the heli sequence....
    // Set insertion for first time in chopper
    pHireMerc.value.ubInsertionCode = Enum175.INSERTION_CODE_CHOPPER;

    // set when the merc's contract is finished
    pSoldier.value.iEndofContractTime = GetMidnightOfFutureDayInMinutes(pSoldier.value.iTotalContractLength) + (GetHourWhenContractDone(pSoldier) * 60);
  } else {
    // set when the merc's contract is finished ( + 1 cause it takes a day for the merc to arrive )
    pSoldier.value.iEndofContractTime = GetMidnightOfFutureDayInMinutes(1 + pSoldier.value.iTotalContractLength) + (GetHourWhenContractDone(pSoldier) * 60);
  }

  // Set the time and ID of the last hired merc will arrive
  LaptopSaveInfo.sLastHiredMerc.iIdOfMerc = pHireMerc.value.ubProfileID;
  LaptopSaveInfo.sLastHiredMerc.uiArrivalTime = pHireMerc.value.uiTimeTillMercArrives;

  // if we are trying to hire a merc that should arrive later, put the merc in the queue
  if (pHireMerc.value.uiTimeTillMercArrives != 0) {
    AddStrategicEvent(Enum132.EVENT_DELAYED_HIRING_OF_MERC, pHireMerc.value.uiTimeTillMercArrives, pSoldier.value.ubID);

    // specify that the merc is hired but hasnt arrived yet
    pMerc.value.bMercStatus = MERC_HIRED_BUT_NOT_ARRIVED_YET;
  }

  // if the merc is an AIM merc
  if (ubCurrentSoldier < 40) {
    pSoldier.value.ubWhatKindOfMercAmI = Enum260.MERC_TYPE__AIM_MERC;
    // determine how much the contract is, and remember what type of contract he got
    if (pHireMerc.value.iTotalContractLength == 1) {
      // pSoldier->iTotalContractCharge = gMercProfiles[ pSoldier->ubProfile ].sSalary;
      pSoldier.value.bTypeOfLastContract = Enum161.CONTRACT_EXTEND_1_DAY;
      pSoldier.value.iTimeCanSignElsewhere = GetWorldTotalMin();
    } else if (pHireMerc.value.iTotalContractLength == 7) {
      // pSoldier->iTotalContractCharge = gMercProfiles[ pSoldier->ubProfile ].uiWeeklySalary;
      pSoldier.value.bTypeOfLastContract = Enum161.CONTRACT_EXTEND_1_WEEK;
      pSoldier.value.iTimeCanSignElsewhere = GetWorldTotalMin();
    } else if (pHireMerc.value.iTotalContractLength == 14) {
      // pSoldier->iTotalContractCharge = gMercProfiles[ pSoldier->ubProfile ].uiBiWeeklySalary;
      pSoldier.value.bTypeOfLastContract = Enum161.CONTRACT_EXTEND_2_WEEK;
      // These luck fellows need to stay the whole duration!
      pSoldier.value.iTimeCanSignElsewhere = pSoldier.value.iEndofContractTime;
    }

    // remember the medical deposit we PAID.  The one in his profile can increase when he levels!
    pSoldier.value.usMedicalDeposit = gMercProfiles[pSoldier.value.ubProfile].sMedicalDepositAmount;
  }
  // if the merc is from M.E.R.C.
  else if ((ubCurrentSoldier >= 40) && (ubCurrentSoldier <= 50)) {
    pSoldier.value.ubWhatKindOfMercAmI = Enum260.MERC_TYPE__MERC;
    // pSoldier->iTotalContractCharge = -1;

    gMercProfiles[pSoldier.value.ubProfile].iMercMercContractLength = 1;

    // Set starting conditions for the merc
    pSoldier.value.iStartContractTime = GetWorldDay();

    AddHistoryToPlayersLog(Enum83.HISTORY_HIRED_MERC_FROM_MERC, ubCurrentSoldier, GetWorldTotalMin(), -1, -1);
  }
  // If the merc is from IMP, (ie a player character)
  else if ((ubCurrentSoldier >= 51) && (ubCurrentSoldier < 57)) {
    pSoldier.value.ubWhatKindOfMercAmI = Enum260.MERC_TYPE__PLAYER_CHARACTER;
    // pSoldier->iTotalContractCharge = -1;
  }
  // else its a NPC merc
  else {
    pSoldier.value.ubWhatKindOfMercAmI = Enum260.MERC_TYPE__NPC;
    // pSoldier->iTotalContractCharge = -1;
  }

  // remove the merc from the Personnel screens departed list ( if they have never been hired before, its ok to call it )
  RemoveNewlyHiredMercFromPersonnelDepartedList(pSoldier.value.ubProfile);

  gfAtLeastOneMercWasHired = true;
  return MERC_HIRE_OK;
}

export function MercArrivesCallback(ubSoldierID: UINT8): void {
  let pMerc: Pointer<MERCPROFILESTRUCT>;
  let pSoldier: Pointer<SOLDIERTYPE>;
  let uiTimeOfPost: UINT32;

  if (!DidGameJustStart() && gsMercArriveSectorX == 9 && gsMercArriveSectorY == 1) {
    // Mercs arriving in A9.  This sector has been deemed as the always safe sector.
    // Seeing we don't support entry into a hostile sector (except for the beginning),
    // we will nuke any enemies in this sector first.
    if (gWorldSectorX != 9 || gWorldSectorY != 1 || gbWorldSectorZ) {
      EliminateAllEnemies(gsMercArriveSectorX, gsMercArriveSectorY);
    }
  }

  // This will update ANY soldiers currently schedules to arrive too
  CheckForValidArrivalSector();

  // stop time compression until player restarts it
  StopTimeCompression();

  pSoldier = addressof(Menptr[ubSoldierID]);

  pMerc = addressof(gMercProfiles[pSoldier.value.ubProfile]);

  // add the guy to a squad
  AddCharacterToAnySquad(pSoldier);

  // ATE: Make sure we use global.....
  if (pSoldier.value.fUseLandingZoneForArrival) {
    pSoldier.value.sSectorX = gsMercArriveSectorX;
    pSoldier.value.sSectorY = gsMercArriveSectorY;
    pSoldier.value.bSectorZ = 0;
  }

  // Add merc to sector ( if it's the current one )
  if (gWorldSectorX == pSoldier.value.sSectorX && gWorldSectorY == pSoldier.value.sSectorY && pSoldier.value.bSectorZ == gbWorldSectorZ) {
    // OK, If this sector is currently loaded, and guy does not have CHOPPER insertion code....
    // ( which means we are at beginning of game if so )
    // Setup chopper....
    if (pSoldier.value.ubStrategicInsertionCode != Enum175.INSERTION_CODE_CHOPPER && pSoldier.value.sSectorX == 9 && pSoldier.value.sSectorY == 1) {
      gfTacticalDoHeliRun = true;

      // OK, If we are in mapscreen, get out...
      if (guiCurrentScreen == Enum26.MAP_SCREEN) {
        // ATE: Make sure the current one is selected!
        ChangeSelectedMapSector(gWorldSectorX, gWorldSectorY, 0);

        RequestTriggerExitFromMapscreen(Enum144.MAP_EXIT_TO_TACTICAL);
      }

      pSoldier.value.ubStrategicInsertionCode = Enum175.INSERTION_CODE_CHOPPER;
    }

    UpdateMercInSector(pSoldier, pSoldier.value.sSectorX, pSoldier.value.sSectorY, pSoldier.value.bSectorZ);
  } else {
    // OK, otherwise, set them in north area, so once we load again, they are here.
    pSoldier.value.ubStrategicInsertionCode = Enum175.INSERTION_CODE_NORTH;
  }

  if (pSoldier.value.ubStrategicInsertionCode != Enum175.INSERTION_CODE_CHOPPER) {
    ScreenMsg(FONT_MCOLOR_WHITE, MSG_INTERFACE, TacticalStr[Enum335.MERC_HAS_ARRIVED_STR], pSoldier.value.name);

    // ATE: He's going to say something, now that they've arrived...
    if (gTacticalStatus.bMercArrivingQuoteBeingUsed == false && !gfFirstHeliRun) {
      gTacticalStatus.bMercArrivingQuoteBeingUsed = true;

      // Setup the highlight sector value (note this isn't for mines but using same system)
      gsSectorLocatorX = pSoldier.value.sSectorX;
      gsSectorLocatorY = pSoldier.value.sSectorY;

      TacticalCharacterDialogueWithSpecialEvent(pSoldier, 0, DIALOGUE_SPECIAL_EVENT_MINESECTOREVENT, 2, 0);
      TacticalCharacterDialogue(pSoldier, Enum202.QUOTE_MERC_REACHED_DESTINATION);
      TacticalCharacterDialogueWithSpecialEvent(pSoldier, 0, DIALOGUE_SPECIAL_EVENT_MINESECTOREVENT, 3, 0);
      TacticalCharacterDialogueWithSpecialEventEx(pSoldier, 0, DIALOGUE_SPECIAL_EVENT_UNSET_ARRIVES_FLAG, 0, 0, 0);
    }
  }

  // record how long the merc will be gone for
  pMerc.value.bMercStatus = pSoldier.value.iTotalContractLength;

  // remember when excatly he ARRIVED in Arulco, in case he gets fired early
  pSoldier.value.uiTimeOfLastContractUpdate = GetWorldTotalMin();

  // set when the merc's contract is finished
  pSoldier.value.iEndofContractTime = GetMidnightOfFutureDayInMinutes(pSoldier.value.iTotalContractLength) + (GetHourWhenContractDone(pSoldier) * 60);

  // Do initial check for bad items
  if (pSoldier.value.bTeam == gbPlayerNum) {
    // ATE: Try to see if our equipment sucks!
    if (SoldierHasWorseEquipmentThanUsedTo(pSoldier)) {
      // Randomly anytime between 9:00, and 10:00
      uiTimeOfPost = 540 + Random(660);

      if (GetWorldMinutesInDay() < uiTimeOfPost) {
        AddSameDayStrategicEvent(Enum132.EVENT_MERC_COMPLAIN_EQUIPMENT, uiTimeOfPost, pSoldier.value.ubProfile);
      }
    }
  }

  HandleMercArrivesQuotes(pSoldier);

  fTeamPanelDirty = true;

  // if the currently selected sector has no one in it, select this one instead
  if (!CanGoToTacticalInSector(sSelMapX, sSelMapY, iCurrentMapSectorZ)) {
    ChangeSelectedMapSector(pSoldier.value.sSectorX, pSoldier.value.sSectorY, 0);
  }

  return;
}

export function IsMercHireable(ubMercID: UINT8): boolean {
  // If the merc has an .EDT file, is not away on assignment, and isnt already hired (but not arrived yet), he is not DEAD and he isnt returning home
  if ((gMercProfiles[ubMercID].bMercStatus == MERC_HAS_NO_TEXT_FILE) || (gMercProfiles[ubMercID].bMercStatus > 0) || (gMercProfiles[ubMercID].bMercStatus == MERC_HIRED_BUT_NOT_ARRIVED_YET) || (gMercProfiles[ubMercID].bMercStatus == MERC_IS_DEAD) || (gMercProfiles[ubMercID].uiDayBecomesAvailable > 0) || (gMercProfiles[ubMercID].bMercStatus == MERC_WORKING_ELSEWHERE) || (gMercProfiles[ubMercID].bMercStatus == MERC_FIRED_AS_A_POW) || (gMercProfiles[ubMercID].bMercStatus == MERC_RETURNING_HOME))
    return false;
  else
    return true;
}

export function IsMercDead(ubMercID: UINT8): boolean {
  if (gMercProfiles[ubMercID].bMercStatus == MERC_IS_DEAD)
    return true;
  else
    return false;
}

export function IsTheSoldierAliveAndConcious(pSoldier: Pointer<SOLDIERTYPE>): boolean {
  if (pSoldier.value.bLife >= CONSCIOUSNESS)
    return true;
  else
    return false;
}

export function NumberOfMercsOnPlayerTeam(): UINT8 {
  let cnt: INT8;
  let pSoldier: Pointer<SOLDIERTYPE>;
  let bLastTeamID: INT16;
  let ubCount: UINT8 = 0;

  // Set locator to first merc
  cnt = gTacticalStatus.Team[gbPlayerNum].bFirstID;
  bLastTeamID = gTacticalStatus.Team[gbPlayerNum].bLastID;

  for (pSoldier = MercPtrs[cnt]; cnt <= bLastTeamID; cnt++, pSoldier++) {
    // if the is active, and is not a vehicle
    if (pSoldier.value.bActive && !(pSoldier.value.uiStatusFlags & SOLDIER_VEHICLE)) {
      ubCount++;
    }
  }

  return ubCount;
}

export function HandleMercArrivesQuotes(pSoldier: Pointer<SOLDIERTYPE>): void {
  let cnt: INT8;
  let bHated: INT8;
  let bLastTeamID: INT8;
  let pTeamSoldier: Pointer<SOLDIERTYPE>;

  // If we are approaching with helicopter, don't say any ( yet )
  if (pSoldier.value.ubStrategicInsertionCode != Enum175.INSERTION_CODE_CHOPPER) {
    // Player-generated characters issue a comment about arriving in Omerta.
    if (pSoldier.value.ubWhatKindOfMercAmI == Enum260.MERC_TYPE__PLAYER_CHARACTER) {
      if (gubQuest[Enum169.QUEST_DELIVER_LETTER] == QUESTINPROGRESS) {
        TacticalCharacterDialogue(pSoldier, Enum202.QUOTE_PC_DROPPED_OMERTA);
      }
    }

    // Check to see if anyone hates this merc and will now complain
    cnt = gTacticalStatus.Team[gbPlayerNum].bFirstID;
    bLastTeamID = gTacticalStatus.Team[gbPlayerNum].bLastID;
    // loop though all the mercs
    for (pTeamSoldier = MercPtrs[cnt]; cnt <= bLastTeamID; cnt++, pTeamSoldier++) {
      if (pTeamSoldier.value.bActive) {
        if (pTeamSoldier.value.ubWhatKindOfMercAmI == Enum260.MERC_TYPE__AIM_MERC) {
          bHated = WhichHated(pTeamSoldier.value.ubProfile, pSoldier.value.ubProfile);
          if (bHated != -1) {
            // hates the merc who has arrived and is going to gripe about it!
            switch (bHated) {
              case 0:
                TacticalCharacterDialogue(pTeamSoldier, Enum202.QUOTE_HATED_1_ARRIVES);
                break;
              case 1:
                TacticalCharacterDialogue(pTeamSoldier, Enum202.QUOTE_HATED_2_ARRIVES);
                break;
              default:
                break;
            }
          }
        }
      }
    }
  }
}

export function GetMercArrivalTimeOfDay(): UINT32 {
  let uiCurrHour: UINT32;
  let uiMinHour: UINT32;

  // Pick a time...

  // First get the current time of day.....
  uiCurrHour = GetWorldHour();

  // Subtract the min time for any arrival....
  uiMinHour = uiCurrHour + MIN_FLIGHT_PREP_TIME;

  // OK, first check if we need to advance a whole day's time...
  // See if we have missed the last flight for the day...
  if ((uiCurrHour) > 13) // ( > 1:00 pm - too bad )
  {
    // 7:30 flight....
    return GetMidnightOfFutureDayInMinutes(1) + MERC_ARRIVE_TIME_SLOT_1;
  }

  // Well, now we can handle flights all in one day....
  // Find next possible flight
  if (uiMinHour <= 7) {
    return (GetWorldDayInMinutes() + MERC_ARRIVE_TIME_SLOT_1); // 7:30 am
  } else if (uiMinHour <= 13) {
    return (GetWorldDayInMinutes() + MERC_ARRIVE_TIME_SLOT_2); // 1:30 pm
  } else {
    return (GetWorldDayInMinutes() + MERC_ARRIVE_TIME_SLOT_3); // 7:30 pm
  }
}

export function UpdateAnyInTransitMercsWithGlobalArrivalSector(): void {
  let cnt: INT32;
  let pSoldier: Pointer<SOLDIERTYPE>;

  cnt = gTacticalStatus.Team[gbPlayerNum].bFirstID;

  // look for all mercs on the same team,
  for (pSoldier = MercPtrs[cnt]; cnt <= gTacticalStatus.Team[gbPlayerNum].bLastID; cnt++, pSoldier++) {
    if (pSoldier.value.bActive) {
      if (pSoldier.value.bAssignment == Enum117.IN_TRANSIT) {
        if (pSoldier.value.fUseLandingZoneForArrival) {
          pSoldier.value.sSectorX = gsMercArriveSectorX;
          pSoldier.value.sSectorY = gsMercArriveSectorY;
          pSoldier.value.bSectorZ = 0;
        }
      }
    }
  }
}

function StrategicPythSpacesAway(sOrigin: INT16, sDest: INT16): INT16 {
  let sRows: INT16;
  let sCols: INT16;
  let sResult: INT16;

  sRows = Math.abs((sOrigin / MAP_WORLD_X) - (sDest / MAP_WORLD_X));
  sCols = Math.abs((sOrigin % MAP_WORLD_X) - (sDest % MAP_WORLD_X));

  // apply Pythagoras's theorem for right-handed triangle:
  // dist^2 = rows^2 + cols^2, so use the square root to get the distance
  sResult = Math.sqrt((sRows * sRows) + (sCols * sCols));

  return sResult;
}

// ATE: This function will check if the current arrival sector
// is valid
// if there are enemies present, it's invalid
// if so, search around for nearest non-occupied sector.
function CheckForValidArrivalSector(): void {
  let sTop: INT16;
  let sBottom: INT16;
  let sLeft: INT16;
  let sRight: INT16;
  let cnt1: INT16;
  let cnt2: INT16;
  let sGoodX: INT16;
  let sGoodY: INT16;
  let ubRadius: UINT8 = 4;
  let leftmost: INT32;
  let sSectorGridNo: INT16;
  let sSectorGridNo2: INT16;
  let uiRange: INT32;
  let uiLowestRange: INT32 = 999999;
  let fFound: boolean = false;
  let sString: string /* CHAR16[1024] */;
  let zShortTownIDString1: string /* CHAR16[50] */;
  let zShortTownIDString2: string /* CHAR16[50] */;

  sSectorGridNo = gsMercArriveSectorX + (MAP_WORLD_X * gsMercArriveSectorY);

  // Check if valid...
  if (!StrategicMap[sSectorGridNo].fEnemyControlled) {
    return;
  }

  GetShortSectorString(gsMercArriveSectorX, gsMercArriveSectorY, zShortTownIDString1);

  // If here - we need to do a search!
  sTop = ubRadius;
  sBottom = -ubRadius;
  sLeft = -ubRadius;
  sRight = ubRadius;

  for (cnt1 = sBottom; cnt1 <= sTop; cnt1++) {
    leftmost = ((sSectorGridNo + (MAP_WORLD_X * cnt1)) / MAP_WORLD_X) * MAP_WORLD_X;

    for (cnt2 = sLeft; cnt2 <= sRight; cnt2++) {
      sSectorGridNo2 = sSectorGridNo + (MAP_WORLD_X * cnt1) + cnt2;

      if (sSectorGridNo2 >= 1 && sSectorGridNo2 < ((MAP_WORLD_X - 1) * (MAP_WORLD_X - 1)) && sSectorGridNo2 >= leftmost && sSectorGridNo2 < (leftmost + MAP_WORLD_X)) {
        if (!StrategicMap[sSectorGridNo2].fEnemyControlled && !StrategicMap[sSectorGridNo2].fEnemyAirControlled) {
          uiRange = StrategicPythSpacesAway(sSectorGridNo2, sSectorGridNo);

          if (uiRange < uiLowestRange) {
            sGoodY = cnt1;
            sGoodX = cnt2;
            uiLowestRange = uiRange;
            fFound = true;
          }
        }
      }
    }
  }

  if (fFound) {
    gsMercArriveSectorX = gsMercArriveSectorX + sGoodX;
    gsMercArriveSectorY = gsMercArriveSectorY + sGoodY;

    UpdateAnyInTransitMercsWithGlobalArrivalSector();

    GetShortSectorString(gsMercArriveSectorX, gsMercArriveSectorY, zShortTownIDString2);

    sString = swprintf("Arrival of new recruits is being rerouted to sector %s, as scheduled drop-off point of sector %s is enemy occupied.", zShortTownIDString2, zShortTownIDString1);

    DoScreenIndependantMessageBox(sString, MSG_BOX_FLAG_OK, null);
  }
}

}
