// Selectori
let boxes = document.querySelectorAll(".box");
let border = document.querySelector(".border");
let newGame = document.querySelector(".new-game");
newGame.addEventListener("click", init);

// Variabile
let activePlayer;
let displayX0;
let playing;
let table;
let scores = [0, 0];

// Start
init();

for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", function () {
    if (playing) {
      if (table[i] !== null) {
        return;
      } else {
        boxes[i].innerHTML = displayX0[activePlayer];
        table[i] = activePlayer;
        checkForWin();

        activePlayer = activePlayer === 1 ? 0 : 1;
        console.log(playing);
      }
    } else displayWinner();
  });
}

function checkForWin() {
  if (
    (table[0] === activePlayer &&
      table[1] === activePlayer &&
      table[2] === activePlayer) ||
    (table[3] === activePlayer &&
      table[4] === activePlayer &&
      table[5] === activePlayer) ||
    (table[6] === activePlayer &&
      table[7] === activePlayer &&
      table[8] === activePlayer) ||
    (table[0] === activePlayer &&
      table[3] === activePlayer &&
      table[6] === activePlayer) ||
    (table[1] === activePlayer &&
      table[4] === activePlayer &&
      table[7] === activePlayer) ||
    (table[2] === activePlayer &&
      table[5] === activePlayer &&
      table[8] === activePlayer) ||
    (table[0] === activePlayer &&
      table[4] === activePlayer &&
      table[8] === activePlayer) ||
    (table[2] === activePlayer &&
      table[4] === activePlayer &&
      table[6] === activePlayer)
  ) {
    playing = false;
    border.style.backgroundColor = "#00ff48b1";

    return true;
  } else return false;
}

function init() {
  border.style.backgroundColor = "rgba(0, 123, 255, 0.214)";
  for (box in boxes) {
    boxes[box].innerHTML = "";
  }
  activePlayer = 1; // 1 -> X , 0 -> O
  displayX0 = ['<img src="img/o.svg" />', '<img src="img/X.svg" />'];
  playing = true;
  table = [null, null, null, null, null, null, null, null, null];
  console.log("init");
}

// De implementat scoruri care nu se reseteaza la New Game

// let scoresEl = [
//   document.querySelector(".score-y"),
//   document.querySelector(".score-x"),
// ];

// checkForWin()
// scores[activePlayer] += 1;
// console.log(scores);
// scoresEl[activePlayer].innerHTML += scores[activePlayer];
