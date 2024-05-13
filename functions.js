const gameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let elementArray = [];
let playerMove = "X";
const displayMove = document.getElementById("display-turn");
const displayResult = document.getElementById("display-results");
const displayGameBoard = document.getElementById("container");

function playGame(row, column) {
  if (gameBoard[row][column] === "") {
    //adding the playermove to array
    gameBoard[row][column] = playerMove;
    //diplaying the playermove on grid
    document.getElementById(`${row}${column}`).innerHTML = playerMove;
    //redisplaying the result element( empty by default )
    displayResult.style.display = "flex";

    //displaying player move
    if (playerMove === "X") {
      displayMove.innerHTML = `<p><b id="turn">O</b>&nbsp;&nbsp;turn</p>`;
      document.getElementById(`${row}${column}`).style.color = "red";
    } else if (playerMove === "O") {
      displayMove.innerHTML = `<p><b id="turn">X</b>&nbsp;&nbsp;turn</p>`;
      document.getElementById(`${row}${column}`).style.color = "blue";
    }

    //checking for win
    if (checkWin(row, column)) {
      //changing the move to gameover
      displayMove.innerText = "Game over";
      //disabled the board
      disableBoard();
      //updating the score board
      if (playerMove === "X") {
        xWin += 1;
      } else if (playerMove === "O") {
        oWin += 1;
      }
      setTimeout(() => {
        //removing the gameboard (grid)
        displayGameBoard.style.display = "none";
        //displaying the result
        displayResult.classList.add("display-result");
        displayResult.innerText = `'${playerMove}' Winner!`;
        //alternationg player move after game is over
        alternatingPlayerMove();
        //updating score on screen for each win
        updateScore();
      }, 1000);
      console.log(gameBoard);
    }
    //checking for draw
    else if (checkDraw()) {
      displayMove.innerText = "Game over";
      disableBoard();
      setTimeout(() => {
        displayGameBoard.style.display = "none";
        displayResult.classList.add("display-result");
        displayResult.innerText = `XO Draw!`;
        alternatingPlayerMove();
      }, 1000);
    }
    //alternating the player move during game
    else {
      playerMove = playerMove === "X" ? "O" : "X";
    }
  }
}

function checkWin(row, column) {
  //for row
  if (
    gameBoard[row][0] === playerMove &&
    gameBoard[row][1] === playerMove &&
    gameBoard[row][2] === playerMove
  ) {
    return true;
  }
  //for column
  if (
    gameBoard[0][column] === playerMove &&
    gameBoard[1][column] === playerMove &&
    gameBoard[2][column] === playerMove
  ) {
    return true;
  }
  //for diagonal
  if (
    (gameBoard[0][0] === playerMove &&
      gameBoard[1][1] === playerMove &&
      gameBoard[2][2] === playerMove) ||
    (gameBoard[0][2] === playerMove &&
      gameBoard[1][1] === playerMove &&
      gameBoard[2][0] === playerMove)
  ) {
    return true;
  }

  return false;
}

function checkDraw() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (gameBoard[row][col] === "") {
        return false;
      }
    }
  }
  return true;
}

function disableBoard() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      document.getElementById(`${row}${col}`).onclick = null;
    }
  }
}

function enableBoard() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      document.getElementById(`${row}${col}`).onclick = () => {
        playGame(row, col);
      };
    }
  }
}

function alternatingPlayerMove() {
  playerMove = playerMove === "X" ? "O" : "X";
}

//button to restart the game
const btn = document.getElementById("restart");
btn.addEventListener("click", (event) => {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      enableBoard();
      //removing the display of result
      displayResult.style.display = "none";
      displayResult.classList.remove("display-result");
      displayResult.innerText = "";
      //resetting the gameboard
      document.getElementById(`${row}${col}`).innerText = "";
      gameBoard[row][col] = "";
      displayGameBoard.style.display = "grid";
      //displaying the player move
      displayMove.innerHTML = `<p><b id="turn">${playerMove}</b>&nbsp;&nbsp;turn</p>`;
    }
  }
  btn.classList.add("restart-active");
  setTimeout(() => {
    btn.classList.remove("restart-active");
  }, 100);
});

//score board function
let xWin = 0;
let oWin = 0;

const displayScoreX = document.getElementById("js-x-score");
const displayScoreO = document.getElementById("js-o-score");

function updateScore() {
  if (xWin > 0) displayScoreX.innerHTML = xWin;
  else if (xWin === 0) displayScoreX.innerText = "-";

  if (oWin > 0) displayScoreO.innerHTML = oWin;
  else if (oWin === 0) displayScoreO.innerText = "-";
}

document.getElementById("reset-score").addEventListener("click", () => {
  xWin = 0;
  oWin = 0;
  updateScore();
});
