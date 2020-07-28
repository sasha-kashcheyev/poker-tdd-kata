import {
  GameResult,
  Card,
  Suit,
  Value,
  NUMERIC_VALUES,
  Repetition,
  CombinationSearchResult,
} from '../poker-judge/poker-model';
import { compareByValue } from './util';

export function compareCombinations({
  hand1,
  hand2,
  searchFunction,
}: {
  hand1: Card[];
  hand2: Card[];
  searchFunction: (hand: Card[]) => CombinationSearchResult;
}) {
  const combination1 = searchFunction(hand1);
  const combination2 = searchFunction(hand2);

  return compareSameTypeCombinations(combination1, combination2);
}

export function compareRepetitions({
  hand1,
  hand2,
  repSize,
  repCount = 1,
}: {
  hand1: Card[];
  hand2: Card[];
  repSize: number;
  repCount?: number;
}) {
  const repetition1 = extractRepetitions({ hand: hand1, repSize });
  const repetition2 = extractRepetitions({ hand: hand2, repSize });

  const adv = findRepetitionAdvantage({ repetition1, repetition2, repCount });

  if (adv === GameResult.UNCERTAIN) {
    return findHigherValueRepetition(repetition1, repetition2);
  }

  return adv;
}

/**
 * Finds how many cards of same value there are in the hand
 * @param hand parsed hand to find repetitions
 * @param count if given, the function will only return repetitions of exactly
 * this card count. E.g. if count is set to 2 and the hand contains full house,
 * only one entry will return.
 * @returns array of Repetition objects (containing value and amount)
 */
export function extractRepetitions({
  hand,
  repSize = 0,
}: {
  hand: Card[];
  repSize: number;
}): Repetition[] {
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
    repSize === 0 ? (r) => r.count > 1 : (r) => r.count === repSize;

  const filtered = Array.from(res.values()).filter(filter);
  return filtered;
}

/**
 * Calculates if one of the hands has specific repetition(s) while other
 * doesn't.
 * @param repetition1 first repetition array
 * @param repetition2 second repetition array
 * @param repCount number of repetitions that matters
 * @returns UNKNOWN if no one has the repetition, FIRST_WINS if the first hand
 * has the repetition, SECOND_WINS if the second hand has it, and UNCERTAIN if
 * both hands have the repetitions. In the case of UNCERTAIN, other rules must
 * apply to find out the winner.
 */
export function findRepetitionAdvantage({
  repetition1,
  repetition2,
  repCount = 1,
}: {
  repetition1: Repetition[];
  repetition2: Repetition[];
  repCount: number;
}): GameResult {
  if (repetition1.length < repCount && repetition2.length < repCount) {
    return GameResult.UNKNOWN;
  }
  if (repetition1.length === repCount && repetition2.length < repCount) {
    return GameResult.FIRST_WINS;
  }
  if (repetition1.length < repCount && repetition2.length === repCount) {
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
): GameResult {
  if (!r1 || !r2 || !r1.length || !r2.length) {
    throw new Error('No repetitions');
  }
  if (r1.length !== r2.length) {
    throw new Error('Different amount of repetitions');
  }

  const sort1 = r1.sort(compareByValue).reverse();
  const sort2 = r2.sort(compareByValue).reverse();

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
 * Compares two CombinationSearchResult objects to find if one of them wins.
 * @param combination1 first combination search result
 * @param combination2 second combination search result
 * @returns UNKNOWN if the combination wasn't found in any of the two hands,
 * FIRST_WINS/SECOND_WINS if only one of hands has the combination.
 * If both hands have the combination, it returns FIRST_WINS, SECOND_WINS or
 * TIE, depending on high card of each hand.
 */
export function compareSameTypeCombinations(
  combination1: CombinationSearchResult,
  combination2: CombinationSearchResult,
): GameResult {
  if (!combination1.found && !combination2.found) {
    return GameResult.UNKNOWN;
  } else if (combination1.found && !combination2.found) {
    return GameResult.FIRST_WINS;
  } else if (!combination1.found && combination2.found) {
    return GameResult.SECOND_WINS;
  }

  // at this point, both players have straight on hand
  // so, judging by the higher card

  if (!combination1.highestValue || !combination2.highestValue) {
    throw new Error('Highest card is not set.');
  }

  const nv1 = NUMERIC_VALUES[combination1.highestValue];
  const nv2 = NUMERIC_VALUES[combination2.highestValue];

  if (nv1 > nv2) {
    return GameResult.FIRST_WINS;
  } else if (nv1 < nv2) {
    return GameResult.SECOND_WINS;
  } else {
    return GameResult.TIE;
  }
}
