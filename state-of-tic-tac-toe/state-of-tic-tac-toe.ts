type GameState = "ongoing" | "win" | "draw";

export const gamestate = (board: string[]): GameState => {
  const boardCells = board.flatMap((row) => row.split(""));

  let xCount = 0;
  let oCount = 0;
  let emptyCount = 0;

  for (const row of board) {
    for (const playMark of row) {
      if (playMark === "X") {
        xCount++;
      } else if (playMark === "O") {
        oCount++;
      } else {
        emptyCount++;
      }
    }
  }

  if (oCount > xCount) {
    throw "Wrong turn order: O started";
  }
  if (xCount > oCount + 1) {
    throw "Wrong turn order: X went twice";
  }
  if (oCount > xCount) {
    throw "Wrong turn order: O went twice";
  }

  const boardLines = [
    //Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  function hasWon(player: "X" | "O"): boolean {
    return boardLines.some((line) =>
      line.every((cellIndex) => boardCells[cellIndex] === player)
    );
  }

  const xWon = hasWon("X");
  const oWon = hasWon("O");

  if (xWon && oWon) {
    throw "Impossible board: game should have ended after the game was won";
  }
  if (xWon) {
    if (xCount === oCount) {
      throw "Impossible board: game should have ended after the game was won";
    }
    return "win";
  }
  if (oWon) {
    if (xCount > oCount) {
      throw "Impossible board: game should have ended after the game was won";
    }
    return "win";
  }

  return emptyCount === 0 ? "draw" : "ongoing";
};
