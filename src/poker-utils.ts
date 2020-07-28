import {
  GameResult,
  Card,
  Suit,
  Value,
  NUMERIC_VALUES,
  Repetition,
  CombinationSearchResult,
} from './poker-judge/poker-model';

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
      suit: suit as Suit,
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
export function compareCardValue(a: Card, b: Card): number {
  if (a === undefined || b === undefined) {
    return 0;
  }

  return NUMERIC_VALUES[a.value] - NUMERIC_VALUES[b.value];
}

/**
 * Finds how many cards of same value there are in the hand
 * @param hand parsed hand to find repetitions
 * @param count if given, the function will only return repetitions of exactly
 * this card count. E.g. if count is set to 2 and the hand contains full house,
 * only one entry will return.
 * @returns array of Repetition objects (containing value and amount)
 */
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

/**
 * Compares two Repetition object by their values
 * @param a first repetition
 * @param b second repetition
 */
export function compareRepetitionByValue(a: Repetition, b: Repetition) {
  return NUMERIC_VALUES[a.value] - NUMERIC_VALUES[b.value];
}

/**
 * Calculates if one of the hands has specific repetition(s) while other
 * doesn't.
 * @param r1 first repetition array
 * @param r2 second repetition array
 * @param expectedCount number of repetitions that matters
 * @returns UNKNOWN if no one has the repetition, FIRST_WINS if the first hand
 * has the repetition, SECOND_WINS if the second hand has it, and UNCERTAIN if
 * both hands have the repetitions. In the case of UNCERTAIN, other rules must
 * apply to find out the winner.
 */
export function findRepetitionAdvantage(
  r1: Repetition[],
  r2: Repetition[],
  expectedCount: number = 1,
): number {
  if (r1.length < expectedCount && r2.length < expectedCount) {
    return GameResult.UNKNOWN;
  }
  if (r1.length === expectedCount && r2.length < expectedCount) {
    return GameResult.FIRST_WINS;
  }
  if (r1.length < expectedCount && r2.length === expectedCount) {
    return GameResult.SECOND_WINS;
  }

  return GameResult.UNCERTAIN;
}

/**
 * Compares two arrays of Repetition objects to find which of them has higher
 * repeating cards.
 * @param r1 first repetition
 * @param r2 second repetition
 * @returns FIRST_WINS, SECOND_WINS or UNKNOWN if the repetitions are equal.
 */
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
      return GameResult.FIRST_WINS;
    }
    if (nv2 > nv1) {
      return GameResult.SECOND_WINS;
    }
  }

  return GameResult.UNKNOWN;
}

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
  const sorted = hand.sort(compareCardValue);

  sorted.forEach((c, i, arr) => {
    if (i > 0) {
      const prevNv = NUMERIC_VALUES[arr[i - 1].value];
      const thisNv = NUMERIC_VALUES[c.value];
      res.found = res.found && thisNv === prevNv + 1;
    }
  });

  if (res.found) {
    res.highestValue = sorted[sorted.length - 1].value;
    console.log('highest value', res.highestValue);
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

  return {
    found: true,
    highestValue: hand.sort(compareCardValue).reverse()[0].value,
  };
}

/**
 * Compares two CombinationSearchResult objects to find if one of them wins.
 * @param c1 first combination search result
 * @param c2 second combination search result
 * @returns UNKNOWN if the combination wasn't found in any of the two hands,
 * FIRST_WINS/SECOND_WINS if only one of hands has the combination.
 * If both hands have the combination, it returns FIRST_WINS, SECOND_WINS or
 * TIE, depending on high card of each hand.
 */
export function compareSameTypeCombinations(
  c1: CombinationSearchResult,
  c2: CombinationSearchResult,
) {
  if (!c1.found && !c2.found) {
    return GameResult.UNKNOWN;
  } else if (c1.found && !c2.found) {
    return GameResult.FIRST_WINS;
  } else if (!c1.found && c2.found) {
    return GameResult.SECOND_WINS;
  }

  // at this point, both players have straight on hand
  // so, judging by the higher card

  if (!c1.highestValue || !c2.highestValue) {
    throw new Error('Highest card is not set.');
  }

  const nv1 = NUMERIC_VALUES[c1.highestValue];
  const nv2 = NUMERIC_VALUES[c2.highestValue];

  if (nv1 > nv2) {
    return GameResult.FIRST_WINS;
  } else if (nv1 < nv2) {
    return GameResult.SECOND_WINS;
  } else {
    return GameResult.TIE;
  }
}
