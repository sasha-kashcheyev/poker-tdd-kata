import { parseCards } from './poker-utils';
import { highCard, pair, twoPairs, threeOfKind } from './hand-analyzers';

export function pokerJudge(hand1: string[], hand2: string[]): number {
  const h1 = parseCards(hand1);
  const h2 = parseCards(hand2);

  return (
    threeOfKind(h1, h2) || twoPairs(h1, h2) || pair(h1, h2) || highCard(h1, h2)
  );
}

export default pokerJudge;
