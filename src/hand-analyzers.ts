import {
  Card,
  extractRepetitions,
  compareRepetitionByValue,
  NUMERIC_VALUES,
  findAdvantage,
  findHigherValueRepetition,
  findStraight,
  compareSameTypeCombinations,
} from './poker-utils';

export const UNKNOWN = -1;
export const TIE = 0;
export const FIRST_WINS = 1;
export const SECOND_WINS = 2;

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
  if (adv.found) {
    return adv.result;
  }

  return findHigherValueRepetition(r1, r2);
}

/** *****************************/
/* TWO PAIRS                    */
/** *****************************/

export function twoPairs(h1: Card[], h2: Card[]): number {
  const r1 = extractRepetitions(h1, 2);
  const r2 = extractRepetitions(h2, 2);

  const adv = findAdvantage(r1, r2, 2);
  if (adv.found) {
    return adv.result;
  }

  // at this point, both have 2 pairs, sorted from higher to lower
  return findHigherValueRepetition(r1, r2);
}

/** ****************/
/* PAIR           */
/** ****************/

export function pair(h1: Card[], h2: Card[]): number {
  const r1 = extractRepetitions(h1, 2);
  const r2 = extractRepetitions(h2, 2);

  const adv = findAdvantage(r1, r2);
  if (adv.found) {
    return adv.result;
  }

  // at this point, both hands have at least 1 pair.
  // The biggest of them will be at the end.
  return findHigherValueRepetition(r1, r2);
}

/** ****************/
/* HIGHER CARD    */
/** ****************/

export function highCard(h1: Card[], h2: Card[]): number {
  const r1 = extractRepetitions(h1, 1);
  const r2 = extractRepetitions(h2, 1);

  // if we are at this function, there MUST BE same amount of lonely cards at both hands
  if (r1.length !== r2.length) {
    throw new Error('Something went wrong in the analyzers above');
  }

  return findHigherValueRepetition(r1, r2);
}
