const NUMBER_CARDS = ["2", "3", "4", "5", "6", "7", "8", "9", "10"];
const PENALTY_CARDS = ["J", "Q", "K", "A"];
type Card = (typeof NUMBER_CARDS)[number] | (typeof PENALTY_CARDS)[number];
type Deck = Card[];

interface GameResult {
  status: "in progress" | "finished" | "loop";
  cards: number;
  tricks: number;
}

export function simulateGame(
  entryDeckA: string[],
  entryDeckB: string[]
): GameResult {
  const result: GameResult = {
    status: "in progress",
    cards: 0,
    tricks: 0,
  };
  const deckA = [...entryDeckA] as Deck;
  const deckB = [...entryDeckB] as Deck;
  const decksHistory = new Set<string>();
  const totalQuantityOfCards = deckA.length + deckB.length;

  let centralDeck: Deck = [];
  let deckInTurn = deckA;
  let opponentDeckInTurn = deckB;

  mainLoop: while (result.status === "in progress") {
    if (gameEntersALoop()) {
      result.status = "loop";
      break mainLoop;
    }

    if (deckInTurn.length === 0) {
      //Player runs out of cards.
      trick(opponentDeckInTurn);
      toggleTurn();
      continue mainLoop;
    }

    const thrownCard = throwCardFrom(deckInTurn);

    if (!isPenaltyCard(thrownCard)) {
      toggleTurn();
      continue mainLoop;
    }

    let penaltyDue = getPenaltyDue(thrownCard);

    penaltyLoop: while (penaltyDue > 0) {
      if (opponentDeckInTurn.length === 0) {
        //Payer runs out of cards.
        break penaltyLoop;
      }

      const paymentCard = throwCardFrom(opponentDeckInTurn);

      if (isPenaltyCard(paymentCard)) {
        //Payer reveals another payment card.
        penaltyDue = getPenaltyDue(paymentCard);
        toggleTurn();
        continue penaltyLoop;
      }

      penaltyDue--;
    }

    //Payer runs out of cards or Penalty is fully paid.
    trick(deckInTurn);
  }

  return result;

  function toggleTurn(): void {
    if (deckInTurn === deckA) {
      deckInTurn = deckB;
      opponentDeckInTurn = deckA;
    } else {
      deckInTurn = deckA;
      opponentDeckInTurn = deckB;
    }
  }
  function isPenaltyCard(card: Card): boolean {
    return PENALTY_CARDS.includes(card);
  }
  function getPenaltyDue(penaltyCard: Card): number {
    if (penaltyCard === "J") return 1;
    if (penaltyCard === "Q") return 2;
    if (penaltyCard === "K") return 3;
    if (penaltyCard === "A") return 4;
    return 0;
  }
  function throwCardFrom(deck: Deck) {
    const thrownCard = deck.shift()!;

    centralDeck.push(thrownCard);
    result.cards++;

    return thrownCard;
  }
  function trick(trickerDeck: Deck): void {
    trickerDeck.push(...centralDeck);
    centralDeck = [];
    result.tricks++;

    if (trickerDeck.length === totalQuantityOfCards) {
      result.status = "finished";
      return;
    }
  }
  function gameEntersALoop(): boolean {
    const currentGameRecord = createGameRecord();

    if (decksHistory.has(currentGameRecord)) {
      return true;
    }

    decksHistory.add(currentGameRecord);
    return false;
  }
  function createGameRecord(): string {
    const activePlayer = deckInTurn === deckA ? "A" : "B";

    return (
      activePlayer +
      "&" +
      deckA.map((card) => (isPenaltyCard(card) ? card : "_")).join("") +
      "&" +
      deckB.map((card) => (isPenaltyCard(card) ? card : "_")).join("")
    );
  }
}
