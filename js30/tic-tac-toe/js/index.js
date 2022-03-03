let game = document.querySelector(".game");
let result = document.querySelector(".result");
let btnGame = document.querySelector(".new-game");
let cells = document.querySelectorAll(".cell");

let step = false;

let count = 0;

let scoreX = document.querySelector(".table-score-x");
let scoreO = document.querySelector(".table-score-o");
let scoreDraw = document.querySelector(".table-score-draw");

let circle = `<svg class="circle">
<circle
  r="45"
  cx="58"
  cy="58"
  stroke="blue"
  stroke-width="10"
  fill="none"
  stroke-linecap="round"
/>
</svg>`;

let cross = `<svg class="cross">
<line
  class="first"
  x1="15"
  y1="15"
  x2="100"
  y2="100"
  stroke="red"
  stroke-width="10"
  stroke-linecap="round"
/>
<line
  class="second"
  x1="100"
  y1="15"
  x2="15"
  y2="100"
  stroke="red"
  stroke-width="10"
  stroke-linecap="round"
/>
</svg>`;

function stepCroos(target) {
  if (
    target.tagName == "svg" ||
    target.tagName == "line" ||
    target.tagName == "circle" ||
    target.classList.contains("x") ||
    target.classList.contains("o") ||
    target.classList.contains("game")
  ) {
    return;
  } else {
    target.innerHTML = cross;
    target.classList.add("x");
    let crossAudio = new Audio("audio/cross.mp3");
    crossAudio.play();
    count++;
    step = true;
    result.innerHTML = `<span class="span-style-o">Player "0"</span> turn`;
  }
}

function stepZero(target) {
  if (
    target.tagName == "svg" ||
    target.tagName == "line" ||
    target.tagName == "circle" ||
    target.classList.contains("x") ||
    target.classList.contains("o") ||
    target.classList.contains("game")
  ) {
    return;
  } else {
    target.innerHTML = circle;
    target.classList.add("o");
    let zeroAudio = new Audio("audio/zero.mp3");
    zeroAudio.play();
    count++;
    step = false;
    result.innerHTML = `<span class="span-style-x">Player "X"</span> turn`;
  }
}
function init(e) {
  if (!step) stepCroos(e.target);
  else stepZero(e.target);
  win();
}
game.addEventListener("click", init);

function newGame() {
  step = false;
  count = 0;
  result.innerHTML = `<span class="span-style-x">Player "X"</span> turn first`;
  cells.forEach((item) => {
    item.innerHTML = "";
    item.classList.remove("x", "o", "active");
  });
  game.addEventListener("click", init);
  btnGame.classList.remove("btn-active");
}

btnGame.addEventListener("click", newGame);

function win() {
  let combi = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < combi.length; i++) {
    if (
      cells[combi[i][0]].classList.contains("x") &&
      cells[combi[i][1]].classList.contains("x") &&
      cells[combi[i][2]].classList.contains("x")
    ) {
      cells[combi[i][0]].classList.add("active");
      cells[combi[i][1]].classList.add("active");
      cells[combi[i][2]].classList.add("active");
      result.innerHTML = `<span class="span-style-x">Player "X"</span> wins on <span class="span-style-count">move ${count}</span>`;
      game.removeEventListener("click", init);
      btnGame.classList.add("btn-active");
      let winAudio = new Audio("audio/mario-zvuk-pobedy.mp3");
      winAudio.play();
      scoreX.innerHTML++;
      break;
    } else if (
      cells[combi[i][0]].classList.contains("o") &&
      cells[combi[i][1]].classList.contains("o") &&
      cells[combi[i][2]].classList.contains("o")
    ) {
      cells[combi[i][0]].classList.add("active");
      cells[combi[i][1]].classList.add("active");
      cells[combi[i][2]].classList.add("active");
      result.innerHTML = `<span class="span-style-o">Player "0"</span> wins on <span class="span-style-count">move ${count}</span>`;
      game.removeEventListener("click", init);
      btnGame.classList.add("btn-active");
      let winAudio = new Audio("audio/mortal-kombat-smeh-sao-kana.mp3");
      winAudio.play();
      scoreO.innerHTML++;
      break;
    } else if (count == 9) {
      result.innerHTML = "Draw";
      game.removeEventListener("click", init);
      btnGame.classList.add("btn-active");
      scoreDraw.innerHTML++;
      break;
    }
  }
}
