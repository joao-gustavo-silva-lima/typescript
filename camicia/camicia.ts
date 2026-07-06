type Card = typeof NUMBER_CARDS[number] | typeof PENALTY_CARDS[number];
type NumberCard  = typeof NUMBER_CARDS[number];
type PenaltyCard = typeof PENALTY_CARDS[number];
type Deck = Card[];

const NUMBER_CARDS = ['2', '3', '4', '5', '6', '7', '8', '9', '10'] as const;
const NUMBER_CARDS_SET = new Set<Card>(NUMBER_CARDS);
const PENALTY_CARDS = [ 'J', 'Q', 'K', 'A'] as const;
const PENALTY_CARDS_SET = new Set<Card>(PENALTY_CARDS);
const PENALTY_DUE_TABLE = new Map<PenaltyCard, number>([
  ['J', 1],
  ['Q', 2],
  ['K', 3],
  ['A', 4],
]);

interface GameResult { 
  status: "in progress" | "finished" | "loop", 
  cards : number, 
  tricks: number 
};

class Player {
  private _deck: Deck;
  private _decksHistory: Deck[] = [];
  public  penaltyDue = 0;

  get deck() {
    return this._deck;
  }

  public constructor(deck: Deck) {
    this._deck = deck;
  }
}

class DeckManager {
  public static createDeckHistoryStamp(): string {
    throw "WIP";
  }

  public static  isNumberCard(card: Card): card is NumberCard {
    return NUMBER_CARDS_SET.has(card);
  }

  public static isPenaltyCard(card: Card): card is PenaltyCard {
    return PENALTY_CARDS_SET.has(card);
  }
}

class CamiciaGameMock {
  public result: GameResult = { 
    status: "in progress", 
    cards : 0, 
    tricks: 0
  };
  
  private round = 0;
  private playerA: Player;
  private playerB: Player;
  private centralDeck   : Deck = [];
  private playerInTurn  : Player   ;
  private opponentInTurn: Player   ;
  
  public constructor(deckA: Deck, deckB: Deck) {
    this.playerA = new Player(deckA);
    this.playerB = new Player(deckB);
    this.playerInTurn   = this.playerA;
    this.opponentInTurn = this.playerB;

    while(this.result.status === "in progress") { 
      this.initTurn(); 
      this.toggleTurn();
    }
  }
  
  private initTurn(): void {
    const topCentralCard = this.centralDeck[0];

    if(!topCentralCard || DeckManager.isNumberCard(topCentralCard)) {
      const thrownCard = this.playerInTurnThrowsCard();
      if(!thrownCard) this.result.status = "finished";
      return;
    }

    this.playerInTurn.penaltyDue = PENALTY_DUE_TABLE
      .get(topCentralCard as PenaltyCard)!;

    let collectingPlayer: Player = this.playerInTurn;

    while(this.playerInTurn.penaltyDue > 0) {
      const thrownCard = this.playerInTurnThrowsCard();
      
      if(!thrownCard) {
        collectingPlayer = this.opponentInTurn;
        break;
      }
      if(DeckManager.isPenaltyCard(thrownCard)) {
        this.playerInTurn.penaltyDue = 0;
        return;
      }
      
      this.playerInTurn.penaltyDue--;
    }

    this.executeTrick(collectingPlayer);
  }

  private toggleTurn(): void {
    this.playerInTurn = this.playerInTurn === this.playerA
      ? this.playerB
      : this.playerA;
    
    this.opponentInTurn = this.opponentInTurn === this.playerA
      ? this.playerB
      : this.playerA;
  }

  private playerInTurnThrowsCard(): Card | undefined {
    const topCard = this.playerInTurn.deck.shift();
    if(topCard) {
      this.centralDeck.unshift(topCard);
      this.result.cards++;
    }
    return topCard;
  }

  private executeTrick(collectingPlayer: Player): void {
    collectingPlayer.deck.push(...[...this.centralDeck]);
    this.centralDeck = [];
    this.result.tricks++;
    this.round++;
  }
}

export const simulateGame = (deckA: string[], deckB: string[]): GameResult => {
  return new CamiciaGameMock(deckA as Deck, deckB as Deck).result;
}
