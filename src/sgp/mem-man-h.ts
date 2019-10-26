namespace ja2 {

//**************************************************************************
//
// Filename :	MemMan.h
//
//	Purpose :	prototypes for the memory manager
//
// Modification history :
//
//		11sep96:HJH				- Creation
//
//**************************************************************************

//**************************************************************************
//
//				Includes
//
//**************************************************************************

//**************************************************************************
//
//				Defines
//
//**************************************************************************

//**************************************************************************
//
//				Typedefs
//
//**************************************************************************

//**************************************************************************
//
//				Function Prototypes
//
//**************************************************************************

// Creates and adds a video object to list
export const MemAlloc = (size) => malloc((size));
export const MemFree = (ptr) => free((ptr));
export const MemRealloc = (ptr, size) => realloc((ptr), (size));

}
