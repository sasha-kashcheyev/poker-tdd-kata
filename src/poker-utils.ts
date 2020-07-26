import {
  FIRST_WINS,
  SECOND_WINS,
  TIE,
  UNKNOWN,
  UNCERTAIN,
} from './hand-analyzers';

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

export interface AdvantageSearchResult {
  found: boolean;
  result: number;
}

export interface CombinationSearchResult {
  found: boolean;
  highestValue?: Value;
}

export function parseCards(hand: string[]): Card[] {
  const res: Card[] = [];

  for (const rawCard of hand) {
    const suit = rawCard.charAt(rawCard.length - 1);
    const value = rawCard.substring(0, rawCard.length - 1);

    const newCard: Card = {
      suit: suit as Suit,
      value: ('' + value) as Value,
    };

    res.push(newCard);
  }

  const sorted = res.sort(compareCardValue);

  return sorted;
}

export function compareCardValue(a: Card, b: Card): number {
  if (a === undefined || b === undefined) {
    return 0;
  }

  return NUMERIC_VALUES[a.value] - NUMERIC_VALUES[b.value];
}

export function extractRepetitions(
  hand: Card[],
  count: number = 0,
): Repetition[] {
  const res: Map<Value, Repetition> = new Map();

  for (const c of hand) {
    if (!res.has(c.value)) {
      res.set(c.value, {
        value: c.value,
        count: 1,
      });
    } else {
      res.get(c.value).count++;
    }
  }

  const filter: (r: Repetition) => Boolean =
    count === 0 ? (r) => r.count > 1 : (r) => r.count === count;

  const filtered = Array.from(res.values()).filter(filter);
  return filtered;
}

export function compareRepetitionByValue(a: Repetition, b: Repetition) {
  return NUMERIC_VALUES[a.value] - NUMERIC_VALUES[b.value];
}

export function findAdvantage(
  r1: Repetition[],
  r2: Repetition[],
  expectedCount: number = 1,
): number {
  if (r1.length < expectedCount && r2.length < expectedCount) {
    return UNKNOWN;
  }
  if (r1.length === expectedCount && r2.length < expectedCount) {
    return FIRST_WINS;
  }
  if (r1.length < expectedCount && r2.length === expectedCount) {
    return SECOND_WINS;
  }

  return UNCERTAIN;
}

export function findHigherValueRepetition(
  r1: Repetition[],
  r2: Repetition[],
): number {
  if (!r1 || !r2 || !r1.length || !r2.length) {
    throw new Error('No repetitions');
  }
  if (r1.length !== r2.length) {
    throw new Error('Different amount of repetitions');
  }

  const sort1 = r1.sort(compareRepetitionByValue).reverse();
  const sort2 = r2.sort(compareRepetitionByValue).reverse();

  for (let i = 0; i < sort1.length; i++) {
    const nv1 = NUMERIC_VALUES[sort1[i].value];
    const nv2 = NUMERIC_VALUES[sort2[i].value];

    if (nv1 > nv2) {
      return FIRST_WINS;
    }
    if (nv2 > nv1) {
      return SECOND_WINS;
    }
  }

  return TIE;
}

export function findStraight(hand: Card[]): CombinationSearchResult {
  const res: CombinationSearchResult = {
    found: true,
  };
  const sorted = hand.sort(compareCardValue);

  sorted.forEach((c, i, arr) => {
    if (i > 0) {
      const prevNv = NUMERIC_VALUES[arr[i - 1].value];
      const thisNv = NUMERIC_VALUES[c.value];
      res.found = res.found && thisNv === prevNv + 1;
    }
  });

  if (res.found) {
    res.highestValue = hand[hand.length - 1].value;
  }

  return res;
}

export function compareSameTypeCombinations(
  c1: CombinationSearchResult,
  c2: CombinationSearchResult,
) {
  if (!c1.found && !c2.found) {
    return 0;
  }
  if (c1.found && !c2.found) {
    return 1;
  }
  if (!c1.found && c2.found) {
    return 2;
  }

  // highest card is checked automagically in "High card" function
  // because in a straight there won't be cards with same value
}
