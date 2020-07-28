import { pokerJudge } from '../poker-judge';
import { GameResult } from '../poker-model';

describe('Straight flush', () => {
  it('should beat 4 of a kind', () => {
    const straightFlush = ['2C', '3C', '4C', '5C', '6C'];
    const fourOfKind = ['AD', '3S', 'AS', 'AC', 'AH'];

    const res = pokerJudge(fourOfKind, straightFlush);

    expect(res).toEqual(GameResult.SECOND_WINS);
  });

  it('should beat regular straight', () => {
    const straight = ['JD', '10S', 'QS', 'KC', 'AH'];
    const sf = ['2C', '3C', '4C', '5C', '6C'];

    const res = pokerJudge(sf, straight);

    expect(res).toEqual(GameResult.FIRST_WINS);
  });

  it('should beat regular flush', () => {
    const flush = ['JD', '8D', 'QD', '5D', 'AD'];
    const sf = ['2C', '3C', '4C', '5C', '6C'];

    const res = pokerJudge(sf, flush);

    expect(res).toEqual(GameResult.FIRST_WINS);
  });

  it('should beat a straight flush with lower high card', () => {
    const lower = ['2C', '3C', '4C', '5C', '6C'];
    const higher = ['3D', '4D', '5D', '6D', '7D'];

    const res = pokerJudge(lower, higher);

    expect(res).toEqual(GameResult.SECOND_WINS);
  });

  it('should tie with a straight flush with the same high card', () => {
    const sf1 = ['3D', '4D', '5D', '6D', '7D'];
    const sf2 = ['3S', '4S', '5S', '6S', '7S'];

    const res = pokerJudge(sf1, sf2);

    expect(res).toEqual(GameResult.TIE);
  });
});
