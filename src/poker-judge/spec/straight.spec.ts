import { pokerJudge } from '../poker-judge';
import { GameResult } from '../poker-model';

describe('Straight', () => {
  it('should beat three of a kind', () => {
    const straight = ['2C', '3D', '4H', '5S', '6C'];
    const threeOfKind = ['AC', 'AD', 'AS', 'QS', '10S'];

    const res = pokerJudge(straight, threeOfKind);

    expect(res).toEqual(GameResult.FIRST_WINS);
  });

  it('should beat lower straight', () => {
    const higher = ['3C', '4D', '5H', '6S', '7C'];
    const lower = ['2C', '3D', '4H', '5S', '6C'];

    const res = pokerJudge(lower, higher);

    expect(res).toEqual(GameResult.SECOND_WINS);
  });

  it('should tie with straight with equal higher card', () => {
    const straight1 = ['3D', '4S', '5C', '6D', '7S'];
    const straight2 = ['3C', '4D', '5H', '6S', '7C'];

    const res = pokerJudge(straight1, straight2);

    expect(res).toEqual(GameResult.TIE);
  });
});
