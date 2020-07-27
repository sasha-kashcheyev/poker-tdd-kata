import {
  Card,
  extractRepetitions,
  compareRepetitionByValue,
  NUMERIC_VALUES,
  findAdvantage,
  findHigherValueRepetition,
  findStraight,
  findFlush,
  compareSameTypeCombinations,
  compareCardValue,
} from './poker-utils';

export const UNCERTAIN = -2;
export const UNKNOWN = -1;
export const TIE = 0;
export const FIRST_WINS = 1;
export const SECOND_WINS = 2;

/** ********************************/
/* FOUR OF A KIND                  */
/** ********************************/
export function fourOfKind(h1: Card[], h2: Card[]): number {
  const r1 = extractRepetitions(h1, 4);
  const r2 = extractRepetitions(h2, 4);

  const adv = findAdvantage(r1, r2);

  if (adv === UNCERTAIN) {
    return findHigherValueRepetition(r1, r2);
  }

  return adv;
}

/** ********************************/
/* FULL HOUSE                     */
/** ********************************/

export function fullHouse(h1: Card[], h2: Card[]): number {
  const r1by3 = extractRepetitions(h1, 3); // 3 repeating cards from first hand
  const r2by3 = extractRepetitions(h2, 3); // 3 repeating cards from second hand
  const r1by2 = extractRepetitions(h1, 2); // 2 repeating cards from first hand
  const r2by2 = extractRepetitions(h2, 2); // 2 repeating cards from second hand

  if (!r1by3.length || !r2by3.length || !r1by2.length || !r2by2.length) {
    return UNKNOWN;
  }

  return findHigherValueRepetition(r1by3, r2by3);
}

/** ******************************/
/* FLUSH                        */
/** ******************************/

export function flush(h1: Card[], h2: Card[]): number {
  const c1 = findFlush(h1);
  const c2 = findFlush(h2);

  return compareSameTypeCombinations(c1, c2);
}

/** *****************************/
/* STRAIGHT                     */
/** *****************************/

export function straight(h1: Card[], h2: Card[]): number {
  const c1 = findStraight(h1);
  const c2 = findStraight(h2);

  return compareSameTypeCombinations(c1, c2);
}

/** *****************************/
/* THREE OF A KIND              */
/** *****************************/

export function threeOfKind(h1: Card[], h2: Card[]): number {
  const r1 = extractRepetitions(h1, 3);
  const r2 = extractRepetitions(h2, 3);

  const adv = findAdvantage(r1, r2);

  if (adv === UNCERTAIN) {
    return findHigherValueRepetition(r1, r2);
  }

  return adv;
}

/** *****************************/
/* TWO PAIRS                    */
/** *****************************/

export function twoPairs(h1: Card[], h2: Card[]): number {
  const r1 = extractRepetitions(h1, 2);
  const r2 = extractRepetitions(h2, 2);

  const adv = findAdvantage(r1, r2, 2);

  if (adv === UNCERTAIN) {
    return findHigherValueRepetition(r1, r2);
  }

  return adv;
}

/** ****************/
/* PAIR           */
/** ****************/

export function pair(h1: Card[], h2: Card[]): number {
  const r1 = extractRepetitions(h1, 2);
  const r2 = extractRepetitions(h2, 2);

  const adv = findAdvantage(r1, r2);

  if (adv === UNCERTAIN) {
    return findHigherValueRepetition(r1, r2);
  }

  return adv;
}

/** ****************/
/* HIGHER CARD    */
/** ****************/

export function highCard(h1: Card[], h2: Card[]): number {
  const s1 = h1.sort(compareCardValue).reverse();
  const s2 = h2.sort(compareCardValue).reverse();

  if (s1.length !== s2.length) {
    throw new Error('Something went wrong in the analyzers above');
  }

  for (let i = 0; i < s1.length; i++) {
    const compared = compareCardValue(s1[i], s2[i]);
    if (compared > 0) {
      return FIRST_WINS;
    }
    if (compared < 0) {
      return SECOND_WINS;
    }
  }

  return TIE;
}
