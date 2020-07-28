import { pokerJudge } from '../poker-judge';
import { GameResult } from '../poker-model';

describe('4 of a kind', () => {
  it('should beat full house', () => {
    const fourOfKind = ['2D', '2C', '2H', '2S', '6D'];
    const fullHouse = ['4D', '4C', '4H', '3S', '3C'];

    const res = pokerJudge(fourOfKind, fullHouse);

    expect(res).toEqual(GameResult.FIRST_WINS);
  });

  it('should beat lower 4 of a kind', () => {
    const higher = ['AD', '3S', 'AS', 'AC', 'AH'];
    const lower = ['2D', '2C', '2H', '2S', '6D'];

    const res = pokerJudge(lower, higher);
    expect(res).toEqual(GameResult.SECOND_WINS);
  });
});
