import { pokerJudge } from '../poker-judge';
import { GameResult } from '../poker-model';

describe('Three of a kind', () => {
  it('should beat two pairs', () => {
    const threeOfKind = ['2C', '2D', '2H', '4C', '6D'];
    const twoPairs = ['AC', 'AD', 'KH', 'KS', 'QS'];

    const res = pokerJudge(threeOfKind, twoPairs);

    expect(res).toEqual(GameResult.FIRST_WINS);
  });

  it('should beat three of a kind with lower value', () => {
    const higher = ['AC', 'AD', 'AS', 'QS', '10S'];
    const lower = ['KS', 'KD', 'KH', 'QC', 'AH'];

    const res = pokerJudge(lower, higher);

    expect(res).toEqual(GameResult.SECOND_WINS);
  });
});
