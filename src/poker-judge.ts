import {
  parseCards,
  Card,
  compareCardValue,
  extractRepetitions,
  compareRepetition,
} from './poker-utils';

export function pokerJudge(hand1: string[], hand2: string[]): number {
  const h1 = parseCards(hand1);
  const h2 = parseCards(hand2);

  return 0 || pair(h1, h2) || highCard(h1, h2);
}

function pair(h1: Card[], h2: Card[]): number {
  const r1 = extractRepetitions(h1).sort(compareRepetition);
  const r2 = extractRepetitions(h2).sort(compareRepetition);

  console.log(r1);
  console.log(r2);

  if (r1.length === 0 && r2.length === 0) {
    return 0;
  }
  if (r1.length > 0 && r2.length === 0) {
    return 1;
  }
  if (r1.length === 0 && r2.length > 0) {
    return 2;
  }

  // at this point, both hands have at least 1 pair

  return 0;
}

function highCard(h1: Card[], h2: Card[]): number {
  for (let i = h1.length - 1; i >= 0; i--) {
    const compRes = compareCardValue(h1[i], h2[i]);
    if (compRes > 0) {
      return 1;
    }
    if (compRes < 0) {
      return 2;
    }
  }

  return 0;
}

export default pokerJudge;
