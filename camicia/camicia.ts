const NUMBER_CARDS  = ['2', '3', '4', '5', '6', '7', '8', '9', '10'] as const;
const FIGURE_CARDS  = [ 'J', 'Q', 'K', 'A'] as const;
const NUMBER_CARDS_SET = new Set<Card>(NUMBER_CARDS);
const FIGURE_CARDS_SET = new Set<Card>(FIGURE_CARDS);
const PAYMENT_TABLE = new Map<string, number>([
  ['J', 1],
  ['Q', 2],
  ['K', 3],
  ['A', 4],
]);

type Card = typeof NUMBER_CARDS[number] | typeof FIGURE_CARDS[number];
type FigureCard = typeof FIGURE_CARDS[number];
type NumberCard = typeof NUMBER_CARDS[number];
type Deck = Card[];
type GameStatus = "in progress" | "finished" | "loop";
type CardType   = "figure" | "number";
type GameResult = { 
  status: GameStatus, 
  cards : number, 
  tricks: number 
};


export const simulateGame = (playerADeck: string[], playerBDeck: string[]): GameResult => {
  const deckA = [...playerADeck] as Deck;
  const deckB = [...playerBDeck] as Deck;
  let pile  = [              ] as Deck;
  const historyA = new Set<Deck>([[...deckA]]);
  const historyB = new Set<Deck>([[...deckB]]);
  const result: GameResult = { 
    status: "in progress", 
    cards : 0, 
    tricks: 0
  };

  let turn: 0 | 1 = 0;

  function toggleTurn(): void {
    turn = turn === 0 ? 1 : 0;
  }
  function getCardType(card: Card): CardType {
    return FIGURE_CARDS_SET.has(card)
      ? "figure"
      : "number";
  }
  function trick(): string[] {
    const pileTEMP = [...pile];
    result.tricks++;
    pile = [];

    return pileTEMP;
  }
  function checkGameState(): GameStatus {
    if((deckA.length || deckB.length) <= 0) {
      return result.status = "finished"
    }
    if(false /*implement loop check*/) {
      return result.status = "loop"
    }
    return "in progress";
  } 

  while(checkGameState() === "in progress") {
    const deckInTurn = turn === 0
      ? deckA
      : deckB;

    const revealedCard = deckInTurn.shift()!;
    if(getCardType(revealedCard) === "number") continue;

    toggleTurn();
  }

  return result;
}
