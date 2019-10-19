interface EVENT {
  TimeStamp: TIMER;
  uiFlags: UINT32;
  usDelay: UINT16;
  uiEvent: UINT32;
  uiDataSize: UINT32;
  pData: Pointer<BYTE>;
}

const PRIMARY_EVENT_QUEUE = 0;
const SECONDARY_EVENT_QUEUE = 1;
const DEMAND_EVENT_QUEUE = 2;

const EVENT_EXPIRED = 0x00000002;

// Management fucntions
BOOLEAN InitializeEventManager();
BOOLEAN ShutdownEventManager();

BOOLEAN AddEvent(UINT32 uiEvent, UINT16 usDelay, PTR pEventData, UINT32 uiDataSize, UINT8 ubQueueID);
BOOLEAN RemoveEvent(EVENT **ppEvent, UINT32 uiIndex, UINT8 ubQueueID);
BOOLEAN PeekEvent(EVENT **ppEvent, UINT32 uiIndex, UINT8 ubQueueID);
BOOLEAN FreeEvent(EVENT *pEvent);
UINT32 EventQueueSize(UINT8 ubQueueID);
