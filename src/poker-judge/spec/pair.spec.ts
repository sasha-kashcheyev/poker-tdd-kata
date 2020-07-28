import { pokerJudge } from '../poker-judge';
import { GameResult } from '../poker-model';

describe('Pair', () => {
  it('should beat hand without a pair', () => {
    const pair = ['2C', '2D', '3S', '5H', '7C'];
    const noPair = ['2H', '4C', '6D', 'KC', 'AH'];

    const res = pokerJudge(pair, noPair);

    expect(res).toEqual(GameResult.FIRST_WINS);
  });

  it('should beat hand with lower pair', () => {
    const higher = ['2H', '3S', '3C', '5H', '6S'];
    const lower = ['2C', '2D', '4S', '6H', '8C'];

    const res = pokerJudge(lower, higher);

    expect(res).toEqual(GameResult.SECOND_WINS);
  });

  it('should compare high cards if the pairs have equal value', () => {
    const higher = ['AC', 'AS', 'KC', 'JH', '9C'];
    const lower = ['AD', 'AH', 'QC', 'JS', '9H'];

    const res = pokerJudge(higher, lower);

    expect(res).toEqual(GameResult.FIRST_WINS);
  });

  it('...even if the pair is lower than the high card', () => {
    const higher = ['10C', '10S', 'KC', 'JH', '8C'];
    const lower = ['10D', '10H', 'QC', 'JS', '8H'];

    const res = pokerJudge(higher, lower);

    expect(res).toEqual(GameResult.FIRST_WINS);
  });

  it('should proceed to lower cards if all cards except one are equal', () => {
    const higher = ['10D', '10H', 'KS', 'JS', '8H'];
    const lower = ['10C', '10S', 'KC', 'JH', '7C'];

    const res = pokerJudge(lower, higher);

    expect(res).toEqual(GameResult.SECOND_WINS);
  });

  it('should tie only if all cards in both hands have same values', () => {
    const hand1 = ['10C', '10S', 'KC', 'JH', '7C'];
    const hand2 = ['10D', '10H', 'KS', 'JS', '7H'];

    const res = pokerJudge(hand1, hand2);

    expect(res).toEqual(GameResult.TIE);
  });
});
