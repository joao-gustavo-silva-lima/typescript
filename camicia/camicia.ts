interface GameResult { 
  status: "in progress" | "finished" | "loop", 
  cards: number, 
  tricks: number 
}

export function simulateGame(entryDeckA: string[], entryDeckB: string[]): GameResult {
  const result: GameResult = { 
    status: "in progress", 
    cards : 0, 
    tricks: 0 
  }
  const deckA = [...entryDeckA];
  const deckB = [...entryDeckB];
  const totalQuantityOfCards = deckA.length + deckB.length;
  const decksHistory = new Set<string>();

  let centralDeck = [] as string[];
  let deckInTurn = deckA;
  let opponentDeckInTurn = deckB;

  mainLoop:
  while(result.status === "in progress") {
    if(gameEntersALoop()) {
      result.status = "loop";
      break mainLoop;
    }

    if(deckInTurn.length === 0) {
      trick(opponentDeckInTurn);
      toggleTurn();
      continue mainLoop;
    }

    const thrownCard = deckInTurn.shift()!;
    centralDeck.push(thrownCard);
    result.cards++;

    if(!isPenaltyCard(thrownCard)) {
      toggleTurn();
      continue;
    }

    let penaltyDue = getPenaltyDue(thrownCard);

    penaltyLoop:
    while(penaltyDue > 0) {
      if(opponentDeckInTurn.length === 0) {
        break penaltyLoop;
      }

      const paymentCard = opponentDeckInTurn.shift()!;
      centralDeck.push(paymentCard);
      result.cards++;

      if(isPenaltyCard(paymentCard)) {
        penaltyDue = getPenaltyDue(paymentCard);
        toggleTurn();
        continue penaltyLoop;
      }

      penaltyDue--;
    }

    trick(deckInTurn);
  }

  function toggleTurn(): void {
    if(deckInTurn === deckA) {
      deckInTurn = deckB;
      opponentDeckInTurn = deckA;
    }
    else {
      deckInTurn = deckA;
      opponentDeckInTurn = deckB;
    }
  }
  function isPenaltyCard(card: string): boolean {
    return card === "J"
    ||     card === "Q"
    ||     card === "K"
    ||     card === "A";
  }
  function getPenaltyDue(penaltyCard: string): number {
    if(penaltyCard === "J") return 1;
    if(penaltyCard === "Q") return 2;
    if(penaltyCard === "K") return 3;
    if(penaltyCard === "A") return 4;
    return 0;
  }
  function trick(trickerDeck: string[]): void {
    trickerDeck.push(...centralDeck);
    centralDeck = [];
    result.tricks++;

    if(trickerDeck.length === totalQuantityOfCards) {
      result.status = "finished";
      return;
    }
  }
  function gameEntersALoop(): boolean {
    const currentDeckHistoryStamp = createDeckHistoryStamp();
    
    if(decksHistory.has(currentDeckHistoryStamp)) {
      return true;
    }

    decksHistory.add(currentDeckHistoryStamp);
    return false;
  }
  function createDeckHistoryStamp(): string {
    const activePlayer = deckInTurn === deckA ? "A" : "B";

    return `${activePlayer}&${
      deckA.map((card) => isPenaltyCard(card) ? card : '_').join('')
    }&${
      deckB.map((card) => isPenaltyCard(card) ? card : '_').join('')
    }`;
  }

  return result;
}
