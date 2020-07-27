// POSSIBLE GAME RESULTS
export const UNCERTAIN = -2; // The result is yet unkown, but will be calculated in this analyzer.
export const UNKNOWN = -1; // The result is yet unknown, but will be calculated in one of the later analyzers
export const TIE = 0; // The result is tie
export const FIRST_WINS = 1; // First hand wins
export const SECOND_WINS = 2; // Second hand wins

export type Suit = 'C' | 'D' | 'H' | 'S';
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
