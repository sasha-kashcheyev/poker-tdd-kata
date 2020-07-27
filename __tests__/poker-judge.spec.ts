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
        ['JH', 'KS', 'QC', '10D', '8H'],
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

    it('if both have a pair, the hand with higher pair wins', () => {
      const res = pokerJudge(
        ['2C', '2D', '4S', '6H', '8C'],
        ['2H', '3S', '3C', '5H', '6S'],
      );

      expect(res).toEqual(2);
    });

    it('if both have a pair of the same value, the one who has a higher card wins', () => {
      const res = pokerJudge(
        ['AC', 'AS', 'KC', 'JH', '9C'],
        ['AD', 'AH', 'QC', 'JS', '9H'],
      );

      expect(res).toEqual(1);
    });

    it('also if the pair is lower than the high card', () => {
      const res = pokerJudge(
        ['10C', '10S', 'KC', 'JH', '8C'],
        ['10D', '10H', 'QC', 'JS', '8H'],
      );

      expect(res).toEqual(1);
    });
  });

  describe('Two pairs', () => {
    it('Two pairs win over a hand with one pair', () => {
      const res = pokerJudge(
        ['2C', '2S', '3H', '3S', 'AC'],
        ['2H', '3S', '5S', '10C', '10H'],
      );
      expect(res).toEqual(1);
    });

    it('two pairs with higher higher pair win over two pairs with lower higher pair', () => {
      const res = pokerJudge(
        ['AH', '2H', '2D', '10C', '10H'],
        ['2C', '2S', 'KH', 'KS', '5C'],
      );
      expect(res).toEqual(2);
    });

    it('if higher pairs are equal, look at the lower pairs', () => {
      const res = pokerJudge(
        ['3H', 'KC', 'KD', '10C', '10H'],
        ['2C', '2S', 'KH', 'KS', '5C'],
      );
      expect(res).toEqual(1);
    });

    it('if both higher and lower pairs are equal, look at the other card', () => {
      const res = pokerJudge(
        ['2C', '2D', '3C', '3D', 'AC'],
        ['2E', '2H', '3E', 'KC', '3H'],
      );
      expect(res).toEqual(1);
    });
  });

  describe('Three of a kind', () => {
    it('should beat two pairs', () => {
      const res = pokerJudge(
        ['AC', 'AD', 'KH', 'KS', 'QS'],
        ['2C', '2D', '2H', '4C', '6D'],
      );
      expect(res).toEqual(2);
    });

    it('should beat three of a kind with lower value', () => {
      const res = pokerJudge(
        ['AC', 'AD', 'AS', 'QS', '10S'],
        ['KS', 'KD', 'KH', 'QC', 'AH'],
      );
      expect(res).toEqual(1);
    });
  });

  describe('Straight', () => {
    it('should beat three of a kind', () => {
      const res = pokerJudge(
        ['2C', '3D', '4H', '5S', '6C'],
        ['AC', 'AD', 'AS', 'QS', '10S'],
      );
      expect(res).toEqual(1);
    });

    it('should beat lower straight', () => {
      const res = pokerJudge(
        ['2C', '3D', '4H', '5S', '6C'],
        ['3C', '4D', '5H', '6S', '7C'],
      );
      expect(res).toEqual(2);
    });

    it('should tie with straight with equal higher card', () => {
      const res = pokerJudge(
        ['3D', '4S', '5C', '6D', '7S'],
        ['3C', '4D', '5H', '6S', '7C'],
      );
    });
  });

  describe('Flush', () => {
    it('should beat straight', () => {
      const res = pokerJudge(
        ['3C', '4D', '5S', '6D', '7C'],
        ['2S', '4S', '6S', '8S', 'AS'],
      );
      expect(res).toEqual(2);
    });

    it('should beat lower flush', () => {
      const res = pokerJudge(
        ['2D', '4D', '6D', '8D', 'JD'],
        ['3C', '4C', '6C', '8C', '10C'],
      );
      expect(res).toEqual(1);
    });

    it('should tie with flush with equal high card', () => {
      const res = pokerJudge(
        ['2D', '4D', '6D', '8D', 'JD'],
        ['3C', '4C', '6C', '8C', 'JC'],
      );
      expect(res).toEqual(0);
    });
  });

  describe('Full House', () => {
    it('should beat flush', () => {
      const res = pokerJudge(
        ['2S', '4S', '6S', '8S', 'AS'],
        ['2D', '2C', '2H', '3C', '3D'],
      );
      expect(res).toEqual(1);
    });
    it('should beat full house with lower three cards', () => {
      const res = pokerJudge(
        ['2D', '2C', '2H', '6C', '6D'],
        ['4D', '4C', '4H', '3S', '3C'],
      );
      expect(res).toEqual(2);
    });
  });

  describe('4 of a kind', () => {
    it('should beat full house', () => {
      const res = pokerJudge(
        ['2D', '2C', '2H', '2S', '6D'],
        ['4D', '4C', '4H', '3S', '3C'],
      );
      expect(res).toEqual(1);
    });

    it('should beat lower 4 of a kind', () => {
      const res = pokerJudge(
        ['2D', '2C', '2H', '2S', '6D'],
        ['AD', '3S', 'AS', 'AC', 'AH'],
      );
      expect(res).toEqual(2);
    });
  });

  describe('Straight flush', () => {
    it('should beat 4 of a kind', () => {
      const res = pokerJudge(
        ['AD', '3S', 'AS', 'AC', 'AH'],
        ['2C', '3C', '4C', '5C', '6C'],
      );
      expect(res).toEqual(2);
    });
  });
});
