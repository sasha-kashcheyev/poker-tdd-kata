import {
  Card,
  CombinationSearchResult,
  NUMERIC_VALUES,
} from '../poker-judge/poker-model';

import { compareByValue } from './util';

/**
 * Looks for consecutive cards in given hand.
 * @param hand array of Card objects
 * @returns CombinationSearchResult. Its `found` will be true if all the
 * cards are consecutive, and the `highestValue` will equal the highest of them.
 * Otherwise, highestValue will be undefined.
 */
export function findStraight(hand: Card[]): CombinationSearchResult {
  const res: CombinationSearchResult = {
    found: true,
  };
  const sorted = hand.sort(compareByValue);

  sorted.forEach((c, i, arr) => {
    if (i > 0) {
      const prevNv = NUMERIC_VALUES[arr[i - 1].value];
      const thisNv = NUMERIC_VALUES[c.value];
      res.found = res.found && thisNv === prevNv + 1;
    }
  });

  if (res.found) {
    res.highestValue = sorted[sorted.length - 1].value;
  }

  return res;
}

/**
 * Checks if all the cards in hand have the same suit.
 * @param hand
 * @returns a CombinationSearchResult.
 */
export function findFlush(hand: Card[]): CombinationSearchResult {
  const suit = hand[0].suit;
  if (hand.some((v) => v.suit !== suit)) {
    return {
      found: false,
    };
  }

  const highestValue = hand.sort(compareByValue).reverse()[0].value;

  return {
    found: true,
    highestValue,
  };
}

export function findStraightFlush(hand: Card[]): CombinationSearchResult {
  const { found: foundStraight, highestValue } = findStraight(hand);
  const { found: foundFlush } = findFlush(hand);

  return {
    found: foundStraight && foundFlush,
    highestValue,
  };
}
