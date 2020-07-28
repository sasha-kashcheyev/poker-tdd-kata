<h1 align="center">
<img width="241" src ="kata.jpg" />
<br>
Poker Tdd Kata
</h1>

## Prerequisites

#### Generate a node library project
create a new project using `create-yoshi-app` and pick `node-library` and "Babel"

```bash
npx create-yoshi-app poker-tdd-kata
cd poker-tdd-kata
npm run start
```

#### Start wallaby (recommended)

  we recommend using wallaby. 
  - Wallaby is already pre-configured inside our generated project, all you have to do is start it. 
  - If you use VSCode wallaby will auto start (Thanks to Gabriel Grinberg!)
  - http://wallabyjs.com/app is really cool!

## General instructions

- TDD

  The main purpose of this Kata is practicing TDD. Do not skip that part!

  Follow the [three rules of TDD](http://butunclebob.com/ArticleS.UncleBob.TheThreeRulesOfTdd):

  > *RED* - write a red test
  >
  > *GREEN* - write the **minimum** set of code to pass this test
  >
  > *REFACTOR* - refactor your code

  Refactoring your code (right after it gets green) is the most important part!!! Do not skip it

- Outside in/Inside out: decide on your strategy. We recommend outside in (:

- Work in pairs/alone

- Complete each task/step before moving to next one!

## Game Task

Your task is to write a function that receives two hands of poker cards (5 each) and decides which hand wins:

```js
pokerJudge(hand1, hand2);
```

- hand1 & hand2 are arrays of strings

- This function returns an integer: 0 for tie, 1 if hand1 won, 2 if hand2 won

For example: 

```js
// hand 2 wins. See rules below for more details
pokerJudge(['2H', '3D', '5S', '9C', 'KD'], ['2C', '3H', '4S', '8C', 'AH']) === 2;
```

A poker deck contains 52 cards - each card has a suit which
is one of clubs, diamonds, hearts, or spades
(denoted C, D, H, and S in the input data).

Each card also has a value which is one of
2, 3, 4, 5, 6, 7, 8, 9, 10, jack, queen, king, ace
(denoted 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A).

## Game Steps

Decision on which hand wins will be according to the following rules/steps (please add the rules inceremently, step by step):

### Step 1: *High Card*
Hands which do not fit any higher category are
ranked by the value of their highest card. If the highest
cards have the same value, the hands are ranked by the next
highest, and so on.

Example:

```js
//hand2 wins - high card
pokerJudge(['2H', '3D', '5S', '9C', 'KD'], ['2C', '3H', '4S', '8C', 'AH']) === 2; 
```

### Step 2: *Pair*
2 of the 5 cards in the hand have the same value.
Hands which both contain a pair are ranked by the value of
the cards forming the pair. If these values are the same,
the hands are ranked by the values of the cards not
forming the pair, in decreasing order

Example:

```js
//hand2 wins - pair (with high card)
pokerJudge(['2H', '3D', '3S', '9C', 'KD'], ['2C', '3H', '6S', '8C', '6H']) === 2;
```

### Step 3: *Two Pairs*
The hand contains 2 different pairs. Hands
which both contain 2 pairs are ranked by the value of
their highest pair. Hands with the same highest pair
are ranked by the value of their other pair. If these
values are the same the hands are ranked by the value
of the remaining card.

```js
//hand1 wins - pair (with high card)
pokerJudge(['2H', '3D', '3S', '9C', '9D'], ['3C', '3H', '6S', '8C', '8H']) === 1;
```

### Step 4: *Three of a Kind*
Three of the cards in the hand have the
same value. Hands which both contain three of a kind are
ranked by the value of the 3 cards.

### Step 5: *Straight*
Straight: Hand contains 5 cards with consecutive values.
Hands which both contain a straight are ranked by their
highest card.

### Step 6: *Flush*
Hand contains 5 cards of the same suit. Hands which
are both flushes are ranked using the rules for High Card.

### Step 7: *Full House*
3 cards of the same value, with the remaining 2
cards forming a pair. Ranked by the value of the 3 cards.

### Step 8: *Four of a kind*
4 cards with the same value. Ranked by the
value of the 4 cards.

### Step 9: *Straight flush*
5 cards of the same suit with consecutive
values. Ranked by the highest card in the hand.
