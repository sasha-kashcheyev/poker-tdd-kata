import { pokerJudge } from '../poker-judge';
import { GameResult } from '../poker-model';

describe('Full House', () => {
  it('should beat flush', () => {
    const fullHouse = ['2D', '2C', '2H', '3C', '3D'];
    const flush = ['2S', '4S', '6S', '8S', 'AS'];

    const res = pokerJudge(fullHouse, flush);

    expect(res).toEqual(GameResult.SECOND_WINS);
  });

  it('should beat full house with lower three cards', () => {
    const lowerFH = ['2D', '2C', '2H', '6C', '6D'];
    const higherFH = ['4D', '4C', '4H', '3S', '3C'];

    const res = pokerJudge(lowerFH, higherFH);

    expect(res).toEqual(GameResult.SECOND_WINS);
  });
});
