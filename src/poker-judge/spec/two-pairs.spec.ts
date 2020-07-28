import { pokerJudge } from '../poker-judge';
import { GameResult } from '../poker-model';

describe('Two pairs', () => {
  it('should beat a hand with one pair', () => {
    const pair = ['2H', '3S', '5S', '10C', '10H'];
    const twoPairs = ['2C', '2S', '3H', '3S', 'AC'];

    const res = pokerJudge(pair, twoPairs);

    expect(res).toEqual(GameResult.SECOND_WINS);
  });

  it('should beat two pairs with lower higher pair', () => {
    const lower = ['AH', '2H', '2D', '10C', '10H'];
    const higher = ['2C', '2S', 'KH', 'KS', '5C'];

    const res = pokerJudge(higher, lower);

    expect(res).toEqual(GameResult.FIRST_WINS);
  });

  it('if higher pairs are equal, look at the lower pairs', () => {
    const higher = ['3H', 'KC', 'KD', '10C', '10H'];
    const lower = ['2C', '2S', 'KH', 'KS', '5C'];

    const res = pokerJudge(higher, lower);

    expect(res).toEqual(GameResult.FIRST_WINS);
  });

  it('if both higher and lower pairs are equal, look at the other card', () => {
    const higher = ['2C', '2D', '3C', '3D', 'AC'];
    const lower = ['2S', '2H', '3S', 'KC', '3H'];

    const res = pokerJudge(higher, lower);

    expect(res).toEqual(GameResult.FIRST_WINS);
  });

  it('should tie only if higher pairs, lower pairs and the remaining cards have equal value', () => {
    const hand1 = ['2C', '2D', '3C', '3D', 'AC'];
    const hand2 = ['2E', '2H', '3E', 'AS', '3H'];

    const res = pokerJudge(hand1, hand2);

    expect(res).toEqual(GameResult.TIE);
  });
});
