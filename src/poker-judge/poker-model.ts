// POSSIBLE GAME RESULTS
export enum GameResult {
  // The result is yet unkown, but will be calculated in this analyzer.
  UNCERTAIN = -2,

  // The result is yet unknown, but will be calculated in one of the later analyzers
  UNKNOWN = -1,

  TIE = 0,

  FIRST_WINS = 1,

  SECOND_WINS = 2,
}

export enum Suit {
  C = 'C',
  D = 'D',
  H = 'H',
  S = 'S',
}

export type Value =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'
  | 'A';

export const NUMERIC_VALUES = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

export interface Card {
  value: Value;
  suit: Suit;
}

export interface Repetition {
  value: Value;
  count: number;
}

export interface CombinationSearchResult {
  found: boolean;
  highestValue?: Value;
}
