const END_OF_INTERRUPTS = 255;

let gubOutOfTurnOrder: UINT8[] /* [MAXMERCS] */ = [
  END_OF_INTERRUPTS,
  0,
];
let gubOutOfTurnPersons: UINT8 = 0;

const LATEST_INTERRUPT_GUY = () => (gubOutOfTurnOrder[gubOutOfTurnPersons]);
const REMOVE_LATEST_INTERRUPT_GUY = () => (DeleteFromIntList((gubOutOfTurnPersons), TRUE));
const INTERRUPTS_OVER = () => (gubOutOfTurnPersons == 1);

let InterruptOnlyGuynum: INT16 = NOBODY;
let InterruptsAllowed: BOOLEAN = TRUE;
let gfHiddenInterrupt: BOOLEAN = FALSE;
let gubLastInterruptedGuy: UINT8 = 0;

interface TEAM_TURN_SAVE_STRUCT {
  ubOutOfTurnPersons: UINT8;

  InterruptOnlyGuynum: INT16;
  sWhoThrewRock: INT16;
  InterruptsAllowed: BOOLEAN;
  fHiddenInterrupt: BOOLEAN;
  ubLastInterruptedGuy: UINT8;

  ubFiller: UINT8[] /* [16] */;
}

const MIN_APS_TO_INTERRUPT = 4;

function ClearIntList(): void {
  memset(addressof(gubOutOfTurnOrder), 0, MAXMERCS);
  gubOutOfTurnOrder[0] = END_OF_INTERRUPTS;
  gubOutOfTurnPersons = 0;
}

function BloodcatsPresent(): BOOLEAN {
  let iLoop: INT32;
  let pSoldier: Pointer<SOLDIERTYPE>;

  if (gTacticalStatus.Team[CREATURE_TEAM].bTeamActive == FALSE) {
    return FALSE;
  }

  for (iLoop = gTacticalStatus.Team[CREATURE_TEAM].bFirstID; iLoop <= gTacticalStatus.Team[CREATURE_TEAM].bLastID; iLoop++) {
    pSoldier = MercPtrs[iLoop];

    if (pSoldier.value.bActive && pSoldier.value.bInSector && pSoldier.value.bLife > 0 && pSoldier.value.ubBodyType == Enum194.BLOODCAT) {
      return TRUE;
    }
  }

  return FALSE;
}

function StartPlayerTeamTurn(fDoBattleSnd: BOOLEAN, fEnteringCombatMode: BOOLEAN): void {
  let cnt: INT32;
  //	SOLDIERTYPE		*pSoldier;
  //	EV_S_BEGINTURN	SBeginTurn;

  // Start the turn of player charactors

  //
  // PATCH 1.06:
  //
  // make sure set properly in gTacticalStatus:
  gTacticalStatus.ubCurrentTeam = OUR_TEAM;

  cnt = gTacticalStatus.Team[gbPlayerNum].bFirstID;

  InitPlayerUIBar(FALSE);

  if (gTacticalStatus.uiFlags & TURNBASED) {
    // Are we in combat already?
    if (gTacticalStatus.uiFlags & INCOMBAT) {
      PlayJA2Sample(Enum330.ENDTURN_1, RATE_11025, MIDVOLUME, 1, MIDDLEPAN);
    }

    // Remove deadlock message
    EndDeadlockMsg();

    // Check for victory conditions

    // ATE: Commented out - looks like this message is called earlier for our team
    // look for all mercs on the same team,
    // for ( pSoldier = MercPtrs[ cnt ]; cnt <= gTacticalStatus.Team[ gbPlayerNum ].bLastID; cnt++,pSoldier++)
    //{
    //	if ( pSoldier->bActive && pSoldier->bLife > 0 )
    //	{
    //		SBeginTurn.usSoldierID		= (UINT16)cnt;
    //		AddGameEvent( S_BEGINTURN, 0, &SBeginTurn );
    //	}
    //}

    // Are we in combat already?
    if (gTacticalStatus.uiFlags & INCOMBAT) {
      if (gusSelectedSoldier != NO_SOLDIER) {
        // Check if this guy is able to be selected....
        if (MercPtrs[gusSelectedSoldier].value.bLife < OKLIFE) {
          SelectNextAvailSoldier(MercPtrs[gusSelectedSoldier]);
        }

        // Slide to selected guy...
        if (gusSelectedSoldier != NO_SOLDIER) {
          SlideTo(NOWHERE, gusSelectedSoldier, NOBODY, SETLOCATOR);

          if (fDoBattleSnd) {
            // Say ATTENTION SOUND...
            DoMercBattleSound(MercPtrs[gusSelectedSoldier], Enum259.BATTLE_SOUND_ATTN1);
          }

          if (gsInterfaceLevel == 1) {
            gTacticalStatus.uiFlags |= SHOW_ALL_ROOFS;
            InvalidateWorldRedundency();
            SetRenderFlags(RENDER_FLAG_FULL);
            ErasePath(FALSE);
          }
        }
      }
    }

    // Dirty panel interface!
    fInterfacePanelDirty = DIRTYLEVEL2;

    // Adjust time now!
    UpdateClock();

    if (!fEnteringCombatMode) {
      CheckForEndOfCombatMode(TRUE);
    }
  }
  // Signal UI done enemy's turn
  guiPendingOverrideEvent = Enum207.LU_ENDUILOCK;

  // ATE: Reset killed on attack variable.. this is because sometimes timing is such
  /// that a baddie can die and still maintain it's attacker ID
  gTacticalStatus.fKilledEnemyOnAttack = FALSE;

  HandleTacticalUI();
}

function FreezeInterfaceForEnemyTurn(): void {
  // Reset flags
  gfPlotNewMovement = TRUE;

  // Erase path
  ErasePath(TRUE);

  // Setup locked UI
  guiPendingOverrideEvent = Enum207.LU_BEGINUILOCK;

  // Remove any UI messages!
  if (giUIMessageOverlay != -1) {
    EndUIMessage();
  }
}

function EndTurn(ubNextTeam: UINT8): void {
  let pSoldier: Pointer<SOLDIERTYPE>;
  let cnt: INT32;

  // Check for enemy pooling (add enemies if there happens to be more than the max in the
  // current battle.  If one or more slots have freed up, we can add them now.

  EndDeadlockMsg();

  /*
          if ( CheckForEndOfCombatMode( FALSE ) )
          {
                  return;
          }
          */

  if (INTERRUPT_QUEUED()) {
    EndInterrupt(FALSE);
  } else {
    AddPossiblePendingEnemiesToBattle();

    //		InitEnemyUIBar( );

    FreezeInterfaceForEnemyTurn();

    // Loop through all mercs and set to moved
    cnt = gTacticalStatus.Team[gTacticalStatus.ubCurrentTeam].bFirstID;
    for (pSoldier = MercPtrs[cnt]; cnt <= gTacticalStatus.Team[gTacticalStatus.ubCurrentTeam].bLastID; cnt++, pSoldier++) {
      if (pSoldier.value.bActive) {
        pSoldier.value.bMoved = TRUE;
      }
    }

    gTacticalStatus.ubCurrentTeam = ubNextTeam;

    BeginTeamTurn(gTacticalStatus.ubCurrentTeam);

    BetweenTurnsVisibilityAdjustments();
  }
}

function EndAITurn(): void {
  let pSoldier: Pointer<SOLDIERTYPE>;
  let cnt: INT32;

  // Remove any deadlock message
  EndDeadlockMsg();
  if (INTERRUPT_QUEUED()) {
    EndInterrupt(FALSE);
  } else {
    cnt = gTacticalStatus.Team[gTacticalStatus.ubCurrentTeam].bFirstID;
    for (pSoldier = MercPtrs[cnt]; cnt <= gTacticalStatus.Team[gTacticalStatus.ubCurrentTeam].bLastID; cnt++, pSoldier++) {
      if (pSoldier.value.bActive) {
        pSoldier.value.bMoved = TRUE;
        // record old life value... for creature AI; the human AI might
        // want to use this too at some point
        pSoldier.value.bOldLife = pSoldier.value.bLife;
      }
    }

    gTacticalStatus.ubCurrentTeam++;
    BeginTeamTurn(gTacticalStatus.ubCurrentTeam);
  }
}

function EndAllAITurns(): void {
  // warp turn to the player's turn
  let pSoldier: Pointer<SOLDIERTYPE>;
  let cnt: INT32;

  // Remove any deadlock message
  EndDeadlockMsg();
  if (INTERRUPT_QUEUED()) {
    EndInterrupt(FALSE);
  }

  if (gTacticalStatus.ubCurrentTeam != gbPlayerNum) {
    cnt = gTacticalStatus.Team[gTacticalStatus.ubCurrentTeam].bFirstID;
    for (pSoldier = MercPtrs[cnt]; cnt <= gTacticalStatus.Team[gTacticalStatus.ubCurrentTeam].bLastID; cnt++, pSoldier++) {
      if (pSoldier.value.bActive) {
        pSoldier.value.bMoved = TRUE;
        pSoldier.value.uiStatusFlags &= (~SOLDIER_UNDERAICONTROL);
        // record old life value... for creature AI; the human AI might
        // want to use this too at some point
        pSoldier.value.bOldLife = pSoldier.value.bLife;
      }
    }

    gTacticalStatus.ubCurrentTeam = gbPlayerNum;
    // BeginTeamTurn( gTacticalStatus.ubCurrentTeam );
  }
}

function EndTurnEvents(): void {
  // HANDLE END OF TURN EVENTS
  // handle team services like healing
  HandleTeamServices(gbPlayerNum);
  // handle smell and blood decay
  DecaySmells();
  // decay bomb timers and maybe set some off!
  DecayBombTimers();

  DecaySmokeEffects(GetWorldTotalSeconds());
  DecayLightEffects(GetWorldTotalSeconds());

  // decay AI warning values from corpses
  DecayRottingCorpseAIWarnings();
}

function BeginTeamTurn(ubTeam: UINT8): void {
  let cnt: INT32;
  let ubID: UINT8;
  let pSoldier: Pointer<SOLDIERTYPE>;

  while (1) {
    if (ubTeam > LAST_TEAM) {
      if (HandleAirRaidEndTurn(ubTeam)) {
        // End turn!!
        ubTeam = gbPlayerNum;
        gTacticalStatus.ubCurrentTeam = gbPlayerNum;
        EndTurnEvents();
      } else {
        break;
      }
    } else if (!(gTacticalStatus.Team[ubTeam].bTeamActive)) {
      // inactive team, skip to the next one
      ubTeam++;
      gTacticalStatus.ubCurrentTeam++;
      // skip back to the top, as we are processing another team now.
      continue;
    }

    if (gTacticalStatus.uiFlags & TURNBASED) {
      BeginLoggingForBleedMeToos(TRUE);

      // decay team's public opplist
      DecayPublicOpplist(ubTeam);

      cnt = gTacticalStatus.Team[ubTeam].bFirstID;
      for (pSoldier = MercPtrs[cnt]; cnt <= gTacticalStatus.Team[ubTeam].bLastID; cnt++, pSoldier++) {
        if (pSoldier.value.bActive && pSoldier.value.bLife > 0) {
          // decay personal opplist, and refresh APs and BPs
          EVENT_BeginMercTurn(pSoldier, FALSE, 0);
        }
      }

      if (gTacticalStatus.bBoxingState == Enum247.LOST_ROUND || gTacticalStatus.bBoxingState == Enum247.WON_ROUND || gTacticalStatus.bBoxingState == Enum247.DISQUALIFIED) {
        // we have no business being in here any more!
        return;
      }

      BeginLoggingForBleedMeToos(FALSE);
    }

    if (ubTeam == gbPlayerNum) {
      // ATE: Check if we are still in a valid battle...
      // ( they could have blead to death above )
      if ((gTacticalStatus.uiFlags & INCOMBAT)) {
        StartPlayerTeamTurn(TRUE, FALSE);
      }
      break;
    } else {
      // Set First enemy merc to AI control
      if (BuildAIListForTeam(ubTeam)) {
        ubID = RemoveFirstAIListEntry();
        if (ubID != NOBODY) {
          // Dirty panel interface!
          fInterfacePanelDirty = DIRTYLEVEL2;
          if (ubTeam == CREATURE_TEAM && BloodcatsPresent()) {
            AddTopMessage(Enum216.COMPUTER_TURN_MESSAGE, Message[Enum334.STR_BLOODCATS_TURN]);
          } else {
            AddTopMessage(Enum216.COMPUTER_TURN_MESSAGE, TeamTurnString[ubTeam]);
          }
          StartNPCAI(MercPtrs[ubID]);
          return;
        }
      }

      // This team is dead/inactive/being skipped in boxing
      // skip back to the top to process the next team
      ubTeam++;
      gTacticalStatus.ubCurrentTeam++;
    }
  }
}

function DisplayHiddenInterrupt(pSoldier: Pointer<SOLDIERTYPE>): void {
  // If the AI got an interrupt but this has been hidden from the player until this point,
  // this code will display the interrupt

  if (!gfHiddenInterrupt) {
    return;
  }
  EndDeadlockMsg();

  if (pSoldier.value.bVisible != -1) {
    SlideTo(NOWHERE, pSoldier.value.ubID, NOBODY, SETLOCATOR);
  }

  guiPendingOverrideEvent = Enum207.LU_BEGINUILOCK;

  // Dirty panel interface!
  fInterfacePanelDirty = DIRTYLEVEL2;

  // Erase path!
  ErasePath(TRUE);

  // Reset flags
  gfPlotNewMovement = TRUE;

  // Stop our guy....
  AdjustNoAPToFinishMove(MercPtrs[LATEST_INTERRUPT_GUY()], TRUE);
  // Stop him from going to prone position if doing a turn while prone
  MercPtrs[LATEST_INTERRUPT_GUY()].value.fTurningFromPronePosition = FALSE;

  // get rid of any old overlay message
  if (pSoldier.value.bTeam == MILITIA_TEAM) {
    AddTopMessage(Enum216.MILITIA_INTERRUPT_MESSAGE, Message[Enum334.STR_INTERRUPT]);
  } else {
    AddTopMessage(Enum216.COMPUTER_INTERRUPT_MESSAGE, Message[Enum334.STR_INTERRUPT]);
  }

  gfHiddenInterrupt = FALSE;
}

function DisplayHiddenTurnbased(pActingSoldier: Pointer<SOLDIERTYPE>): void {
  // This code should put the game in turn-based and give control to the AI-controlled soldier
  // whose pointer has been passed in as an argument (we were in non-combat and the AI is doing
  // something visible, i.e. making an attack)

  if (AreInMeanwhile()) {
    return;
  }

  if (gTacticalStatus.uiFlags & REALTIME || gTacticalStatus.uiFlags & INCOMBAT) {
    // pointless call here; do nothing
    return;
  }

  // Enter combat mode starting with this side's turn
  gTacticalStatus.ubCurrentTeam = pActingSoldier.value.bTeam;

  CommonEnterCombatModeCode();

  // JA2Gold: use function to make sure flags turned off everywhere else
  // pActingSoldier->uiStatusFlags |= SOLDIER_UNDERAICONTROL;
  SetSoldierAsUnderAiControl(pActingSoldier);
  DebugAI(String("Giving AI control to %d", pActingSoldier.value.ubID));
  pActingSoldier.value.fTurnInProgress = TRUE;
  gTacticalStatus.uiTimeSinceMercAIStart = GetJA2Clock();

  if (gTacticalStatus.ubTopMessageType != Enum216.COMPUTER_TURN_MESSAGE) {
    // Dirty panel interface!
    fInterfacePanelDirty = DIRTYLEVEL2;
    if (gTacticalStatus.ubCurrentTeam == CREATURE_TEAM && BloodcatsPresent()) {
      AddTopMessage(Enum216.COMPUTER_TURN_MESSAGE, Message[Enum334.STR_BLOODCATS_TURN]);
    } else {
      AddTopMessage(Enum216.COMPUTER_TURN_MESSAGE, TeamTurnString[gTacticalStatus.ubCurrentTeam]);
    }
  }

  // freeze the user's interface
  FreezeInterfaceForEnemyTurn();
}

function EveryoneInInterruptListOnSameTeam(): BOOLEAN {
  let ubLoop: UINT8;
  let ubTeam: UINT8 = 255;

  for (ubLoop = 1; ubLoop <= gubOutOfTurnPersons; ubLoop++) {
    if (ubTeam == 255) {
      ubTeam = MercPtrs[gubOutOfTurnOrder[ubLoop]].value.bTeam;
    } else {
      if (MercPtrs[gubOutOfTurnOrder[ubLoop]].value.bTeam != ubTeam) {
        return FALSE;
      }
    }
  }
  return TRUE;
}

function StartInterrupt(): void {
  let ubFirstInterrupter: UINT8;
  let bTeam: INT8;
  let pSoldier: Pointer<SOLDIERTYPE>;
  let pTempSoldier: Pointer<SOLDIERTYPE>;
  let ubInterrupter: UINT8;
  let cnt: INT32;

  ubFirstInterrupter = LATEST_INTERRUPT_GUY();
  pSoldier = MercPtrs[ubFirstInterrupter];
  bTeam = pSoldier.value.bTeam;
  ubInterrupter = ubFirstInterrupter;

  // display everyone on int queue!
  for (cnt = gubOutOfTurnPersons; cnt > 0; cnt--) {
    DebugMsg(TOPIC_JA2, DBG_LEVEL_3, String("STARTINT:  Q position %d: %d", cnt, gubOutOfTurnOrder[cnt]));
  }

  // DebugMsg( TOPIC_JA2, DBG_LEVEL_3, String("INTERRUPT: %d is now on top of the interrupt queue", ubFirstInterrupter ) );

  gTacticalStatus.fInterruptOccurred = TRUE;

  cnt = 0;
  for (pTempSoldier = MercPtrs[cnt]; cnt <= MAX_NUM_SOLDIERS; cnt++, pTempSoldier++) {
    if (pTempSoldier.value.bActive) {
      pTempSoldier.value.bMovedPriorToInterrupt = pTempSoldier.value.bMoved;
      pTempSoldier.value.bMoved = TRUE;
    }
  }

  if (pSoldier.value.bTeam == OUR_TEAM) {
    // start interrupts for everyone on our side at once
    let sTemp: INT16[] /* [255] */;
    let ubInterrupters: UINT8 = 0;
    let iSquad: INT32;
    let iCounter: INT32;

    // build string for display of who gets interrupt
    while (1) {
      MercPtrs[ubInterrupter].value.bMoved = FALSE;
      DebugMsg(TOPIC_JA2, DBG_LEVEL_3, String("INTERRUPT: popping %d off of the interrupt queue", ubInterrupter));

      REMOVE_LATEST_INTERRUPT_GUY();
      // now LATEST_INTERRUPT_GUY is the guy before the previous
      ubInterrupter = LATEST_INTERRUPT_GUY();

      if (ubInterrupter == NOBODY) // previously emptied slot!
      {
        continue;
      } else if (MercPtrs[ubInterrupter].value.bTeam != bTeam) {
        break;
      }
    }

    wcscpy(sTemp, Message[Enum334.STR_INTERRUPT_FOR]);

    // build string in separate loop here, want to linearly process squads...
    for (iSquad = 0; iSquad < Enum275.NUMBER_OF_SQUADS; iSquad++) {
      for (iCounter = 0; iCounter < NUMBER_OF_SOLDIERS_PER_SQUAD; iCounter++) {
        pTempSoldier = Squad[iSquad][iCounter];
        if (pTempSoldier && pTempSoldier.value.bActive && pTempSoldier.value.bInSector && !pTempSoldier.value.bMoved) {
          // then this guy got an interrupt...
          ubInterrupters++;
          if (ubInterrupters > 6) {
            // flush... display string, then clear it (we could have 20 names!)
            // add comma to end, we know we have another person after this...
            wcscat(sTemp, ", ");
            ScreenMsg(FONT_MCOLOR_LTYELLOW, MSG_INTERFACE, sTemp);
            wcscpy(sTemp, "");
            ubInterrupters = 1;
          }

          if (ubInterrupters > 1) {
            wcscat(sTemp, ", ");
          }
          wcscat(sTemp, pTempSoldier.value.name);
        }
      }
    }

    ScreenMsg(FONT_MCOLOR_LTYELLOW, MSG_INTERFACE, sTemp);

    DebugMsg(TOPIC_JA2, DBG_LEVEL_3, String("INTERRUPT: starting interrupt for %d", ubFirstInterrupter));
    // gusSelectedSoldier should become the topmost guy on the interrupt list
    // gusSelectedSoldier = ubFirstInterrupter;

    // Remove deadlock message
    EndDeadlockMsg();

    // Select guy....
    SelectSoldier(ubFirstInterrupter, TRUE, TRUE);

    // ATE; Slide to guy who got interrupted!
    SlideTo(NOWHERE, gubLastInterruptedGuy, NOBODY, SETLOCATOR);

    // Dirty panel interface!
    fInterfacePanelDirty = DIRTYLEVEL2;
    gTacticalStatus.ubCurrentTeam = pSoldier.value.bTeam;

    // Signal UI done enemy's turn
    guiPendingOverrideEvent = Enum207.LU_ENDUILOCK;
    HandleTacticalUI();

    InitPlayerUIBar(TRUE);
    // AddTopMessage( PLAYER_INTERRUPT_MESSAGE, Message[STR_INTERRUPT] );

    PlayJA2Sample(Enum330.ENDTURN_1, RATE_11025, MIDVOLUME, 1, MIDDLEPAN);

    // report any close call quotes for us here
    for (iCounter = gTacticalStatus.Team[gbPlayerNum].bFirstID; iCounter <= gTacticalStatus.Team[gbPlayerNum].bLastID; iCounter++) {
      if (OK_INSECTOR_MERC(MercPtrs[iCounter])) {
        if (MercPtrs[iCounter].value.fCloseCall) {
          if (MercPtrs[iCounter].value.bNumHitsThisTurn == 0 && !(MercPtrs[iCounter].value.usQuoteSaidExtFlags & SOLDIER_QUOTE_SAID_EXT_CLOSE_CALL) && Random(3) == 0) {
            // say close call quote!
            TacticalCharacterDialogue(MercPtrs[iCounter], Enum202.QUOTE_CLOSE_CALL);
            MercPtrs[iCounter].value.usQuoteSaidExtFlags |= SOLDIER_QUOTE_SAID_EXT_CLOSE_CALL;
          }
          MercPtrs[iCounter].value.fCloseCall = FALSE;
        }
      }
    }
  } else {
    // start interrupts for everyone on that side at once... and start AI with the lowest # guy

    // what we do is set everyone to moved except for people with interrupts at the moment
    /*
    cnt = gTacticalStatus.Team[ pSoldier->bTeam ].bFirstID;
    for ( pTempSoldier = MercPtrs[ cnt ]; cnt <= gTacticalStatus.Team[ pSoldier->bTeam ].bLastID; cnt++,pTempSoldier++)
    {
            if ( pTempSoldier->bActive )
            {
                    pTempSoldier->bMovedPriorToInterrupt = pTempSoldier->bMoved;
                    pTempSoldier->bMoved = TRUE;
            }
    }
    */

    while (1) {
      MercPtrs[ubInterrupter].value.bMoved = FALSE;

      DebugMsg(TOPIC_JA2, DBG_LEVEL_3, String("INTERRUPT: popping %d off of the interrupt queue", ubInterrupter));

      REMOVE_LATEST_INTERRUPT_GUY();
      // now LATEST_INTERRUPT_GUY is the guy before the previous
      ubInterrupter = LATEST_INTERRUPT_GUY();
      if (ubInterrupter == NOBODY) // previously emptied slot!
      {
        continue;
      } else if (MercPtrs[ubInterrupter].value.bTeam != bTeam) {
        break;
      } else if (ubInterrupter < ubFirstInterrupter) {
        ubFirstInterrupter = ubInterrupter;
      }
    }

    // here we have to rebuilt the AI list!
    BuildAIListForTeam(bTeam);

    // set to the new first interrupter
    cnt = RemoveFirstAIListEntry();

    pSoldier = MercPtrs[cnt];
    //		pSoldier = MercPtrs[ubFirstInterrupter];

    // if ( gTacticalStatus.ubCurrentTeam == OUR_TEAM)
    if (pSoldier.value.bTeam != OUR_TEAM) {
      // we're being interrupted by the computer!
      // we delay displaying any interrupt message until the computer
      // does something...
      gfHiddenInterrupt = TRUE;
      gTacticalStatus.fUnLockUIAfterHiddenInterrupt = FALSE;
    }
    // otherwise it's the AI interrupting another AI team

    gTacticalStatus.ubCurrentTeam = pSoldier.value.bTeam;

    StartNPCAI(pSoldier);
  }

  if (!gfHiddenInterrupt) {
    // Stop this guy....
    AdjustNoAPToFinishMove(MercPtrs[LATEST_INTERRUPT_GUY()], TRUE);
    MercPtrs[LATEST_INTERRUPT_GUY()].value.fTurningFromPronePosition = FALSE;
  }
}

function EndInterrupt(fMarkInterruptOccurred: BOOLEAN): void {
  let ubInterruptedSoldier: UINT8;
  let pSoldier: Pointer<SOLDIERTYPE>;
  let pTempSoldier: Pointer<SOLDIERTYPE>;
  let cnt: INT32;
  let fFound: BOOLEAN;
  let ubMinAPsToAttack: UINT8;

  for (cnt = gubOutOfTurnPersons; cnt > 0; cnt--) {
    DebugMsg(TOPIC_JA2, DBG_LEVEL_3, String("ENDINT:  Q position %d: %d", cnt, gubOutOfTurnOrder[cnt]));
  }

  // ATE: OK, now if this all happended on one frame, we may not have to stop
  // guy from walking... so set this flag to false if so...
  if (fMarkInterruptOccurred) {
    // flag as true if an int occurs which ends an interrupt (int loop)
    gTacticalStatus.fInterruptOccurred = TRUE;
  } else {
    gTacticalStatus.fInterruptOccurred = FALSE;
  }

  // Loop through all mercs and see if any passed on this interrupt
  cnt = gTacticalStatus.Team[gTacticalStatus.ubCurrentTeam].bFirstID;
  for (pTempSoldier = MercPtrs[cnt]; cnt <= gTacticalStatus.Team[gTacticalStatus.ubCurrentTeam].bLastID; cnt++, pTempSoldier++) {
    if (pTempSoldier.value.bActive && pTempSoldier.value.bInSector && !pTempSoldier.value.bMoved && (pTempSoldier.value.bActionPoints == pTempSoldier.value.bIntStartAPs)) {
      ubMinAPsToAttack = MinAPsToAttack(pTempSoldier, pTempSoldier.value.sLastTarget, FALSE);
      if ((ubMinAPsToAttack <= pTempSoldier.value.bActionPoints) && (ubMinAPsToAttack > 0)) {
        pTempSoldier.value.bPassedLastInterrupt = TRUE;
      }
    }
  }

  if (!EveryoneInInterruptListOnSameTeam()) {
    gfHiddenInterrupt = FALSE;

    // resume interrupted interrupt
    StartInterrupt();
  } else {
    ubInterruptedSoldier = LATEST_INTERRUPT_GUY();

    DebugMsg(TOPIC_JA2, DBG_LEVEL_3, String("INTERRUPT: interrupt over, %d's team regains control", ubInterruptedSoldier));

    pSoldier = MercPtrs[ubInterruptedSoldier];

    cnt = 0;
    for (pTempSoldier = MercPtrs[cnt]; cnt <= MAX_NUM_SOLDIERS; cnt++, pTempSoldier++) {
      if (pTempSoldier.value.bActive) {
        // AI guys only here...
        if (pTempSoldier.value.bActionPoints == 0) {
          pTempSoldier.value.bMoved = TRUE;
        } else if (pTempSoldier.value.bTeam != gbPlayerNum && pTempSoldier.value.bNewSituation == IS_NEW_SITUATION) {
          pTempSoldier.value.bMoved = FALSE;
        } else {
          pTempSoldier.value.bMoved = pTempSoldier.value.bMovedPriorToInterrupt;
        }
      }
    }

    // change team
    gTacticalStatus.ubCurrentTeam = pSoldier.value.bTeam;
    // switch appropriate messages & flags
    if (pSoldier.value.bTeam == OUR_TEAM) {
      // set everyone on the team to however they were set moved before the interrupt
      // must do this before selecting soldier...
      /*
      cnt = gTacticalStatus.Team[ gTacticalStatus.ubCurrentTeam ].bFirstID;
      for ( pTempSoldier = MercPtrs[ cnt ]; cnt <= gTacticalStatus.Team[ gTacticalStatus.ubCurrentTeam ].bLastID; cnt++,pTempSoldier++)
      {
              if ( pTempSoldier->bActive )
              {
                      pTempSoldier->bMoved = pTempSoldier->bMovedPriorToInterrupt;
              }
      }
      */

      ClearIntList();

      // Select soldier....
      if (MercPtrs[ubInterruptedSoldier].value.bLife < OKLIFE) {
        SelectNextAvailSoldier(MercPtrs[ubInterruptedSoldier]);
      } else {
        SelectSoldier(ubInterruptedSoldier, FALSE, FALSE);
      }

      if (gfHiddenInterrupt) {
        // Try to make things look like nothing happened at all.
        gfHiddenInterrupt = FALSE;

        // If we can continue a move, do so!
        if (MercPtrs[gusSelectedSoldier].value.fNoAPToFinishMove && pSoldier.value.ubReasonCantFinishMove != Enum263.REASON_STOPPED_SIGHT) {
          // Continue
          AdjustNoAPToFinishMove(MercPtrs[gusSelectedSoldier], FALSE);

          if (MercPtrs[gusSelectedSoldier].value.sGridNo != MercPtrs[gusSelectedSoldier].value.sFinalDestination) {
            EVENT_GetNewSoldierPath(MercPtrs[gusSelectedSoldier], MercPtrs[gusSelectedSoldier].value.sFinalDestination, MercPtrs[gusSelectedSoldier].value.usUIMovementMode);
          } else {
            UnSetUIBusy(pSoldier.value.ubID);
          }
        } else {
          UnSetUIBusy(pSoldier.value.ubID);
        }

        if (gTacticalStatus.fUnLockUIAfterHiddenInterrupt) {
          gTacticalStatus.fUnLockUIAfterHiddenInterrupt = FALSE;
          UnSetUIBusy(pSoldier.value.ubID);
        }
      } else {
        // Signal UI done enemy's turn
        /// ATE: This used to be ablow so it would get done for
        // both hidden interrupts as well - NOT good because
        // hidden interrupts should leave it locked if it was already...
        guiPendingOverrideEvent = Enum207.LU_ENDUILOCK;
        HandleTacticalUI();

        if (gusSelectedSoldier != NO_SOLDIER) {
          SlideTo(NOWHERE, gusSelectedSoldier, NOBODY, SETLOCATOR);

          // Say ATTENTION SOUND...
          DoMercBattleSound(MercPtrs[gusSelectedSoldier], Enum259.BATTLE_SOUND_ATTN1);

          if (gsInterfaceLevel == 1) {
            gTacticalStatus.uiFlags |= SHOW_ALL_ROOFS;
            InvalidateWorldRedundency();
            SetRenderFlags(RENDER_FLAG_FULL);
            ErasePath(FALSE);
          }
        }
        // 2 indicates that we're ending an interrupt and going back to
        // normal player's turn without readjusting time left in turn (for
        // timed turns)
        InitPlayerUIBar(2);
      }
    } else {
      // this could be set to true for AI-vs-AI interrupts
      gfHiddenInterrupt = FALSE;

      // Dirty panel interface!
      fInterfacePanelDirty = DIRTYLEVEL2;

      // Erase path!
      ErasePath(TRUE);

      // Reset flags
      gfPlotNewMovement = TRUE;

      // restart AI with first available soldier
      fFound = FALSE;

      // rebuild list for this team if anyone on the team is still available
      cnt = gTacticalStatus.Team[ENEMY_TEAM].bFirstID;
      for (pTempSoldier = MercPtrs[cnt]; cnt <= gTacticalStatus.Team[gTacticalStatus.ubCurrentTeam].bLastID; cnt++, pTempSoldier++) {
        if (pTempSoldier.value.bActive && pTempSoldier.value.bInSector && pTempSoldier.value.bLife >= OKLIFE) {
          fFound = TRUE;
          break;
        }
      }

      if (fFound) {
        // reset found flag because we are rebuilding the AI list
        fFound = FALSE;

        if (BuildAIListForTeam(gTacticalStatus.ubCurrentTeam)) {
          // now bubble up everyone left in the interrupt queue, starting
          // at the front of the array
          for (cnt = 1; cnt <= gubOutOfTurnPersons; cnt++) {
            MoveToFrontOfAIList(gubOutOfTurnOrder[cnt]);
          }

          cnt = RemoveFirstAIListEntry();
          if (cnt != NOBODY) {
            fFound = TRUE;
            StartNPCAI(MercPtrs[cnt]);
          }
        }
      }

      if (fFound) {
        // back to the computer!
        if (gTacticalStatus.ubCurrentTeam == CREATURE_TEAM && BloodcatsPresent()) {
          AddTopMessage(Enum216.COMPUTER_TURN_MESSAGE, Message[Enum334.STR_BLOODCATS_TURN]);
        } else {
          AddTopMessage(Enum216.COMPUTER_TURN_MESSAGE, TeamTurnString[gTacticalStatus.ubCurrentTeam]);
        }

        // Signal UI done enemy's turn
        guiPendingOverrideEvent = Enum207.LU_BEGINUILOCK;

        ClearIntList();
      } else {
        // back to the computer!
        if (gTacticalStatus.ubCurrentTeam == CREATURE_TEAM && BloodcatsPresent()) {
          AddTopMessage(Enum216.COMPUTER_TURN_MESSAGE, Message[Enum334.STR_BLOODCATS_TURN]);
        } else {
          AddTopMessage(Enum216.COMPUTER_TURN_MESSAGE, TeamTurnString[gTacticalStatus.ubCurrentTeam]);
        }

        // Signal UI done enemy's turn
        guiPendingOverrideEvent = Enum207.LU_BEGINUILOCK;

        // must clear int list before ending turn
        ClearIntList();
        EndAITurn();
      }
    }

    // Reset our interface!
    fInterfacePanelDirty = DIRTYLEVEL2;
  }
}

function StandardInterruptConditionsMet(pSoldier: Pointer<SOLDIERTYPE>, ubOpponentID: UINT8, bOldOppList: INT8): BOOLEAN {
  //	UINT8 ubAniType;
  let ubMinPtsNeeded: UINT8;
  let bDir: INT8;
  let pOpponent: Pointer<SOLDIERTYPE>;

  if ((gTacticalStatus.uiFlags & TURNBASED) && (gTacticalStatus.uiFlags & INCOMBAT) && !(gubSightFlags & SIGHT_INTERRUPT)) {
    return FALSE;
  }

  if (gTacticalStatus.ubAttackBusyCount > 0) {
    return FALSE;
  }

  if (ubOpponentID < NOBODY) {
    /*
    // only the OPPONENT'S controller's decision matters
    if (Menptr[ubOpponentID].controller != Net.pnum)
    {
            return(FALSE);
    }
    */

    // ALEX
    // if interrupts are restricted to a particular opponent only & he's not it
    if ((InterruptOnlyGuynum != NOBODY) && (ubOpponentID != InterruptOnlyGuynum)) {
      return FALSE;
    }

    pOpponent = MercPtrs[ubOpponentID];
  } else // no opponent, so controller of 'ptr' makes the call instead
  {
    // ALEX
    if (gsWhoThrewRock >= NOBODY) {
      return FALSE;
    }

    // the machine that controls the guy who threw the rock makes the decision
    /*
    if (Menptr[WhoThrewRock].controller != Net.pnum)
            return(FALSE);
    */
    pOpponent = null;
  }

  // if interrupts have been disabled for any reason
  if (!InterruptsAllowed) {
    return FALSE;
  }

  // in non-combat allow interrupt points to be calculated freely (everyone's in control!)
  // also allow calculation for storing in AllTeamsLookForAll
  if ((gTacticalStatus.uiFlags & INCOMBAT) && (gubBestToMakeSightingSize != BEST_SIGHTING_ARRAY_SIZE_ALL_TEAMS_LOOK_FOR_ALL)) {
    // if his team's already in control
    if (pSoldier.value.bTeam == gTacticalStatus.ubCurrentTeam) {
      // if this is a player's a merc or civilian
      if ((pSoldier.value.uiStatusFlags & SOLDIER_PC) || PTR_CIVILIAN()) {
        // then they are not allowed to interrupt their own team
        return FALSE;
      } else {
        // enemies, MAY interrupt each other, but NOT themselves!
        // if ( pSoldier->uiStatusFlags & SOLDIER_UNDERAICONTROL )
        //{
        return FALSE;
        //}
      }

      // CJC, July 9 1998
      // NO ONE EVER interrupts his own team
      // return( FALSE );
    } else if (gTacticalStatus.bBoxingState != Enum247.NOT_BOXING) {
      // while anything to do with boxing is going on, skip interrupts!
      return FALSE;
    }
  }

  if (!(pSoldier.value.bActive) || !(pSoldier.value.bInSector)) {
    return FALSE;
  }

  // soldiers at less than OKLIFE can't perform any actions
  if (pSoldier.value.bLife < OKLIFE) {
    return FALSE;
  }

  // soldiers out of breath are about to fall over, no interrupt
  if (pSoldier.value.bBreath < OKBREATH || pSoldier.value.bCollapsed) {
    return FALSE;
  }

  // if soldier doesn't have enough APs
  if (pSoldier.value.bActionPoints < MIN_APS_TO_INTERRUPT) {
    return FALSE;
  }

  // soldiers gagging on gas are too busy about holding their cookies down...
  if (pSoldier.value.uiStatusFlags & SOLDIER_GASSED) {
    return FALSE;
  }

  // a soldier already engaged in a life & death battle is too busy doing his
  // best to survive to worry about "getting the jump" on additional threats
  if (pSoldier.value.bUnderFire) {
    return FALSE;
  }

  if (pSoldier.value.bCollapsed) {
    return FALSE;
  }

  // don't allow neutral folks to get interrupts
  if (pSoldier.value.bNeutral) {
    return FALSE;
  }

  // no EPCs allowed to get interrupts
  if (AM_AN_EPC(pSoldier) && !AM_A_ROBOT(pSoldier)) {
    return FALSE;
  }

  // don't let mercs on assignment get interrupts
  if (pSoldier.value.bTeam == gbPlayerNum && pSoldier.value.bAssignment >= Enum117.ON_DUTY) {
    return FALSE;
  }

  // the bare minimum default is enough APs left to TURN
  ubMinPtsNeeded = AP_CHANGE_FACING;

  // if the opponent is SOMEBODY
  if (ubOpponentID < NOBODY) {
    // if the soldiers are on the same side
    if (pSoldier.value.bSide == pOpponent.value.bSide) {
      // human/civilians on same side can't interrupt each other
      if ((pSoldier.value.uiStatusFlags & SOLDIER_PC) || PTR_CIVILIAN()) {
        return FALSE;
      } else // enemy
      {
        // enemies can interrupt EACH OTHER, but enemies and civilians on the
        // same side (but different teams) can't interrupt each other.
        if (pSoldier.value.bTeam != pOpponent.value.bTeam) {
          return FALSE;
        }
      }
    }

    // if the interrupted opponent is not the selected character, then the only
    // people eligible to win an interrupt are those on the SAME SIDE AS
    // the selected character, ie. his friends...
    if (pOpponent.value.bTeam == gbPlayerNum) {
      if ((ubOpponentID != gusSelectedSoldier) && (pSoldier.value.bSide != Menptr[gusSelectedSoldier].bSide)) {
        return FALSE;
      }
    } else {
      if (!(pOpponent.value.uiStatusFlags & SOLDIER_UNDERAICONTROL) && (pSoldier.value.bSide != pOpponent.value.bSide)) {
        return FALSE;
      }
    }
    /* old DG code for same:

    if ((ubOpponentID != gusSelectedSoldier) && (pSoldier->bSide != Menptr[gusSelectedSoldier].bSide))
    {
            return(FALSE);
    }
    */

    // an non-active soldier can't interrupt a soldier who is also non-active!
    if ((pOpponent.value.bTeam != gTacticalStatus.ubCurrentTeam) && (pSoldier.value.bTeam != gTacticalStatus.ubCurrentTeam)) {
      return FALSE;
    }

    // if this is a "SEEING" interrupt
    if (pSoldier.value.bOppList[ubOpponentID] == SEEN_CURRENTLY) {
      // if pSoldier already saw the opponent last "look" or at least this turn
      if ((bOldOppList == SEEN_CURRENTLY) || (bOldOppList == SEEN_THIS_TURN)) {
        return (FALSE); // no interrupt is possible
      }

      // if the soldier is behind him and not very close, forget it
      bDir = atan8(pSoldier.value.sX, pSoldier.value.sY, pOpponent.value.sX, pOpponent.value.sY);
      if (gOppositeDirection[pSoldier.value.bDesiredDirection] == bDir) {
        // directly behind; allow interrupts only within # of tiles equal to level
        if (PythSpacesAway(pSoldier.value.sGridNo, pOpponent.value.sGridNo) > EffectiveExpLevel(pSoldier)) {
          return FALSE;
        }
      }

      // if the soldier isn't currently crouching
      if (!PTR_CROUCHED()) {
        ubMinPtsNeeded = AP_CROUCH;
      } else {
        ubMinPtsNeeded = MinPtsToMove(pSoldier);
      }
    } else // this is a "HEARING" interrupt
    {
      // if the opponent can't see the "interrupter" either, OR
      // if the "interrupter" already has any opponents already in sight, OR
      // if the "interrupter" already heard the active soldier this turn
      if ((pOpponent.value.bOppList[pSoldier.value.ubID] != SEEN_CURRENTLY) || (pSoldier.value.bOppCnt > 0) || (bOldOppList == HEARD_THIS_TURN)) {
        return (FALSE); // no interrupt is possible
      }
    }
  }

  // soldiers without sufficient APs to do something productive can't interrupt
  if (pSoldier.value.bActionPoints < ubMinPtsNeeded) {
    return FALSE;
  }

  // soldier passed on the chance to react during previous interrupt this turn
  if (pSoldier.value.bPassedLastInterrupt) {
    return FALSE;
  }

  return TRUE;
}

function CalcInterruptDuelPts(pSoldier: Pointer<SOLDIERTYPE>, ubOpponentID: UINT8, fUseWatchSpots: BOOLEAN): INT8 {
  let bPoints: INT8;
  let bLightLevel: INT8;
  let ubDistance: UINT8;

  // extra check to make sure neutral folks never get interrupts
  if (pSoldier.value.bNeutral) {
    return NO_INTERRUPT;
  }

  // BASE is one point for each experience level.

  // Robot has interrupt points based on the controller...
  // Controller's interrupt points are reduced by 2 for being distracted...
  if (pSoldier.value.uiStatusFlags & SOLDIER_ROBOT && CanRobotBeControlled(pSoldier)) {
    bPoints = EffectiveExpLevel(MercPtrs[pSoldier.value.ubRobotRemoteHolderID]) - 2;
  } else {
    bPoints = EffectiveExpLevel(pSoldier);
    /*
    if ( pSoldier->bTeam == ENEMY_TEAM )
    {
            // modify by the difficulty level setting
            bPoints += gbDiff[ DIFF_ENEMY_INTERRUPT_MOD ][ SoldierDifficultyLevel( pSoldier ) ];
            bPoints = __max( bPoints, 9 );
    }
    */

    if (ControllingRobot(pSoldier)) {
      bPoints -= 2;
    }
  }

  if (fUseWatchSpots) {
    // if this is a previously noted spot of enemies, give bonus points!
    bPoints += GetWatchedLocPoints(pSoldier.value.ubID, MercPtrs[ubOpponentID].value.sGridNo, MercPtrs[ubOpponentID].value.bLevel);
  }

  // LOSE one point for each 2 additional opponents he currently sees, above 2
  if (pSoldier.value.bOppCnt > 2) {
    // subtract 1 here so there is a penalty of 1 for seeing 3 enemies
    bPoints -= (pSoldier.value.bOppCnt - 1) / 2;
  }

  // LOSE one point if he's trying to interrupt only by hearing
  if (pSoldier.value.bOppList[ubOpponentID] == HEARD_THIS_TURN) {
    bPoints--;
  }

  // if soldier is still in shock from recent injuries, that penalizes him
  bPoints -= pSoldier.value.bShock;

  ubDistance = PythSpacesAway(pSoldier.value.sGridNo, MercPtrs[ubOpponentID].value.sGridNo);

  // if we are in combat mode - thus doing an interrupt rather than determine who gets first turn -
  // then give bonus
  if ((gTacticalStatus.uiFlags & INCOMBAT) && (pSoldier.value.bTeam != gTacticalStatus.ubCurrentTeam)) {
    // passive player gets penalty due to range
    bPoints -= (ubDistance / 10);
  } else {
    // either non-combat or the player with the current turn... i.e. active...
    // unfortunately we can't use opplist here to record whether or not we saw this guy before, because at this point
    // the opplist has been updated to seen.  But we can use gbSeenOpponents ...

    // this soldier is moving, so give them a bonus for crawling or swatting at long distances
    if (!gbSeenOpponents[ubOpponentID][pSoldier.value.ubID]) {
      if (pSoldier.value.usAnimState == Enum193.SWATTING && ubDistance > (MaxDistanceVisible() / 2)) // more than 1/2 sight distance
      {
        bPoints++;
      } else if (pSoldier.value.usAnimState == Enum193.CRAWLING && ubDistance > (MaxDistanceVisible() / 4)) // more than 1/4 sight distance
      {
        bPoints += ubDistance / STRAIGHT;
      }
    }
  }

  // whether active or not, penalize people who are running
  if (pSoldier.value.usAnimState == Enum193.RUNNING && !gbSeenOpponents[pSoldier.value.ubID][ubOpponentID]) {
    bPoints -= 2;
  }

  if (pSoldier.value.ubServicePartner != NOBODY) {
    // distracted by being bandaged/doing bandaging
    bPoints -= 2;
  }

  if (HAS_SKILL_TRAIT(pSoldier, Enum269.NIGHTOPS)) {
    bLightLevel = LightTrueLevel(pSoldier.value.sGridNo, pSoldier.value.bLevel);
    if (bLightLevel > NORMAL_LIGHTLEVEL_DAY + 3) {
      // it's dark, give a bonus for interrupts
      bPoints += 1 * NUM_SKILL_TRAITS(pSoldier, Enum269.NIGHTOPS);
    }
  }

  // if he's a computer soldier

  // CJC note: this will affect friendly AI as well...

  if (pSoldier.value.uiStatusFlags & SOLDIER_PC) {
    if (pSoldier.value.bAssignment >= Enum117.ON_DUTY) {
      // make sure don't get interrupts!
      bPoints = -10;
    }

    // GAIN one point if he's previously seen the opponent
    // check for TRUE because -1 means we JUST saw him (always so here)
    if (gbSeenOpponents[pSoldier.value.ubID][ubOpponentID] == TRUE) {
      bPoints++; // seen him before, easier to react to him
    }
  } else if (pSoldier.value.bTeam == ENEMY_TEAM) {
    // GAIN one point if he's previously seen the opponent
    // check for TRUE because -1 means we JUST saw him (always so here)
    if (gbSeenOpponents[pSoldier.value.ubID][ubOpponentID] == TRUE) {
      bPoints++; // seen him before, easier to react to him
    } else if (gbPublicOpplist[pSoldier.value.bTeam][ubOpponentID] != NOT_HEARD_OR_SEEN) {
      // GAIN one point if opponent has been recently radioed in by his team
      bPoints++;
    }
  }

  if (TANK(pSoldier)) {
    // reduce interrupt possibilities for tanks!
    bPoints /= 2;
  }

  if (bPoints >= AUTOMATIC_INTERRUPT) {
    bPoints = AUTOMATIC_INTERRUPT - 1; // hack it to one less than max so its legal
  }

  return bPoints;
}

function InterruptDuel(pSoldier: Pointer<SOLDIERTYPE>, pOpponent: Pointer<SOLDIERTYPE>): BOOLEAN {
  let fResult: BOOLEAN = FALSE;

  // if opponent can't currently see us and we can see them
  if (pSoldier.value.bOppList[pOpponent.value.ubID] == SEEN_CURRENTLY && pOpponent.value.bOppList[pSoldier.value.ubID] != SEEN_CURRENTLY) {
    fResult = TRUE; // we automatically interrupt
    // fix up our interrupt duel pts if necessary
    if (pSoldier.value.bInterruptDuelPts < pOpponent.value.bInterruptDuelPts) {
      pSoldier.value.bInterruptDuelPts = pOpponent.value.bInterruptDuelPts;
    }
  } else {
    // If our total points is HIGHER, then we interrupt him anyway
    if (pSoldier.value.bInterruptDuelPts > pOpponent.value.bInterruptDuelPts) {
      fResult = TRUE;
    }
  }
  //	ScreenMsg( FONT_MCOLOR_LTYELLOW, MSG_INTERFACE, L"Interrupt duel %d (%d pts) vs %d (%d pts)", pSoldier->ubID, pSoldier->bInterruptDuelPts, pOpponent->ubID, pOpponent->bInterruptDuelPts );
  return fResult;
}

function DeleteFromIntList(ubIndex: UINT8, fCommunicate: BOOLEAN): void {
  let ubLoop: UINT8;
  let ubID: UINT8;

  if (ubIndex > gubOutOfTurnPersons) {
    return;
  }

  // remember who we're getting rid of
  ubID = gubOutOfTurnOrder[ubIndex];

  //	ScreenMsg( FONT_MCOLOR_LTYELLOW, MSG_INTERFACE, L"%d removed from int list", ubID );
  // if we're NOT deleting the LAST entry in the int list
  if (ubIndex < gubOutOfTurnPersons) {
    // not the last entry, must move all those behind it over to fill the gap
    for (ubLoop = ubIndex; ubLoop < gubOutOfTurnPersons; ubLoop++) {
      gubOutOfTurnOrder[ubLoop] = gubOutOfTurnOrder[ubLoop + 1];
    }
  }

  // either way, whack the last entry to NOBODY and decrement the list size
  gubOutOfTurnOrder[gubOutOfTurnPersons] = NOBODY;
  gubOutOfTurnPersons--;

  // once the last interrupted guy gets deleted from the list, he's no longer
  // the last interrupted guy!
  /*
  if (Status.lastInterruptedWas == ubID)
  {
          Status.lastInterruptedWas = NOBODY;
  }
  */
}

function AddToIntList(ubID: UINT8, fGainControl: BOOLEAN, fCommunicate: BOOLEAN): void {
  let ubLoop: UINT8;

  //	ScreenMsg( FONT_MCOLOR_LTYELLOW, MSG_INTERFACE, L"%d added to int list", ubID );
  DebugMsg(TOPIC_JA2, DBG_LEVEL_3, String("INTERRUPT: adding ID %d who %s", ubID, fGainControl ? "gains control" : "loses control"));

  // check whether 'who' is already anywhere on the queue after the first index
  // which we want to preserve so we can restore turn order
  for (ubLoop = 2; ubLoop <= gubOutOfTurnPersons; ubLoop++) {
    if (gubOutOfTurnOrder[ubLoop] == ubID) {
      if (!fGainControl) {
        // he's LOSING control; that's it, we're done, DON'T add him to the queue again
        gubLastInterruptedGuy = ubID;
        return;
      } else {
        // GAINING control, so delete him from this slot (because later he'll
        // get added to the end and we don't want him listed more than once!)
        DeleteFromIntList(ubLoop, FALSE);
      }
    }
  }

  // increment total (making index valid) and add him to list
  gubOutOfTurnPersons++;
  gubOutOfTurnOrder[gubOutOfTurnPersons] = ubID;

  /*
          // the guy being interrupted HAS to be the currently selected character
          if (Status.lastInterruptedWas != CharacterSelected)
          {
                  // if we don't already do so, remember who that was
                  Status.lastInterruptedWas = CharacterSelected;
          }
  */

  // if the guy is gaining control
  if (fGainControl) {
    // record his initial APs at the start of his interrupt at this time
    // this is not the ideal place for this, but it's the best I could do...
    Menptr[ubID].bIntStartAPs = Menptr[ubID].bActionPoints;
  } else {
    gubLastInterruptedGuy = ubID;
    // turn off AI control flag if they lost control
    if (Menptr[ubID].uiStatusFlags & SOLDIER_UNDERAICONTROL) {
      DebugAI(String("Taking away AI control from %d", ubID));
      Menptr[ubID].uiStatusFlags &= (~SOLDIER_UNDERAICONTROL);
    }
  }
}

function VerifyOutOfTurnOrderArray(): void {
  let ubTeamHighest: UINT8[] /* [MAXTEAMS] */ = [ 0 ];
  let ubTeamsInList: UINT8;
  let ubNextInArrayOnTeam: UINT8;
  let ubNextIndex: UINT8;
  let ubTeam: UINT8;
  let ubLoop: UINT8;
  let ubLoop2: UINT8;
  let fFoundLoop: BOOLEAN = FALSE;

  for (ubLoop = 1; ubLoop <= gubOutOfTurnPersons; ubLoop++) {
    ubTeam = Menptr[gubOutOfTurnOrder[ubLoop]].bTeam;
    if (ubTeamHighest[ubTeam] > 0) {
      // check the other teams to see if any of them are between our last team's mention in
      // the array and this
      for (ubLoop2 = 0; ubLoop2 < MAXTEAMS; ubLoop2++) {
        if (ubLoop2 == ubTeam) {
          continue;
        } else {
          if (ubTeamHighest[ubLoop2] > ubTeamHighest[ubTeam]) {
            // there's a loop!! delete it!
            ubNextInArrayOnTeam = gubOutOfTurnOrder[ubLoop];
            ubNextIndex = ubTeamHighest[ubTeam] + 1;

            while (gubOutOfTurnOrder[ubNextIndex] != ubNextInArrayOnTeam) {
              // Pause them...
              AdjustNoAPToFinishMove(MercPtrs[gubOutOfTurnOrder[ubNextIndex]], TRUE);

              // If they were turning from prone, stop them
              MercPtrs[gubOutOfTurnOrder[ubNextIndex]].value.fTurningFromPronePosition = FALSE;

              DeleteFromIntList(ubNextIndex, FALSE);
            }

            fFoundLoop = TRUE;
            break;
          }
        }
      }

      if (fFoundLoop) {
        // at this point we should restart our outside loop (ugh)
        fFoundLoop = FALSE;
        for (ubLoop2 = 0; ubLoop2 < MAXTEAMS; ubLoop2++) {
          ubTeamHighest[ubLoop2] = 0;
        }
        ubLoop = 0;
        continue;
      }
    }

    ubTeamHighest[ubTeam] = ubLoop;
  }

  // Another potential problem: the player is interrupted by the enemy who is interrupted by
  // the militia.  In this situation the enemy should just lose their interrupt.
  // (Or, the militia is interrupted by the enemy who is interrupted by the player.)

  // Check for 3+ teams in the interrupt queue.  If three exist then abort all interrupts (return
  // control to the first team)
  ubTeamsInList = 0;
  for (ubLoop = 0; ubLoop < MAXTEAMS; ubLoop++) {
    if (ubTeamHighest[ubLoop] > 0) {
      ubTeamsInList++;
    }
  }
  if (ubTeamsInList >= 3) {
    // This is bad.  Loop through everyone but the first person in the INT list and remove 'em
    for (ubLoop = 2; ubLoop <= gubOutOfTurnPersons;) {
      if (MercPtrs[gubOutOfTurnOrder[ubLoop]].value.bTeam != MercPtrs[gubOutOfTurnOrder[1]].value.bTeam) {
        // remove!

        // Pause them...
        AdjustNoAPToFinishMove(MercPtrs[gubOutOfTurnOrder[ubLoop]], TRUE);

        // If they were turning from prone, stop them
        MercPtrs[gubOutOfTurnOrder[ubLoop]].value.fTurningFromPronePosition = FALSE;

        DeleteFromIntList(ubLoop, FALSE);

        // since we deleted someone from the list, we want to check the same index in the
        // array again, hence we DON'T increment.
      } else {
        ubLoop++;
      }
    }
  }
}

function DoneAddingToIntList(pSoldier: Pointer<SOLDIERTYPE>, fChange: BOOLEAN, ubInterruptType: UINT8): void {
  if (fChange) {
    VerifyOutOfTurnOrderArray();
    if (EveryoneInInterruptListOnSameTeam()) {
      EndInterrupt(TRUE);
    } else {
      StartInterrupt();
    }
  }
}

function ResolveInterruptsVs(pSoldier: Pointer<SOLDIERTYPE>, ubInterruptType: UINT8): void {
  let ubTeam: UINT8;
  let ubOpp: UINT8;
  let ubIntCnt: UINT8;
  let ubIntList: UINT8[] /* [MAXMERCS] */;
  let ubIntDiff: UINT8[] /* [MAXMERCS] */;
  let ubSmallestDiff: UINT8;
  let ubSlot: UINT8;
  let ubSmallestSlot: UINT8;
  let ubLoop: UINT8;
  let fIntOccurs: BOOLEAN;
  let pOpponent: Pointer<SOLDIERTYPE>;
  let fControlChanged: BOOLEAN = FALSE;

  if ((gTacticalStatus.uiFlags & TURNBASED) && (gTacticalStatus.uiFlags & INCOMBAT)) {
    ubIntCnt = 0;

    for (ubTeam = 0; ubTeam < MAXTEAMS; ubTeam++) {
      if (gTacticalStatus.Team[ubTeam].bTeamActive && (gTacticalStatus.Team[ubTeam].bSide != pSoldier.value.bSide) && ubTeam != CIV_TEAM) {
        for (ubOpp = gTacticalStatus.Team[ubTeam].bFirstID; ubOpp <= gTacticalStatus.Team[ubTeam].bLastID; ubOpp++) {
          pOpponent = MercPtrs[ubOpp];
          if (pOpponent.value.bActive && pOpponent.value.bInSector && (pOpponent.value.bLife >= OKLIFE) && !(pOpponent.value.bCollapsed)) {
            if (ubInterruptType == NOISEINTERRUPT) {
              // don't grant noise interrupts at greater than max. visible distance
              if (PythSpacesAway(pSoldier.value.sGridNo, pOpponent.value.sGridNo) > MaxDistanceVisible()) {
                pOpponent.value.bInterruptDuelPts = NO_INTERRUPT;
                continue;
              }
            } else if (pOpponent.value.bOppList[pSoldier.value.ubID] != SEEN_CURRENTLY) {
              pOpponent.value.bInterruptDuelPts = NO_INTERRUPT;

              continue;
            }

            switch (pOpponent.value.bInterruptDuelPts) {
              case NO_INTERRUPT: // no interrupt possible, no duel necessary
                fIntOccurs = FALSE;
                break;

              case AUTOMATIC_INTERRUPT: // interrupts occurs automatically
                pSoldier.value.bInterruptDuelPts = 0; // just to have a valid intDiff later
                fIntOccurs = TRUE;
                break;

              default: // interrupt is possible, run a duel
                DebugMsg(TOPIC_JA2, DBG_LEVEL_3, "Calculating int duel pts for onlooker in ResolveInterruptsVs");
                pSoldier.value.bInterruptDuelPts = CalcInterruptDuelPts(pSoldier, pOpponent.value.ubID, TRUE);
                fIntOccurs = InterruptDuel(pOpponent, pSoldier);

                break;
            }

            if (fIntOccurs) {
              // remember that this opponent's scheduled to interrupt us
              ubIntList[ubIntCnt] = pOpponent.value.ubID;

              // and by how much he beat us in the duel
              ubIntDiff[ubIntCnt] = pOpponent.value.bInterruptDuelPts - pSoldier.value.bInterruptDuelPts;

              // increment counter of interrupts lost
              ubIntCnt++;
            } else {
              /*
                      if (pOpponent->bInterruptDuelPts != NO_INTERRUPT)
                      {
                              ScreenMsg( FONT_MCOLOR_LTYELLOW, MSG_INTERFACE, L"%d fails to interrupt %d (%d vs %d pts)", pOpponent->ubID, pSoldier->ubID, pOpponent->bInterruptDuelPts, pSoldier->bInterruptDuelPts);
                      }
                      */
            }

// either way, clear out both sides' bInterruptDuelPts field to prepare next one

            pSoldier.value.bInterruptDuelPts = NO_INTERRUPT;

            pOpponent.value.bInterruptDuelPts = NO_INTERRUPT;
          }
        }
      }
    }

    // if any interrupts are scheduled to occur (ie. I lost at least once)
    if (ubIntCnt) {
      // First add currently active character to the interrupt queue.  This is
      // USUALLY pSoldier->guynum, but NOT always, because one enemy can
      // "interrupt" on another enemy's turn if he hears another team's wound
      // victim's screaming...  the guy screaming is pSoldier here, it's not his turn!
      // AddToIntList( (UINT8) gusSelectedSoldier, FALSE, TRUE);

      if ((gTacticalStatus.ubCurrentTeam != pSoldier.value.bTeam) && !(gTacticalStatus.Team[gTacticalStatus.ubCurrentTeam].bHuman)) {
        // if anyone on this team is under AI control, remove
        // their AI control flag and put them on the queue instead of this guy
        for (ubLoop = gTacticalStatus.Team[gTacticalStatus.ubCurrentTeam].bFirstID; ubLoop <= gTacticalStatus.Team[gTacticalStatus.ubCurrentTeam].bLastID; ubLoop++) {
          if ((MercPtrs[ubLoop].value.uiStatusFlags & SOLDIER_UNDERAICONTROL)) {
            // this guy lost control
            MercPtrs[ubLoop].value.uiStatusFlags &= (~SOLDIER_UNDERAICONTROL);
            AddToIntList(ubLoop, FALSE, TRUE);
            break;
          }
        }
      } else {
        // this guy lost control
        AddToIntList(pSoldier.value.ubID, FALSE, TRUE);
      }

      // loop once for each opponent who interrupted
      for (ubLoop = 0; ubLoop < ubIntCnt; ubLoop++) {
        // find the smallest intDiff still remaining in the list
        ubSmallestDiff = NO_INTERRUPT;
        ubSmallestSlot = NOBODY;

        for (ubSlot = 0; ubSlot < ubIntCnt; ubSlot++) {
          if (ubIntDiff[ubSlot] < ubSmallestDiff) {
            ubSmallestDiff = ubIntDiff[ubSlot];
            ubSmallestSlot = ubSlot;
          }
        }

        if (ubSmallestSlot < NOBODY) {
          // add this guy to everyone's interrupt queue
          AddToIntList(ubIntList[ubSmallestSlot], TRUE, TRUE);
          if (INTERRUPTS_OVER()) {
            // a loop was created which removed all the people in the interrupt queue!
            EndInterrupt(TRUE);
            return;
          }

          ubIntDiff[ubSmallestSlot] = NO_INTERRUPT; // mark slot as been handled
        }
      }

      fControlChanged = TRUE;
    }

    // sends off an end-of-list msg telling everyone whether to switch control,
    // unless it's a MOVEMENT interrupt, in which case that is delayed til later
    DoneAddingToIntList(pSoldier, fControlChanged, ubInterruptType);
  }
}

function SaveTeamTurnsToTheSaveGameFile(hFile: HWFILE): BOOLEAN {
  let uiNumBytesWritten: UINT32;
  let TeamTurnStruct: TEAM_TURN_SAVE_STRUCT;

  // Save the gubTurn Order Array
  FileWrite(hFile, gubOutOfTurnOrder, sizeof(UINT8) * MAXMERCS, addressof(uiNumBytesWritten));
  if (uiNumBytesWritten != sizeof(UINT8) * MAXMERCS) {
    return FALSE;
  }

  TeamTurnStruct.ubOutOfTurnPersons = gubOutOfTurnPersons;

  TeamTurnStruct.InterruptOnlyGuynum = InterruptOnlyGuynum;
  TeamTurnStruct.sWhoThrewRock = gsWhoThrewRock;
  TeamTurnStruct.InterruptsAllowed = InterruptsAllowed;
  TeamTurnStruct.fHiddenInterrupt = gfHiddenInterrupt;
  TeamTurnStruct.ubLastInterruptedGuy = gubLastInterruptedGuy;

  // Save the Team turn save structure
  FileWrite(hFile, addressof(TeamTurnStruct), sizeof(TEAM_TURN_SAVE_STRUCT), addressof(uiNumBytesWritten));
  if (uiNumBytesWritten != sizeof(TEAM_TURN_SAVE_STRUCT)) {
    return FALSE;
  }

  return TRUE;
}

function LoadTeamTurnsFromTheSavedGameFile(hFile: HWFILE): BOOLEAN {
  let uiNumBytesRead: UINT32;
  let TeamTurnStruct: TEAM_TURN_SAVE_STRUCT;

  // Load the gubTurn Order Array
  FileRead(hFile, gubOutOfTurnOrder, sizeof(UINT8) * MAXMERCS, addressof(uiNumBytesRead));
  if (uiNumBytesRead != sizeof(UINT8) * MAXMERCS) {
    return FALSE;
  }

  // Load the Team turn save structure
  FileRead(hFile, addressof(TeamTurnStruct), sizeof(TEAM_TURN_SAVE_STRUCT), addressof(uiNumBytesRead));
  if (uiNumBytesRead != sizeof(TEAM_TURN_SAVE_STRUCT)) {
    return FALSE;
  }

  gubOutOfTurnPersons = TeamTurnStruct.ubOutOfTurnPersons;

  InterruptOnlyGuynum = TeamTurnStruct.InterruptOnlyGuynum;
  gsWhoThrewRock = TeamTurnStruct.sWhoThrewRock;
  InterruptsAllowed = TeamTurnStruct.InterruptsAllowed;
  gfHiddenInterrupt = TeamTurnStruct.fHiddenInterrupt;
  gubLastInterruptedGuy = TeamTurnStruct.ubLastInterruptedGuy;

  return TRUE;
}

function NPCFirstDraw(pSoldier: Pointer<SOLDIERTYPE>, pTargetSoldier: Pointer<SOLDIERTYPE>): BOOLEAN {
  // if attacking an NPC check to see who draws first!

  if (pTargetSoldier.value.ubProfile != NO_PROFILE && pTargetSoldier.value.ubProfile != Enum268.SLAY && pTargetSoldier.value.bNeutral && pTargetSoldier.value.bOppList[pSoldier.value.ubID] == SEEN_CURRENTLY && (FindAIUsableObjClass(pTargetSoldier, IC_WEAPON) != NO_SLOT)) {
    let ubLargerHalf: UINT8;
    let ubSmallerHalf: UINT8;
    let ubTargetLargerHalf: UINT8;
    let ubTargetSmallerHalf: UINT8;

    // roll the dice!
    // e.g. if level 5, roll Random( 3 + 1 ) + 2 for result from 2 to 5
    // if level 4, roll Random( 2 + 1 ) + 2 for result from 2 to 4
    ubSmallerHalf = EffectiveExpLevel(pSoldier) / 2;
    ubLargerHalf = EffectiveExpLevel(pSoldier) - ubSmallerHalf;

    ubTargetSmallerHalf = EffectiveExpLevel(pTargetSoldier) / 2;
    ubTargetLargerHalf = EffectiveExpLevel(pTargetSoldier) - ubTargetSmallerHalf;
    if (gMercProfiles[pTargetSoldier.value.ubProfile].bApproached & gbFirstApproachFlags[Enum296.APPROACH_THREATEN - 1]) {
      // gains 1 to 2 points
      ubTargetSmallerHalf += 1;
      ubTargetLargerHalf += 1;
    }
    if (Random(ubTargetSmallerHalf + 1) + ubTargetLargerHalf > Random(ubSmallerHalf + 1) + ubLargerHalf) {
      return TRUE;
    }
  }
  return FALSE;
}
