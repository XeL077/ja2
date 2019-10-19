UINT32 IntroScreenShutdown(void);
UINT32 IntroScreenHandle(void);
UINT32 IntroScreenInit(void);

// enums used for when the intro screen can come up, used with 'gbIntroScreenMode'
const enum Enum21 {
  INTRO_BEGINING, // set when viewing the intro at the begining of the game
  INTRO_ENDING, // set when viewing the end game video.

  INTRO_SPLASH,
}

extern UINT32 guiSmackerSurface;

void SetIntroType(INT8 bIntroType);