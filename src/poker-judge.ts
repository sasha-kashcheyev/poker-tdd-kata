import { parseCards } from './poker-utils';
import {
  highCard,
  pair,
  twoPairs,
  threeOfKind,
  straight,
  flush,
  UNKNOWN,
  TIE,
} from './hand-analyzers';

export function pokerJudge(hand1: string[], hand2: string[]): number {
  const h1 = parseCards(hand1);
  const h2 = parseCards(hand2);

  const analyzers = [flush, straight, threeOfKind, twoPairs, pair, highCard];
  let res = UNKNOWN;

  for (const analyzer of analyzers) {
    if (res === UNKNOWN) {
      res = analyzer(h1, h2);
    }
  }

  return res;
}

export default pokerJudge;
