const MAX_CACHE_SIZE = 20;
const MIN_CACHE_SIZE = 2;

typedef struct {
  UINT16 *usCachedSurfaces;
  INT16 *sCacheHits;
  UINT8 ubCacheSize;
} AnimationSurfaceCacheType;

UINT32 guiCacheSize;

BOOLEAN GetCachedAnimationSurface(UINT16 usSoldierID, AnimationSurfaceCacheType *pAnimCache, UINT16 usSurfaceIndex, UINT16 usCurrentAnimation);
BOOLEAN InitAnimationCache(UINT16 usSoldierID, AnimationSurfaceCacheType *pAnimCache);
void DeleteAnimationCache(UINT16 usSoldierID, AnimationSurfaceCacheType *pAnimCache);
void DetermineOptimumAnimationCacheSize();
void UnLoadCachedAnimationSurfaces(UINT16 usSoldierID, AnimationSurfaceCacheType *pAnimCache);