import pokerJudge from '../src/poker-judge';

// Suit: C, D, H, S
// Value: 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A

describe('pokerJudge', () => {
  describe('High Card', () => {
    it('should return tie if all cards have the same value', () => {
      const res = pokerJudge(
        ['4C', '2D', '5H', 'JS', 'QC'],
        ['4D', '2H', '5S', 'JC', 'QD'],
      );
      expect(res).toEqual(0);
    });

    it('the hand with higher highest card wins', () => {
      const res = pokerJudge(
        ['AC', 'KD', 'QH', '10S', '9C'],
        ['JH', 'KS', 'QC', '10D', '9H'],
      );
      expect(res).toEqual(1);
    });

    it('if the highest cards values are equal, go further to lower cards', () => {
      const res = pokerJudge(
        ['AC', 'KD', 'JH', '10S', '9C'],
        ['AH', 'QS', 'JC', '10D', '9H'],
      );
      expect(res).toEqual(1);
    });

    it('if all cards values except one are equal, use that card', () => {
      const res = pokerJudge(
        ['AC', 'QD', '10H', '8S', '6C'],
        ['AD', 'QH', '10S', '8C', '7D'],
      );
      expect(res).toEqual(2);
    });
  });

  describe('Pair', () => {
    it('hand with pair beats hand without a pair', () => {
      const res = pokerJudge(
        ['2C', '2D', '3S', '5H', '7C'],
        ['2H', '4C', '6D', 'KC', 'AH'],
      );
      expect(res).toEqual(1);
    });
  });
});
