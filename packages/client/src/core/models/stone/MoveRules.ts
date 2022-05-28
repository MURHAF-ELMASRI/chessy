export enum MoveRules {
  horizontal = 1 << 0,
  vertical = 1 << 1,
  diagonal = 1 << 2,
  antiDiagonal = 1 << 3,
  pawn = 1 << 5,
  king = 1 << 6,
  knight = 1 << 7,
}
