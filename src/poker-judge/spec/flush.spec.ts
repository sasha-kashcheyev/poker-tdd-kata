import { pokerJudge } from '../poker-judge';
import { GameResult } from '../poker-model';

describe('Flush', () => {
  it('should beat straight', () => {
    const straight = ['3C', '4D', '5S', '6D', '7C'];
    const flush = ['2S', '4S', '6S', '8S', 'AS'];

    const res = pokerJudge(straight, flush);

    expect(res).toEqual(GameResult.SECOND_WINS);
  });

  it('should beat lower flush', () => {
    const higherFlush = ['2D', '4D', '6D', '8D', 'JD'];
    const lowerFlush = ['3C', '4C', '6C', '8C', '10C'];

    const res = pokerJudge(higherFlush, lowerFlush);

    expect(res).toEqual(GameResult.FIRST_WINS);
  });

  it('should tie with flush with equal high card', () => {
    const flush1 = ['2D', '4D', '6D', '8D', 'JD'];
    const flush2 = ['3C', '4C', '6C', '8C', 'JC'];

    const res = pokerJudge(flush1, flush2);

    expect(res).toEqual(GameResult.TIE);
  });
});
