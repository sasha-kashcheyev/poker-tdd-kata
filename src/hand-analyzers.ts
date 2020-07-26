import {
  Card,
  extractRepetitions,
  compareRepetitionByValue,
  NUMERIC_VALUES,
  findAdvantage,
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
}

/** *****************************/
/* TWO PAIRS                   */
/** *****************************/

export function twoPairs(h1: Card[], h2: Card[]): number {
  const r1 = extractRepetitions(h1, 2).sort(compareRepetitionByValue).reverse();
  const r2 = extractRepetitions(h2, 2).sort(compareRepetitionByValue).reverse();

  const adv = findAdvantage(r1, r2, 2);
  if (adv.found) {
    return adv.result;
  }

  // at this point, both have 2 pairs, sorted from higher to lower
  for (let i = 0; i < 2; i++) {
    const nv1 = NUMERIC_VALUES[r1[i].value];
    const nv2 = NUMERIC_VALUES[r2[i].value];

    if (nv1 > nv2) {
      return 1;
    }
    if (nv1 < nv2) {
      return 2;
    }
  }

  return 0;
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

  const nv1 = NUMERIC_VALUES[r1[r1.length - 1].value];
  const nv2 = NUMERIC_VALUES[r2[r2.length - 1].value];

  return nv1 > nv2 ? 1 : nv1 < nv2 ? 2 : 0;
}

/** ****************/
/* HIGHER CARD    */
/** ****************/

export function highCard(h1: Card[], h2: Card[]): number {
  // The sorting is reversed, so higher cards will be at the beginning
  const r1 = extractRepetitions(h1, 1).sort(compareRepetitionByValue).reverse();
  const r2 = extractRepetitions(h2, 1).sort(compareRepetitionByValue).reverse();

  // if we are at this function, there MUST BE same amount of lonely cards at both hands
  if (r1.length !== r2.length) {
    throw new Error('Something went wrong in the analyzers above');
  }

  for (let i = 0; i < r1.length; i++) {
    const nv1 = NUMERIC_VALUES[r1[i].value];
    const nv2 = NUMERIC_VALUES[r2[i].value];

    if (nv1 > nv2) {
      return 1;
    }
    if (nv1 < nv2) {
      return 2;
    }
  }

  return 0;
}
