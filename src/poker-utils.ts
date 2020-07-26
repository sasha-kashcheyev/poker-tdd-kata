import { assert } from 'console';

export type Suit = 'C' | 'D' | 'H' | 'S';
export type Value = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'J' | 'Q' | 'K' | 'A';

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
      value: value as Value,
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

  return numericValue(a) - numericValue(b);
}

export function extractRepetitions(hand: Card[]): Repetition[] {
  const res: Repetition[] = [];

  for (const c of hand) {
    if (res[c.value] === undefined) {
      res[c.value] = {
        value: c.value,
        count: 0,
      };
    }
    res[c.value].count++;
  }

  // console.log(res);
  return res.filter((r) => r.count > 1);
}

export function compareRepetition(a: Repetition, b: Repetition) {
  return a.count - b.count;
}

function numericValue(c: Card) {
  const table = {
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
  return table[c.value];
}
