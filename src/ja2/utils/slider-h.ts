const SLIDER_VERTICAL = 0x00000001;
const SLIDER_HORIZONTAL = 0x00000002;

// defines for the different styles of sliders
const enum Enum329 {
  SLIDER_DEFAULT_STYLE,

  SLIDER_VERTICAL_STEEL,

  NUM_SLIDER_STYLES,
}

type SLIDER_CHANGE_CALLBACK = (a: INT32) => void;

/*

ubStyle
usPosX
usPosY
usWidth
usNumberOfIncrements
sPriority
SliderChangeCallback
        void SliderChangeCallBack( INT32 iNewValue )
*/

INT32 AddSlider(UINT8 ubStyle, UINT16 usCursor, UINT16 usPosX, UINT16 usPosY, UINT16 usWidth, UINT16 usNumberOfIncrements, INT8 sPriority, SLIDER_CHANGE_CALLBACK SliderChangeCallback, UINT32 uiFlags);

BOOLEAN InitSlider();

void ShutDownSlider();

void RenderAllSliderBars();

void RemoveSliderBar(UINT32 uiSliderID);

void SetSliderValue(UINT32 uiSliderID, UINT32 uiNewValue);
