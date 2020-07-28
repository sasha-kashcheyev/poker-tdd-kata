import { pokerJudge } from '../poker-judge';
import { GameResult } from '../poker-model';

describe('High Card', () => {
  it('should tie if all cards have the same value', () => {
    const hand1 = ['4C', '2D', '5H', 'JS', 'QC'];
    const hand2 = ['4D', '2H', '5S', 'JC', 'QD'];

    const res = pokerJudge(hand1, hand2);

    expect(res).toEqual(GameResult.TIE);
  });

  it('should beat a lower high card', () => {
    const higher = ['AC', 'KD', 'QH', '10S', '9C'];
    const lower = ['JH', 'KS', 'QC', '10D', '8H'];

    const res = pokerJudge(higher, lower);
    expect(res).toEqual(GameResult.FIRST_WINS);
  });

  it('should go to lower cards if higher cards have equal values', () => {
    const higher = ['AC', 'JH', '10S', 'KD', '9C'];
    const lower = ['AH', 'JC', '10D', 'QS', '9H'];

    const res = pokerJudge(higher, lower);

    expect(res).toEqual(GameResult.FIRST_WINS);
  });

  it('should use the lowest card if all higher cards have equal values', () => {
    const lower = ['AC', 'QD', '10H', '8S', '6C'];
    const higher = ['AD', 'QH', '10S', '8C', '7D'];

    const res = pokerJudge(lower, higher);

    expect(res).toEqual(GameResult.SECOND_WINS);
  });
});
