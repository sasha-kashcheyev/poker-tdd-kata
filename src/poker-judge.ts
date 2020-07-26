import { parseCards } from './poker-utils';
import {
  highCard,
  pair,
  twoPairs,
  threeOfKind,
  straight,
  UNKNOWN,
  TIE,
} from './hand-analyzers';

export function pokerJudge(hand1: string[], hand2: string[]): number {
  const h1 = parseCards(hand1);
  const h2 = parseCards(hand2);

  const analyzers = [straight, threeOfKind, twoPairs, pair, highCard];
  let res = UNKNOWN;

  for (const analyzer of analyzers) {
    if (res === UNKNOWN) {
      res = analyzer(h1, h2);
    }
  }

  return res;

  return (
    straight(h1, h2) ||
    threeOfKind(h1, h2) ||
    twoPairs(h1, h2) ||
    pair(h1, h2) ||
    highCard(h1, h2)
  );
}

export default pokerJudge;
