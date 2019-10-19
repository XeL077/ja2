const FILENAME_SIZE = 256;

//#define	FILENAME_SIZE									40 + PATH_SIZE
const PATH_SIZE = 80;

const NUM_FILES_TO_ADD_AT_A_TIME = 20;
const INITIAL_NUM_HANDLES = 20;

const REAL_FILE_LIBRARY_ID = 1022;

const DB_BITS_FOR_LIBRARY = 10;
const DB_BITS_FOR_FILE_ID = 22;

const DB_EXTRACT_LIBRARY = (exp) => (exp >> DB_BITS_FOR_FILE_ID);
const DB_EXTRACT_FILE_ID = (exp) => (exp & 0x3FFFFF);

const DB_ADD_LIBRARY_ID = (exp) => (exp << DB_BITS_FOR_FILE_ID);
const DB_ADD_FILE_ID = (exp) => (exp & 0xC00000);

typedef UINT32 HWFILE;

typedef struct {
  CHAR8 sLibraryName[FILENAME_SIZE]; // The name of the library file on the disk
  BOOLEAN fOnCDrom; // A flag specifying if its a cdrom library ( not implemented yet )
  BOOLEAN fInitOnStart; // Flag specifying if the library is to Initialized at the begining of the game
} LibraryInitHeader;

extern LibraryInitHeader gGameLibaries[];
extern CHAR8 gzCdDirectory[SGPFILENAME_LEN];

const REAL_LIBRARY_FILE = "RealFiles.slf";

typedef struct {
  UINT32 uiFileID; // id of the file ( they start at 1 )
  HANDLE hRealFileHandle; // if the file is a Real File, this its handle
} RealFileOpenStruct;

typedef struct {
  STR pFileName;
  UINT32 uiFileLength;
  UINT32 uiFileOffset;
} FileHeaderStruct;

typedef struct {
  UINT32 uiFileID; // id of the file ( they start at 1 )
  UINT32 uiFilePosInFile; // current position in the file
  UINT32 uiActualPositionInLibrary; // Current File pointer position in actuall library
  FileHeaderStruct *pFileHeader;
} FileOpenStruct;

typedef struct {
  STR sLibraryPath;
  HANDLE hLibraryHandle;
  UINT16 usNumberOfEntries;
  BOOLEAN fLibraryOpen;
  //	BOOLEAN	fAnotherFileAlreadyOpenedLibrary;				//this variable is set when a file is opened from the library and reset when the file is close.  No 2 files can have access to the library at 1 time.
  UINT32 uiIdOfOtherFileAlreadyOpenedLibrary; // this variable is set when a file is opened from the library and reset when the file is close.  No 2 files can have access to the library at 1 time.
  INT32 iNumFilesOpen;
  INT32 iSizeOfOpenFileArray;
  FileHeaderStruct *pFileHeader;
  FileOpenStruct *pOpenFiles;
} LibraryHeaderStruct;

typedef struct {
  INT32 iNumFilesOpen;
  INT32 iSizeOfOpenFileArray;
  RealFileOpenStruct *pRealFilesOpen;
} RealFileHeaderStruct;

typedef struct {
  STR sManagerName;
  LibraryHeaderStruct *pLibraries;
  UINT16 usNumberOfLibraries;
  BOOLEAN fInitialized;
  RealFileHeaderStruct RealFiles;
} DatabaseManagerHeaderStruct;

// typedef UINT32	HLIBFILE;

//*************************************************************************
//
//  NOTE!  The following structs are also used by the datalib98 utility
//
//*************************************************************************

const FILE_OK = 0;
const FILE_DELETED = 0xff;
const FILE_OLD = 1;
const FILE_DOESNT_EXIST = 0xfe;

typedef struct {
  CHAR8 sLibName[FILENAME_SIZE];
  CHAR8 sPathToLibrary[FILENAME_SIZE];
  INT32 iEntries;
  INT32 iUsed;
  UINT16 iSort;
  UINT16 iVersion;
  BOOLEAN fContainsSubDirectories;
  INT32 iReserved;
} LIBHEADER;

typedef struct {
  CHAR8 sFileName[FILENAME_SIZE];
  UINT32 uiOffset;
  UINT32 uiLength;
  UINT8 ubState;
  UINT8 ubReserved;
  FILETIME sFileTime;
  UINT16 usReserved2;
} DIRENTRY;

// The FileDatabaseHeader
extern DatabaseManagerHeaderStruct gFileDataBase;

// Function Prototypes

BOOLEAN CheckForLibraryExistence(STR pLibraryName);
BOOLEAN InitializeLibrary(STR pLibraryName, LibraryHeaderStruct *pLibheader, BOOLEAN fCanBeOnCDrom);

BOOLEAN InitializeFileDatabase();
BOOLEAN ReopenCDLibraries(void);
BOOLEAN ShutDownFileDatabase();
BOOLEAN CheckIfFileExistInLibrary(STR pFileName);
INT16 GetLibraryIDFromFileName(STR pFileName);
HWFILE OpenFileFromLibrary(STR pName);
HWFILE CreateRealFileHandle(HANDLE hFile);
BOOLEAN CloseLibraryFile(INT16 sLibraryID, UINT32 uiFileID);
BOOLEAN GetLibraryAndFileIDFromLibraryFileHandle(HWFILE hlibFile, INT16 *pLibraryID, UINT32 *pFileNum);
BOOLEAN LoadDataFromLibrary(INT16 sLibraryID, UINT32 uiFileIndex, PTR pData, UINT32 uiBytesToRead, UINT32 *pBytesRead);
BOOLEAN LibraryFileSeek(INT16 sLibraryID, UINT32 uiFileNum, UINT32 uiDistance, UINT8 uiHowToSeek);

// used to open and close libraries during the game
BOOLEAN CloseLibrary(INT16 sLibraryID);
BOOLEAN OpenLibrary(INT16 sLibraryID);

BOOLEAN IsLibraryOpened(INT16 sLibraryID);

BOOLEAN GetLibraryFileTime(INT16 sLibraryID, UINT32 uiFileNum, SGP_FILETIME *pLastWriteTime);