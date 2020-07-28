import {
  Card,
  NUMERIC_VALUES,
  Repetition,
  Suit,
  Value,
} from '../poker-judge/poker-model';

/**
 * Takes array of "raw" strings and parses each of them to Card objects
 * @param hand An array of strings like 'AC', '10D' or '9H'
 * @returns An array of Card objects
 */
export function parseCards(hand: string[]): Card[] {
  const res: Card[] = [];

  for (const rawCard of hand) {
    const suit = rawCard.charAt(rawCard.length - 1);
    const value = rawCard.substring(0, rawCard.length - 1);

    const newCard: Card = {
      suit: Suit[suit],
      value: ('' + value) as Value,
    };

    res.push(newCard);
  }

  return res;
}

/**
 * Compares two cards by their value.
 * Returns positive number if first card is bigger,
 * negative number if second card is bigger, and
 * zero if card values are equal.
 * @param a first card
 * @param b second card
 * @returns comparation result
 */
export function compareByValue(
  a: Card | Repetition,
  b: Card | Repetition,
): number {
  if (a === undefined || b === undefined) {
    return 0;
  }

  return NUMERIC_VALUES[a.value] - NUMERIC_VALUES[b.value];
}
