extern UINT32 guiNumObjectSlots;

interface REAL_OBJECT {
  fAllocated: BOOLEAN;
  fAlive: BOOLEAN;
  fApplyFriction: BOOLEAN;
  fColliding: BOOLEAN;
  fZOnRest: BOOLEAN;
  fVisible: BOOLEAN;
  fInWater: BOOLEAN;
  fTestObject: BOOLEAN;
  fTestEndedWithCollision: BOOLEAN;
  fTestPositionNotSet: BOOLEAN;

  TestZTarget: real;
  OneOverMass: real;
  AppliedMu: real;

  Position: vector_3;
  TestTargetPosition: vector_3;
  OldPosition: vector_3;
  Velocity: vector_3;
  OldVelocity: vector_3;
  InitialForce: vector_3;
  Force: vector_3;
  CollisionNormal: vector_3;
  CollisionVelocity: vector_3;
  CollisionElasticity: real;

  sGridNo: INT16;
  iID: INT32;
  pNode: Pointer<LEVELNODE>;
  pShadow: Pointer<LEVELNODE>;

  sConsecutiveCollisions: INT16;
  sConsecutiveZeroVelocityCollisions: INT16;
  iOldCollisionCode: INT32;

  dLifeLength: FLOAT;
  dLifeSpan: FLOAT;
  Obj: OBJECTTYPE;
  fFirstTimeMoved: BOOLEAN;
  sFirstGridNo: INT16;
  ubOwner: UINT8;
  ubActionCode: UINT8;
  uiActionData: UINT32;
  fDropItem: BOOLEAN;
  uiNumTilesMoved: UINT32;
  fCatchGood: BOOLEAN;
  fAttemptedCatch: BOOLEAN;
  fCatchAnimOn: BOOLEAN;
  fCatchCheckDone: BOOLEAN;
  fEndedWithCollisionPositionSet: BOOLEAN;
  EndedWithCollisionPosition: vector_3;
  fHaveHitGround: BOOLEAN;
  fPotentialForDebug: BOOLEAN;
  sLevelNodeGridNo: INT16;
  iSoundID: INT32;
  ubLastTargetTakenDamage: UINT8;
  ubPadding: UINT8[] /* [1] */;
}

const NUM_OBJECT_SLOTS = 50;

extern REAL_OBJECT ObjectSlots[NUM_OBJECT_SLOTS];
