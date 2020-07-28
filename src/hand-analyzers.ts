import { GameResult, Card, NUMERIC_VALUES } from './poker-judge/poker-model';

import {
  extractRepetitions,
  findRepetitionAdvantage,
  findHigherValueRepetition,
  findStraight,
  findFlush,
  compareCardValue,
  compareRepetitions,
  compareCombinations,
  findStraightFlush,
} from './poker-utils';

export function highCard({ hand1, hand2 }): GameResult {
  const sortedHand1 = hand1.sort(compareCardValue).reverse();
  const sortedHand2 = hand2.sort(compareCardValue).reverse();

  if (sortedHand1.length !== sortedHand2.length) {
    throw new Error('hands have different amount of cards');
  }

  for (let i = 0; i < sortedHand1.length; i++) {
    const compared = compareCardValue(sortedHand1[i], sortedHand2[i]);
    if (compared > 0) {
      return GameResult.FIRST_WINS;
    }
    if (compared < 0) {
      return GameResult.SECOND_WINS;
    }
  }

  return GameResult.TIE;
}

export function pair({ hand1, hand2 }): GameResult {
  return compareRepetitions({ hand1, hand2, repSize: 2 });
}

export function twoPairs({ hand1, hand2 }): GameResult {
  return compareRepetitions({ hand1, hand2, repSize: 2, repCount: 2 });
}
export function threeOfKind({ hand1, hand2 }): GameResult {
  return compareRepetitions({ hand1, hand2, repSize: 3 });
}

export function straight({ hand1, hand2 }): GameResult {
  return compareCombinations({ hand1, hand2, searchFunction: findStraight });
}

export function flush({ hand1, hand2 }): GameResult {
  return compareCombinations({ hand1, hand2, searchFunction: findFlush });
}

export function fullHouse({ hand1, hand2 }): GameResult {
  const r1by3 = extractRepetitions({ hand: hand1, repSize: 3 }); // 3 repeating cards from first hand
  const r2by3 = extractRepetitions({ hand: hand2, repSize: 3 }); // 3 repeating cards from second hand
  const r1by2 = extractRepetitions({ hand: hand1, repSize: 2 }); // 2 repeating cards from first hand
  const r2by2 = extractRepetitions({ hand: hand2, repSize: 2 }); // 2 repeating cards from second hand

  if (!r1by3.length || !r2by3.length || !r1by2.length || !r2by2.length) {
    return GameResult.UNKNOWN;
  }

  return findHigherValueRepetition(r1by3, r2by3);
}

export function fourOfKind({ hand1, hand2 }): GameResult {
  return compareRepetitions({ hand1, hand2, repSize: 4 });
}

export function straightFlush({ hand1, hand2 }): GameResult {
  return compareCombinations({
    hand1,
    hand2,
    searchFunction: findStraightFlush,
  });
}
