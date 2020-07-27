import { parseCards } from './poker-utils';
import {
  highCard,
  pair,
  twoPairs,
  threeOfKind,
  straight,
  flush,
  fourOfKind,
  straightFlush,
  UNKNOWN,
  TIE,
} from './hand-analyzers';

export function pokerJudge(hand1: string[], hand2: string[]): number {
  const h1 = parseCards(hand1);
  const h2 = parseCards(hand2);

  const analyzers = [
    straightFlush,
    fourOfKind,
    flush,
    straight,
    threeOfKind,
    twoPairs,
    pair,
    highCard,
  ];

  for (const analyzer of analyzers) {
    const res = analyzer(h1, h2);
    if (res !== UNKNOWN) {
      return res;
    }
  }

  return TIE;
}

export default pokerJudge;
