extern FLOAT gdMajorMapVersion;
extern UINT8 gubMinorMapVersion;

// for use with MAPCREATE_STRUCT.ubEditorSmoothingType
const enum Enum231 {
  SMOOTHING_NORMAL,
  SMOOTHING_BASEMENT,
  SMOOTHING_CAVES,
}

interface MAPCREATE_STRUCT {
  // These are the mandatory entry points for a map.  If any of the values are -1, then that means that
  // the point has been specifically not used and that the map is not traversable to or from an adjacent
  // sector in that direction.  The >0 value points must be validated before saving the map.  This is
  // done by simply checking if those points are sittable by mercs, and that you can plot a path from
  // these points to each other.  These values can only be set by the editor : mapinfo tab
  sNorthGridNo: INT16;
  sEastGridNo: INT16;
  sSouthGridNo: INT16;
  sWestGridNo: INT16;
  // This contains the number of individuals in the map.
  // Individuals include NPCs, enemy placements, creatures, civilians, rebels, and animals.
  ubNumIndividuals: UINT8;
  ubMapVersion: UINT8;
  ubRestrictedScrollID: UINT8;
  ubEditorSmoothingType: UINT8; // normal, basement, or caves
  sCenterGridNo: INT16;
  sIsolatedGridNo: INT16;
  bPadding: INT8[] /* [83] */; // I'm sure lots of map info will be added
} // 99 bytes

extern MAPCREATE_STRUCT gMapInformation;

void SaveMapInformation(HWFILE fp);
void LoadMapInformation(INT8 **hBuffer);
void ValidateAndUpdateMapVersionIfNecessary();
BOOLEAN ValidateEntryPointGridNo(INT16 *sGridNo);

extern BOOLEAN gfWorldLoaded;
