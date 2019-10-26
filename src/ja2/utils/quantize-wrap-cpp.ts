namespace ja2 {

export interface RGBValues {
  r: UINT8;
  g: UINT8;
  b: UINT8;
}

export function QuantizeImage(pDest: Pointer<UINT8>, pSrc: Pointer<UINT8>, sWidth: INT16, sHeight: INT16, pPalette: Pointer<SGPPaletteEntry>): boolean {
  let sNumColors: INT16;

  // FIRST CREATE PALETTE
  let q = new CQuantizer(255, 6);

  q.ProcessImage(pSrc, sWidth, sHeight);

  sNumColors = q.GetColorCount();

  memset(pPalette, 0, sizeof(SGPPaletteEntry) * 256);

  q.GetColorTable(pPalette);

  // THEN MAP IMAGE TO PALETTE
  // OK, MAPIT!
  MapPalette(pDest, pSrc, sWidth, sHeight, sNumColors, pPalette);

  return true;
}

function MapPalette(pDest: Pointer<UINT8>, pSrc: Pointer<UINT8>, sWidth: INT16, sHeight: INT16, sNumColors: INT16, pTable: Pointer<SGPPaletteEntry>): void {
  let cX: INT32;
  let cY: INT32;
  let cnt: INT32;
  let bBest: INT32;
  let dLowestDist: real;
  let dCubeDist: real;
  let vTableVal: vector_3;
  let vSrcVal: vector_3;
  let vDiffVal: vector_3;
  let pData: Pointer<UINT8>;
  let pRGBData: Pointer<RGBValues>;

  pRGBData = pSrc;

  for (cX = 0; cX < sWidth; cX++) {
    for (cY = 0; cY < sHeight; cY++) {
      // OK, FOR EACH PALETTE ENTRY, FIND CLOSEST
      bBest = 0;
      dLowestDist = 9999999;
      pData = addressof(pSrc[(cY * sWidth) + cX]);

      for (cnt = 0; cnt < sNumColors; cnt++) {
        vSrcVal.x = pRGBData[(cY * sWidth) + cX].r;
        vSrcVal.y = pRGBData[(cY * sWidth) + cX].g;
        vSrcVal.z = pRGBData[(cY * sWidth) + cX].b;

        vTableVal.x = pTable[cnt].peRed;
        vTableVal.y = pTable[cnt].peGreen;
        vTableVal.z = pTable[cnt].peBlue;

        // Get Dist
        vDiffVal = VSubtract(addressof(vSrcVal), addressof(vTableVal));

        // Get mag dist
        dCubeDist = VGetLength(addressof(vDiffVal));

        if (dCubeDist < dLowestDist) {
          dLowestDist = dCubeDist;
          bBest = cnt;
        }
      }

      // Now we have the lowest value
      // Set into dest
      pData = addressof(pDest[(cY * sWidth) + cX]);

      // Set!
      pData.value = bBest;
    }
  }
}

}
