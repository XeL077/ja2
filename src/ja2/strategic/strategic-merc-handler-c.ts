const NUM_DAYS_TILL_UNPAID_RPC_QUITS = 3;

// can you say me too after someone has said thier contract about to end
let fContractOverMeTooFlag: boolean = false;
let fContractOverAndIWontRenewMeTooFlag: boolean = false;
let fProcessingAMerc: boolean = false;
let pProcessingSoldier: Pointer<SOLDIERTYPE> = null;
let gfFirstMercSayingQuoteWillLeaveNoMatterWhat: boolean = false;

function StrategicHandlePlayerTeamMercDeath(pSoldier: Pointer<SOLDIERTYPE>): void {
  let pKiller: Pointer<SOLDIERTYPE> = null;
  let sSectorX: INT16;
  let sSectorY: INT16;

  // if the soldier HAS a profile
  if (pSoldier.value.ubProfile != NO_PROFILE) {
    // add to the history log the fact that the merc died and the circumstances
    if (pSoldier.value.ubAttackerID != NOBODY) {
      pKiller = MercPtrs[pSoldier.value.ubAttackerID];
    }

    // CJC Nov 11, 2002
    // Use the soldier's sector location unless impossible
    if (pSoldier.value.sSectorX != 0 && pSoldier.value.sSectorY != 0) {
      sSectorX = pSoldier.value.sSectorX;
      sSectorY = pSoldier.value.sSectorY;
    } else {
      sSectorX = gWorldSectorX;
      sSectorY = gWorldSectorY;
    }

    if (pKiller && pKiller.value.bTeam == OUR_TEAM) {
      AddHistoryToPlayersLog(Enum83.HISTORY_MERC_KILLED_CHARACTER, pSoldier.value.ubProfile, GetWorldTotalMin(), sSectorX, sSectorY);
    } else {
      AddHistoryToPlayersLog(Enum83.HISTORY_MERC_KILLED, pSoldier.value.ubProfile, GetWorldTotalMin(), sSectorX, sSectorY);
    }
  }

  if (guiCurrentScreen != Enum26.GAME_SCREEN) {
    ScreenMsg(FONT_RED, MSG_INTERFACE, pMercDeadString[0], pSoldier.value.name);
  }

  // robot and EPCs don't count against death rate - the mercs back home don't particularly give a damn about locals & machines!
  if (!AM_AN_EPC(pSoldier) && !AM_A_ROBOT(pSoldier)) {
    // keep track of how many mercs have died under player's command (for death rate, can't wait until removed from team)
    gStrategicStatus.ubMercDeaths++;
  }

  pSoldier.value.uiStatusFlags |= SOLDIER_DEAD;

  // Set breath to 0!
  pSoldier.value.bBreathMax = pSoldier.value.bBreath = 0;

  // not asleep, DEAD!
  pSoldier.value.fMercAsleep = false;

  // if the merc had life insurance
  if (pSoldier.value.usLifeInsurance) {
    // if he didn't die during auto-resolve
    if (guiCurrentScreen != Enum26.AUTORESOLVE_SCREEN) {
      // check whether this was obviously a suspicious death
      // if killed within an hour of being insured
      if (pSoldier.value.uiStartTimeOfInsuranceContract <= GetWorldTotalMin() && GetWorldTotalMin() - pSoldier.value.uiStartTimeOfInsuranceContract < 60) {
        gMercProfiles[pSoldier.value.ubProfile].ubSuspiciousDeath = VERY_SUSPICIOUS_DEATH;
      }
      // if killed by someone on our team, or while there weren't any opponents around
      else if (Menptr[pSoldier.value.ubAttackerID].bTeam == OUR_TEAM || !gTacticalStatus.fEnemyInSector) {
        // cause insurance company to suspect fraud and investigate this claim
        gMercProfiles[pSoldier.value.ubProfile].ubSuspiciousDeath = SUSPICIOUS_DEATH;
      }
    }

    AddLifeInsurancePayout(pSoldier);
  }

  // robot and EPCs don't penalize morale - merc don't care about fighting machines and the lives of locals much
  if (!AM_AN_EPC(pSoldier) && !AM_A_ROBOT(pSoldier)) {
    // Change morale of others based on this
    HandleMoraleEvent(pSoldier, Enum234.MORALE_TEAMMATE_DIED, pSoldier.value.sSectorX, pSoldier.value.sSectorY, pSoldier.value.bSectorZ);
  }

  // if its a MERC merc, record the time of his death
  if (pSoldier.value.ubWhatKindOfMercAmI == Enum260.MERC_TYPE__MERC) {
    pSoldier.value.iEndofContractTime = GetWorldTotalMin();

    // set is so Speck can say that a merc is dead
    LaptopSaveInfo.ubSpeckCanSayPlayersLostQuote = 1;
  }

  // Set the fact that the merc is DEAD!!
  gMercProfiles[pSoldier.value.ubProfile].bMercStatus = MERC_IS_DEAD;

  if (pSoldier.value.bAssignment != Enum117.ASSIGNMENT_DEAD) {
    SetTimeOfAssignmentChangeForMerc(pSoldier);
  }

  // handle strategic level death
  HandleStrategicDeath(pSoldier);
}

// MercDailyUpdate() gets called every day at midnight.  If something is to happen to a merc that day, add an event for it.
function MercDailyUpdate(): void {
  let cnt: INT32;
  let bLastTeamID: INT8;
  let pSoldier: Pointer<SOLDIERTYPE>;
  // SOLDIERTYPE *pQuitList[ 21 ];
  let pProfile: Pointer<MERCPROFILESTRUCT>;
  let uiChance: UINT32;
  let iOffset: INT32 = 0;
  let fFoundSomeOneForMenuShowing: boolean = false;

  // if its the first day, leave
  if (GetWorldDay() == 1)
    return;

  // debug message
  ScreenMsg(MSG_FONT_RED, MSG_DEBUG, "%s - Doing MercDailyUpdate", WORLDTIMESTR());

  // if the death rate is very low (this is independent of mercs' personal deathrate tolerances)
  if (CalcDeathRate() < 5) {
    // everyone gets a morale bonus, which also gets player a reputation bonus.
    HandleMoraleEvent(null, Enum234.MORALE_LOW_DEATHRATE, -1, -1, -1);
  }

  // add an event so the merc will say the departing warning ( 2 hours prior to leaving
  // Do so for all time slots they will depart from
  AddSameDayStrategicEvent(Enum132.EVENT_MERC_ABOUT_TO_LEAVE, MERC_ARRIVE_TIME_SLOT_1 - (2 * 60), 0);
  AddSameDayStrategicEvent(Enum132.EVENT_MERC_ABOUT_TO_LEAVE, MERC_ARRIVE_TIME_SLOT_2 - (2 * 60), 0);
  AddSameDayStrategicEvent(Enum132.EVENT_MERC_ABOUT_TO_LEAVE, MERC_ARRIVE_TIME_SLOT_3 - (2 * 60), 0);

  AddSameDayStrategicEvent(Enum132.EVENT_BEGIN_CONTRACT_RENEWAL_SEQUENCE, MERC_ARRIVE_TIME_SLOT_1, 0);
  AddSameDayStrategicEvent(Enum132.EVENT_BEGIN_CONTRACT_RENEWAL_SEQUENCE, MERC_ARRIVE_TIME_SLOT_2, 0);
  AddSameDayStrategicEvent(Enum132.EVENT_BEGIN_CONTRACT_RENEWAL_SEQUENCE, MERC_ARRIVE_TIME_SLOT_3, 0);

  cnt = gTacticalStatus.Team[gbPlayerNum].bFirstID;
  bLastTeamID = gTacticalStatus.Team[gbPlayerNum].bLastID;

  // loop though all the mercs
  for (pSoldier = MercPtrs[cnt]; cnt <= bLastTeamID; cnt++, pSoldier++) {
    // if the merc is active
    if ((pSoldier.value.bActive) && (pSoldier.value.bAssignment != Enum117.ASSIGNMENT_POW) && (pSoldier.value.bAssignment != Enum117.IN_TRANSIT)) {
      // CJC: Reset dialogue flags for quotes that can be said once/day
      pSoldier.value.usQuoteSaidFlags &= (~SOLDIER_QUOTE_SAID_ANNOYING_MERC);
      // ATE: Reset likes gun flag
      pSoldier.value.usQuoteSaidFlags &= (~SOLDIER_QUOTE_SAID_LIKESGUN);
      // ATE: Reset seen corpse flag
      pSoldier.value.usQuoteSaidFlags &= (~SOLDIER_QUOTE_SAID_ROTTINGCORPSE);
      // ATE; Reset found something nice flag...
      pSoldier.value.usQuoteSaidFlags &= (~SOLDIER_QUOTE_SAID_FOUND_SOMETHING_NICE);

      // ATE: Decrement tolerance value...
      pSoldier.value.bCorpseQuoteTolerance--;

      if (pSoldier.value.bCorpseQuoteTolerance < 0) {
        pSoldier.value.bCorpseQuoteTolerance = 0;
      }

      // CJC: For some personalities, reset personality quote said flag
      if (pSoldier.value.ubProfile != NO_PROFILE) {
        switch (gMercProfiles[pSoldier.value.ubProfile].bPersonalityTrait) {
          case Enum270.HEAT_INTOLERANT:
          case Enum270.CLAUSTROPHOBIC:
          case Enum270.NONSWIMMER:
          case Enum270.FEAR_OF_INSECTS:
            // repeatable once per day
            pSoldier.value.usQuoteSaidFlags &= (~SOLDIER_QUOTE_SAID_PERSONALITY);
            break;
          default:
            break;
        }
      }

      // ATE: Try to see if our equipment sucks!
      if (SoldierHasWorseEquipmentThanUsedTo(pSoldier)) {
        // Randomly anytime between 6:00, and 10:00
        AddSameDayStrategicEvent(Enum132.EVENT_MERC_COMPLAIN_EQUIPMENT, 360 + Random(1080), pSoldier.value.ubProfile);
      }

      // increment days served by this grunt
      gMercProfiles[pSoldier.value.ubProfile].usTotalDaysServed++;

      // player has hired him, so he'll eligible to get killed off on another job
      gMercProfiles[pSoldier.value.ubProfile].ubMiscFlags3 |= PROFILE_MISC_FLAG3_PLAYER_HAD_CHANCE_TO_HIRE;

      // if the character is an RPC
      if (pSoldier.value.ubProfile >= FIRST_RPC && pSoldier.value.ubProfile < FIRST_NPC) {
        let sSalary: INT16 = gMercProfiles[pSoldier.value.ubProfile].sSalary;
        let iMoneyOwedToMerc: INT32 = 0;

        // increment the number of days the mercs has been on the team
        pSoldier.value.iTotalContractLength++;

        // if the player owes the npc money, the balance field will be negative
        if (gMercProfiles[pSoldier.value.ubProfile].iBalance < 0) {
          // the player owes the npc the salary and whatever money the player owes the npc
          iMoneyOwedToMerc = sSalary + (-gMercProfiles[pSoldier.value.ubProfile].iBalance);
        } else {
          // else the player only owes the salary
          iMoneyOwedToMerc = sSalary;
        }

        // if the player owes money
        if (iMoneyOwedToMerc != 0) {
          // if the player can afford to pay them
          if (LaptopSaveInfo.iCurrentBalance >= iMoneyOwedToMerc) {
            // add the transaction to the player
            AddTransactionToPlayersBook(Enum80.PAYMENT_TO_NPC, pSoldier.value.ubProfile, GetWorldTotalMin(), -iMoneyOwedToMerc);

            // if the player owed money to the npc
            if (gMercProfiles[pSoldier.value.ubProfile].iBalance < 0) {
              // reset the amount
              gMercProfiles[pSoldier.value.ubProfile].iBalance = 0;
            }
          } else {
            let zMoney: CHAR16[] /* [128] */;

            // create a string for the salary owed to the npc
            swprintf(zMoney, "%d", sSalary);
            InsertCommasForDollarFigure(zMoney);
            InsertDollarSignInToString(zMoney);

            // Display a screen msg indicating that the npc was NOT paid
            ScreenMsg(FONT_MCOLOR_WHITE, MSG_INTERFACE, pMessageStrings[Enum333.MSG_CANT_AFFORD_TO_PAY_NPC_DAILY_SALARY_MSG], gMercProfiles[pSoldier.value.ubProfile].zNickname, zMoney);

            // if the merc hasnt been paid for NUM_DAYS_TILL_UNPAID_RPC_QUITS days, the merc will quit
            if ((gMercProfiles[pSoldier.value.ubProfile].iBalance - sSalary) <= -(sSalary * NUM_DAYS_TILL_UNPAID_RPC_QUITS)) {
              //
              // Set it up so the merc quits
              //
              MercsContractIsFinished(pSoldier.value.ubID);
            } else {
              // set how much money the player owes the merc
              gMercProfiles[pSoldier.value.ubProfile].iBalance -= sSalary;

              // Add even for displaying a dialogue telling the player this....
              AddSameDayStrategicEvent(Enum132.EVENT_RPC_WHINE_ABOUT_PAY, MERC_ARRIVE_TIME_SLOT_1, pSoldier.value.ubID);
            }
          }
        }
      }

      DailyMoraleUpdate(pSoldier);

      CheckIfMercGetsAnotherContract(pSoldier);
    } else {
      if ((pSoldier.value.bActive) && (pSoldier.value.bAssignment == Enum117.ASSIGNMENT_POW)) {
        pSoldier.value.iEndofContractTime += 1440;
      }
    }

    // if active, here, & alive (POW is ok, don't care)
    if ((pSoldier.value.bActive) && (pSoldier.value.bAssignment != Enum117.ASSIGNMENT_DEAD) && (pSoldier.value.bAssignment != Enum117.IN_TRANSIT)) {
      // increment the "man days" played counter for each such merc in the player's employment
      gStrategicStatus.uiManDaysPlayed++;
    }
  }

  // r eset the counter
  cnt = 0;

  for (pSoldier = MercPtrs[cnt]; cnt <= bLastTeamID; cnt++, pSoldier++) {
    // if the merc is active
    if ((pSoldier.value.bActive) && (pSoldier.value.bAssignment != Enum117.ASSIGNMENT_POW) && (pSoldier.value.bAssignment != Enum117.IN_TRANSIT)) {
      // if its a MERC merc, determine if the merc should leave ( because player refused to pay for merc )
      if (pSoldier.value.ubWhatKindOfMercAmI == Enum260.MERC_TYPE__MERC) {
        // if the players account status is invalid
        if (LaptopSaveInfo.gubPlayersMercAccountStatus == Enum104.MERC_ACCOUNT_INVALID) {
          // if the soldier is alive anc concious
          if (IsTheSoldierAliveAndConcious(pSoldier)) {
            // if the merc should leave today
            MercsContractIsFinished(pSoldier.value.ubID);
          }
        }
      }
    }
  }

  // Loop through all the profiles
  for (cnt = 0; cnt < NUM_PROFILES; cnt++) {
    pProfile = addressof(gMercProfiles[cnt]);

    // dead guys don't do nuthin' !
    if (pProfile.value.bMercStatus == MERC_IS_DEAD) {
      continue;
    }

    // Every day reset this variable
    pProfile.value.uiPrecedentQuoteSaid = 0;

    // skip anyone currently on the player's team
    if (IsMercOnTeam(cnt)) {
      continue;
    }

    // if he's an AIM/M.E.R.C. merc
    if (cnt < AIM_AND_MERC_MERCS) {
      // if he's not just on his way home
      if (pProfile.value.bMercStatus != MERC_RETURNING_HOME) {
        // check if any of his stats improve through working or training
        HandleUnhiredMercImprovement(pProfile);

        // if he's working on another job
        if (pProfile.value.bMercStatus == MERC_WORKING_ELSEWHERE) {
          // check if he's killed
          HandleUnhiredMercDeaths(cnt);
        }
      }
    }

    // if merc is currently unavailable
    if (pProfile.value.uiDayBecomesAvailable > 0) {
      // reduce time til available by one day
      pProfile.value.uiDayBecomesAvailable--;

      // Check to see if the merc has become available
      if (pProfile.value.uiDayBecomesAvailable == 0) {
        // if the merc CAN become ready
        if (pProfile.value.bMercStatus != MERC_FIRED_AS_A_POW) {
          pProfile.value.bMercStatus = MERC_OK;

          // if the player has left a message for this merc
          if (pProfile.value.ubMiscFlags3 & PROFILE_MISC_FLAG3_PLAYER_LEFT_MSG_FOR_MERC_AT_AIM) {
            iOffset = AIM_REPLY_BARRY;

            // remove the Flag, so if the merc goes on another assignment, the player can leave an email.
            pProfile.value.ubMiscFlags3 &= ~PROFILE_MISC_FLAG3_PLAYER_LEFT_MSG_FOR_MERC_AT_AIM;

            // TO DO: send E-mail to player telling him the merc has returned from an assignment
            AddEmail((iOffset + (cnt * AIM_REPLY_LENGTH_BARRY)), AIM_REPLY_LENGTH_BARRY, (6 + cnt), GetWorldTotalMin());
          }
        }
      }
    } else // was already available today
    {
      // if it's an AIM or M.E.R.C. merc
      if (cnt < AIM_AND_MERC_MERCS) {
        // check to see if he goes on another assignment
        if (cnt < MAX_NUMBER_MERCS) {
          // A.I.M. merc
          uiChance = 2 * pProfile.value.bExpLevel;

          // player has now had a chance to hire him, so he'll eligible to get killed off on another job
          pProfile.value.ubMiscFlags3 |= PROFILE_MISC_FLAG3_PLAYER_HAD_CHANCE_TO_HIRE;
        } else {
          // M.E.R.C. merc - very rarely get other work
          uiChance = 1 * pProfile.value.bExpLevel;

          // player doesn't have a chance to hire any M.E.R.C's until after Speck's E-mail is sent
          if (GetWorldDay() > DAYS_TIL_M_E_R_C_AVAIL) {
            // player has now had a chance to hire him, so he'll eligible to get killed off on another job
            pProfile.value.ubMiscFlags3 |= PROFILE_MISC_FLAG3_PLAYER_HAD_CHANCE_TO_HIRE;
          }
        }

        if (Random(100) < uiChance) {
          pProfile.value.bMercStatus = MERC_WORKING_ELSEWHERE;
          pProfile.value.uiDayBecomesAvailable = 1 + Random(6 + (pProfile.value.bExpLevel / 2)); // 1-(6 to 11) days
        }
      }
    }

    // Decrement morale hangover (merc appears hirable, he just gives lame refusals during this time, though)
    if (pProfile.value.ubDaysOfMoraleHangover > 0) {
      pProfile.value.ubDaysOfMoraleHangover--;
    }
  }

  // build quit list
  // BuildMercQuitList( pQuitList );
  HandleSlayDailyEvent();

  // rebuild list for mapscreen
  ReBuildCharactersList();
}

/*
void BuildMercQuitList( SOLDIERTYPE *pMercList )
{
        // go through list of mercs on players team, fill pMercList sorted from most recent leave time, to furthest leave time

        INT32		cnt;
        INT8		bLastTeamID;
        SOLDIERTYPE		*pSoldier;
        INT32 iCounter = 0;

        cnt = gTacticalStatus.Team[ gbPlayerNum ].bFirstID;
        bLastTeamID = gTacticalStatus.Team[ gbPlayerNum ].bLastID;

        //loop though all the mercs
  for ( pSoldier = MercPtrs[ cnt ]; cnt <= bLastTeamID; cnt++,pSoldier++, iCounter++ )
        {
                if ( pSoldier->bActive )
                {
                        // copy to list
                        pMercList[ iCounter ] = pSoldier;
                }
        }

        // now sort based on departure time..simple bubble sort
        for( cnt = 0; cnt <=iCounter; cnt++ )
        {
                for( cntB = 0; cntB <=iCounter; cntB++ )
                {
                        if( MercPtrs[ cntB ]->ubWhatKindOfMercAmI == MERC_TYPE__MERC )
                        {
                                //if the players account status is invalid
                                if( LaptopSaveInfo.gubPlayersMercAccountStatus == MERC_ACCOUNT_INVALID )
                                {
                                        //if the soldier is alive anc concious
                                        if( IsTheSoldierAliveAndConcious( MercPtrs[ cntB ] ) )
                                        {
                                                // swap
                                                pSoldier =  MercPtrs[ cntB ];
                                                MercPtrs[ cntB ] =  MercPtrs[ cnt ];
                                                MercPtrs[ cnt ] = pSoldier;
                                        }
                                }
                        }
                        else if(  MercPtrs[ cntB ]->ubWhatKindOfMercAmI == MERC_TYPE__AIM )
                        {
                                if( MercPtrs[ cntB ]->iEndofContractTime < MercPtrs[ cnt ]->iEndofContractTime )
                                {
                                        // swap
                                        pSoldier =  MercPtrs[ cntB ];
                                        MercPtrs[ cntB ] =  MercPtrs[ cnt ];
                                        MercPtrs[ cnt ] = pSoldier;
                                }
                        }
                        else
                        {
                                // not a hirable guy, move to the botton
                                pSoldier =  MercPtrs[ cnt ];
                                MercPtrs[ cnt ] =  MercPtrs[ cntB ];
                                MercPtrs[ cntB ] = pSoldier;
                        }
                }
        }

        return;
}
*/
/*
void HandleMercsAboutToLeave( SOLDIERTYPE *pMercList )
{
        // run from top of list to bottom..if merc is gonna leave within a defined time frame of the previous guy and they are leaving the same day (today)
        // then post then with the quote at the same time

        for( iCounter = 0; iCounter < 21; iCounter++ )
        {
                if( iCounter == 0 )
                {
                        // first guy, if he no leave today, no one is leave, go home
                        if( ( pSoldier->ubWhatKindOfMercAmI != MERC_TYPE__MERC ) && (  pSoldier->ubWhatKindOfMercAmI != MERC_TYPE__AIM ) )
                        {
                                return;
                        }
                        else
                        {
                                if( ( pSoldier->iEndofContractTime / 1440 ) > (INT32)GetWorldDay( ) )
                                {
                                        return;
                                }
                                else
                                {
                                        //if the soldier is alive anc concious
                                if( IsTheSoldierAliveAndConcious( pSoldier ) )
                                {
                                        //if the soldier is an AIM merc
                                        if( pSoldier->ubWhatKindOfMercAmI == MERC_TYPE__AIM_MERC )
                                        {
                                                //add an event so the merc will say the departing warning ( 2 hours prior to leaving
                                                AddSameDayStrategicEvent( EVENT_MERC_ABOUT_TO_LEAVE_COMMENT, MERC_DEPARTURE_TIME_OF_DAY - 2 * 60,	(UINT32) pSoldier->ubID );
                                        }
                                        else
                                        {
                                                // merc merc, they'll just leave

                                        }
                                }
                        }
                }
        }
}

        */

// ATE: This function deals with MERC MERC and NPC's leaving because of not getting paid...
// NOT AIM renewals....
function MercsContractIsFinished(ubID: UINT8): void {
  let pSoldier: Pointer<SOLDIERTYPE>;

  pSoldier = addressof(Menptr[ubID]);

  // if the soldier was removed before getting into this function, return
  if (!pSoldier.value.bActive)
    return;

  if (fShowContractMenu) {
    fShowContractMenu = false;
  }

  // go to mapscreen
  SpecialCharacterDialogueEvent(DIALOGUE_SPECIAL_EVENT_ENTER_MAPSCREEN, 0, 0, 0, 0, 0);

  if (pSoldier.value.ubWhatKindOfMercAmI == Enum260.MERC_TYPE__MERC) {
    // if the players account status is invalid
    if (LaptopSaveInfo.gubPlayersMercAccountStatus == Enum104.MERC_ACCOUNT_INVALID) {
      // Send the merc home

      InterruptTime();
      PauseGame();
      LockPauseState(9);

      // Say quote for wishing to leave
      TacticalCharacterDialogue(pSoldier, Enum202.QUOTE_NOT_GETTING_PAID);

      TacticalCharacterDialogueWithSpecialEvent(pSoldier, 0, DIALOGUE_SPECIAL_EVENT_CONTRACT_ENDING_NO_ASK_EQUIP, 0, 0);

      pSoldier.value.ubLeaveHistoryCode = Enum83.HISTORY_MERC_QUIT;
    }
  } else if (pSoldier.value.ubWhatKindOfMercAmI == Enum260.MERC_TYPE__NPC) {
    InterruptTime();
    PauseGame();
    LockPauseState(10);

    TacticalCharacterDialogue(pSoldier, Enum202.QUOTE_AIM_SEEN_MIKE);

    TacticalCharacterDialogueWithSpecialEvent(pSoldier, 0, DIALOGUE_SPECIAL_EVENT_CONTRACT_ENDING_NO_ASK_EQUIP, 0, 0);

    pSoldier.value.ubLeaveHistoryCode = Enum83.HISTORY_MERC_QUIT;
  }
}

// ATE: Called for RPCs who should now complain about no pay...
function RPCWhineAboutNoPay(ubID: UINT8): void {
  let pSoldier: Pointer<SOLDIERTYPE>;

  pSoldier = addressof(Menptr[ubID]);

  // if the soldier was removed before getting into this function, return
  if (!pSoldier.value.bActive)
    return;

  if (pSoldier.value.ubWhatKindOfMercAmI == Enum260.MERC_TYPE__NPC) {
    // Say quote for needing pay!
    TacticalCharacterDialogue(pSoldier, Enum202.QUOTE_NOT_GETTING_PAID);
  }
}

// OK loop through and check!
function SoldierHasWorseEquipmentThanUsedTo(pSoldier: Pointer<SOLDIERTYPE>): boolean {
  let cnt: INT32;
  let usItem: UINT16;
  let bBestArmour: INT8 = -1;
  let bBestArmourIndex: INT8 = -1;
  let bBestGun: INT8 = -1;
  let bBestGunIndex: INT8 = -1;

  for (cnt = 0; cnt < Enum261.NUM_INV_SLOTS; cnt++) {
    usItem = pSoldier.value.inv[cnt].usItem;

    // Look for best gun/armour
    if (usItem != NOTHING) {
      // Check if it's a gun
      if (Item[usItem].usItemClass & IC_GUN) {
        if (Weapon[usItem].ubDeadliness > bBestGun) {
          bBestGunIndex = cnt;
          bBestGun = Weapon[usItem].ubDeadliness;
        }
      }

      // If it's armour
      if (Item[usItem].usItemClass & IC_ARMOUR) {
        if (Armour[Item[usItem].ubClassIndex].ubProtection > bBestArmour) {
          bBestArmourIndex = cnt;
          bBestArmour = Armour[Item[usItem].ubClassIndex].ubProtection;
        }
      }
    }
  }

  // Modify these values based on morale - lower opinion of equipment if morale low, increase if high
  // this of course assumes default morale is 50
  if (bBestGun != -1) {
    bBestGun = (bBestGun * (50 + pSoldier.value.bMorale)) / 100;
  }
  if (bBestArmour != -1) {
    bBestArmour = (bBestArmour * (50 + pSoldier.value.bMorale)) / 100;
  }

  // OK, check values!
  if ((bBestGun != -1 && bBestGun < (gMercProfiles[pSoldier.value.ubProfile].bMainGunAttractiveness / 2)) || (bBestArmour != -1 && bBestArmour < (gMercProfiles[pSoldier.value.ubProfile].bArmourAttractiveness / 2))) {
    // Pipe up!
    return true;
  }

  return false;
}

function MercComplainAboutEquipment(ubProfile: UINT8): void {
  let pSoldier: Pointer<SOLDIERTYPE>;

  if (ubProfile == Enum268.LARRY_NORMAL) {
    if (CheckFact(Enum170.FACT_LARRY_CHANGED, 0)) {
      ubProfile = Enum268.LARRY_DRUNK;
    }
  } else if (ubProfile == Enum268.LARRY_DRUNK) {
    if (CheckFact(Enum170.FACT_LARRY_CHANGED, 0) == false) {
      ubProfile = Enum268.LARRY_NORMAL;
    }
  }
  // Are we dead/ does merc still exist?
  pSoldier = FindSoldierByProfileID(ubProfile, false);

  if (pSoldier != null) {
    if (pSoldier.value.bLife >= OKLIFE && pSoldier.value.fMercAsleep != true && pSoldier.value.bAssignment < Enum117.ON_DUTY) {
      // ATE: Double check that this problem still exists!
      if (SoldierHasWorseEquipmentThanUsedTo(pSoldier)) {
        // Say quote!
        TacticalCharacterDialogue(pSoldier, Enum202.QUOTE_WHINE_EQUIPMENT);
      }
    }
  }
}

function UpdateBuddyAndHatedCounters(): void {
  let bMercID: INT8;
  let iLoop: INT32;
  let bOtherID: INT8;
  let bLastTeamID: INT8;
  let ubOtherProfileID: UINT8;
  let pSoldier: Pointer<SOLDIERTYPE>;
  let pOtherSoldier: Pointer<SOLDIERTYPE>;
  let pProfile: Pointer<MERCPROFILESTRUCT>;
  let fSameGroupOnly: boolean;

  let fUpdatedTimeTillNextHatedComplaint: boolean = false;

  bMercID = gTacticalStatus.Team[gbPlayerNum].bFirstID;
  bLastTeamID = gTacticalStatus.Team[gbPlayerNum].bLastID;

  // loop though all the mercs
  for (pSoldier = MercPtrs[bMercID]; bMercID <= bLastTeamID; bMercID++, pSoldier++) {
    fSameGroupOnly = false;

    // if the merc is active and on a combat assignment
    if (pSoldier.value.bActive && pSoldier.value.bAssignment < Enum117.ON_DUTY) {
      pProfile = addressof(gMercProfiles[pSoldier.value.ubProfile]);

      // if we're moving, we only check vs other people in our squad
      if (pSoldier.value.ubGroupID != 0 && PlayerIDGroupInMotion(pSoldier.value.ubGroupID)) {
        fSameGroupOnly = true;
      }

      fUpdatedTimeTillNextHatedComplaint = false;

      bOtherID = gTacticalStatus.Team[gbPlayerNum].bFirstID;

      for (pOtherSoldier = MercPtrs[bOtherID]; bOtherID <= bLastTeamID; bOtherID++, pOtherSoldier++) {
        // is this guy in the same sector and on active duty (or in the same moving group)

        if (bOtherID != bMercID && pOtherSoldier.value.bActive && pOtherSoldier.value.bAssignment < Enum117.ON_DUTY) {
          if (fSameGroupOnly) {
            // all we have to check is the group ID
            if (pSoldier.value.ubGroupID != pOtherSoldier.value.ubGroupID) {
              continue;
            }
          } else {
            // check to see if the location is the same
            if (pOtherSoldier.value.sSectorX != pSoldier.value.sSectorX || pOtherSoldier.value.sSectorY != pSoldier.value.sSectorY || pOtherSoldier.value.bSectorZ != pSoldier.value.bSectorZ) {
              continue;
            }

            // if the OTHER soldier is in motion then we don't do anything!
            if (pOtherSoldier.value.ubGroupID != 0 && PlayerIDGroupInMotion(pOtherSoldier.value.ubGroupID)) {
              continue;
            }
          }

          ubOtherProfileID = pOtherSoldier.value.ubProfile;

          for (iLoop = 0; iLoop < 4; iLoop++) {
            switch (iLoop) {
              case 0:
              case 1:
                if (pProfile.value.bHated[iLoop] == ubOtherProfileID) {
                  // arrgs, we're on assignment with the person we loathe!
                  if (pProfile.value.bHatedCount[iLoop] > 0) {
                    pProfile.value.bHatedCount[iLoop]--;
                    if (pProfile.value.bHatedCount[iLoop] == 0 && pSoldier.value.bInSector && gTacticalStatus.fEnemyInSector) {
                      // just reduced count to 0 but we have enemy in sector...
                      pProfile.value.bHatedCount[iLoop] = 1;
                    } else if (pProfile.value.bHatedCount[iLoop] > 0 && (pProfile.value.bHatedCount[iLoop] == pProfile.value.bHatedTime[iLoop] / 2 || (pProfile.value.bHatedCount[iLoop] < pProfile.value.bHatedTime[iLoop] / 2 && pProfile.value.bHatedCount[iLoop] % TIME_BETWEEN_HATED_COMPLAINTS == 0))) {
                      // complain!
                      if (iLoop == 0) {
                        TacticalCharacterDialogue(pSoldier, Enum202.QUOTE_HATED_MERC_ONE);
                      } else {
                        TacticalCharacterDialogue(pSoldier, Enum202.QUOTE_HATED_MERC_TWO);
                      }
                      StopTimeCompression();
                    } else if (pProfile.value.bHatedCount[iLoop] == 0) {
                      // zero count!
                      if (pSoldier.value.ubWhatKindOfMercAmI == Enum260.MERC_TYPE__MERC || pSoldier.value.ubWhatKindOfMercAmI == Enum260.MERC_TYPE__NPC) {
                        // MERC mercs leave now!
                        if (iLoop == 0) {
                          TacticalCharacterDialogue(pSoldier, Enum202.QUOTE_MERC_QUIT_HATED1);
                        } else {
                          TacticalCharacterDialogue(pSoldier, Enum202.QUOTE_MERC_QUIT_HATED2);
                        }

                        // Leave now! ( handle equipment too )....
                        TacticalCharacterDialogueWithSpecialEvent(pSoldier, 0, DIALOGUE_SPECIAL_EVENT_CONTRACT_ENDING, 0, 0);

                        pSoldier.value.ubLeaveHistoryCode = Enum83.HISTORY_MERC_QUIT;
                      } else {
                        // complain!
                        if (iLoop == 0) {
                          TacticalCharacterDialogue(pSoldier, Enum202.QUOTE_HATED_MERC_ONE);
                        } else {
                          TacticalCharacterDialogue(pSoldier, Enum202.QUOTE_HATED_MERC_TWO);
                        }
                        pProfile.value.ubTimeTillNextHatedComplaint = TIME_BETWEEN_HATED_COMPLAINTS - 1;
                      }
                    }
                  } else {
                    // if we haven't updated the time till our next complaint, do so
                    // if it's 0, gripe.
                    if (!fUpdatedTimeTillNextHatedComplaint) {
                      if (pProfile.value.ubTimeTillNextHatedComplaint == 0) {
                        pProfile.value.ubTimeTillNextHatedComplaint = TIME_BETWEEN_HATED_COMPLAINTS - 1;
                      } else {
                        pProfile.value.ubTimeTillNextHatedComplaint--;
                      }
                      fUpdatedTimeTillNextHatedComplaint = true;
                    }

                    if (pProfile.value.ubTimeTillNextHatedComplaint == 0) {
                      // complain!
                      if (iLoop == 0) {
                        TacticalCharacterDialogue(pSoldier, Enum202.QUOTE_HATED_MERC_ONE);
                      } else {
                        TacticalCharacterDialogue(pSoldier, Enum202.QUOTE_HATED_MERC_TWO);
                      }
                    }
                  }
                }
                break;
              case 2:
                if (pProfile.value.bLearnToHate == ubOtherProfileID) {
                  if (pProfile.value.bLearnToHateCount > 0) {
                    pProfile.value.bLearnToHateCount--;
                    if (pProfile.value.bLearnToHateCount == 0 && pSoldier.value.bInSector && gTacticalStatus.fEnemyInSector) {
                      // just reduced count to 0 but we have enemy in sector...
                      pProfile.value.bLearnToHateCount = 1;
                    } else if (pProfile.value.bLearnToHateCount > 0 && (pProfile.value.bLearnToHateCount == pProfile.value.bLearnToHateTime / 2 || pProfile.value.bLearnToHateCount < pProfile.value.bLearnToHateTime / 2 && pProfile.value.bLearnToHateCount % TIME_BETWEEN_HATED_COMPLAINTS == 0)) {
                      // complain!
                      TacticalCharacterDialogue(pSoldier, Enum202.QUOTE_LEARNED_TO_HATE_MERC);
                      StopTimeCompression();
                    } else if (pProfile.value.bLearnToHateCount == 0) {
                      // set as bHated[2];
                      pProfile.value.bHated[2] = pProfile.value.bLearnToHate;
                      pProfile.value.bMercOpinion[ubOtherProfileID] = HATED_OPINION;

                      if (pSoldier.value.ubWhatKindOfMercAmI == Enum260.MERC_TYPE__MERC || (pSoldier.value.ubWhatKindOfMercAmI == Enum260.MERC_TYPE__NPC && (pSoldier.value.ubProfile == Enum268.DEVIN || pSoldier.value.ubProfile == Enum268.SLAY || pSoldier.value.ubProfile == Enum268.IGGY || pSoldier.value.ubProfile == Enum268.CONRAD))) {
                        // Leave now! ( handle equipment too )....
                        TacticalCharacterDialogue(pSoldier, Enum202.QUOTE_MERC_QUIT_LEARN_TO_HATE);
                        TacticalCharacterDialogueWithSpecialEvent(pSoldier, 0, DIALOGUE_SPECIAL_EVENT_CONTRACT_ENDING, 0, 0);
                        pSoldier.value.ubLeaveHistoryCode = Enum83.HISTORY_MERC_QUIT;
                      } else if (pSoldier.value.ubWhatKindOfMercAmI == Enum260.MERC_TYPE__NPC) {
                        // whine again
                        TacticalCharacterDialogue(pSoldier, Enum202.QUOTE_LEARNED_TO_HATE_MERC);
                      }
                    }
                    if (pProfile.value.bLearnToHateCount < pProfile.value.bLearnToHateTime / 2) {
                      // gradual opinion drop
                      pProfile.value.bMercOpinion[ubOtherProfileID] += (HATED_OPINION - pProfile.value.bMercOpinion[ubOtherProfileID]) / (pProfile.value.bLearnToHateCount + 1);
                    }
                  } else {
                    if (!fUpdatedTimeTillNextHatedComplaint) {
                      if (pProfile.value.ubTimeTillNextHatedComplaint == 0) {
                        pProfile.value.ubTimeTillNextHatedComplaint = TIME_BETWEEN_HATED_COMPLAINTS - 1;
                      } else {
                        pProfile.value.ubTimeTillNextHatedComplaint--;
                      }
                      fUpdatedTimeTillNextHatedComplaint = true;
                    }

                    if (pProfile.value.ubTimeTillNextHatedComplaint == 0) {
                      // complain!
                      TacticalCharacterDialogue(pSoldier, Enum202.QUOTE_LEARNED_TO_HATE_MERC);
                    }
                  }
                }
                break;
              case 3:
                if (pProfile.value.bLearnToLikeCount > 0 && pProfile.value.bLearnToLike == ubOtherProfileID) {
                  pProfile.value.bLearnToLikeCount--;
                  if (pProfile.value.bLearnToLikeCount == 0) {
                    // add to liked!
                    pProfile.value.bBuddy[2] = pProfile.value.bLearnToLike;
                    pProfile.value.bMercOpinion[ubOtherProfileID] = BUDDY_OPINION;
                  } else if (pProfile.value.bLearnToLikeCount < pProfile.value.bLearnToLikeTime / 2) {
                    // increase opinion of them!
                    pProfile.value.bMercOpinion[ubOtherProfileID] += (BUDDY_OPINION - pProfile.value.bMercOpinion[ubOtherProfileID]) / (pProfile.value.bLearnToLikeCount + 1);
                    break;
                  }
                }
                break;
            }
          }
        }
      }
    }
  }
}

function HourlyCamouflageUpdate(): void {
  let bMercID: INT8;
  let bLastTeamID: INT8;
  let pSoldier: Pointer<SOLDIERTYPE>;

  bMercID = gTacticalStatus.Team[gbPlayerNum].bFirstID;
  bLastTeamID = gTacticalStatus.Team[gbPlayerNum].bLastID;

  // loop through all mercs
  for (pSoldier = MercPtrs[bMercID]; bMercID <= bLastTeamID; bMercID++, pSoldier++) {
    if (pSoldier.value.bActive) {
      // if the merc has non-zero camo, degrade it by 1%
      if ((pSoldier.value.bCamo > 0) && (!(HAS_SKILL_TRAIT(pSoldier, Enum269.CAMOUFLAGED)))) {
        pSoldier.value.bCamo -= 2;
        if (pSoldier.value.bCamo <= 0) {
          pSoldier.value.bCamo = 0;
          // Reload palettes....
          if (pSoldier.value.bInSector) {
            CreateSoldierPalettes(pSoldier);
          }

          ScreenMsg(FONT_MCOLOR_LTYELLOW, MSG_INTERFACE, Message[Enum334.STR_CAMMO_WORN_OFF], pSoldier.value.name);
          DirtyMercPanelInterface(pSoldier, DIRTYLEVEL2);
        }
      }
      // if the merc has non-zero monster smell, degrade it by 1
      if (pSoldier.value.bMonsterSmell > 0) {
        pSoldier.value.bMonsterSmell--;

        /*
        if (pSoldier->bMonsterSmell == 0)
        {
                // Reload palettes....

                if ( pSoldier->bInSector )
                {
                        CreateSoldierPalettes( pSoldier );
                }

                ScreenMsg( FONT_MCOLOR_LTYELLOW, MSG_INTERFACE, Message[STR_CAMMO_WORN_OFF], pSoldier->name );
                DirtyMercPanelInterface( pSoldier, DIRTYLEVEL2 );
        }
        */
      }
    }
  }
}
