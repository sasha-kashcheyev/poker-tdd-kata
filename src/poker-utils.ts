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
    // console.log(c)
    if (!res.has(c.value)) {
      // console.log('found a ', c.value);
      res.set(c.value, {
        value: c.value,
        count: 1,
      });
    } else {
      // console.log('found another', c.value);
      res.get(c.value).count++;
    }
  }

  const filter: (r: Repetition) => Boolean =
    count === 0 ? (r) => r.count > 1 : (r) => r.count === count;

  const filtered = Array.from(res.values()).filter(filter);
  return filtered;
}

export function compareRepetitionByCount(a: Repetition, b: Repetition) {
  return a.count - b.count;
}

export function compareRepetitionByValue(a: Repetition, b: Repetition) {
  return NUMERIC_VALUES[a.value] - NUMERIC_VALUES[b.value];
}

function numericValue(c: Card) {
  return NUMERIC_VALUES[c.value];
}
