import {
  Card,
  extractRepetitions,
  compareRepetitionByValue,
  NUMERIC_VALUES,
  findAdvantage,
  findHigherCard,
} from './poker-utils';

/** *****************************/
/* THREE OF A KIND             */
/** *****************************/

export function threeOfKind(h1: Card[], h2: Card[]): number {
  const r1 = extractRepetitions(h1, 3).sort(compareRepetitionByValue).reverse();
  const r2 = extractRepetitions(h2, 3).sort(compareRepetitionByValue).reverse();

  const adv = findAdvantage(r1, r2);
  if (adv.found) {
    return adv.result;
  }

  return findHigherCard(r1, r2);
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
  return findHigherCard(r1, r2);
}

/** ****************/
/* PAIR           */
/** ****************/

export function pair(h1: Card[], h2: Card[]): number {
  const r1 = extractRepetitions(h1, 2).sort(compareRepetitionByValue);
  const r2 = extractRepetitions(h2, 2).sort(compareRepetitionByValue);

  const adv = findAdvantage(r1, r2);
  if (adv.found) {
    return adv.result;
  }

  // at this point, both hands have at least 1 pair.
  // The biggest of them will be at the end.
  return findHigherCard(r1, r2);
}

/** ****************/
/* HIGHER CARD    */
/** ****************/

export function highCard(h1: Card[], h2: Card[]): number {
  // The sorting is reversed, so higher cards will be at the beginning
  const r1 = extractRepetitions(h1, 1);
  const r2 = extractRepetitions(h2, 1);

  // if we are at this function, there MUST BE same amount of lonely cards at both hands
  if (r1.length !== r2.length) {
    throw new Error('Something went wrong in the analyzers above');
  }

  return findHigherCard(r1, r2);
}
