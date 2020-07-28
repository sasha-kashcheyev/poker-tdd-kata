import { parseCards } from '../poker-utils';
import {
  highCard,
  pair,
  twoPairs,
  threeOfKind,
  straight,
  flush,
  fourOfKind,
  straightFlush,
} from '../hand-analyzers';
import { GameResult } from './poker-model';

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
    const res = analyzer({
      hand1: h1,
      hand2: h2,
    });
    if (res !== GameResult.UNKNOWN) {
      return res;
    }
  }

  return GameResult.TIE;
}

export default pokerJudge;
