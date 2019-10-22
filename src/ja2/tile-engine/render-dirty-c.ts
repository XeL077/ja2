const DIRTY_QUEUES = 200;
const BACKGROUND_BUFFERS = 500;
const VIDEO_OVERLAYS = 100;

let gBackSaves: BACKGROUND_SAVE[] /* [BACKGROUND_BUFFERS] */;
let guiNumBackSaves: UINT32 = 0;

let gVideoOverlays: VIDEO_OVERLAY[] /* [VIDEO_OVERLAYS] */;
let guiNumVideoOverlays: UINT32 = 0;

// BACKGROUND_SAVE	gTopmostSaves[BACKGROUND_BUFFERS];
// UINT32 guiNumTopmostSaves=0;

let gDirtyClipRect: SGPRect = { 0, 0, 640, 480 };

let gfViewportDirty: BOOLEAN = FALSE;

function InitializeBaseDirtyRectQueue(): BOOLEAN {
  return TRUE;
}

function ShutdownBaseDirtyRectQueue(): void {
}

function AddBaseDirtyRect(iLeft: INT32, iTop: INT32, iRight: INT32, iBottom: INT32): void {
  let aRect: SGPRect;

  if (iLeft < 0) {
    iLeft = 0;
  }
  if (iLeft > 640) {
    iLeft = 640;
  }

  if (iTop < 0) {
    iTop = 0;
  }
  if (iTop > 480) {
    iTop = 480;
  }

  if (iRight < 0) {
    iRight = 0;
  }
  if (iRight > 640) {
    iRight = 640;
  }

  if (iBottom < 0) {
    iBottom = 0;
  }
  if (iBottom > 480) {
    iBottom = 480;
  }

  if ((iRight - iLeft) == 0 || (iBottom - iTop) == 0) {
    return;
  }

  if ((iLeft == gsVIEWPORT_START_X) && (iRight == gsVIEWPORT_END_X) && (iTop == gsVIEWPORT_WINDOW_START_Y) && (iBottom == gsVIEWPORT_WINDOW_END_Y)) {
    gfViewportDirty = TRUE;
    return;
  }

  // Add to list
  aRect.iLeft = iLeft;
  aRect.iTop = iTop;
  aRect.iRight = iRight;
  aRect.iBottom = iBottom;

  InvalidateRegionEx(aRect.iLeft, aRect.iTop, aRect.iRight, aRect.iBottom, 0);
}

function ExecuteBaseDirtyRectQueue(): BOOLEAN {
  if (gfViewportDirty) {
    // InvalidateRegion(gsVIEWPORT_START_X, gsVIEWPORT_START_Y, gsVIEWPORT_END_X, gsVIEWPORT_END_Y);
    InvalidateScreen();
    EmptyDirtyRectQueue();
    gfViewportDirty = FALSE;
    return TRUE;
  }

  return TRUE;
}

function EmptyDirtyRectQueue(): BOOLEAN {
  return TRUE;
}

function GetFreeBackgroundBuffer(): INT32 {
  let uiCount: UINT32;

  for (uiCount = 0; uiCount < guiNumBackSaves; uiCount++) {
    if ((gBackSaves[uiCount].fAllocated == FALSE) && (gBackSaves[uiCount].fFilled == FALSE))
      return uiCount;
  }

  if (guiNumBackSaves < BACKGROUND_BUFFERS)
    return guiNumBackSaves++;

  return -1;
}

function RecountBackgrounds(): void {
  let uiCount: INT32;

  for (uiCount = guiNumBackSaves - 1; (uiCount >= 0); uiCount--) {
    if ((gBackSaves[uiCount].fAllocated) || (gBackSaves[uiCount].fFilled)) {
      guiNumBackSaves = (uiCount + 1);
      break;
    }
  }
}

function RegisterBackgroundRect(uiFlags: UINT32, pSaveArea: Pointer<INT16>, sLeft: INT16, sTop: INT16, sRight: INT16, sBottom: INT16): INT32 {
  let uiBufSize: UINT32;
  let iBackIndex: INT32;
  let ClipX1: INT32;
  let ClipY1: INT32;
  let ClipX2: INT32;
  let ClipY2: INT32;
  let uiLeftSkip: INT32;
  let uiRightSkip: INT32;
  let uiTopSkip: INT32;
  let uiBottomSkip: INT32;
  let usHeight: UINT32;
  let usWidth: UINT32;
  let iTempX: INT32;
  let iTempY: INT32;

  // Don't register if we are rendering and we are below the viewport
  // if ( sTop >= gsVIEWPORT_WINDOW_END_Y )
  //{
  //	return(-1 );
  //}

  ClipX1 = gDirtyClipRect.iLeft;
  ClipY1 = gDirtyClipRect.iTop;
  ClipX2 = gDirtyClipRect.iRight;
  ClipY2 = gDirtyClipRect.iBottom;

  usHeight = sBottom - sTop;
  usWidth = sRight - sLeft;

  // if((sClipLeft >= sClipRight) || (sClipTop >= sClipBottom))
  //	return(-1);
  iTempX = sLeft;
  iTempY = sTop;

  // Clip to rect
  uiLeftSkip = __min(ClipX1 - min(ClipX1, iTempX), usWidth);
  uiRightSkip = __min(max(ClipX2, (iTempX + usWidth)) - ClipX2, usWidth);
  uiTopSkip = __min(ClipY1 - __min(ClipY1, iTempY), usHeight);
  uiBottomSkip = __min(__max(ClipY2, (iTempY + usHeight)) - ClipY2, usHeight);

  // check if whole thing is clipped
  if ((uiLeftSkip >= usWidth) || (uiRightSkip >= usWidth))
    return -1;

  // check if whole thing is clipped
  if ((uiTopSkip >= usHeight) || (uiBottomSkip >= usHeight))
    return -1;

  // Set re-set values given based on clipping
  sLeft = sLeft + uiLeftSkip;
  sRight = sRight - uiRightSkip;
  sTop = sTop + uiTopSkip;
  sBottom = sBottom - uiBottomSkip;

  if (sLeft == 192 || sLeft == 188) {
    let i: int = 0;
  }

  if ((iBackIndex = GetFreeBackgroundBuffer()) == (-1))
    return -1;

  memset(&gBackSaves[iBackIndex], 0, sizeof(BACKGROUND_SAVE));

  gBackSaves[iBackIndex].fZBuffer = FALSE;

  if (pSaveArea == NULL) {
    uiBufSize = ((sRight - sLeft) * 2) * (sBottom - sTop);

    if (uiBufSize == 0)
      return -1;

    if (uiFlags & BGND_FLAG_SAVERECT) {
      if ((gBackSaves[iBackIndex].pSaveArea = MemAlloc(uiBufSize)) == NULL)
        return -1;
    }

    if (uiFlags & BGND_FLAG_SAVE_Z) {
      if ((gBackSaves[iBackIndex].pZSaveArea = MemAlloc(uiBufSize)) == NULL)
        return -1;
      gBackSaves[iBackIndex].fZBuffer = TRUE;
    }

    gBackSaves[iBackIndex].fFreeMemory = TRUE;
  }
  // else
  //	gBackSaves[iBackIndex].pSaveArea=pSaveArea;

  gBackSaves[iBackIndex].fAllocated = TRUE;
  gBackSaves[iBackIndex].uiFlags = uiFlags;
  gBackSaves[iBackIndex].sLeft = sLeft;
  gBackSaves[iBackIndex].sTop = sTop;
  gBackSaves[iBackIndex].sRight = sRight;
  gBackSaves[iBackIndex].sBottom = sBottom;
  gBackSaves[iBackIndex].sWidth = (sRight - sLeft);
  gBackSaves[iBackIndex].sHeight = (sBottom - sTop);

  gBackSaves[iBackIndex].fFilled = FALSE;

  return iBackIndex;
}

function SetBackgroundRectFilled(uiBackgroundID: UINT32): void {
  gBackSaves[uiBackgroundID].fFilled = TRUE;

  AddBaseDirtyRect(gBackSaves[uiBackgroundID].sLeft, gBackSaves[uiBackgroundID].sTop, gBackSaves[uiBackgroundID].sRight, gBackSaves[uiBackgroundID].sBottom);
}

function RestoreBackgroundRects(): BOOLEAN {
  let uiCount: UINT32;
  let uiDestPitchBYTES: UINT32;
  let uiSrcPitchBYTES: UINT32;
  let pDestBuf: Pointer<UINT8>;
  let pSrcBuf: Pointer<UINT8>;

  pDestBuf = LockVideoSurface(guiRENDERBUFFER, &uiDestPitchBYTES);
  pSrcBuf = LockVideoSurface(guiSAVEBUFFER, &uiSrcPitchBYTES);

  for (uiCount = 0; uiCount < guiNumBackSaves; uiCount++) {
    if (gBackSaves[uiCount].fFilled && (!gBackSaves[uiCount].fDisabled)) {
      if (gBackSaves[uiCount].uiFlags & BGND_FLAG_SAVERECT) {
        if (gBackSaves[uiCount].pSaveArea != NULL) {
          Blt16BPPTo16BPP(pDestBuf, uiDestPitchBYTES, gBackSaves[uiCount].pSaveArea, gBackSaves[uiCount].sWidth * 2, gBackSaves[uiCount].sLeft, gBackSaves[uiCount].sTop, 0, 0, gBackSaves[uiCount].sWidth, gBackSaves[uiCount].sHeight);

          AddBaseDirtyRect(gBackSaves[uiCount].sLeft, gBackSaves[uiCount].sTop, gBackSaves[uiCount].sRight, gBackSaves[uiCount].sBottom);
        }
      } else if (gBackSaves[uiCount].uiFlags & BGND_FLAG_SAVE_Z) {
        if (gBackSaves[uiCount].fZBuffer) {
          Blt16BPPTo16BPP(gpZBuffer, uiDestPitchBYTES, gBackSaves[uiCount].pZSaveArea, gBackSaves[uiCount].sWidth * 2, gBackSaves[uiCount].sLeft, gBackSaves[uiCount].sTop, 0, 0, gBackSaves[uiCount].sWidth, gBackSaves[uiCount].sHeight);
        }
      } else {
        Blt16BPPTo16BPP(pDestBuf, uiDestPitchBYTES, pSrcBuf, uiSrcPitchBYTES, gBackSaves[uiCount].sLeft, gBackSaves[uiCount].sTop, gBackSaves[uiCount].sLeft, gBackSaves[uiCount].sTop, gBackSaves[uiCount].sWidth, gBackSaves[uiCount].sHeight);

        AddBaseDirtyRect(gBackSaves[uiCount].sLeft, gBackSaves[uiCount].sTop, gBackSaves[uiCount].sRight, gBackSaves[uiCount].sBottom);
      }
    }
  }

  UnLockVideoSurface(guiRENDERBUFFER);
  UnLockVideoSurface(guiSAVEBUFFER);

  EmptyBackgroundRects();

  return TRUE;
}

function EmptyBackgroundRects(): BOOLEAN {
  let uiCount: UINT32;

  for (uiCount = 0; uiCount < guiNumBackSaves; uiCount++) {
    if (gBackSaves[uiCount].fFilled) {
      gBackSaves[uiCount].fFilled = FALSE;

      if (!(gBackSaves[uiCount].fAllocated) && (gBackSaves[uiCount].fFreeMemory == TRUE)) {
        if (gBackSaves[uiCount].uiFlags & BGND_FLAG_SAVERECT) {
          if (gBackSaves[uiCount].pSaveArea != NULL) {
            MemFree(gBackSaves[uiCount].pSaveArea);
          }
        }
        if (gBackSaves[uiCount].fZBuffer)
          MemFree(gBackSaves[uiCount].pZSaveArea);

        gBackSaves[uiCount].fZBuffer = FALSE;
        gBackSaves[uiCount].fAllocated = FALSE;
        gBackSaves[uiCount].fFreeMemory = FALSE;
        gBackSaves[uiCount].fFilled = FALSE;
        gBackSaves[uiCount].pSaveArea = NULL;

        RecountBackgrounds();
      }
    }

    if (gBackSaves[uiCount].uiFlags & BGND_FLAG_SINGLE || gBackSaves[uiCount].fPendingDelete) {
      if (gBackSaves[uiCount].fFreeMemory == TRUE) {
        if (gBackSaves[uiCount].uiFlags & BGND_FLAG_SAVERECT) {
          if (gBackSaves[uiCount].pSaveArea != NULL) {
            MemFree(gBackSaves[uiCount].pSaveArea);
          }
        }

        if (gBackSaves[uiCount].fZBuffer)
          MemFree(gBackSaves[uiCount].pZSaveArea);
      }

      gBackSaves[uiCount].fZBuffer = FALSE;
      gBackSaves[uiCount].fAllocated = FALSE;
      gBackSaves[uiCount].fFreeMemory = FALSE;
      gBackSaves[uiCount].fFilled = FALSE;
      gBackSaves[uiCount].pSaveArea = NULL;
      gBackSaves[uiCount].fPendingDelete = FALSE;

      RecountBackgrounds();
    }
  }

  return TRUE;
}

function SaveBackgroundRects(): BOOLEAN {
  let uiCount: UINT32;
  let uiDestPitchBYTES: UINT32;
  let uiSrcPitchBYTES: UINT32;
  let pDestBuf: Pointer<UINT8>;
  let pSrcBuf: Pointer<UINT8>;

  pSrcBuf = LockVideoSurface(guiRENDERBUFFER, &uiDestPitchBYTES);
  pDestBuf = LockVideoSurface(guiSAVEBUFFER, &uiSrcPitchBYTES);

  for (uiCount = 0; uiCount < guiNumBackSaves; uiCount++) {
    if (gBackSaves[uiCount].fAllocated && (!gBackSaves[uiCount].fDisabled)) {
      if (gBackSaves[uiCount].uiFlags & BGND_FLAG_SAVERECT) {
        if (gBackSaves[uiCount].pSaveArea != NULL) {
          Blt16BPPTo16BPP(gBackSaves[uiCount].pSaveArea, gBackSaves[uiCount].sWidth * 2, pSrcBuf, uiDestPitchBYTES, 0, 0, gBackSaves[uiCount].sLeft, gBackSaves[uiCount].sTop, gBackSaves[uiCount].sWidth, gBackSaves[uiCount].sHeight);
        }
      } else if (gBackSaves[uiCount].fZBuffer) {
        Blt16BPPTo16BPP(gBackSaves[uiCount].pZSaveArea, gBackSaves[uiCount].sWidth * 2, gpZBuffer, uiDestPitchBYTES, 0, 0, gBackSaves[uiCount].sLeft, gBackSaves[uiCount].sTop, gBackSaves[uiCount].sWidth, gBackSaves[uiCount].sHeight);
      } else {
        AddBaseDirtyRect(gBackSaves[uiCount].sLeft, gBackSaves[uiCount].sTop, gBackSaves[uiCount].sRight, gBackSaves[uiCount].sBottom);
      }

      gBackSaves[uiCount].fFilled = TRUE;
    }
  }

  UnLockVideoSurface(guiRENDERBUFFER);
  UnLockVideoSurface(guiSAVEBUFFER);

  return TRUE;
}

function FreeBackgroundRect(iIndex: INT32): BOOLEAN {
  if (iIndex != -1) {
    gBackSaves[iIndex].fAllocated = FALSE;

    RecountBackgrounds();
  }

  return TRUE;
}

function FreeBackgroundRectPending(iIndex: INT32): BOOLEAN {
  gBackSaves[iIndex].fPendingDelete = TRUE;

  return TRUE;
}

function FreeBackgroundRectNow(uiCount: INT32): BOOLEAN {
  if (gBackSaves[uiCount].fFreeMemory == TRUE) {
    // MemFree(gBackSaves[uiCount].pSaveArea);
    if (gBackSaves[uiCount].fZBuffer)
      MemFree(gBackSaves[uiCount].pZSaveArea);
  }

  gBackSaves[uiCount].fZBuffer = FALSE;
  gBackSaves[uiCount].fAllocated = FALSE;
  gBackSaves[uiCount].fFreeMemory = FALSE;
  gBackSaves[uiCount].fFilled = FALSE;
  gBackSaves[uiCount].pSaveArea = NULL;

  RecountBackgrounds();
  return TRUE;
}

function FreeBackgroundRectType(uiFlags: UINT32): BOOLEAN {
  let uiCount: UINT32;

  for (uiCount = 0; uiCount < guiNumBackSaves; uiCount++) {
    if (gBackSaves[uiCount].uiFlags & uiFlags) {
      if (gBackSaves[uiCount].fFreeMemory == TRUE) {
        // MemFree(gBackSaves[uiCount].pSaveArea);
        if (gBackSaves[uiCount].fZBuffer)
          MemFree(gBackSaves[uiCount].pZSaveArea);
      }

      gBackSaves[uiCount].fZBuffer = FALSE;
      gBackSaves[uiCount].fAllocated = FALSE;
      gBackSaves[uiCount].fFreeMemory = FALSE;
      gBackSaves[uiCount].fFilled = FALSE;
      gBackSaves[uiCount].pSaveArea = NULL;
    }
  }

  RecountBackgrounds();

  return TRUE;
}

function InitializeBackgroundRects(): BOOLEAN {
  guiNumBackSaves = 0;
  return TRUE;
}

function InvalidateBackgroundRects(): BOOLEAN {
  let uiCount: UINT32;

  for (uiCount = 0; uiCount < guiNumBackSaves; uiCount++)
    gBackSaves[uiCount].fFilled = FALSE;

  return TRUE;
}

function ShutdownBackgroundRects(): BOOLEAN {
  let uiCount: UINT32;

  for (uiCount = 0; uiCount < guiNumBackSaves; uiCount++) {
    if (gBackSaves[uiCount].fAllocated)
      FreeBackgroundRectNow(uiCount);
  }

  return TRUE;
}

function DisableBackgroundRect(iIndex: INT32, fDisabled: BOOLEAN): void {
  gBackSaves[iIndex].fDisabled = fDisabled;
}

function UpdateSaveBuffer(): BOOLEAN {
  let uiDestPitchBYTES: UINT32;
  let uiSrcPitchBYTES: UINT32;
  let pDestBuf: Pointer<UINT8>;
  let pSrcBuf: Pointer<UINT8>;
  let usWidth: UINT16;
  let usHeight: UINT16;
  let ubBitDepth: UINT8;

  // Update saved buffer - do for the viewport size ony!
  GetCurrentVideoSettings(&usWidth, &usHeight, &ubBitDepth);

  pSrcBuf = LockVideoSurface(guiRENDERBUFFER, &uiSrcPitchBYTES);
  pDestBuf = LockVideoSurface(guiSAVEBUFFER, &uiDestPitchBYTES);

  if (gbPixelDepth == 16) {
    // BLIT HERE
    Blt16BPPTo16BPP(pDestBuf, uiDestPitchBYTES, pSrcBuf, uiSrcPitchBYTES, 0, gsVIEWPORT_WINDOW_START_Y, 0, gsVIEWPORT_WINDOW_START_Y, usWidth, (gsVIEWPORT_WINDOW_END_Y - gsVIEWPORT_WINDOW_START_Y));
  } else if (gbPixelDepth == 8) {
    // BLIT HERE
    Blt8BPPTo8BPP(pDestBuf, uiDestPitchBYTES, pSrcBuf, uiSrcPitchBYTES, 0, gsVIEWPORT_WINDOW_START_Y, 0, gsVIEWPORT_WINDOW_START_Y, usWidth, gsVIEWPORT_WINDOW_END_Y);
  }

  UnLockVideoSurface(guiRENDERBUFFER);
  UnLockVideoSurface(guiSAVEBUFFER);

  return TRUE;
}

function RestoreExternBackgroundRect(sLeft: INT16, sTop: INT16, sWidth: INT16, sHeight: INT16): BOOLEAN {
  let uiDestPitchBYTES: UINT32;
  let uiSrcPitchBYTES: UINT32;
  let pDestBuf: Pointer<UINT8>;
  let pSrcBuf: Pointer<UINT8>;

  Assert((sLeft >= 0) && (sTop >= 0) && (sLeft + sWidth <= 640) && (sTop + sHeight <= 480));

  pDestBuf = LockVideoSurface(guiRENDERBUFFER, &uiDestPitchBYTES);
  pSrcBuf = LockVideoSurface(guiSAVEBUFFER, &uiSrcPitchBYTES);

  if (gbPixelDepth == 16) {
    Blt16BPPTo16BPP(pDestBuf, uiDestPitchBYTES, pSrcBuf, uiSrcPitchBYTES, sLeft, sTop, sLeft, sTop, sWidth, sHeight);
  } else if (gbPixelDepth == 8) {
    Blt8BPPTo8BPP(pDestBuf, uiDestPitchBYTES, pSrcBuf, uiSrcPitchBYTES, sLeft, sTop, sLeft, sTop, sWidth, sHeight);
  }
  UnLockVideoSurface(guiRENDERBUFFER);
  UnLockVideoSurface(guiSAVEBUFFER);

  // Add rect to frame buffer queue
  InvalidateRegionEx(sLeft, sTop, (sLeft + sWidth), (sTop + sHeight), 0);

  return TRUE;
}

function RestoreExternBackgroundRectGivenID(iBack: INT32): BOOLEAN {
  let uiDestPitchBYTES: UINT32;
  let uiSrcPitchBYTES: UINT32;
  let sLeft: INT16;
  let sTop: INT16;
  let sWidth: INT16;
  let sHeight: INT16;
  let pDestBuf: Pointer<UINT8>;
  let pSrcBuf: Pointer<UINT8>;

  if (!gBackSaves[iBack].fAllocated) {
    return FALSE;
  }

  sLeft = gBackSaves[iBack].sLeft;
  sTop = gBackSaves[iBack].sTop;
  sWidth = gBackSaves[iBack].sWidth;
  sHeight = gBackSaves[iBack].sHeight;

  Assert((sLeft >= 0) && (sTop >= 0) && (sLeft + sWidth <= 640) && (sTop + sHeight <= 480));

  pDestBuf = LockVideoSurface(guiRENDERBUFFER, &uiDestPitchBYTES);
  pSrcBuf = LockVideoSurface(guiSAVEBUFFER, &uiSrcPitchBYTES);

  if (gbPixelDepth == 16) {
    Blt16BPPTo16BPP(pDestBuf, uiDestPitchBYTES, pSrcBuf, uiSrcPitchBYTES, sLeft, sTop, sLeft, sTop, sWidth, sHeight);
  } else if (gbPixelDepth == 8) {
    Blt8BPPTo8BPP(pDestBuf, uiDestPitchBYTES, pSrcBuf, uiSrcPitchBYTES, sLeft, sTop, sLeft, sTop, sWidth, sHeight);
  }
  UnLockVideoSurface(guiRENDERBUFFER);
  UnLockVideoSurface(guiSAVEBUFFER);

  // Add rect to frame buffer queue
  InvalidateRegionEx(sLeft, sTop, (sLeft + sWidth), (sTop + sHeight), 0);

  return TRUE;
}

function CopyExternBackgroundRect(sLeft: INT16, sTop: INT16, sWidth: INT16, sHeight: INT16): BOOLEAN {
  let uiDestPitchBYTES: UINT32;
  let uiSrcPitchBYTES: UINT32;
  let pDestBuf: Pointer<UINT8>;
  let pSrcBuf: Pointer<UINT8>;

  Assert((sLeft >= 0) && (sTop >= 0) && (sLeft + sWidth <= 640) && (sTop + sHeight <= 480));

  pDestBuf = LockVideoSurface(guiSAVEBUFFER, &uiDestPitchBYTES);
  pSrcBuf = LockVideoSurface(guiRENDERBUFFER, &uiSrcPitchBYTES);

  if (gbPixelDepth == 16) {
    Blt16BPPTo16BPP(pDestBuf, uiDestPitchBYTES, pSrcBuf, uiSrcPitchBYTES, sLeft, sTop, sLeft, sTop, sWidth, sHeight);
  } else if (gbPixelDepth == 8) {
    Blt8BPPTo8BPP(pDestBuf, uiDestPitchBYTES, pSrcBuf, uiSrcPitchBYTES, sLeft, sTop, sLeft, sTop, sWidth, sHeight);
  }
  UnLockVideoSurface(guiSAVEBUFFER);
  UnLockVideoSurface(guiRENDERBUFFER);

  return TRUE;
}

//*****************************************************************************
// gprintfdirty
//
//		Dirties a single-frame rect exactly the size needed to save the
// background for a given call to gprintf. Note that this must be called before
// the backgrounds are saved, and before the actual call to gprintf that writes
// to the video buffer.
//
//*****************************************************************************
function gprintfdirty(x: INT16, y: INT16, pFontString: Pointer<UINT16>, ...args: any[]): UINT16 {
  let argptr: va_list;
  let string: wchar_t[] /* [512] */;
  let uiStringLength: UINT16;
  let uiStringHeight: UINT16;
  let iBack: INT32;

  Assert(pFontString != NULL);

  va_start(argptr, pFontString); // Set up variable argument pointer
  vswprintf(string, pFontString, argptr); // process gprintf string (get output str)
  va_end(argptr);

  if (USE_WINFONTS()) {
    uiStringLength = WinFontStringPixLength(string, GET_WINFONT());
    uiStringHeight = GetWinFontHeight(string, GET_WINFONT());
  } else {
    uiStringLength = StringPixLength(string, FontDefault);
    uiStringHeight = GetFontHeight(FontDefault);
  }

  if (uiStringLength > 0) {
    iBack = RegisterBackgroundRect(BGND_FLAG_SINGLE, NULL, x, y, (x + uiStringLength), (y + uiStringHeight));

    if (iBack != -1) {
      SetBackgroundRectFilled(iBack);
    }
  }

  return uiStringLength;
}

function gprintfinvalidate(x: INT16, y: INT16, pFontString: Pointer<UINT16>, ...args: any[]): UINT16 {
  let argptr: va_list;
  let string: wchar_t[] /* [512] */;
  let uiStringLength: UINT16;
  let uiStringHeight: UINT16;

  Assert(pFontString != NULL);

  va_start(argptr, pFontString); // Set up variable argument pointer
  vswprintf(string, pFontString, argptr); // process gprintf string (get output str)
  va_end(argptr);

  uiStringLength = StringPixLength(string, FontDefault);
  uiStringHeight = GetFontHeight(FontDefault);

  if (uiStringLength > 0) {
    InvalidateRegionEx(x, y, (x + uiStringLength), (y + uiStringHeight), 0);
  }
  return uiStringLength;
}

function gprintfRestore(x: INT16, y: INT16, pFontString: Pointer<UINT16>, ...args: any[]): UINT16 {
  let argptr: va_list;
  let string: wchar_t[] /* [512] */;
  let uiStringLength: UINT16;
  let uiStringHeight: UINT16;

  Assert(pFontString != NULL);

  va_start(argptr, pFontString); // Set up variable argument pointer
  vswprintf(string, pFontString, argptr); // process gprintf string (get output str)
  va_end(argptr);

  uiStringLength = StringPixLength(string, FontDefault);
  uiStringHeight = GetFontHeight(FontDefault);

  if (uiStringLength > 0) {
    RestoreExternBackgroundRect(x, y, uiStringLength, uiStringHeight);
  }

  return uiStringLength;
}

// OVERLAY STUFF
function GetFreeVideoOverlay(): INT32 {
  let uiCount: UINT32;

  for (uiCount = 0; uiCount < guiNumVideoOverlays; uiCount++) {
    if ((gVideoOverlays[uiCount].fAllocated == FALSE))
      return uiCount;
  }

  if (guiNumVideoOverlays < BACKGROUND_BUFFERS)
    return guiNumVideoOverlays++;

  return -1;
}

function RecountVideoOverlays(): void {
  let uiCount: INT32;

  for (uiCount = guiNumVideoOverlays - 1; (uiCount >= 0); uiCount--) {
    if ((gVideoOverlays[uiCount].fAllocated)) {
      guiNumVideoOverlays = (uiCount + 1);
      break;
    }
  }
}

function RegisterVideoOverlay(uiFlags: UINT32, pTopmostDesc: Pointer<VIDEO_OVERLAY_DESC>): INT32 {
  let iBlitterIndex: UINT32;
  let iBackIndex: UINT32;
  let uiStringLength: UINT16;
  let uiStringHeight: UINT16;

  if (uiFlags & VOVERLAY_DIRTYBYTEXT) {
    // Get dims by supplied text
    if (pTopmostDesc->pzText == NULL) {
      return -1;
    }

    uiStringLength = StringPixLength(pTopmostDesc->pzText, pTopmostDesc->uiFontID);
    uiStringHeight = GetFontHeight(pTopmostDesc->uiFontID);

    iBackIndex = RegisterBackgroundRect(BGND_FLAG_PERMANENT, NULL, pTopmostDesc->sLeft, pTopmostDesc->sTop, (pTopmostDesc->sLeft + uiStringLength), (pTopmostDesc->sTop + uiStringHeight));
  } else {
    // Register background
    iBackIndex = RegisterBackgroundRect(BGND_FLAG_PERMANENT, NULL, pTopmostDesc->sLeft, pTopmostDesc->sTop, pTopmostDesc->sRight, pTopmostDesc->sBottom);
  }

  if (iBackIndex == -1) {
    return -1;
  }

  // Get next free topmost blitter index
  if ((iBlitterIndex = GetFreeVideoOverlay()) == (-1))
    return -1;

  // Init new blitter
  memset(&gVideoOverlays[iBlitterIndex], 0, sizeof(VIDEO_OVERLAY));

  gVideoOverlays[iBlitterIndex].uiFlags = uiFlags;
  gVideoOverlays[iBlitterIndex].fAllocated = 2;
  gVideoOverlays[iBlitterIndex].uiBackground = iBackIndex;
  gVideoOverlays[iBlitterIndex].pBackground = &(gBackSaves[iBackIndex]);
  gVideoOverlays[iBlitterIndex].BltCallback = pTopmostDesc->BltCallback;

  // Update blitter info
  // Set update flags to zero since we are forcing all updates
  pTopmostDesc->uiFlags = 0;
  UpdateVideoOverlay(pTopmostDesc, iBlitterIndex, TRUE);

  // Set disabled flag to true
  if (uiFlags & VOVERLAY_STARTDISABLED) {
    gVideoOverlays[iBlitterIndex].fDisabled = TRUE;
    DisableBackgroundRect(gVideoOverlays[iBlitterIndex].uiBackground, TRUE);
  }

  gVideoOverlays[iBlitterIndex].uiDestBuff = FRAME_BUFFER;

  // DebugMsg( TOPIC_JA2, DBG_LEVEL_0, String( "Register Overlay %d %S", iBlitterIndex, gVideoOverlays[ iBlitterIndex ].zText ) );

  return iBlitterIndex;
}

function SetVideoOverlayPendingDelete(iVideoOverlay: INT32): void {
  if (iVideoOverlay != -1) {
    gVideoOverlays[iVideoOverlay].fDeletionPending = TRUE;
  }
}

function RemoveVideoOverlay(iVideoOverlay: INT32): void {
  if (iVideoOverlay != -1 && gVideoOverlays[iVideoOverlay].fAllocated) {
    // Check if we are actively scrolling
    if (gVideoOverlays[iVideoOverlay].fActivelySaving) {
      //		DebugMsg( TOPIC_JA2, DBG_LEVEL_0, String( "Overlay Actively saving %d %S", iVideoOverlay, gVideoOverlays[ iVideoOverlay ].zText ) );

      gVideoOverlays[iVideoOverlay].fDeletionPending = TRUE;
    } else {
      // RestoreExternBackgroundRectGivenID( gVideoOverlays[ iVideoOverlay ].uiBackground );

      // Remove background
      FreeBackgroundRect(gVideoOverlays[iVideoOverlay].uiBackground);

      // DebugMsg( TOPIC_JA2, DBG_LEVEL_0, String( "Delete Overlay %d %S", iVideoOverlay, gVideoOverlays[ iVideoOverlay ].zText ) );

      // Remove save buffer if not done so
      if (gVideoOverlays[iVideoOverlay].pSaveArea != NULL) {
        MemFree(gVideoOverlays[iVideoOverlay].pSaveArea);
      }
      gVideoOverlays[iVideoOverlay].pSaveArea = NULL;

      // Set as not allocated
      gVideoOverlays[iVideoOverlay].fAllocated = FALSE;
    }
  }
}

function UpdateVideoOverlay(pTopmostDesc: Pointer<VIDEO_OVERLAY_DESC>, iBlitterIndex: UINT32, fForceAll: BOOLEAN): BOOLEAN {
  let uiFlags: UINT32;
  let uiStringLength: UINT16;
  let uiStringHeight: UINT16;

  if (iBlitterIndex != -1) {
    if (!gVideoOverlays[iBlitterIndex].fAllocated) {
      return FALSE;
    }

    uiFlags = pTopmostDesc->uiFlags;

    if (fForceAll) {
      gVideoOverlays[iBlitterIndex].uiFontID = pTopmostDesc->uiFontID;
      gVideoOverlays[iBlitterIndex].sX = pTopmostDesc->sX;
      gVideoOverlays[iBlitterIndex].sY = pTopmostDesc->sY;
      gVideoOverlays[iBlitterIndex].ubFontBack = pTopmostDesc->ubFontBack;
      gVideoOverlays[iBlitterIndex].ubFontFore = pTopmostDesc->ubFontFore;

      if (pTopmostDesc->pzText != NULL) {
        wcscpy(gVideoOverlays[iBlitterIndex].zText, pTopmostDesc->pzText);
      }
    } else {
      if (uiFlags & VOVERLAY_DESC_TEXT) {
        if (pTopmostDesc->pzText != NULL) {
          wcscpy(gVideoOverlays[iBlitterIndex].zText, pTopmostDesc->pzText);
        }
      }

      if (uiFlags & VOVERLAY_DESC_DISABLED) {
        gVideoOverlays[iBlitterIndex].fDisabled = pTopmostDesc->fDisabled;
        DisableBackgroundRect(gVideoOverlays[iBlitterIndex].uiBackground, pTopmostDesc->fDisabled);
      }

      // If position has changed and flags are of type that use dirty rects, adjust
      if ((uiFlags & VOVERLAY_DESC_POSITION)) {
        if (gVideoOverlays[iBlitterIndex].uiFlags & VOVERLAY_DIRTYBYTEXT) {
          // Get dims by supplied text
          if (pTopmostDesc->pzText == NULL) {
            return FALSE;
          }

          uiStringLength = StringPixLength(gVideoOverlays[iBlitterIndex].zText, gVideoOverlays[iBlitterIndex].uiFontID);
          uiStringHeight = GetFontHeight(gVideoOverlays[iBlitterIndex].uiFontID);

          // Delete old rect
          // Remove background
          FreeBackgroundRectPending(gVideoOverlays[iBlitterIndex].uiBackground);

          gVideoOverlays[iBlitterIndex].uiBackground = RegisterBackgroundRect(BGND_FLAG_PERMANENT, NULL, pTopmostDesc->sLeft, pTopmostDesc->sTop, (pTopmostDesc->sLeft + uiStringLength), (pTopmostDesc->sTop + uiStringHeight));
          gVideoOverlays[iBlitterIndex].sX = pTopmostDesc->sX;
          gVideoOverlays[iBlitterIndex].sY = pTopmostDesc->sY;
        }
      }
    }
  }
  return TRUE;
}

// FUnctions for entrie array of blitters
function ExecuteVideoOverlays(): void {
  let uiCount: UINT32;

  for (uiCount = 0; uiCount < guiNumVideoOverlays; uiCount++) {
    if (gVideoOverlays[uiCount].fAllocated) {
      if (!gVideoOverlays[uiCount].fDisabled) {
        // If we are scrolling but havn't saved yet, don't!
        if (!gVideoOverlays[uiCount].fActivelySaving && gfScrollInertia > 0) {
          continue;
        }

        // ATE: Wait a frame before executing!
        if (gVideoOverlays[uiCount].fAllocated == 1) {
          // Call Blit Function
          (*(gVideoOverlays[uiCount].BltCallback))(&(gVideoOverlays[uiCount]));
        } else if (gVideoOverlays[uiCount].fAllocated == 2) {
          gVideoOverlays[uiCount].fAllocated = 1;
        }
      }

      // Remove if pending
      // if ( gVideoOverlays[uiCount].fDeletionPending )
      //{
      //	RemoveVideoOverlay( uiCount );
      //}
    }
  }
}

function ExecuteVideoOverlaysToAlternateBuffer(uiNewDestBuffer: UINT32): void {
  let uiCount: UINT32;
  let uiOldDestBuffer: UINT32;

  for (uiCount = 0; uiCount < guiNumVideoOverlays; uiCount++) {
    if (gVideoOverlays[uiCount].fAllocated && !gVideoOverlays[uiCount].fDisabled) {
      if (gVideoOverlays[uiCount].fActivelySaving) {
        uiOldDestBuffer = gVideoOverlays[uiCount].uiDestBuff;

        gVideoOverlays[uiCount].uiDestBuff = uiNewDestBuffer;

        // Call Blit Function
        (*(gVideoOverlays[uiCount].BltCallback))(&(gVideoOverlays[uiCount]));

        gVideoOverlays[uiCount].uiDestBuff = uiOldDestBuffer;
      }
    }
  }
}

function AllocateVideoOverlaysArea(): void {
  let uiCount: UINT32;
  let uiBufSize: UINT32;
  let iBackIndex: UINT32;

  for (uiCount = 0; uiCount < guiNumVideoOverlays; uiCount++) {
    if (gVideoOverlays[uiCount].fAllocated && !gVideoOverlays[uiCount].fDisabled) {
      iBackIndex = gVideoOverlays[uiCount].uiBackground;

      // Get buffer size
      uiBufSize = ((gBackSaves[iBackIndex].sRight - gBackSaves[iBackIndex].sLeft) * 2) * (gBackSaves[iBackIndex].sBottom - gBackSaves[iBackIndex].sTop);

      gVideoOverlays[uiCount].fActivelySaving = TRUE;

      // DebugMsg( TOPIC_JA2, DBG_LEVEL_0, String( "Setting Overlay Actively saving %d %S", uiCount, gVideoOverlays[ uiCount ].zText ) );

      // Allocate
      if ((gVideoOverlays[uiCount].pSaveArea = MemAlloc(uiBufSize)) == NULL) {
        continue;
      }
    }
  }
}

function AllocateVideoOverlayArea(uiCount: UINT32): void {
  let uiBufSize: UINT32;
  let iBackIndex: UINT32;

  if (gVideoOverlays[uiCount].fAllocated && !gVideoOverlays[uiCount].fDisabled) {
    iBackIndex = gVideoOverlays[uiCount].uiBackground;

    // Get buffer size
    uiBufSize = ((gBackSaves[iBackIndex].sRight - gBackSaves[iBackIndex].sLeft) * 2) * (gBackSaves[iBackIndex].sBottom - gBackSaves[iBackIndex].sTop);

    gVideoOverlays[uiCount].fActivelySaving = TRUE;

    // DebugMsg( TOPIC_JA2, DBG_LEVEL_0, String( "Setting Overlay Actively saving %d %S", uiCount, gVideoOverlays[ uiCount ].zText ) );

    // Allocate
    if ((gVideoOverlays[uiCount].pSaveArea = MemAlloc(uiBufSize)) == NULL) {
    }
  }
}

function SaveVideoOverlaysArea(uiSrcBuffer: UINT32): void {
  let uiCount: UINT32;
  let iBackIndex: UINT32;
  let uiSrcPitchBYTES: UINT32;
  let pSrcBuf: Pointer<UINT8>;

  pSrcBuf = LockVideoSurface(uiSrcBuffer, &uiSrcPitchBYTES);

  for (uiCount = 0; uiCount < guiNumVideoOverlays; uiCount++) {
    if (gVideoOverlays[uiCount].fAllocated && !gVideoOverlays[uiCount].fDisabled) {
      // OK, if our saved area is null, allocate it here!
      if (gVideoOverlays[uiCount].pSaveArea == NULL) {
        AllocateVideoOverlayArea(uiCount);
      }

      if (gVideoOverlays[uiCount].pSaveArea != NULL) {
        iBackIndex = gVideoOverlays[uiCount].uiBackground;

        // Save data from frame buffer!
        Blt16BPPTo16BPP(gVideoOverlays[uiCount].pSaveArea, gBackSaves[iBackIndex].sWidth * 2, pSrcBuf, uiSrcPitchBYTES, 0, 0, gBackSaves[iBackIndex].sLeft, gBackSaves[iBackIndex].sTop, gBackSaves[iBackIndex].sWidth, gBackSaves[iBackIndex].sHeight);
      }
    }
  }

  UnLockVideoSurface(uiSrcBuffer);
}

function SaveVideoOverlayArea(uiSrcBuffer: UINT32, uiCount: UINT32): void {
  let iBackIndex: UINT32;
  let uiSrcPitchBYTES: UINT32;
  let pSrcBuf: Pointer<UINT8>;

  pSrcBuf = LockVideoSurface(uiSrcBuffer, &uiSrcPitchBYTES);

  if (gVideoOverlays[uiCount].fAllocated && !gVideoOverlays[uiCount].fDisabled) {
    // OK, if our saved area is null, allocate it here!
    if (gVideoOverlays[uiCount].pSaveArea == NULL) {
      AllocateVideoOverlayArea(uiCount);
    }

    if (gVideoOverlays[uiCount].pSaveArea != NULL) {
      iBackIndex = gVideoOverlays[uiCount].uiBackground;

      // Save data from frame buffer!
      Blt16BPPTo16BPP(gVideoOverlays[uiCount].pSaveArea, gBackSaves[iBackIndex].sWidth * 2, pSrcBuf, uiSrcPitchBYTES, 0, 0, gBackSaves[iBackIndex].sLeft, gBackSaves[iBackIndex].sTop, gBackSaves[iBackIndex].sWidth, gBackSaves[iBackIndex].sHeight);
    }
  }

  UnLockVideoSurface(uiSrcBuffer);
}

function DeleteVideoOverlaysArea(): void {
  let uiCount: UINT32;

  for (uiCount = 0; uiCount < guiNumVideoOverlays; uiCount++) {
    if (gVideoOverlays[uiCount].fAllocated && !gVideoOverlays[uiCount].fDisabled) {
      if (gVideoOverlays[uiCount].pSaveArea != NULL) {
        MemFree(gVideoOverlays[uiCount].pSaveArea);
      }

      gVideoOverlays[uiCount].fActivelySaving = FALSE;

      gVideoOverlays[uiCount].pSaveArea = NULL;

      // DebugMsg( TOPIC_JA2, DBG_LEVEL_0, String( "Removing Overlay Actively saving %d %S", uiCount, gVideoOverlays[ uiCount ].zText ) );

      // Remove if pending
      if (gVideoOverlays[uiCount].fDeletionPending) {
        RemoveVideoOverlay(uiCount);
      }
    }
  }
}

function RestoreShiftedVideoOverlays(sShiftX: INT16, sShiftY: INT16): BOOLEAN {
  let uiCount: UINT32;
  let uiDestPitchBYTES: UINT32;
  let pDestBuf: Pointer<UINT8>;
  let iBackIndex: UINT32;

  let ClipX1: INT32;
  let ClipY1: INT32;
  let ClipX2: INT32;
  let ClipY2: INT32;
  let uiLeftSkip: INT32;
  let uiRightSkip: INT32;
  let uiTopSkip: INT32;
  let uiBottomSkip: INT32;
  let usHeight: UINT32;
  let usWidth: UINT32;
  let iTempX: INT32;
  let iTempY: INT32;
  let sLeft: INT16;
  let sTop: INT16;
  let sRight: INT16;
  let sBottom: INT16;

  ClipX1 = 0;
  ClipY1 = gsVIEWPORT_WINDOW_START_Y;
  ClipX2 = 640;
  ClipY2 = gsVIEWPORT_WINDOW_END_Y - 1;

  pDestBuf = LockVideoSurface(BACKBUFFER, &uiDestPitchBYTES);

  for (uiCount = 0; uiCount < guiNumVideoOverlays; uiCount++) {
    if (gVideoOverlays[uiCount].fAllocated && !gVideoOverlays[uiCount].fDisabled) {
      iBackIndex = gVideoOverlays[uiCount].uiBackground;

      if (gVideoOverlays[uiCount].pSaveArea != NULL) {
        // Get restore background values
        sLeft = gBackSaves[iBackIndex].sLeft;
        sTop = gBackSaves[iBackIndex].sTop;
        sRight = gBackSaves[iBackIndex].sRight;
        sBottom = gBackSaves[iBackIndex].sBottom;
        usHeight = gBackSaves[iBackIndex].sHeight;
        usWidth = gBackSaves[iBackIndex].sWidth;

        // Clip!!
        iTempX = sLeft + sShiftX;
        iTempY = sTop + sShiftY;

        // Clip to rect
        uiLeftSkip = __min(ClipX1 - min(ClipX1, iTempX), usWidth);
        uiRightSkip = __min(max(ClipX2, (iTempX + usWidth)) - ClipX2, usWidth);
        uiTopSkip = __min(ClipY1 - __min(ClipY1, iTempY), usHeight);
        uiBottomSkip = __min(__max(ClipY2, (iTempY + usHeight)) - ClipY2, usHeight);

        // check if whole thing is clipped
        if ((uiLeftSkip >= usWidth) || (uiRightSkip >= usWidth))
          continue;

        // check if whole thing is clipped
        if ((uiTopSkip >= usHeight) || (uiBottomSkip >= usHeight))
          continue;

        // Set re-set values given based on clipping
        sLeft = iTempX + uiLeftSkip;
        sTop = iTempY + uiTopSkip;
        sRight = sRight + sShiftX - uiRightSkip;
        sBottom = sBottom + sShiftY - uiBottomSkip;

        usHeight = sBottom - sTop;
        usWidth = sRight - sLeft;

        if (gbPixelDepth == 16) {
          Blt16BPPTo16BPP(pDestBuf, uiDestPitchBYTES, gVideoOverlays[uiCount].pSaveArea, gBackSaves[iBackIndex].sWidth * 2, sLeft, sTop, uiLeftSkip, uiTopSkip, usWidth, usHeight);
        } else if (gbPixelDepth == 8) {
        }

        // Once done, check for pending deletion
        if (gVideoOverlays[uiCount].fDeletionPending) {
          RemoveVideoOverlay(uiCount);
        }
      }
    }
  }

  UnLockVideoSurface(BACKBUFFER);

  return TRUE;
}

function SetOverlayUserData(iVideoOverlay: INT32, ubNum: UINT8, uiData: UINT32): BOOLEAN {
  if (!gVideoOverlays[iVideoOverlay].fAllocated) {
    return FALSE;
  }

  if (ubNum > 4) {
    return FALSE;
  }

  gVideoOverlays[iVideoOverlay].uiUserData[ubNum] = uiData;

  return TRUE;
}

// Common callbacks for topmost blitters
function BlitMFont(pBlitter: Pointer<VIDEO_OVERLAY>): void {
  let pDestBuf: Pointer<UINT8>;
  let uiDestPitchBYTES: UINT32;

  pDestBuf = LockVideoSurface(pBlitter->uiDestBuff, &uiDestPitchBYTES);

  SetFont(pBlitter->uiFontID);
  SetFontBackground(pBlitter->ubFontBack);
  SetFontForeground(pBlitter->ubFontFore);

  mprintf_buffer(pDestBuf, uiDestPitchBYTES, pBlitter->uiFontID, pBlitter->sX, pBlitter->sY, pBlitter->zText);

  UnLockVideoSurface(pBlitter->uiDestBuff);
}

function BlitBufferToBuffer(uiSrcBuffer: UINT32, uiDestBuffer: UINT32, usSrcX: UINT16, usSrcY: UINT16, usWidth: UINT16, usHeight: UINT16): BOOLEAN {
  let uiDestPitchBYTES: UINT32;
  let uiSrcPitchBYTES: UINT32;
  let pDestBuf: Pointer<UINT8>;
  let pSrcBuf: Pointer<UINT8>;
  let fRetVal: BOOLEAN;

  pDestBuf = LockVideoSurface(uiDestBuffer, &uiDestPitchBYTES);
  pSrcBuf = LockVideoSurface(uiSrcBuffer, &uiSrcPitchBYTES);

  fRetVal = Blt16BPPTo16BPP(pDestBuf, uiDestPitchBYTES, pSrcBuf, uiSrcPitchBYTES, usSrcX, usSrcY, usSrcX, usSrcY, usWidth, usHeight);

  UnLockVideoSurface(uiDestBuffer);
  UnLockVideoSurface(uiSrcBuffer);

  return fRetVal;
}

function EnableVideoOverlay(fEnable: BOOLEAN, iOverlayIndex: INT32): void {
  let VideoOverlayDesc: VIDEO_OVERLAY_DESC;

  memset(&VideoOverlayDesc, 0, sizeof(VideoOverlayDesc));

  // enable or disable
  VideoOverlayDesc.fDisabled = !fEnable;

  // go play with enable/disable state
  VideoOverlayDesc.uiFlags = VOVERLAY_DESC_DISABLED;

  UpdateVideoOverlay(&VideoOverlayDesc, iOverlayIndex, FALSE);
}
