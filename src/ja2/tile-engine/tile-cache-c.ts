let guiNumTileCacheStructs: UINT32 = 0;
let guiMaxTileCacheSize: UINT32 = 50;
let guiCurTileCacheSize: UINT32 = 0;
let giDefaultStructIndex: INT32 = -1;

let gpTileCache: Pointer<TILE_CACHE_ELEMENT> = NULL;
let gpTileCacheStructInfo: Pointer<TILE_CACHE_STRUCT> = NULL;

function InitTileCache(): BOOLEAN {
  let cnt: UINT32;
  let FileInfo: GETFILESTRUCT;
  let sFiles: INT16 = 0;

  gpTileCache = MemAlloc(sizeof(TILE_CACHE_ELEMENT) * guiMaxTileCacheSize);

  // Zero entries
  for (cnt = 0; cnt < guiMaxTileCacheSize; cnt++) {
    gpTileCache[cnt].pImagery = NULL;
    gpTileCache[cnt].sStructRefID = -1;
  }

  guiCurTileCacheSize = 0;

  // OK, look for JSD files in the tile cache directory and
  // load any we find....
  if (GetFileFirst("TILECACHE\\*.jsd", &FileInfo)) {
    while (GetFileNext(&FileInfo)) {
      sFiles++;
    }
    GetFileClose(&FileInfo);
  }

  // Allocate memory...
  if (sFiles > 0) {
    cnt = 0;

    guiNumTileCacheStructs = sFiles;

    gpTileCacheStructInfo = MemAlloc(sizeof(TILE_CACHE_STRUCT) * sFiles);

    // Loop through and set filenames
    if (GetFileFirst("TILECACHE\\*.jsd", &FileInfo)) {
      while (GetFileNext(&FileInfo)) {
        sprintf(gpTileCacheStructInfo[cnt].Filename, "TILECACHE\\%s", FileInfo.zFileName);

        // Get root name
        GetRootName(gpTileCacheStructInfo[cnt].zRootName, gpTileCacheStructInfo[cnt].Filename);

        // Load struc data....
        gpTileCacheStructInfo[cnt].pStructureFileRef = LoadStructureFile(gpTileCacheStructInfo[cnt].Filename);

        if (stricmp(gpTileCacheStructInfo[cnt].zRootName, "l_dead1") == 0) {
          giDefaultStructIndex = cnt;
        }

        cnt++;
      }
      GetFileClose(&FileInfo);
    }
  }

  return TRUE;
}

function DeleteTileCache(): void {
  let cnt: UINT32;

  // Allocate entries
  if (gpTileCache != NULL) {
    // Loop through and delete any entries
    for (cnt = 0; cnt < guiMaxTileCacheSize; cnt++) {
      if (gpTileCache[cnt].pImagery != NULL) {
        DeleteTileSurface(gpTileCache[cnt].pImagery);
      }
    }
    MemFree(gpTileCache);
  }

  if (gpTileCacheStructInfo != NULL) {
    MemFree(gpTileCacheStructInfo);
  }

  guiCurTileCacheSize = 0;
}

function FindCacheStructDataIndex(cFilename: Pointer<INT8>): INT16 {
  let cnt: UINT32;

  for (cnt = 0; cnt < guiNumTileCacheStructs; cnt++) {
    if (_stricmp(gpTileCacheStructInfo[cnt].zRootName, cFilename) == 0) {
      return cnt;
    }
  }

  return -1;
}

function GetCachedTile(cFilename: Pointer<INT8>): INT32 {
  let cnt: UINT32;
  let ubLowestIndex: UINT32 = 0;
  let sMostHits: INT16 = 15000;

  // Check to see if surface exists already
  for (cnt = 0; cnt < guiCurTileCacheSize; cnt++) {
    if (gpTileCache[cnt].pImagery != NULL) {
      if (_stricmp(gpTileCache[cnt].zName, cFilename) == 0) {
        // Found surface, return
        gpTileCache[cnt].sHits++;
        return cnt;
      }
    }
  }

  // Check if max size has been reached
  if (guiCurTileCacheSize == guiMaxTileCacheSize) {
    // cache out least used file
    for (cnt = 0; cnt < guiCurTileCacheSize; cnt++) {
      if (gpTileCache[cnt].sHits < sMostHits) {
        sMostHits = gpTileCache[cnt].sHits;
        ubLowestIndex = cnt;
      }
    }

    // Bump off lowest index
    DeleteTileSurface(gpTileCache[ubLowestIndex].pImagery);

    // Decrement
    gpTileCache[ubLowestIndex].sHits = 0;
    gpTileCache[ubLowestIndex].pImagery = NULL;
    gpTileCache[ubLowestIndex].sStructRefID = -1;
  }

  // If here, Insert at an empty slot
  // Find an empty slot
  for (cnt = 0; cnt < guiMaxTileCacheSize; cnt++) {
    if (gpTileCache[cnt].pImagery == NULL) {
      // Insert here
      gpTileCache[cnt].pImagery = LoadTileSurface(cFilename);

      if (gpTileCache[cnt].pImagery == NULL) {
        return -1;
      }

      strcpy(gpTileCache[cnt].zName, cFilename);
      gpTileCache[cnt].sHits = 1;

      // Get root name
      GetRootName(gpTileCache[cnt].zRootName, cFilename);

      gpTileCache[cnt].sStructRefID = FindCacheStructDataIndex(gpTileCache[cnt].zRootName);

      // ATE: Add z-strip info
      if (gpTileCache[cnt].sStructRefID != -1) {
        AddZStripInfoToVObject(gpTileCache[cnt].pImagery->vo, gpTileCacheStructInfo[gpTileCache[cnt].sStructRefID].pStructureFileRef, TRUE, 0);
      }

      if (gpTileCache[cnt].pImagery->pAuxData != NULL) {
        gpTileCache[cnt].ubNumFrames = gpTileCache[cnt].pImagery->pAuxData->ubNumberOfFrames;
      } else {
        gpTileCache[cnt].ubNumFrames = 1;
      }

      // Has our cache size increased?
      if (cnt >= guiCurTileCacheSize) {
        guiCurTileCacheSize = cnt + 1;
        ;
      }

      return cnt;
    }
  }

  // Can't find one!
  return -1;
}

function RemoveCachedTile(iCachedTile: INT32): BOOLEAN {
  let cnt: UINT32;

  // Find tile
  for (cnt = 0; cnt < guiCurTileCacheSize; cnt++) {
    if (gpTileCache[cnt].pImagery != NULL) {
      if (cnt == iCachedTile) {
        // Found surface, decrement hits
        gpTileCache[cnt].sHits--;

        // Are we at zero?
        if (gpTileCache[cnt].sHits == 0) {
          DeleteTileSurface(gpTileCache[cnt].pImagery);
          gpTileCache[cnt].pImagery = NULL;
          gpTileCache[cnt].sStructRefID = -1;
          return TRUE;
          ;
        }
      }
    }
  }

  return FALSE;
}

function GetCachedTileVideoObject(iIndex: INT32): HVOBJECT {
  if (iIndex == -1) {
    return NULL;
  }

  if (gpTileCache[iIndex].pImagery == NULL) {
    return NULL;
  }

  return gpTileCache[iIndex].pImagery->vo;
}

function GetCachedTileStructureRef(iIndex: INT32): Pointer<STRUCTURE_FILE_REF> {
  if (iIndex == -1) {
    return NULL;
  }

  if (gpTileCache[iIndex].sStructRefID == -1) {
    return NULL;
  }

  return gpTileCacheStructInfo[gpTileCache[iIndex].sStructRefID].pStructureFileRef;
}

function GetCachedTileStructureRefFromFilename(cFilename: Pointer<INT8>): Pointer<STRUCTURE_FILE_REF> {
  let sStructDataIndex: INT16;

  // Given filename, look for index
  sStructDataIndex = FindCacheStructDataIndex(cFilename);

  if (sStructDataIndex == -1) {
    return NULL;
  }

  return gpTileCacheStructInfo[sStructDataIndex].pStructureFileRef;
}

function CheckForAndAddTileCacheStructInfo(pNode: Pointer<LEVELNODE>, sGridNo: INT16, usIndex: UINT16, usSubIndex: UINT16): void {
  let pStructureFileRef: Pointer<STRUCTURE_FILE_REF>;

  pStructureFileRef = GetCachedTileStructureRef(usIndex);

  if (pStructureFileRef != NULL) {
    if (!AddStructureToWorld(sGridNo, 0, &(pStructureFileRef->pDBStructureRef[usSubIndex]), pNode)) {
      if (giDefaultStructIndex != -1) {
        pStructureFileRef = gpTileCacheStructInfo[giDefaultStructIndex].pStructureFileRef;

        if (pStructureFileRef != NULL) {
          AddStructureToWorld(sGridNo, 0, &(pStructureFileRef->pDBStructureRef[usSubIndex]), pNode);
        }
      }
    }
  }
}

function CheckForAndDeleteTileCacheStructInfo(pNode: Pointer<LEVELNODE>, usIndex: UINT16): void {
  let pStructureFileRef: Pointer<STRUCTURE_FILE_REF>;

  if (usIndex >= TILE_CACHE_START_INDEX) {
    pStructureFileRef = GetCachedTileStructureRef((usIndex - TILE_CACHE_START_INDEX));

    if (pStructureFileRef != NULL) {
      DeleteStructureFromWorld(pNode->pStructureData);
    }
  }
}

function GetRootName(pDestStr: Pointer<INT8>, pSrcStr: Pointer<INT8>): void {
  // Remove path and extension
  let cTempFilename: INT8[] /* [120] */;
  let cEndOfName: STR;

  // Remove path
  strcpy(cTempFilename, pSrcStr);
  cEndOfName = strrchr(cTempFilename, '\\');
  if (cEndOfName != NULL) {
    cEndOfName++;
    strcpy(pDestStr, cEndOfName);
  } else {
    strcpy(pDestStr, cTempFilename);
  }

  // Now remove extension...
  cEndOfName = strchr(pDestStr, '.');
  if (cEndOfName != NULL) {
    *cEndOfName = '\0';
  }
}
